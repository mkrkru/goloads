package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type DataBase interface {
	getUserFromId()
}

type adsServer struct {
	userStorage          UserStorage
	advertisementStorage BannerStorage
	analyticsStorage     AnalyticsStorage
}

type IDRequest struct {
	ID string `json:"id"`
}

type BannerRequest struct {
	URL string `json:"url"`
	Image string `json:"image"`
	Domains     []string `json:"domains"`
}

type test struct {
	Body string `json:"body"`
}

var Test = test{Body: "OK"}

var counter int = 0

func PreInnitiallizeStuff(w http.ResponseWriter, r *http.Request){
	fmt.Println("got request with method", r.Method, counter)
	counter++
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")
}

func (a *adsServer) deleteBannerHandler(w http.ResponseWriter, r *http.Request){
	PreInnitiallizeStuff(w, r)

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
	PreInnitiallizeStuff(w, r)

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

func (a *adsServer) receivePostHandler(w http.ResponseWriter, r *http.Request) {
	PreInnitiallizeStuff(w, r)

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
	var newAdvertisement Banner
	err = json.Unmarshal(rawBody, &newAdvertisement)
	if err != nil {
		fmt.Println(err)
		return
	}
	a.advertisementStorage.addAdvertisement(newAdvertisement)

	a.advertisementStorage.putAdvertisementIntoDB(newAdvertisement.ID)

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
	PreInnitiallizeStuff(w, r)

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
	PreInnitiallizeStuff(w, r)

	http.ServeFile(w, r, "favicon.ico")
}

func (a *adsServer) receiveBannerImageHandler(w http.ResponseWriter, r *http.Request) {
	PreInnitiallizeStuff(w, r)

	rawData, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusBadRequest),
			http.StatusBadRequest,
		)
		return
	}

	var newImage BannerRequest
	if err := json.Unmarshal(rawData, &newImage); err != nil {
		fmt.Println(err)
		return
	}

	var newAdvertisement Banner
	newAdvertisement.Image = newImage.Image
	newAdvertisement.Domains = newImage.Domains



}

func main() {

	// initializing test objects

	TestAdvertisement := Banner{
		ID:        RandomString(19),
		Image:     "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg",
		DomainURL: "yandex.ru",
		Domains:   []string{"stackoverflow.com"},
		ImageBase64: false,
	}

	TestAdvertisementStorage := BannerStorage{map[string]Banner{TestAdvertisement.ID: TestAdvertisement}}


	arrayLength := 14
	TestAnalytics := Analytics{
		BannerID:     "nbn9ewnd",
		Clicks:       RandomArray(arrayLength),
		UniqueClicks: RandomArray(arrayLength),
		Views:        RandomArray(arrayLength),
		UniqueViews:  RandomArray(arrayLength),
	}
	TestAnalyticsStorage := AnalyticsStorage{map[string]Analytics{TestAnalytics.BannerID: TestAnalytics}}
	AdsServer := adsServer{UserStorage{}, TestAdvertisementStorage, TestAnalyticsStorage}

	// initializing PostgreSQL database

	InnitializeDB()

	// initializing http handlers

	mux := http.NewServeMux()
	mux.Handle("/", http.HandlerFunc(AdsServer.sendBannerHandler))
	mux.Handle("/delete", http.HandlerFunc(AdsServer.deleteBannerHandler))
	mux.Handle("/favicon.ico", http.HandlerFunc(AdsServer.sendFaviconHandler))
	mux.Handle("/add", http.HandlerFunc(AdsServer.receivePostHandler))
	mux.Handle("/analytics", http.HandlerFunc(AdsServer.sendAnalyticsHandler))
	log.Fatal(http.ListenAndServe("192.168.239.18:8080", mux))
}
