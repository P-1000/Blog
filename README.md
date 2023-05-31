# FlashPost Blog

FlashPost is a blogging platform built with Vite.js, MongoDB, Node.js, Express.js, and Tailwind CSS. It provides a simple and efficient way to create and manage blog posts. This README file provides an overview of the project and instructions for setting it up and running it locally.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and authentication
- Create, edit, and delete blog posts
- Markdown support for post content
- Commenting system for posts
- Search functionality
- User-friendly interface built with Tailwind CSS
- Responsive design

## Requirements
To run FlashPost locally, make sure you have the following requirements installed on your machine:

- Node.js (v14 or above)
- MongoDB

## Getting Started
Follow the steps below to set up and run FlashPost on your local machine.

### Installation
1. Clone this repository to your local machine or download the source code as a ZIP file.
2. Open a terminal and navigate to the project's root directory.

```shell
cd flashpost
```

3. Install the project dependencies using npm or yarn.

```shell
npm install
```

### Configuration
1. Create a new file named `.env` in the project's root directory.
2. Copy the contents of the `.env.example` file into `.env`.
3. Update the values in the `.env` file with your own configuration:

   - `MONGODB_URI`: The MongoDB connection URI. Make sure you have MongoDB installed and running.
   - `JWT_SECRET`: A secret key used to sign JSON Web Tokens for user authentication.
   - `COOKIE_SECRET`: A secret key used to sign cookies.
   - `COOKIE_EXPIRATION`: The expiration time for the authentication cookie (e.g., "30d" for 30 days).
   - `PORT`: The port number where the application will run (default: 3000).

### Running the Application
1. Make sure your MongoDB server is running.
2. In the terminal, run the following command to start the application:

```shell
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` (or the specified port).

## Contributing
Contributions to FlashPost are welcome! If you find any bugs, have feature requests, or want to contribute code, please feel free to open an issue or submit a pull request. Make sure to follow the existing code style and include appropriate tests with your changes.

## License
FlashPost is open-source software released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as per the terms of the license.