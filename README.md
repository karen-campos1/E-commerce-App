# SOLÉNE E-commerce Platform

SOLÉNE is a full-featured e-commerce platform inspired by Sephora, designed to showcase beauty products with an elegant and professional user interface. This project includes functionalities to manage products, customers, and orders, and incorporates features such as product images, descriptions, and prices.

## Features

- **Product Management**: Add, edit, delete, and view products with detailed information including name, description, price, and image URL.
- **Customer Management**: Add, edit, delete, and view customer information including name, email, phone number, and associated accounts.
- **Order Management**: Create, edit, delete, and view orders, with the ability to associate products with orders.
- **User Interface**: Elegant and professional UI with a carousel for featured products, a banner, and a search bar.
- **Responsive Design**: Ensures compatibility with various screen sizes and devices.

## Technologies Used

- **Frontend**: React, Bootstrap, MDBootstrap, CSS Modules
- **Backend**: Flask, SQLAlchemy, Flask-CORS, Flask-SQLAlchemy, Flask-Marshmallow
- **Database**: MySQL
- **Cloud Storage**: Cloudinary for storing product images
- **Development Tools**: Visual Studio Code, Postman, MySQL Workbench

## Getting Started

### Prerequisites

- Node.js and npm
- Python and pip
- MySQL
- Visual Studio Code or any other code editor

### Installation

1. Clone the repository:
   ```bash
 git clone https://github.com/your-username/solene-ecommerce.git
   cd solene-ecommerce

## Install frontend dependencies:


Copy code:
cd frontend
npm install
Install backend dependencies:

Copy code:
cd ../backend
pip install -r requirements.txt
Set up the MySQL database:

Create a database named e_commerce_db2 in MySQL Workbench.
Import the database schema and initial data from the provided SQL file.
Configure the backend:

Update the SQLALCHEMY_DATABASE_URI in backend/app.py to match your MySQL database credentials.
Start the backend server:


Copy code:
cd backend
python app.py
Start the frontend development server:


Copy code:
cd ../frontend
npm start

### API Endpoints

### Products
GET /products: Retrieve all products
GET /products/by-name?name=<product_name>: Retrieve products by name
POST /products: Add a new product
PUT /products/<product_id>: Update a product
DELETE /products/<product_id>: Delete a product
Customers
GET /customers: Retrieve all customers
POST /customers: Add a new customer
PUT /customers/<customer_id>: Update a customer
DELETE /customers/<customer_id>: Delete a customer
Customer Accounts
GET /customer_accounts: Retrieve all customer accounts
POST /customer_accounts: Add a new customer account
PUT /customer_accounts/<account_id>: Update a customer account
DELETE /customer_accounts/<account_id>: Delete a customer account
Orders
GET /orders: Retrieve all orders
GET /orders/<customer_id>: Retrieve all orders associated with a customer
POST /orders: Add a new order
PUT /orders/<order_id>: Update an order
DELETE /orders/<order_id>: Delete an order
POST /orders/<order_id>/add_product: Add a product to an order
Folder Structure


solene-ecommerce/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── models/
│   ├── routes/
│   ├── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage/
│   │   │   ├── Products/
│   │   │   ├── Customers/
│   │   │   ├── Orders/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── ...
└── README.md
Contributing

Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.


Acknowledgements

Thanks to Bootstrap for the UI components.
Thanks to Cloudinary for image storage solutions.
Thanks to the open-source community for providing the tools and libraries used in this project.