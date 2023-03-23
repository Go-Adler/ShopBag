import express from 'express'

import { renderUsersListPage } from '../../controller/adminController'
import {
  block,
  unblock,
} from '../../controller/adminControllers/userController'

export const route = express.Router()

route.post('/block', block)
route.post('/unblock', unblock)
route.get('/', renderUsersListPage)