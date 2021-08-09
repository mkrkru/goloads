package main

type User struct {
	ID       int    `json:"id"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

type UserStorage struct {
	UserMap map[string]User
}

type Banner struct {
	ID          string   `json:"id"`
	Image       string   `json:"image"`
	DomainURL   string   `json:"url"`
	Domains     []string `json:"domains"`
	ImageBase64 bool     `json:"image-base64"`
}

type Analytics struct {
	BannerID     string `json:"id"`
	Clicks       []int  `json:"clicks"`
	UniqueClicks []int  `json:"unique_clicks"`
	Views        []int  `json:"views"`
	UniqueViews  []int  `json:"unique_views"`
}

type BannerStorage struct {
	BannerMap map[string]Banner
}

type AnalyticsStorage struct {
	AnalyticsMap map[string]Analytics
}

func (a *BannerStorage) addAdvertisement(ad Banner) {
	a.BannerMap[ad.ID] = ad
}

func (a *BannerStorage) getAdvertisements() []Banner {
	var ads []Banner
	for _, ad := range a.BannerMap {
		ads = append(ads, ad)
	}
	return ads
}

func (a *BannerStorage) deleteAdvertisement(id string) {
	delete(a.BannerMap, id)
}

func (a AnalyticsStorage) getAnalytics(id string) Analytics {
	return a.AnalyticsMap[id]
}

func (s BannerStorage) sendBanner(id string) Banner {
	return s.BannerMap[id]
}
