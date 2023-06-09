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
    promptQuestions();
  });

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
          default: connection.end();
            break;
      }
    });
}

//--- VIEW COMPANY'S DATABASE --- //

// ---- VIEWING ALL ---- //
// View All Departments
  function viewAllDepts() { // use async syntax
    connection.query('SELECT id, department_name AS name FROM department', function (err, res) {
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
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id', function (err, res) {
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
          message: 'Please enter the name of the department.',
          choices: department.map((department) => { // use the map method array
            return { 
              name: department.department_name, 
              value: department.id 
            };
          }),
        },
      ])
      .then((answers) => {
        connection.query ('INSERT INTO department (department_name) VALUES (?)', [answers.department],
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
      type: 'list',
      name: 'dept_role',
      message: 'Please select the department that you would like to add to this role.',
      choices: department.map((department) => { // use the map method array
        return { 
          name: department.department_name, 
          value: department.id 
        };
      }),
    },
  ])
  .then((answers) => {
    connection.query (`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [answers.title, answers.salary, answers.department_id], 
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
          message: 'Please enter the role of the employee.',
          choices: department.map((department) => { // use the map method array
            return { 
              name: department.department_name, 
              value: department.id 
            };
          }),
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Select the manager of the employee',
          choices: employee.map((employee) => { // use the map method array
            return { 
              name: employee.first_name + ' ' + employee.last_name, 
              value: employee.id 
            };
          }),
        },
      ])
      .then((answers) => {
       connection.query ('INSERT INTO department (name) VALUES (?)', [answers.name],
       (err) => {
          if (err) throw err;
          console.log(chalk.magentaBright(`\n ${answers.first_name} ${answers.last_name} successfully added to the database! \n`));
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
          type: 'list',
          name: 'employee_name',
          message: 'Please select the employee that you would like to update.',
          choices: employee.map((employee) => { // use the map method array
            return { 
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            };
          }),
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Please select the new role of the employee.',
          choices: 'role',
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

    // Update Employee's Managers
  function updateEmployeeManagers() { // use async syntax
  inquirer
      .prompt ([
        {
          type: 'input',
          name: 'replace_employee',
          message: 'Please enter the employee ID of the employee you would like to update.',
          choices: employee.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Please enter the manager to the employee that you would like to update.',
          choices: manager.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id,
          })),
          // ASK JACOB: how to add null
          },
        ]),    
      .then((answers) => { //ASK JACOB: why's there a red line
        connection.query ('UPDATE employee SET manager_id = ? WHERE id = ?',
          [answers.manager_id, answers.employee_id],
          (err) => {
            if (err) throw err;
          console.log(chalk.magentaBright (`\n Employee's manager successfully added to the database! \n`));
          promptQuestions();
        }
      );
    });
};

// ---- VIEWING ---- //
// View Employees by Manager
  function viewEmployeesByManager() { // use async syntax
    connection.query('SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE title = "Manager")', (err, manager) => {
      if (err) throw err;

  inquirer
      .prompt ([
        {
          type: 'list',
          name: 'manager_id',
          message: "Please select the employee's manager.",
          choices: manager.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query (

        )
      
      }
      )
    })
  }

// View Employees By Department
  function viewEmployeesByDept() { // use async syntax
    connection.query('SELECT * FROM department', (err, department) => {
      if (err) throw err;
  
  inquirer
      .prompt ([
        {
          type: 'input',
          name: 'dept_id',
          message: "Please select the employee's department.",
          choices: department.map((department) => { // use the map method array
            return { 
              name: department.department_name, 
              value: department.id 
            };
          }),
        },
      ])
      .then((answers) => {
        connection.query (

        )}
      )
  }

// ---- DELETING ---- //
// Delete Department
  function deleteDepts() { // use async syntax
    connection.query('SELECT * FROM employee', (err, employee) => {
      if (err) throw err;

  inquirer
      .prompt ([
        {
          type: 'list',
          name: 'dept_name',
          message: 'Please select the department that you would like to delete.',
          choices:  department.map((department) => ({
            name: `${department.name}`,
            value: department.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query (

      )}
    )}
  )} 

  function deleteRole() { // use async syntax
    connection.query('SELECT * FROM role', (err, role) => {
      if (err) throw err;

  inquirer
      .prompt ([
        {
          type: 'list',
          name: 'role_id',
          message: 'Please select the role that you would like to delete.',
          choices: role.map((role) => ({
            name: `${role.title}`,
            value: role.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query (
          
      })
    )}
    )}
  
// Delete Employee
  function deleteEmployee() { // use async syntax
    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
  
  inquirer
      .prompt ([
        {
          type: 'list',
          name: 'employee_name',
          message: 'Please select the employee that you would like to delete.',
          choices: employee.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query (
          
        )}
    )}
// ---- COMBINED SALARIES ---- //
// View Combined Salaries BY Department
  function viewCombinedSalariesByDept() { // use async syntax
    connection.query('SELECT * FROM department', (err, departments) => {
      if (err) throw err;
  
  inquirer
      .prompt ([
        {
          type: 'list',
          name: 'dept_salaries',
          message: 'Which department would you like to check the combined salaries of?',
          choices: department.map((department) => ({
            name: `${department.name}`,
            value: department.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query (
          
        )
      )}
    

// Quit Menu
  function quit() {
    console.log(chalk.cyan("Thank you for using Employee-Tracker!"));
    process.exit();
  };

console.log(chalk.red('Hello World')); //sample to see the color text ---TO DELETE
