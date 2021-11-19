const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { listenerAdded } = require('emittery');

const writeFileAsync = util.promisify(fs.writeFile);

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

var team = [];
var teamMemberId = [];

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
                    ${answers.Employee.employeeId}
                    ${answers.Employee.employeeName}
                    ${answers.Employee.employeeEmail}

                    ${answers.Engineer.engineerId}
                    ${answers.Engineer.engineerName}
                    ${answers.Engineer.engineerEmail}
                    ${answers.Engineer.engineerGithub}

                    ${answers.Manager.managerId}
                    ${answers.Manager.managerName}
                    ${answers.Manager.managerEmail}
                    ${answers.Manager.managerOfficeNumber}

                    ${answers.Intern.internId}
                    ${answers.Intern.internName}
                    ${answers.Intern.internEmail}
                    ${answers.Intern.internSchool}
                </main>
            </body>
        </html>`;



const engineerQuestions = [
    {
        type: `input`,
        message: `please input your name `,
        name: `engineerName`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `engineerId`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `engineerEmail`
    },
    {
        type: `input`,
        message: `please input your github username`,
        name: `engineerGithub`
    },
]

const internQuestions = [
    {
        type: `input`,
        message: `please input your name`,
        name: `interName`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `internID`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `internEmail`
    },
    {
        type: `input`,
        message: `please input your school`,
        name: `internSchool`
    },
]

const managerQuestions = [
    {
        type: `input`,
        message: `please input your name`,
        name: `managerName`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `managerId`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `managerEmail`
    },
    {
        type: `input`,
        message: `please input your office Number`,
        name: `managerOfficeNumber`
    },
]

const employeeQuestions = [
    {
        type: `input`,
        message: `please input your name Number`,
        name: `employeeName`
    },
    {
        type: `input`,
        message: `please input your employee ID`,
        name: `employeeId`
    },
    {
        type: `input`,
        message: `please input your employee email`,
        name: `employeeEmail`
    },
    
]

const finishedQuestion = [
    {
        type: `list`,
        message: `Are you done?`,
        name: `finished`,
        choices: ['Yes', 'No']
    },
]

function init() {
    switchCaseEmployee();

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
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                team.push(engineer);
                teamMemberId.push(answers.employeeId);
                switchCaseEmployee();
            })
    };

    function addIntern(){
        inquirer
            .prompt(internQuestions)
            .then((answers) => {
                const intern = new Intern(answers.interName, answers.internId, answers.internEmail, answers.internSchool);
                team.push(intern);
                teamMemberId.push(answers.employeeId);
                switchCaseEmployee();
            })
    };

     
    function writeHTML() 
    {inquirer
        .prompt(finishedQuestion)
            //console.log(team.engineerId, team.employeeId, team.managerId, team.internEmail)
            .then((team) => writeFileAsync('index.html', generateHTML(...team)))
            .then(() => console.log('Successfully wrote to index.html'))
            .catch((err) => console.error(err));
    }; 

}

init();

