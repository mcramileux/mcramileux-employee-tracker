//Followed the mini-project's solved folder

// Import the dependencies
const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
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

// Prompt questions for menu
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
          'Update employee Managers',
          'View Employees by Manager',
          'View Employees by Department',
          'Delete Departments',
          'Delete Role',
          'Delete Employee',
          'View Combined Salaries of All Employees by Department',
          // End of Bonus
          'Quit',
        ],
      }
    ])
    .then((answers) => {
      // Use switch syntax function
      switch (answers.usersChoice) {
        case 'View All Departments':
          viewAllDepts();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
           viewAllEmployees();
          break;
        case 'Add Department':
          addDept();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Update Employee Managers':
          updateEmployeeManagers();
          break;
        case 'View Employees by Manager':
          viewEmployeesByManager();
        case 'View Employees by Department':
          viewEmployeesByDept();
          break;
        case 'Delete Departments':
          deleteDepts();
        case 'Delete Role':
          deleteRole();
          break;
        case 'Delete Employee':
          deleteEmployee();
        case 'View Combined Salaries of All Employees by Department':
          viewCombinedSalariesByDept();
          break;
        case 'Quit':
          quit();
          break;
        default: connection.end();
          break;
      }
    });
}

//--- VIEW MENU --- //

// --- FOLLOW THIS PSEUDO-CODE --- //
// async function myFunction() {
//   return "Hello";
// }
// myFunction().then(
//   function(value) {myDisplayer(value);},
//   function(error) {myDisplayer(error);}
// );

// You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. 
// To learn more and make your queries asynchronous, refer to the npm documentation on MySQL2.