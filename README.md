## Table of Contents

- [About](#invoice-app)
- [Feature list](#features)
- [Tech-Stack](#tech-stack)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Postman](#postman)
- [Git / Pre-Commit hook](#git)
- [Continuous Integration](#ci)

# Job-Application (wip)

This is a fun project to use my new learned knowledge of graphql. You can track your job applications and get a nice overview of the states of each application.

## Features (wip)

### Group

| Sate | Function              |
| ---- | --------------------- |
| ✅   | Create Group          |
| ✅   | Get all groups        |
| ✅   | Get group by id       |
| ✅   | Update group by id    |
| ✅   | Archive group by id   |
| ✅   | Unarchive group by id |
| ✅   | Delete group by id    |

### Application

| Sate | Function                      |
| ---- | ----------------------------- |
| ✅   | Create Application            |
| ✅   | Get applications              |
| ✅   | Get applications by group     |
| ✅   | Get application by id         |
| ✅   | Update application by id      |
| ✅   | Archive application by id     |
| ✅   | Unarchive application by id   |
| ✅   | Move application to new group |
| ✅   | Delete application by id      |

## Tech Stack

This backend is written with NestJs, Apollo, Typeorm and uses postgres db

## Requirements

The listed versions are not strictly needed, but tested with.

- `Node v16`
- `Yarn v1` or `Npm v8.5`
- `Python 3` is needed for the sqlite3 npm package, which is only used for unit-testing.
- `Docker v20`
- `Docker-Compose 2.6`

## Getting Started

If you are using `npm` just replace the `yarn` keyword with `npm run`

You can also run the project in a dockershell. If you want that just run the following two commands first:

- _Docker only_
  - **`yarn shell:build`** or **`npm run shell:build`**
  - **`yarn shell`** or **`npm run shell`**

<br>

- **`yarn` or `npm i`** _to install the backend dependencies_
- **`yarn prepare`** _to install husky_
- **`yarn start:dev`** _run the backend_
- Set the required Envs based on the `..EXAMPLE-.env`, you have to create a `.env` file, inside the `/backend` directory
- If you wanna create migrations with typeorm, you need to setup a `ormconfig.json` file, there is also a example for it `..EXAMPLE_ormconfig.json`

_`Note to .env: If any env value contains a dollar sign ($) you have to encode that with a backslash (\$)`_

## Postman

If you are importing the postman collection you just need to edit the Folder Varible `base_url`.

e.g:

`base_url` => `"http://localhost:3010"`

Everything else will be working without Issues. The empty variables are used to help you out while working with the requests and will be filled automatically. So you get a minimal amount of manual steps for the requests. Every Request contains example data

## Git

Husky is used to run two pre-commit hooks. Staged files will be linted and fixed and also commitlint to check the commit-message

Check out `https://github.com/conventional-changelog/commitlint` for more informations

## CI

It will always run some github actions. It will lint, run tests, check for new versions, build docker package and set version of the npm package.

if you `merge` or `push` to `master` branch it will create a new docker image

**Read the comments inside the `.github/workflows/pipeline` file and change the values to your like**
