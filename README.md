# Festival Planner App
_The frontend part_

For a fully running app you need to run the BE part as well, and connect to a mongo database.

For the time being the official mongo database linked with this project is private, but you can run one locally and update the `config.js` file of the BE (details in the BE repo).

### Setup
Add a `.env` file with the contents of the `.env.example` you will find in this repo. The `NODE_PATH=src` will enable use of absolute imports.

Run `yarn` or `yarn install` to install all dependencies.

Run `yarn start` to start the FE app.

To login you need to a user. Run the BE app and navigate to localhost:3030/setup. This will create user with name **Jane Doe** and password **doepass**.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
