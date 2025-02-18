# TenderVault

TenderVault is a comprehensive web application designed to streamline and digitize the tender management process, enhancing efficiency and transparency for users. The platform allows users to create, apply for, and manage tenders with ease.

## Features

- **Secure Token-Based Authentication**: Ensures secure login and access control.
- **Dynamic Dashboard**: Users can create, edit, and manage tenders efficiently.
- **Vendor Quotations Management**: Vendors can submit quotations with validation to allow only one application per tender.
- **Real-Time Updates**: Get notified about tender statuses and deadlines.
- **Role-Based Access**: Tailored dashboards for admins, creators, and vendors.
- **Responsive Design**: Optimized for seamless use across different devices.

## Technologies Used

- **MongoDB**: Efficient database management for tenders and user data.
- **Express.js & Node.js**: Backend development for server-side logic and APIs.
- **React**: Dynamic and responsive user interface.

## Getting Started

Follow these steps to set up and run TenderVault on your local machine.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Samarth777415/TenderManagementSystem.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd TenderManagementSystem
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up Environment Variables:**
    Create a `.env` file in the root of your project and add necessary configurations:
    ```env
    REACT_APP_API_BASE_URL=your_api_base_url
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_AUTH_DOMAIN=your_auth_domain
    REACT_APP_PROJECT_ID=your_project_id
    ```
5. **Run the application:**
    ```bash
    npm start
    ```

## Built With

- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

## Authors

- **Samarth Gite**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Inspired by modern procurement and tendering platforms.
- Thanks to the open-source community for the libraries and frameworks used in this project.

