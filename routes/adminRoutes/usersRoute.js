import express from 'express'

import { renderUsersListPage } from '../../controller/adminController.js'
import {
  block,
  unblock,
} from '../../controller/adminControllers/userController.js'

export const router = express.Router()

router.post('/block', block)
router.post('/unblock', unblock)
router.get('/', renderUsersListPage)