import { createReadStream } from "fs";
import path from "path";

export const cat = async (currentDir, pathToDirectory, isFail) => {
  return new Promise((resolve) => {
    const dir = path.isAbsolute(pathToDirectory)
      ? pathToDirectory
      : path.join(currentDir, pathToDirectory);

    const rs = createReadStream(dir, { encoding: "utf-8" });

    rs.on("data", async (chunk) => {
      console.log(chunk);
    });
    rs.on("error", () => {
      console.log("Operation failed");
      isFail = false;
    });
    rs.on("close", () => {
      isFail && console.log(`You are currently in ${currentDir}`);
      resolve((isFail = true));
    });
  });
};
