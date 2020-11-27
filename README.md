# Epic-Mail
[![Coverage Status](https://coveralls.io/repos/github/Ochowo/Epic-Mail/badge.svg?branch=develop)](https://coveralls.io/github/Ochowo/Epic-Mail?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/740e0250c12e09160ffb/maintainability)](https://codeclimate.com/github/Ochowo/Epic-Mail/maintainability)

A web app that helps people exchange messages/information over the internet.

#### Template
Template is hosted [here](https://ochowo.github.io/Epic-Mail/)

#### Project Management
Project is managed with pivotal tracker [here](https://www.pivotaltracker.com/n/projects/2314414)

#### API Deployment
Api is deployed [here](https://epic-mail02.herokuapp.com/)

#### Documentation
Api is documented [here](https://epicmail1.docs.apiary.io/#)

#### Required Features
* Users can sign up.
* Users can login.
* Users can create groups.
* Users can send a message to individuals.
* Users can view their inbox and read messages.
* Users can retract sent messages.
* Users can save an email as draft and send it later or delete it.

#### Technologies Used
* NodeJs - Run time environment.
* ExpressJs - Web framework.
* Babel - Javascript compiler.
* Eslint - Javascript linter. Airbnb style guide was followed.

#### Testing tools
* Mocha - A Javascript test framework.
* Chai - Assertion library.
* Istanbul - Javascript code instrumenter.
* nyc - Istanbul's command line interface.

#### Getting Started
* Install NodeJS on your computer
* Clone this repository using git clone https://github.com/Ochowo/Epic-Mail.git
* Use the .env.example file to setup your environmental variables and rename the file to .env
* Run npm install to install all dependencies
* Run npm run build to build the project
* Run npm start to set up database and start the server
* Navigate to localhost:8000 in browser to access the application

#### Development
You can run npm run start:dev in development to use Nodemon

#### Testing with Postman
* Install postman as shown [here]: https://www.getpostman.com/
* Navigate to localhost:8000 in Postman to access the application
* Use API documentation to access available endpoints
* Run test with npm test
