// for media api
export type Media = {
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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: string
}


export type AuthToken = {
    token?: string;
}

export type RegisterCredentials = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    repeatPassword: string,
    avatar?: string
}

export type LoginCredentials = {
    email: string;
    password: string;
}

// for bookmarks api


export type Bookmark = {
    user: User
    media: Media
}

export type UserId = {
   userId: string;
}

export type Category = {
  category: string;
}
