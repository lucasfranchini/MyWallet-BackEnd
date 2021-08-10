# My Wallet

An easy to use financial manager. Track your revenues and expenses to learn how you spend your money and know all the time how much you have.

<img src="" />

Try it out now at https://my-wallet-front-50pa0so9n-lucasfranchini.vercel.app

## About

This is an web application with which lots of people can manage their own expenses and revenues. Below are the implemented features:

- Sign Up
- Login
- List all financial events for a user
- Add expense
- Add revenue
- responsive layout

By using this app any user can learn how they've been using their money and always keep track of your balance.

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled-components%20-%2320232a.svg?&style=for-the-badge&color=b8679e&logo=styled-components&logoColor=%3a3a3a'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-app%20-%2320232a.svg?&style=for-the-badge&color=60ddf9&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react_route%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
</p>

## How to run

1. Clone this repository
2. create a postgres Database named mywallet
3. copy database from dump.sql file
5. Install dependencies
```bash
npm i
```
6. start server with
```
npx nodemon ./src/server.js
```
7. Finally access http://localhost:4000/routename changing 'routename' for the route you wanna call on postman or in front-end:  https://github.com/lucasfranchini/MyWalletFront