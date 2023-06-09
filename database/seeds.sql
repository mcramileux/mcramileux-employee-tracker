--- followed the mini-project's solved folder ---

USE employees_db;

INSERT INTO department (department_id, department_name)
VALUES (1, "Management"),
       (2, "Finance"),
       (3, "Sales and Marketing"),
       (4, "IT and Research"),
       (5, "Human Resource"),
       (6, "Engineering");

INSERT INTO role (role_id, job_title, salary, department_id)
VALUES  (1, "Chairman", 200000, 1),
        (2, "Financial Controller", 180000, 2),
        (3, "Accountant Executive", 120000, 2),
        (4, "Sales Manager", 100000, 3),
        (5, "Salesperson", 80000, 3),
        (6, "Lead Engineer", 150000, 4),
        (7, "Software Engineer", 120000, 4),
        (8, "Data Analyst", 110000, 4),
        (9, "Human Resource Executive", 125000, 5),
        (10, "Construction Manager", 130000, 6);
        

INSERT INTO employee (role_id, first_name, last_name, department_id, manager_id)
VALUES  (1, "Kristine", "Ramilo", 1, Null)
        (2, "Jack", "Shepherd", 2, 1),
        (3, "John", "Locke", 3, 2),
        (4, "Kate", "Austen", 3, 2),
        (5, "Hurley", "Reyes", 3, 4),
        (6, "James", "Ford", 4, 1),
        (7, "Sayid", "Jarrah", 4, 6),
        (8, "Desmond", "Hume", 7, 6),
        (9, "Ana Lucia", "Cortez", 5, 1),
        (10, "Jin Soo", "Kwon", 6, 2);


