
import {rest} from "msw";
import {login, register} from "./accountMocks";

  export const handlers = [
    rest.post("http://localhost:6002/users/login", (req, res, ctx) => {
  
      // successful response
      return res(ctx.status(200), ctx.json(login), ctx.delay(30))
    }),
    rest.post("http://localhost:6002/users/new", (req, res, ctx) => {
  
      // successful response
      return res(ctx.status(200), ctx.json(register), ctx.delay(30))
    }),

  ]
