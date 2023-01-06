<h1 align="center">
Stack Info  
</h1>
<strong>
Showing my Stack Info project as a code sample for MLH Fellowship program 2022.
  
Please if you see this message, consider that this project is owned to [ShehabAdel](https://www.github.com/shehabadel) 

This project is private on my [main account](https://www.github.com/shehabadel) for some personal reasons. I had to create a new account in order to upload it for the code sample requirement by MLH Prep Program. Any further more information needed, can be submitted on request.</strong>
<p align="center">
Stack Info allows you to explore and find tech stacks used by startups and corporates in EMEA 🌠💻
</p>

## You can visit it here live! [Stack Info](https://stackinfo.me)
<hr>

## Frameworks, Libraries, and Third Parties used

### Frontend

| Framework/Library | Usage                                                                    |
|-------------------|--------------------------------------------------------------------------|
| React.js          | Main frontend library used.                                              |
| Bootstrap         | CSS Styling and responsive designs.                                      |
| React Router      | Routing and navigation between web pages                                 |
| devIcons          | Libraries, frameworks, infrastructures, and programming languages icons. |
| React-Helment     | Setting up HTML titles for each page.                                    |
| Axios             | Sending HTTP requests to the Backend API endpoints                       |
| React-Select      | Multi-select component.                                                  |


### Backend

| Framework/Library | Usage                                                                  |
|-------------------|------------------------------------------------------------------------|
| Express.js        | Main backend framework.                                                |
| Babel             | Compiling ECMAScript 2015+ into backward compatible JavaScript.        |
| Nodemon           | Watching files and automatically restarting server on files' changes.  |
| body-parser       | Parse incoming request bodies in a middleware before request handlers. |
| bycrypt.js        | Hashing functions to create secure passwords.                          |
| JWTs              | Used in Authentication and part of Authorization.                      |
| lodash            | Utilities library.                                                     |
| morgan            | HTTP requests logger.                                                  |
| Mongoose          | MongoDB ORM                                                            |
| validator         | Data validation (might remove it)                                      |
| JOI               | Schema based data validation.                                          |
| Redis             | Session management (refresh tokens) and Paginated data caching.        |


## Project's Structure
This repository contains source code for Stack Info web application. There are three main directories in the repository:

1. Backend
2. Frontend
3. Scripts

## Getting started with Backend

1) run the following command `npm install` in node.js terminal to install all dependencies
2) run `redis-server` in WSL. It is better to make sure it is on port `6379`
3) run `npm run dev` in node.js terminal to run the application.

**Note: If you want to run both the Frontend and Backend, make sure to run the Backend first on port 3000.**


### Directory Structure
- `src` contains all source code.
  - `config` -it is in gitignored- but it must contain the following object 
  ```
  const config={
  `dbURL`:<link to MongoDB>
  }
  ```
  - `resources` contains Models, Routes, and Controllers of each collection(object).
  - `utils` contains the `auth` routes and controllers, validation schemas, `redis` files, `jwt` helpers functions, 
    crud functions, and database connecting function.
  - `index.js` starts the server
  - `Server.js` Server class contains Express server constructor, Error handling methods, route listening, and middlewares.
- `.env` contains environmental variables.
- `nodemon.json` contains all patterns that are watched for changes.
- `package.json` list of dependiences and the project meta-data.

## Getting started with Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Directory Structure

- `assets` contains all assets needed like pngs, gifs, custom fonts, custom libs...etc.
- `components` contains all React.js components needed for building the web application.
- `containers` contains Containers needed for following the container pattern (Going to document it).
- `css` contains global CSS files like index.css which has CSS variables that are used across the web application.
- `hooks` contains custom React.js hooks
- `network` contains all API functions and network communications with the backend server
- `pages` contains all pages files like `Home`, `About`...etc.
- `utils` contains all other utilities like constants...etc.
- `App.js` Application file.
- `index.js` renders `App.js` file.


## Disclaimer
The data, source code, entities, assets, and modules are currently available for StackInfo project only until further notice. The misuse, exposing, or using the mentioned resources without StackInfo’s members permission might lead to legal lawsuits. In case of data misusage, exposing, breaching, sharing it with a third party, scrapping, reusing it in another way, or using it without StackInfo’s members permission, we will claim compensation for any damage caused by breaking data protection laws.
