const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

// start server after db connection 
db.connect(err => {
    if (err) throw err;

    console.log('Database connected. Connect as id' + db.threadId);
    promtUser();
});

const promtUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Departments',
                'View All Roles',
                'View All Departments by Budget',
                'Update Employee',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Delete Employee',
                'Delete Role',
                'Delete Department',
                'Quit'
            ]
        }
    ]).then(function(answer){
        switch (answer.choice){
            case 'View All Employees':
                viewEmployees();
                break;

            case 'View All Employees by Department':
                viewEmployeesByDepartment();
                break;

            case 'View All Departments':
                viewDepartments();
                break;

            case 'View All Roles':
                viewRoles();
                break;

            case 'View All Departments by Budget':
                viewBudgetByDepartment();
                break;

            case 'Update Employee':
                updateEmployee();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Delete Employee':
                deleteEmployee();
                break;

            case 'Delete Role':
                deleteRole();
                break;

            case 'Delete Department':
                deleteDepartment();
                break;

            case 'Quit':
                db.end();
                break;
        }
    });
};

/////// VEIW ////////////

// view all employees in the database
function viewEmployees(){
    sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
    department.department_name AS 'department', roles.salary FROM employees, roles, deparment
    WHERE department.id = roles.id AND roles.id = employees.role_id ORDER BY employees.id ASC`;

    db.query(sql, function(err, res){
        if (err) throw err;

        console.log('Employees:')
        cTable(res)
        promtUser();
    })
};

// view all employees by department in the database
function viewEmployeesByDepartment(){
    sql = `SELECT employees.first_name, employees.last_name, departments.department_name AS department 
            FROM employees LEFT JOIN role ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = departments.id`;

    db.query(sql, function(err, res){
        if (err) throw err;

        console.log('Employees by Department:')
        cTable(res)
        promtUser();
    })
};

// view all roles in the database
function viewRoles(){
    sql = `SELECT roles.id, roles.title, departments.department_name AS department FROM roles
            INNER JOIN department ON roles.department_id = departments.id`;

    db.query(sql, function(err, res){
        if (err) throw err;

        console.log('Roles:');
        cTable(res);
        promtUser();
    })
};

// view all departments in the database
function viewDepartments(){
    sql = `SELECT  departments.id as 'ID', departments.department_name AS 'Department' FROM departments`;

    db.query(sql, function(err, res){
        if (err) throw err;

        console.log('Departments: ')
        cTable(res);
        promtUser();
    })
};

// view budget of deparment in the database
function viewBudgetByDepartment(){
    const sql = `SELECT department_id AS id, departments.department_name AS department,
                    SUM(salary) AS budget FROM roles INNER JOIN department ON roles.department_id = departments.id
                    GROUP BY roles.department_id`;

    db.query(sql, (err, res) => {
        if (err) throw err;

        console.log('Alloted Budget by Department:');
        cTable(res);
    });
};

/////// ADD ////////////

// add department to database
function addDepartment() {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]).then(answer => {
        db.query(`INSERT INTO departments SET ?`, answer.newDepartment, (err, res) => {
            if (err) throw err;

            console.log('Added ' + answer.addDepartment + 'to departments.');
            viewDepartments();
        });
    });
    promtUser();
};

// add role to database 
function addRole(){
    inquirer.promt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What role would you like to add?',
            validate: addRole => {
                if (addRole){
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?',
            validate: addSalary => {
                if (isNaN(addSalary)){
                    return true;
                } else {
                    console.log('Please enter a salary.');
                    return false;
                }
            }
        }
    ]).then(answers => {
        const params = [answers.addRole, answers.salary];
        const deptSql = `SELECT department_name, id FROM departments`;

        db.query(deptSql, (err, data) => {
            if (err) throw err;

            const dept = data.map(({ department_name, id }) => ({ name: name, value: id }));
        })
    });
};

promptUser();