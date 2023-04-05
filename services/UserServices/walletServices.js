import { User } from '../../models/userModel.js'

// Service to check the order status cod or not
export const getWalletAndTransactions = async (id) => {
  try {
    const { wallet, transactions } = await User.findById(id, { _id: 0, wallet: 1, transactions: 1})
    return { wallet, transactions }
  } catch (error) {
    console.error(`Error in getting wallet and transactions , #walletServices ${error.message}`)
    throw new Error(`Error in getting wallet and transactions , #walletServices ${error}`)
  }
}

// Service to check the order status cod or not
export const getWallet = async (id) => {
  try {
    const { wallet } = await User.findById(id, { _id: 0, wallet: 1 })
    return wallet
  } catch (error) {
    console.error(`Error in getting wallet , #walletServices ${error.message}`)
    throw new Error(`Error in getting wallet , #walletServices, #orderServices ${error}`)
  }
}

// Service to update wallet balance
export const updateBalance = async (id, balance) => {
  try {
    console.log(balance, 28);
    await User.findByIdAndUpdate(id, { "wallet.balance": balance })
    return
  } catch (error) {
    console.error(`Error in wallet update , #updateBalanceService, ${error.message}`)
    throw new Error(`Error in wallet update , #updateBalanceService, ${error}`)
  }
}