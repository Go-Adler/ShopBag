import express from 'express'
import { renderWalletPage } from '../../controller/userController/walletController.js'

export const router = express.Router()

router.get("/", renderWalletPage)