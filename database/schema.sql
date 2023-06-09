--- followed the mini-project's solved folder ---

--- SCHEMA ---
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

--- Department Table ---
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
  PRIMARY KEY (id)
);

--- Role Table ---
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER
    PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET NULL
);

--- Employee Table ---
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
    PRIMARY KEY (id)
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE 
    SET NULL
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE 
    SET NULL
);

