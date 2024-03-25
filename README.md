# Food-Recipe-MERNStack-Simple
 This is a simple MERN (MongoDB, Express.js, React.js, Node.js) stack application for managing recipes. It allows users to register, login, and perform CRUD operations on recipes.

## Features
 * **Authentication:** Users can register and login securely.
 * **CRUD Operations:** Users can create, read, update, and delete recipes.

## Server
### Dependencies
* **bcryptjs:** Library for hashing passwords.
* **body-parser:** Middleware for parsing request bodies.
* **cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS).
* **dotenv:** Library for loading environment variables from a .env file.
* **express:** Web application framework for Node.js.
* **express-jwt:** Middleware for validating JWTs (JSON Web Tokens) and setting user identity in Express.js routes.
* **jsonwebtoken:** Library for generating and verifying JWTs.
* **mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
* **morgan:** HTTP request logger middleware.
* **multer:** Middleware for handling multipart/form-data, used for uploading files.
* **nodemon:** Utility that monitors for changes and automatically restarts the server.

## Scripts
* **test:** Placeholder for running tests.
* **start:** Starts the server using nodemon.

## Client
### Dependencies
* **@fortawesome/fontawesome-svg-core:** Font Awesome library for SVG icons.
* **@fortawesome/free-solid-svg-icons:** Font Awesome library for free solid icons.
* **@fortawesome/react-fontawesome:** React component for Font Awesome icons.
* **@material-tailwind/react:** React components following the Material Design guidelines with Tailwind CSS.
* **@reduxjs/toolkit:** Redux utility for simplifying Redux logic.
* **axios:** Promise-based HTTP client for the browser and Node.js.
* **moment:** Library for parsing, validating, manipulating, and formatting dates.
* **react:** JavaScript library for building user interfaces.
* **react-dom:** Entry point to the React library for working with the DOM.
* **react-moment:** React component for Moment.js.
* **react-redux:** Official React bindings for Redux.
* **react-router-dom:** DOM bindings for React Router, used for declaratively managing routes in React applications.
* **react-toastify:** Library for adding notifications to your React app.
* **redux:** Predictable state container for JavaScript apps.
* **redux-devtools-extension:** Browser extension for debugging Redux applications.

### Dev Dependencies
* **@types/react:** TypeScript types for React.
* **@types/react-dom:** TypeScript types for React DOM.
* **@vitejs/plugin-react:** Vite plugin for React support.
* **autoprefixer:** PostCSS plugin to parse CSS and add vendor prefixes.
* **eslint:** JavaScript linter.
* **eslint-plugin-react:** React specific linting rules for ESLint.
* **eslint-plugin-react-hooks:** ESLint plugin for React hooks.
* **eslint-plugin-react-refresh:** ESLint plugin for React Refresh.
* **postcss:** Tool for transforming CSS with JavaScript plugins.
* **tailwindcss:** Utility-first CSS framework.
* **vite:** Next generation frontend tooling for React.

## Scripts
* **dev:** Runs the development server using Vite.
* **build:** Builds the production-ready app using Vite.
* **lint:** Lints the codebase using ESLint.
* **preview:** Previews the production build locally using Vite.

## Getting Started
* Clone the repository.
* Navigate to the **server** directory  
 ```bash
 # install server dependencies.
  $ npm install 
 ```
* Navigate to the **client** directory 
 ```bash
 # install client dependencies.
  $ npm install 
 ```
* Create a **.env file** in the server directory and configure environment variables such as database connection URI, JWT secret, etc.
* Run npm start in the server directory to **start the server**.
 ```bash
 # start the server
  $ npm start
 ```
* Run npm run dev in the client directory to **start the client** development server.
 ```bash
 # start the client
  $ npm run dev