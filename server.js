//Followed the mini-project's solved folder

  // Import and install the package dependencies
  const inquirer = require('inquirer');
  const mysql = require('mysql2');
  const chalk = require('chalk');
  require('dotenv').config()

  // Connect to MySQL connection
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

  // Connect to the database
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the employees' database");
    // promptQuestions();
  });
promptQuestions()
  // Prompt questions to start the database
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
            // Bonus
            'Update Employee Role',
            'Quit',
          ],
       }
      ])
      .then((answers) => {
        // Use switch syntax function
        switch (answers.menu) {
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
          case 'Quit':
            quit();
            break;
          default: connection.end();
            break;
      }
    });
}

//--- VIEW COMPANY'S DATABASE --- //

// ---- VIEWING ALL ---- //
// View All Departments
  function viewAllDepts() { // use async syntax
    connection.query('SELECT * FROM department', function (err, res) {
      if (err) throw err;
      console.table(res);
      promptQuestions();
    })
  };
  
// View All Roles
  function viewAllRoles() { // use async syntax
    connection.query('SELECT role.id, role.title, department.department_name AS department, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY role.id', function (err, res) {
      if (err) throw err;
      console.table(res);
      promptQuestions();
    })
  };
  
// View All Employees
  function viewAllEmployees() { // use async syntax
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id', function (err, res) {
      if (err) throw err;
      console.table(res);
      promptQuestions();
    })
  };

// ---- ADDING ---- //
// Add Department
  function addDept() { // use async syntax
  inquirer
      .prompt([
        {
          type: 'input',
          name: 'deptName',
          message: 'Please enter the name of the department.'
        }]) 
      .then((answers) => {
        connection.query ('INSERT INTO department (department_name) VALUES (?)', [answers.deptName],
        (err) => {
          if (err) throw err;
          console.log(chalk.magentaBright(`\n ${answers.deptName} successfully added to the database! \n`));
          promptQuestions();
        })
      });
    }

// Add Role
  function addRole() { // use async syntax
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
      name: 'dept_role',
      message: 'Please select the department ID that you would like to add to this role.',
    },
  ])
  .then((answers) => {
    connection.query (`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [answers.title, answers.salary, answers.dept_role], 
    (err) => {
      if (err) throw err;
      console.log(chalk.magentaBright(`\n ${answers.title} successfully added to the database! \n`));
      promptQuestions();
      });
  });
}

// Add Employee
  function addEmployee() { // use async syntax
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
          message: 'Select the manager ID of the employee',
        },
      ])
      .then((answers) => {
       connection.query ('INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES (?, ?, ?, ?)', [answers.role_id, answers.firstName, answers.lastName, answers.manager_id],
       (err) => {
          if (err) throw err;
          console.log(chalk.magentaBright(`\n ${answers.firstName} ${answers.lastName} successfully added to the database! \n`));
          promptQuestions();
        })
      });
    }

// --- UPDATING --- //
// Update Employee's Role
  function updateEmployeeRole() { // use async syntax
  inquirer
      .prompt([
        {
          type: 'input',
          name: 'employee_id',
          message: 'Please select the employee ID that you would like to update.',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Please select the new role ID of the employee.',
        },
      ])
      .then((answers) => {
        connection.query ('UPDATE employee SET role_id = ? WHERE id = ?',
        [answers.role_id, answers.employee_id],
        (err) => {
          if (err) throw err;
          console.log(chalk.magentaBright (`\n Employee's role successfully added to the database! \n`));
          promptQuestions();
        })
      });
    }

// Quit Menu
  function quit() {
    console.log(chalk.cyan("Thank you for using Employee-Tracker!"));
    process.exit();
  };

