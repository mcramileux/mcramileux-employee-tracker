USE employees_db;

INSERT INTO department (department_name)
VALUES ("Management"),
       ("Finance"),
       ("Sales and Marketing"),
       ("IT and Research"),
       ("Human Resource"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  ("Chairman", 200000, 1),
        ("Financial Controller", 180000, 2),
        ("Accountant Executive", 120000, 2),
        ("Sales Manager", 100000, 3),
        ("Salesperson", 80000, 3),
        ("Lead Engineer", 150000, 4),
        ("Software Engineer", 120000, 4),
        ("Data Analyst", 110000, 4),
        ("Human Resource Executive", 125000, 5),
        ("Construction Manager", 130000, 6);
        

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, "Kristine", "Ramilo", Null),
        (2, "Jack", "Shepherd", 1),
        (3, "John", "Locke", 2),
        (4, "Kate", "Austen", 2),
        (5, "Hurley", "Reyes", 4),
        (6, "James", "Ford", 1),
        (7, "Sayid", "Jarrah", 6),
        (8, "Desmond", "Hume", 6),
        (9, "Ana Lucia", "Cortez", 1),
        (10, "Jin Soo", "Kwon", 2);


