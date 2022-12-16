import { createInterface } from "node:readline/promises";
import { homedir } from "os";
import {
  up,
  ls,
  cd,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  os,
  calculateHash,
  compress,
  decompress,
} from "./commands/index.js";

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
    const [command, ...rest] = input.trim().split(" ");
    const data = rest.join(" ");

    switch (command) {
      case ".exit":
        rl.close();
        return;
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
        isFail = await cat(currentDir, data, isFail);
        break;
      case "add":
        isFail = true;
        isFail = await add(currentDir, data, isFail);
        break;
      case "rn":
        isFail = true;
        isFail = await rn(currentDir, data, isFail);
        break;
      case "cp":
        isFail = true;
        isFail = await cp(currentDir, data, isFail);
        break;
      case "mv":
        isFail = true;
        isFail = await mv(currentDir, data, isFail);
        break;
      case "rm":
        isFail = true;
        isFail = await rm(currentDir, data, isFail);
        break;
      case "os":
        isFail = true;
        isFail = await os(data, isFail);
        break;
      case "hash":
        isFail = true;
        isFail = await calculateHash(currentDir, data, isFail);
        break;
      case "compress":
        isFail = true;
        isFail = await compress(currentDir, data, isFail);
        break;
      case "decompress":
        isFail = true;
        isFail = await decompress(currentDir, data, isFail);
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
