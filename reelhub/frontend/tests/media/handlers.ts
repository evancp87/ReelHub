
import {rest} from "msw";
import {mediaMocks} from "./mediaMocks";
import {Media} from "../../src/store/services/types";

export const handlers = [
    rest.get("http://localhost:6002/media", (_, res, ctx) =>
      res(ctx.status(200), ctx.json<Media[]>(mediaMocks))
    ),
   ];
