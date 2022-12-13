import { createInterface } from "node:readline/promises";
import { homedir } from "os";

const usernameArg = process.argv[2];
const currentDir = homedir();

const fileManagerStart = (arg) => {
  if (!arg || arg.split("=")[0] !== "--username")
    return console.log(
      'Please enter your name in the format "--username=your_name"'
    );

  const userName = arg.split("=")[1];

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${currentDir}`);

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  rl.on("line", (input) => {
    const [command, ...data] = input.trim().split(" ");

    switch (command) {
      case ".exit":
        rl.close();
        break;
      default:
        console.log("Invalid input");
    }
  }).on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });
};

fileManagerStart(usernameArg);
