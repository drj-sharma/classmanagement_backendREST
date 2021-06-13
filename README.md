# Class Management Backend

Server side backend for the class management system.

## Features

- REST APIs
- Authentication/Authorization using JWT
- teacher CRUD for class management
- student can enroll to the class and add to their schedule
- server side validation


## Installation

It requires [Node.js](https://nodejs.org/) (latest, +16)
```sh
mkdir classmanagement
cd classmanagement
git clone https://github.com/wayne9499/classmanagement_backendREST.git
```
or you can clone the project from https://github.com/wayne9499/classmanagement_backendREST.git

1. make a **.env** file in the project root directory
2. paste follwing lines to the **.env** file
3. replace the variable accordingly.

Install the dependencies and devDependencies and start the server.

```sh
PORT = <PORT-NO>
DB_URI = <MONGODB_CONNECTION_STRING>
DATABASE_NAME = <DATABASE_NAME>
SECRET = <TOKEN_SECRET_STRING>
```
then finally 😅
```sh
npm install
```
open bash/terminal tab and run the command
```sh
npm start
```
👍👍👍

(If nodemon error occurs on npm start plese run folowing command otherwise no need to install globally)
```sh
npm i -g nodemon
```

