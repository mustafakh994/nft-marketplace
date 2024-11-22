# NFT Marketplace Application

This project is a full-stack NFT Marketplace application, consisting of a backend API and a frontend application. The backend is built with Node.js, Express.js, and MySQL, while the frontend is developed using Vue.js and Vuetify.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend Setup](#backend-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
  - [Seeding the Database](#seeding-the-database)
- [Frontend Setup](#frontend-setup)
  - [Prerequisites](#prerequisites-1)
  - [Installation](#installation-1)
  - [Running the Development Server](#running-the-development-server)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The NFT Marketplace application allows users to browse, filter, sort, and manage NFTs. It includes features such as pagination, sorting, and filtering to enhance the user experience.

## Backend Setup

### Prerequisites

- Node.js (version 16.x or later)
- MySQL (version 5.7 or later)
- Git

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mustafakh994/nft-marketplace.git
   cd nft-marketplace/backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

### Database Setup

1. **Create a MySQL Database**

   Create a new database in MySQL for the project. You can use a MySQL client or command line:

   ```sql
   CREATE DATABASE nft_marketplace;
   ```

2. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and add your database configuration:

   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=nft_marketplace
   ```

### Running the Server

1. **Start the Server**

   Use Nodemon for development to automatically restart the server on changes:

   ```bash
   npm run dev
   ```

   Or use Node.js directly:

   ```bash
   node index.js
   ```

2. **Access the API**

   The API will be available at `http://localhost:5000/api/v1`.

### Seeding the Database

1. **Run the Seeder Script**

   To populate the database with sample NFT data, run the seeder script:

   ```bash
   npm run seed:nfts
   ```

## Frontend Setup

### Prerequisites

- Node.js (version 14.x or later)
- Yarn (version 1.x or later)
- Git

### Installation

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

### Running the Development Server

1. **Start the Development Server**

   ```bash
   yarn serve
   ```

2. **Access the Application**

   Open your browser and navigate to `http://localhost:8080` to view the application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
