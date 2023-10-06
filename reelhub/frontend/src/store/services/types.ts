// for media api
export type Media = {
    _id: string,
    title: string,
    year: number,
    thumbnail?:  {
       trending?: {
         small: string;
         large: string;
       },
       regular: {
         small: string;
         medium: string;
         large: string;
       }
     },
    category: string,
    rating: string,
    isBookmarked: boolean,
    isTrending: boolean,
   };
   

//    For users api

export type User = {
    _id: string,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: string
}


export type AuthToken = {
    token?: string;
}

export type LoginAuth = {
  email: string,
  password: string,
  token: string | undefined;
}

export interface ErrorObject {
  key: string;
  message: string;
}

export type RegisterCredentials = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    avatar?: string  | null
}

export type LoginCredentials = {
    email: string;
    password: string;
}

// for bookmarks api


export type Bookmark = {
  media: Media
    user: User
}

export type AddBookmark = {
  mediaId: string,
  userId: string | symbol
}

export type UserId = {
   userId: string;
}

export type Category = {
  category: string;
}
