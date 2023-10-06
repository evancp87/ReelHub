import { setupServer } from 'msw/node'
import 'whatwg-fetch';

import {handlers} from "./handlers"

export const server = setupServer(...handlers)
