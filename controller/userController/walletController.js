import { getWalletAndTransactions } from '../../services/UserServices/walletServices.js'

// Function to render wallet page
export const renderWalletPage = async (req, res) => {
  try {
    const { name, _id } = req.session
   const { wallet, transactions } =  await getWalletAndTransactions(_id)
    res.render('user/wallet', { title: 'Wallet', name, wallet, transactions })
  } catch (error) {
    console.error(`Error in wallet render #walletController: ${error.message}`)
    res.render('error', {
      message: 'Error in wallet page',
      previousPage: req.headers.referer,
    })
  }
}