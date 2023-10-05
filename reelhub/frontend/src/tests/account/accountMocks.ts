import {User, AuthToken, RegisterCredentials, LoginCredentials} from "../../store/services/types";



export const login: RegisterCredentials =  {
firstName: "Evan",
lastName: "Parker",
email: "evancp@hotmail.com",
password: "evancp123",
avatar?: null
}


export const register: LoginCredentials = {
email: "evancp@hotmail.com",
password: "evancp123"

}