import path from "path";
import { createWriteStream } from "fs";

export const add = async (currentDir, pathToDirectory, isFail) => {
  return new Promise((resolve) => {
    const dir = path.isAbsolute(pathToDirectory)
      ? pathToDirectory
      : path.join(currentDir, pathToDirectory);
    const ws = createWriteStream(dir, { flags: "wx" });
    isFail = false;
    ws.on("error", () => {
      console.log("Operation failed");
      isFail = true;
    });
    ws.on("close", () => {
      resolve(isFail);
    });
    ws.close();
  });
};
