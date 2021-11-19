const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { listenerAdded } = require('emittery');

const writeFileAsync = util.promisify(fs.writeFile);

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const engineerQuestions = [
    {
        type: `input`,
        message: `please input your name `,
        name: `name`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `empID`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `email`
    },
    {
        type: `input`,
        message: `please input your github username`,
        name: `gitHubUserName`
    },
    {
        type: `input`,
        message: `please input your github page link`,
        name: `gitHubLink`
    },
]

const internQuestions = [
    {
        type: `input`,
        message: `please input your name`,
        name: `name`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `empID`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `email`
    },
    {
        type: `input`,
        message: `please input your school`,
        name: `school`
    },
]

const managerQuestions = [
    {
        type: `input`,
        message: `please input your name`,
        name: `name`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `empID`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `email`
    },
    {
        type: `input`,
        message: `please input your office Number`,
        name: `officeNumber`
    },
]

const employeeQuestions = [
    {
        type: `input`,
        message: `please input your name Number`,
        name: `name`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `empID`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `email`
    },
    
]

function init() {
    switchCaseEmployee();

    var team = [];
    var teamMemberId = [];

    function switchCaseEmployee(){
        inquirer.prompt([{
            type:'list',
            message: `Pick your role`,
            name: `jobTitle`,
            choices: ["Intern", "Engineer", 'Team Manager', "Employee","I'm done adding"]
        }])
            .then(answer => {
                switch (answer.jobTitle){
                    case "Intern" :
                        addIntern(); 
                        break;
                    case "Engineer" :
                        addEngineer(); 
                        break;
                    case "Team Manager" :
                        addManager(); 
                        break;
                    case "Employee" :
                        addEmployee(); 
                        break;
                    default :
                        writeHTML();
                } 
            })
    }

    function writeHTML() {
        inquirer
            .prompt()
                .then(() => writeFileAsync('index.html', generateHTML(answers)))
                .then(() => console.log('Successfully wrote to index.html'))
                .catch((err) => console.error(err));
    }; 

    function addManager(){
    inquirer
        .prompt(managerQuestions)
        .then((answers) => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            team.push(manager);
            teamMemberId.push(answers.managerId);
            switchCaseEmployee();
        })
    };

    function addEmployee(){inquirer
        .prompt(employeeQuestions)
            .then((answers) => {
                const employee = new Employee(answers.employeeName, answers.employeeId, answers.employeeEmail);
                team.push(employee);
                teamMemberId.push(answers.employeeId);
                switchCaseEmployee();
            })
    };

    function addEngineer(){
        inquirer
            .prompt(engineerQuestions)
            .then((answers) => {
                const engineer = new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail);
                team.push(engineer);
                teamMemberId.push(answers.employeeId);
                switchCaseEmployee();
            })
    };

    function addIntern(){
        inquirer
            .prompt(internQuestions)
            .then((answers) => {
                const intern = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.internSchool);
                team.push(intern);
                teamMemberId.push(answers.employeeId);
                switchCaseEmployee();
            })
    };

    const generateHTML = (answers) =>
  `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
    </head>
    <body>
        <header>
            <div class="jumbotron jumbotron-fluid">
            <div class="container">
                    <p> My Team </p>
            </div>
            </div>
        <header>
        <main>
            <div>
            </div>
        </main>
    </body>
    </html>`;
}

init();