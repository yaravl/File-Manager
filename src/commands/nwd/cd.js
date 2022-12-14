import path from "path";
import { stat } from "fs/promises";

export const cd = async (currentDir, pathToDirectory, isFail) => {
  try {
    const dir = path.isAbsolute(pathToDirectory)
      ? pathToDirectory
      : path.resolve(currentDir, pathToDirectory);
    const stats = await stat(dir);
    if (!stats.isDirectory()) throw new Error("Operation failed");
    return [(currentDir = dir), (isFail = false)];
  } catch (err) {
    console.log("Operation failed");
    return [currentDir, (isFail = true)];
  }
};
