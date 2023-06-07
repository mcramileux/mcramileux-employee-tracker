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
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// Below are the array of questions
function promptQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add Department',
          'Add Role',
          'Add Employee',
          // Bonus --if have time to add
          'Update Employee Role',
          'Update employee managers',
          'View employees by manager',
          'View employees by department',
          'Delete Departments',
          'Delete Role',
          'Delete Employee',
          'View the combined salaries of all employees in that department',
          // End of Bonus
          'Quit',
        ],
      }
    ])
    .then((answers) => {
      // Add the choices above here:
      switch (answers.menu) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
           day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }

    })
}

// You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. 
// To learn more and make your queries asynchronous, refer to the npm documentation on MySQL2.