// Function to render wallet page
export const renderWalletPage = async (req, res) => {
  try {
    const { name } = req.session
    res.render('user/wallet', { title: 'Wallet', name })
  } catch (error) {
    console.error(`Error in wallet render #walletController: ${error.message}`)
    res.render('error', {
      message: error.message,
      previousPage: req.headers.referer,
    })
  }
}