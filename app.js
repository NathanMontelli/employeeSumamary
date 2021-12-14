const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeData = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your ID'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is your role within the company?',
      choices: ['Manager', 'Engineer', 'Intern']
    }
  ])
    .then(data => {
      if (data.role == 'Manager') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?'
          }])
          .then(managerData => {
            const newManager = new Manager(data.name, data.id, data.email, managerData.officeNumber)
            employeeData.push(newManager)
            console.log(employeeData)
            addTeamMember()
          })
      } else if (data.role == 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'github',
            message: 'What is the name of your Github profile?'
          }])
          .then(engineerData => {
            const newEngineer = new Engineer(data.name, data.id, data.email, engineerData.github)
            employeeData.push(newEngineer)
            console.log(employeeData)
            addTeamMember()
          })
      } else if (data.role == 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'school',
            message: 'What school do you currently attend?'
          }])
          .then(internData => {
            const newIntern = new Intern(data.name, data.id, data.email, internData.school)
            employeeData.push(newIntern)
            console.log(employeeData)
            addTeamMember()
          })
      }
    })
}

const addTeamMember = () => {
  inquirer.prompt({
    type: 'list',
    name: 'addMember',
    message: 'Would you like to add another team member?',
    choices: ['yes', 'no']
  })
    .then(data => {
      if (data.addMember == 'yes') {
        questions()
      } else if (data.addMember == 'no') {
          fs.mkdir('output', { recursive: true }, (err => {
            if (err) { console.log(err) }
          }))
          writeToFile('./output/team.html', render(employeeData))
      }
    })
}
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, err => {
      if (err) { console.log(err) }
    })
  }

  questions()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
