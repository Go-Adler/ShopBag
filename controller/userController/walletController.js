import { getWalletAndTransactions } from '../../services/userServices/walletServices.js'

// Function to render wallet page
export const renderWalletPage = async (req, res) => {
  try {
    const { name, _id } = req.session
   const { wallet, transactions } =  await getWalletAndTransactions(_id)
    res.render('user/wallet', { title: 'Wallet', name, wallet, transactions })
  } catch (error) {
    console.error(`Error in wallet render #walletController: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}