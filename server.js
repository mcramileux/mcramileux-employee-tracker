//Followed the mini-project's solved folder

  // Import and install the package dependencies
  // const express = require('express');
  const inquirer = require('inquirer');
  const mysql = require('mysql2');
  const chalk = require('chalk');
  const table = require('console.table');
  require('dotenv').config()

  // const PORT = process.env.PORT || 3001;
  // const app = express();

  // Express middleware
  // app.use(express.urlencoded({ extended: false }));
  // app.use(express.json());

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

  // Connect to the database
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the employees_db database');
    promptQuestions();
  });

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
            break;
          case 'View Employees by Department':
            viewEmployeesByDept();
            break;
          case 'Delete Departments':
            deleteDepts();
            break;
          case 'Delete Role':
            deleteRole();
            break;
          case 'Delete Employee':
            deleteEmployee();
            break;
          case 'View Combined Salaries of All Employees by Department':
            viewCombinedSalariesByDept();
            break;
          case 'Quit':
            quit();
            break;
          default: db.end();
            break;
      }
    });
}

//--- VIEW COMPANY'S MENU --- //

// ---- VIEWING ALL ---- //
// View All Departments
  function viewAllDepts() {
    db.query ('SELECT * FROM department', function (err, res) {
      if (err) throw err;
      console.table(res);
      promptQuestions();
    })
  };
  
// View All Roles
  function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, res) {
      if (err) throw err;
      console.table(res);
      promptQuestions();
    })
  };
  
// View All Employees
  function viewAllEmployees(){
    db.query('SELECT * FROM employee', function (err, res) {
      if (err) throw err;
      console.table(res);
      promptQuestions();
    })
  };

// ---- ADDING ---- //
// Add Department
  function addDept();
  inquirer
      .prompt([
        {
          type: 'input',
          name: 'deptName',
          message: 'Please enter the name of the new department.',
        }
      ])
      .then((answers) => {
        db.query ('INSERT INTO department (department_name) VALUES (?)', [answers.department],
        (err) => {
          if (err) throw err;
          console.log(chalk.magentaBright(`\n ${response.newDept} successfully added to database! \n`));
          promptQuestions();
        })
      });

// Add Role
  function addRole();
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Please enter the title of the role that you would like to add.',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'How much is the salary for this role?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Please select the department ID for this role.',
      choices: [     ], //ask Jacob
    },
  ])
  .then((answers) => {
    db.query (`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [answers.title, answers.salary, answers.department_id], 
    function (err, res) {
      if (err) throw err;
      console.log(chalk.magentaBright(`\n ${answer.title} successfully added to database! \n`));
      promptQuestions();
      }
    );
  });

// Add Employee
  function addEmployee();
  inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Please enter the first name of the employee.',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Please enter the last name of the employee.',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Please enter the role ID of the employee.',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Select the manager of the employee',
          choices: [    ], //ask Jacob
        },
      ])
      .then((answers) => {
        db.query ('INSERT INTO department (name) VALUES (?)', [answers.name],
        function (err, res) {
          if (err) throw err;
          console.log(chalk.magentaBright(`\n ${answer.first_name} ${answer.last_name} successfully added to database! \n`));
          promptQuestions();
        })
      });
    
// Update Employee's Role
  function updateEmployeeRole();

// Update Employee's Managers
  function updateEmployeeManagers();
  
// View Employees by Manager
  function viewEmployeesByManager();

// View Employees By Department
  function viewEmployeesByDept();

// Delete Department
  function deleteDepts();

// Delete Role
  function deleteRole();

// Delete Employee
  function deleteEmployee();

// View Combined Salaries BY Department
  function viewCombinedSalariesByDept();

// function quit();

console.log(chalk.red('Hello World'));
// You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. 
// To learn more and make your queries asynchronous, refer to the npm documentation on MySQL2.