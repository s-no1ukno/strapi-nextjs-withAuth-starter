# React, Strapi, Auth with Express Server (Starter Template)

Don't start auth from scratch! This template provides custom local authentication for your Strapi and React project!
This was implemented following instruction from Alex V. ([Alex the Entreprenerd](https://www.youtube.com/channel/UCMguCMq25nEqlHlr17iINNw)) in his Udemy course on Strapi!

## Auth with JWT's
- Local authorization to allow users a quick, secure interface with your application
  - OAuth2 coming soon...
- JWT's stored in backend server to ensure secure authorization, without exposing tokens to the browser

## How To Get It Up And Running

- First, fork this repo to your own github
- Then pull the project into your working directory:
```shell
git clone https://github.com/<your-username>/strapi-nextjs-withAuth-starter.git my-project
cd my-project
```
- Strapi only requires Nodejs(12.x) and npm(6.x), so you'll need to ensure you have these versions updated on your machine
  - `nodejs --version && npm --version`
  - if you don't have the correct versions installed, head over to the node docs to update
- You should still be in your root project directory('my-project'), which will now have a server folder in it...we'll get to the contents of that in a second. Next, you'll need to install an instance of strapi to get your API up and running: 
  - `npx create-strapi-app api-backend --quickstart` 
    - the `api-backend` part of this command will specify a folder name to install the strapi instance into
    - The `--quickstart` flag specifies to use quick project defaults to install and then start strapi in development mode, which will watch for certain updates to the filebase and automatically restart the server
- After you have installed the strapi instance, navigate your browser to `http://localhost:1337` and create an admin user for the API
- Meanwhile, you can `cd server && npm install` to install all the dependencies to run the server package
- Once the server is finished installing deps, `npm run dev` will start nodemon to hot reload the server everytime you update a route
- And finally, `cd frontend && npm install` will install dependencies required for the react frontend. Start the frontend by issuing the command `npm start`, and navigate to `http://localhost:3000` to see the frontend up and running.
  - This is a create-react-app template install in its entirety, with only the files changed to get authorization up and running. You will be free to adapt it how you need, with all the functionality of the original CRA.

##### A couple quick notes

With this project, you will technically be running three servers simultaneously on your machine: the Strapi instance will be running on port 1337, Express server on 5000 to handle routes and keep your JWT's safe and hidden, and React on 3000. Any requests on port 3000 are proxied to the Express server for route handling, which will then communicate with Strapi on 1337.

### isTargetUserLoggedIn Policy

Strapi requires a middleware(called a 'policy') that checks if the target user of a request is that requests logged in user. The file structure of strapi is very important, so the location of this file matters.

To get this policy working:
- create a file called `isTargetUserLoggedIn.js` at `<project-root>/api-backend/extensions/users-permissions/config/policies/isTargetUserLoggedIn.js`
- insert the following code into the file:
  ```js
  module.exports = (ctx, next) => {
    const currentUser = ctx.state.user.id
    const targetUser = ctx.params.id

    if (currentUser !== targetUser) {
      ctx.unauthorized('User is unauthorized to update other users')
    }
    return next()
  }
  ```
Let's break this down...
The `ctx` object in Strapi gives access to the entire request as a whole. As such, we grab the user id from state and the params id to make a quick 'if' check, and then pass it to the next function in line. This will stop users from being able to modify any profiles other than their own. 

## Wrap Up
This wraps up the installation of your template for a Strapi and React project with authentication template. You're now ready to start setting up your API!
- To start building your api, you can start with the [Strapi Quick Start Guide here](https://strapi.io/documentation/3.0.0-beta.x/getting-started/quick-start.html#_2-create-an-administrator-user). This will give a brief walkthrough of some of the amazing power of Strapi!
- To customize your frontend, jump over to the [React Docs](https://reactjs.org/docs/getting-started.html) to start building!
