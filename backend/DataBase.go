package main

type User struct {
	ID       int    `json:"id"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

type UserStorage struct {
	UserMap map[string]User
}

type Advertisment struct {
	ID        string   `json:"id"`
	ImageURL  string   `json:"image"`
	DomainURL string   `json:"url"`
	Domains   []string `json:"domains"`
}

type Analytics struct {
	BannerID     string `json:"id"`
	Clicks       []int  `json:"clicks"`
	UniqueClicks []int  `json:"unique_clicks"`
	Views        []int  `json:"views"`
	UniqueViews  []int  `json:"unique_views"`
}

type AdvertismentStorage struct {
	AdsMap map[string]Advertisment
}

type AnalyticsStorage struct {
	AnalyticsMap map[string]Analytics
}

func (a *AdvertismentStorage) addAdvertisement(ad Advertisment) {
	a.AdsMap[ad.ID] = ad
}

func (a *AdvertismentStorage) getAdvertisements() []Advertisment {
	var ads []Advertisment
	for _, ad := range a.AdsMap {
		ads = append(ads, ad)
	}
	return ads
}

func (a *AdvertismentStorage) deleteAdvertisement(id string) {
	delete(a.AdsMap, id)
}

func (a AnalyticsStorage) getAnalytics(id string) Analytics{
	return a.AnalyticsMap[id]
}

func (s AdvertismentStorage) sendBanner(id string) Advertisment {
	return s.AdsMap[id]
}


