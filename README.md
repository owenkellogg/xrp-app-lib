
# XRP App Lib

A small javascript library for creating XRP-based wallets

## Installation

    npm install --save xrp-app-lib

## Usage
  
    Wallet createWallet()

    Wallet importWalletFromSecret(PrivateKey)

    Promise<Decimal> updateBalance(Wallet)

    Promise<Payment> sendPayment({
      to: Wallet,
      from: Wallet,
      amount: Decimal
    })

