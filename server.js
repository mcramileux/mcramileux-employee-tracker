//Followed the mini-project's solved folder

// Import the dependencies
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // include your password
    password: 'Juno@2019!',
    database: 'employees'
  },
  console.log(`TO EDIT`)
);