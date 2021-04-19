#!/usr/bin/env node

let shell = require("shelljs");
let colors = require("colors");
let fs = require("fs"); //fs already comes included with node.

let appName = process.argv[2];
// let appDirectory = `${process.cwd()}/${appName}`;

const cloneTheARcApp = () => {
  return new Promise((resolve) => {
    if (appName) {
      shell.exec(
        `git clone -b master https://github.com/diegohaz/arc ${appName}`,
        () => {
          console.log("Created your ARc app!".green);
          resolve(true);
        }
      );
    } else {
      console.log("\nNo app name was provided.".red);
      console.log("\nProvide an app name in the following format: ");
      console.log("\ncreate-react-redux-router-app ", "app-name\n".cyan);
      resolve(false);
    }
  });
};

const cdIntoNewApp = () => {
  return new Promise((resolve) => {
    shell.exec(`cd ${appName}`, () => {
      resolve();
    });
  });
};

const installDependencies = () => {
  return new Promise((resolve) => {
    console.log("\nInstalling dependencies (This may take few minutes)\n".cyan);
    shell.exec(`cd ${appName} && npm install`, () => {
      console.log("\nFinished installing dependencies\n".green);
      resolve();
    });
  });
};

const run = async () => {
  let success = await cloneTheARcApp();
  if (!success) {
    console.log(
      "Something went wrong while trying to create a new Atomic React app using create-arc-app"
        .red
    );
    return false;
  }
  await cdIntoNewApp();
  await installDependencies();
  console.log("\nAll done 😊\n");
  console.log(`\ncd ${appName}\n`.blue);
  console.log(`\nnpm run dev\n`.blue);
  console.log(`\nNote: New commad "create-arc-app" coming soon!\n`.yellow);
};
run();
