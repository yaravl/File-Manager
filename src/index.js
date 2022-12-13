import { createInterface } from "node:readline/promises";
import { homedir } from "os";
import { commandUp, commandLs, commandCd } from "./nwd/index.js";

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

  rl.on("line", async (input) => {
    const [command, ...data] = input.trim().split(" ");

    switch (command) {
      case ".exit":
        rl.close();
        break;
      case "up":
        currentDir = await commandUp(currentDir);
        isFail = false;
        break;
      case "ls":
        isFail = true;
        isFail = await commandLs(currentDir, isFail);
        break;
      case "cd":
        [currentDir, isFail] = await commandCd(currentDir, data, isFail);
        break;
      default:
        console.log("Invalid input");
    }
    console.log(currentDir);
  }).on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });
};

fileManagerStart(usernameArg);
