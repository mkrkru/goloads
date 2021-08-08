package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type DataBase interface {
	getUserFromId()
}

type adsServer struct {
	userStorage          UserStorage
	advertisementStorage AdvertismentStorage
	analyticsStorage     AnalyticsStorage
}

type IDRequest struct {
	ID string `json:"id"`
}

type test struct {
	Body string `json:"body"`
}

var Test = test{Body: "OK"}


func (a *adsServer) deleteBannerHandler(w http.ResponseWriter, r *http.Request){
	fmt.Println("got request with method", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method != "DELETE"{
		http.Error(w,
			http.StatusText(http.StatusBadRequest),
			http.StatusBadRequest)
		return
	}

	rawData, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError)
		return
	}
	fmt.Println(string(rawData))

	var id_request IDRequest
	if err := json.Unmarshal(rawData, &id_request); err != nil{
		http.Error(w,
			http.StatusText(http.StatusBadRequest),
			http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	a.advertisementStorage.deleteAdvertisement(id_request.ID)

	bytes, err := json.Marshal(Test)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}

	fmt.Fprintf(w, string(bytes))
}

func (a *adsServer) sendBannerHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("got request with method", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	ads := a.advertisementStorage.getAdvertisements()

	bytes, err := json.Marshal(ads)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}

	fmt.Fprintf(w, string(bytes))
}

func (a *adsServer) recivePostHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("got request with method", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method != "POST" {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}

	rawBody, err := ioutil.ReadAll(r.Body)
	fmt.Println(string(rawBody))
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusBadRequest),
			http.StatusBadRequest,
		)
		return
	}
	var newAdvertisement Advertisment
	err = json.Unmarshal(rawBody, &newAdvertisement)
	if err != nil {
		fmt.Println(err)
		return
	}
	a.advertisementStorage.addAdvertisement(newAdvertisement)

	bytes, err := json.Marshal(Test)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}

	fmt.Fprintf(w, string(bytes))

}

func (a *adsServer) sendAnalyticsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("got request with method", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	id := r.URL.Query().Get("id")
	analytics := a.analyticsStorage.AnalyticsMap[id]

	bytes, err := json.Marshal(analytics)
	if err != nil{
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}

	fmt.Fprintf(w, string(bytes))


}

func (a *adsServer) sendFaviconHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("got request with method", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	http.ServeFile(w, r, "favicon.ico")
}

func main() {
	TestAdvertisement := Advertisment{
		ID: RandomString(19),
		ImageURL: "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg",
		DomainURL: "yandex.ru",
		Domains:   []string{"stackoverflow.com"},
	}

	TestAdvertisementStorage := AdvertismentStorage{map[string]Advertisment{TestAdvertisement.ID: TestAdvertisement}}

	TestAnalytics := Analytics{
		BannerID:     "nbn9ewnd",
		Clicks:       []int{99, 8, 24, 25, 45, 68, 89, 83, 63, 34, 67, 37, 67, 71},
		UniqueClicks: []int{90, 27, 35, 40, 76, 4, 18, 83, 30, 15, 61, 96, 55, 58},
		Views:        []int{50, 41, 18, 90, 24, 65, 49, 16, 20, 22, 80, 76, 18, 0},
		UniqueViews:  []int{43, 20, 11, 96, 51, 18, 35, 79, 5, 31, 62, 37, 77, 49},
	}
	TestAnalyticsStorage := AnalyticsStorage{map[string]Analytics{TestAnalytics.BannerID: TestAnalytics}}
	AdsServer := adsServer{UserStorage{}, TestAdvertisementStorage, TestAnalyticsStorage}

	mux := http.NewServeMux()
	mux.Handle("/", http.HandlerFunc(AdsServer.sendBannerHandler))
	mux.Handle("/delete", http.HandlerFunc(AdsServer.deleteBannerHandler))
	mux.Handle("/favicon.ico", http.HandlerFunc(AdsServer.sendFaviconHandler))
	mux.Handle("/add", http.HandlerFunc(AdsServer.recivePostHandler))
	mux.Handle("/analytics", http.HandlerFunc(AdsServer.sendAnalyticsHandler))
	log.Fatal(http.ListenAndServe("192.168.239.25:8080", mux))
}
