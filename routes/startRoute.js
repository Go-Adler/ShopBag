import express from expresss

import signInController from "../controller/userAccessController"

export const route = express.Router()

route.get("/", signInController.start);
