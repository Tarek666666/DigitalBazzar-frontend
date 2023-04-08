# DigitalBazzar

DigitalBazzar is a full-stack e-commerce application built to simulate real-world functionality. This app has almost all the important features of a real e-commerce site. The application was built over a period of 6 weeks to test my knowledge and skills in various technologies.

## Features

DigitalBazzar e-commerce offers a variety of features to make the shopping experience enjoyable and efficient:

- Dark & Light Mode
- Browse products by category or search for specific items using the search bar.
- View detailed product information, including images, descriptions, and reviews.
- Add products to the cart, adjust quantities, and remove items as needed.
- Check out securely using Stripe payment processing.


## Technologies Used:
DigitalBazzar was built using the following technologies:


- React Router DOM: This library enables client-side routing, allowing users to navigate between different pages of the app without a full page reload.
- Axios: This library provides an easy-to-use API for making HTTP requests to the backend server.
- Bootstrap: This popular CSS framework provides a responsive design system for building attractive and consistent UI elements.
- React Icons: This package offers a wide range of icons that can be easily added to the app for visual appeal and improved usability.
- React-Fast-Marquee: This lightweight package allows for the creation of a smooth and eye-catching marquee animation to display important information.

## Demo:
Online Deployment of this project is available at:    [Digital-Bazzar](https://digital-bazzar.netlify.app/) <br>

You can use these credentials to log in as an admin and explore the admin features. Additionally, new accounts can be created and verified.

| Email  | Password  |
|-----------|-----------|
| admin | 123123123 |

To test checkout and stripe getway the following creditcard can be used to place order and fulfill a payment
| Card Number             | End    | CVC |
|------------------------|--------|-----|
| 4242 4242 4242 4242     | 11-33  | 333 |



## Future Plans and Improvements for DigitalBazzar:
- Implementing Stripe webhooks to handle the checkout and order creation process. When a payment is successfully processed, the webhook will send a request to the DigitalBazzar backend. I will create an API to handle this request, and only after receiving it, will the order be created in the database.

- Adding a feature for the admin to upgrade a regular user to an admin. Additionally, I will implement CRUD operations for orders and members within the admin dashboard.

- Improving the design of the featured collection on the homepage using the Three.js library.

## Note:
The app uses cookies to store authentication tokens, which are deleted when the user logs out. The token has a lifespan of 15 minutes, after which the user will need to log in again for continued access.


## Screenshots:
![Screenshot of DigitalBazzar homepage](https://github.com/Tarek666666/DigitalBazzar-backend/blob/master/screenshots/home.png)
![Screenshot of DigitalBazzar homepage](https://github.com/Tarek666666/DigitalBazzar-backend/blob/master/screenshots/home-dark.png)
