INSERT INTO department (department_name)    
VALUES 
    ('Management'),
    ('Sales'),
    ('Engineering'),
    ('Legal'),
    ('Accounting'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 140000, 3),
    ('Software Engineer', 110000, 3),
    ('Junior Developer', 70000, 3),
    ('Acountant', 112000, 5),
    ('Project Manager', 90000, 1),
    ('Lawyer', 120000, 4),
    ('Sales Represenatitve', 60000, 2),
    ('Human Resources Represenatitve', 55000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Will', 'Nollert', 1, 2),
    ('Caroline', 'Kyle', 5, null),
    ('Reid', 'Schroder', 2 , 1),
    ('Sean', 'New', 1, 2),
    ('Fay', 'Chong', 2, 4),
    ('Kimmi', 'Breece', 4, null),
    ('Jamie', 'Cross', 7, 2),
    ('Andrew', 'Farmer', 8, null),
    ('Jessica', 'Smith', 3, 3),
    ('Brittany', 'Plange', 6, null),
    ('Rachel', 'Hurtado', 3, 5),
    ('Natalie', 'Jones', 4, null);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;