import { createInterface } from "node:readline/promises";
import { homedir } from "os";
import { up, ls, cd } from "./commands/index.js";

export let currentDir = homedir();
const usernameArg = process.argv[2];

const fileManagerStart = (arg) => {
  if (!arg || arg.split("=")[0] !== "--username")
    return console.log(
      'Please enter your name in the format "--username=your_name"'
    );

  const userName = arg.split("=")[1];

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${currentDir}`);

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  let isFail = true;
  const showMessage = (currentDir) =>
    !isFail && console.log(`You are currently in ${currentDir}`);

  rl.on("line", async (input) => {
    const [command, ...data] = input.trim().split(" ");

    switch (command) {
      case ".exit":
        rl.close();
        break;
      case "up":
        currentDir = await up(currentDir);
        isFail = false;
        break;
      case "ls":
        isFail = true;
        isFail = await ls(currentDir, isFail);
        break;
      case "cd":
        isFail = true;
        [currentDir, isFail] = await cd(currentDir, data, isFail);
        break;
      case "cat":
        isFail = true;
        break;
      default:
        console.log("Invalid input");
    }
    await showMessage(currentDir);
  }).on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });
};

fileManagerStart(usernameArg);
