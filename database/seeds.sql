--- followed the mini-project's solved folder ---

INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Services");


INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES  ("Jack", "Shepherd", 1, Null),
        ("Kate", "Austen", 2, 1),
        ("John", "Locke", 3, Null),
        ("Hurley", "Reyes", 4, 3),
        ("James", "Ford", 5, Null),
        ("Sayid", "Jarrah", 6, 5),
        ("Michael", "Dawson", 7,Null),
        ("Jin Soo", "Kwon", 8, 7);
        ("Ana Lucia", "Cortez",9,)


INSERT INTO role (job_title, salary, department_id )
VALUES  ("Sales Lead", 100000),
        ("Salesperson", 80000),
        ("Lead Engineer", 150000),
        ("Software Engineer", 120000),
        ("Account Manager", 160000),
        ("Accountant", 125000),
        ("Legal Team lead", 250000),
        ("Lawyer", 190000, 3);