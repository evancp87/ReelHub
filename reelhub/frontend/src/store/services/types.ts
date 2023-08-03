// for media api
export type Media = {
    title: string,
    year: number,
    thumbnail:  {
       trending: {
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
}


export type AuthToken = {
    token?: string;
}

export type RegisterCredentials = {
    email: string,
    name: string,
    password: string
}

export type LoginCredentials = {
    email: string;
    password: string;
}