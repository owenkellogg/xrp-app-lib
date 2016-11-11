
# XRP App Lib

A small javascript library for creating XRP-based wallets

[![CircleCI](https://circleci.com/gh/stevenzeiler/xrp-app-lib.svg?style=svg)](https://circleci.com/gh/stevenzeiler/xrp-app-lib)

## Installation

    npm install --save xrp-app-lib

## Usage
  
    Wallet createWallet()

    Wallet importWalletFromSecret(PrivateKey)

    Account importAccountFromAddress(PublicKey)

    Promise<Decimal> updateBalance(Account)
    Promise<Decimal> updateBalance(Wallet)

    Promise<Payment> sendPayment({
      to: Account,
      from: Wallet,
      amount: Decimal
    })

