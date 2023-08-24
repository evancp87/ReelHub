import { it } from "node:test"
import { mockBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { mediaApi, useGetMediaQuery, useGetMediaByCategoryQuery, useGetTrendingMediaQuery } from "../src/store/services/mediaApi";


// import function or data herer
jest.mock('axios');


function media() {
    describe("media", () => {
        it("Should fetch media items from the database", async () => {

            const mockedBaseQuery = mockBaseQuery();

            const api = mediaApi.injectEndpoints({
                base: mockedBaseQuery,
                endpoints: (builder) => ({
                  getMedia: builder.query<Media[], null>({
                    query: () => "/media/",
                  }),
                }),
              });

            const mockedData = [ {
                "title": "Beyond Earth",
                "thumbnail": {
                  "trending": {
                    "small": "./assets/thumbnails/beyond-earth/trending/small.jpg",
                    "large": "./assets/thumbnails/beyond-earth/trending/large.jpg"
                  },
                  "regular": {
                    "small": "./assets/thumbnails/beyond-earth/regular/small.jpg",
                    "medium": "./assets/thumbnails/beyond-earth/regular/medium.jpg",
                    "large": "./assets/thumbnails/beyond-earth/regular/large.jpg"
                  }
                },
                "year": 2019,
                "category": "Movie",
                "rating": "PG",
                "isBookmarked": false,
                "isTrending": true
              },
              {
                "title": "Bottom Gear",
                "thumbnail": {
                  "trending": {
                    "small": "./assets/thumbnails/bottom-gear/trending/small.jpg",
                    "large": "./assets/thumbnails/bottom-gear/trending/large.jpg"
                  },
                  "regular": {
                    "small": "./assets/thumbnails/bottom-gear/regular/small.jpg",
                    "medium": "./assets/thumbnails/bottom-gear/regular/medium.jpg",
                    "large": "./assets/thumbnails/bottom-gear/regular/large.jpg"
                  }
                },
                "year": 2021,
                "category": "Movie",
                "rating": "PG",
                "isBookmarked": false,
                "isTrending": true
              },
              {
                "title": "Undiscovered Cities",
                "thumbnail": {
                  "trending": {
                    "small": "./assets/thumbnails/undiscovered-cities/trending/small.jpg",
                    "large": "./assets/thumbnails/undiscovered-cities/trending/large.jpg"
                  },
                  "regular": {
                    "small": "./assets/thumbnails/undiscovered-cities/regular/small.jpg",
                    "medium": "./assets/thumbnails/undiscovered-cities/regular/medium.jpg",
                    "large": "./assets/thumbnails/undiscovered-cities/regular/large.jpg"
                  }
                },
                "year": 2019,
                "category": "TV Series",
                "rating": "E",
                "isBookmarked": false,
                "isTrending": true
              }]

         
        }),
        it("should get all media items from the db under a category", () => {

        }),
        it("should get all media items from the db that are trending", () => {
            
        });
    });
}
