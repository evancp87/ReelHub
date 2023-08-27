
import {rest} from "msw";


export const handlers = [
  rest.get("http://localhost:6002", (req, res, ctx) => {

    // successful response
    return res(ctx.status(200), ctx.json([
      {
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
        }
    ]), ctx.delay(30))
  })
]

