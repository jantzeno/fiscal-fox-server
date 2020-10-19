# Fiscal Fox SQLite RESTful API

## What is it?

This is the backend to the [Fiscal-Fox](https://github.com/jantzeno/fiscal-fox) learning project. Fiscal-Fox is a budget and expense tracker project for learning the MEAN stack, mostly Angular and Node.js.

## Tested Using

- Node.js, v14.14.0
- npm, v6.14.8

## What You Will Need

1. SQLite3

Ubuntu/Debian:

```bash
sudo apt install sqlite3
```

MacOS with Homebrew:

```bash
brew install sqlite3
```

2. Node.js
3. npm

## What you'll find

| Directory   | Description                                            |
| ----------- | ------------------------------------------------------ |
| config      | Database and JWT config that should be in an env file. |
| controllers | Functions to be bound and executed on routes.          |
| sequelize   | Sequelize models.                                      |
| routes      | Routes for handling HTTP requests.                     |
| middleware  | Helful functions for running the server.               |

### First Time Running

After you've cloned the project, run `npm install` to download the dependencies.
Run `npm run start` to start the server.

## Setup and Install

1. Install all packages:

```bash
npm install
```

2. (Optional) Load mock data into the database

```bash
npm mock-db
```

3. Run server instance:

```bash
npm start
```

4. (Optional) Clear the database tables

```bash
npm reset-db
```

## Schemas

The schema is self-contained in the Sequelize models.
The setup.js file in the sequelize directory loads mock data into the database.

## Mock Users (if loaded mock data):

### Budget Analyst

- username: boggis
- password: farmer

### Program Manager

- username: mrfox
- password: incredible
