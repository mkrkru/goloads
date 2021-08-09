package main

import (
	"database/sql"
	"fmt"
	"github.com/lib/pq"

	_ "github.com/lib/pq"
)

/*const (
	host     = "localhost"
	port     = 5433
	user     = "postgres"
	password = "postgres"
	dbname   = "postgres"
)*/

const (
	host     = "ec2-52-17-1-206.eu-west-1.compute.amazonaws.com"
	port     = 5432
	user     = "hjzokxbtzadjhv"
	password = "c20b05c35a896d812208b2e45c22a51ef896d0270af876d67f023cf2ee776424"
	dbname   = "d53l1p7nfaa2qf"
)

func InnitializeDB() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	_, err = db.Query(`create table if not exists "Banners"
							(
    							"ID" text not null,
								"DomainURL" text not null,
								"Image"text,
								"Domains" text[]
							);`)
	if err != nil {
		return nil
	}

	fmt.Println("Successfully connected!")
	return db
}

func (a *BannerStorage) putAdvertisementIntoDB(id string) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	var banner Banner
	banner = a.BannerMap[id]
	_, err = db.Query(`INSERT INTO "Advertisements" 
					VALUES ($1, $2, $3, $4);`,
		banner.ID,
		banner.DomainURL,
		banner.Image,
		pq.Array(banner.Domains))

	if err != nil {
		fmt.Println(err)
		return
	}
}

func (a *BannerStorage) getAdvertisementsFromDB(id string) Banner {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	var banner Banner
	rows, err := db.Query(`SELECT * FROM "Banners" WHERE ID=$1`, id)
	if err != nil {
		fmt.Println(err)
		return Banner{}
	}

	for rows.Next(){
		err = rows.Scan(&banner.ID, &banner.Image, &banner.DomainURL, &banner.Domains)
		if err != nil{
			fmt.Println(err)
			return Banner{}
		}
	}

	return banner


}

// func (a *BannerStorage) getAdvertisementFromDB (id string)
