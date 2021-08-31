const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { listenerAdded } = require('emittery');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: `list`,                                                              
        message: `Pick your role`,
        name: `jobTitle`,
        choices: ["Intern", "Engineer", "Team Manager", "Employee"]
    },
    {
        // Engineer only
        type: `input`,
        message: `please input your github username`,
        name: `gitHubUserName`
    },
    {
        // Engineer Only
        type: `input`,
        message: `please input your github page link`,
        name: `gitHubLink`
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
        message: `please input your team manager`,
        name: `teamManager`
    },
    {
        // Intern only questions
        type: `input`,
        message: `please input your school`,
        name: `school`
    },
    {
        type: `input`,
        message: `please input your office Number`,
        name: `officeNumber`
    },
]

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
        <div>
        </div>
    </main>
</body>
</html>`;

function addManager(){
    inquirer
        .prompt(managerQuestions)
        .then((answers) => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            team.push(manager);
            teamMemberId.push(answers.managerId);
            switchCaseEmployee();
        })

}

function switchCaseEmployee(){
    inquirer.prompt([{
        type:'list',
        message: `Pick your role`,
        name: `jobTitle`,
        choices: ["Intern", "Engineer", "I'm done adding"]
    }])
        .then(answer => {
            switch (answer.jobTitle){
                case "Intern" :
                    addIntern(); 
                    break;
                case "Engineer" :
                    addEngineer(); 
                    break;
                default :
                    init();
            } 
        })
}

function init()
    {inquirer
        .prompt(teamleadQuestions)
            .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
            .then(() => console.log('Successfully wrote to index.html'))
            .catch((err) => console.error(err));
    };
  
init();
  