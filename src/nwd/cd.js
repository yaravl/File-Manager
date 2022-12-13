import path from "path";
import { stat } from "fs/promises";

export const commandCd = async (currentDir, [pathToDirectory], isFail) => {
  try {
    const dir = path.isAbsolute(pathToDirectory)
      ? pathToDirectory
      : path.join(currentDir, pathToDirectory);
    const stats = await stat(dir);
    if (stats.isDirectory()) {
      return [(currentDir = dir), (isFail = false)];
    } else {
      console.log("Operation failed");
      return [currentDir, (isFail = true)];
    }
  } catch (err) {
    console.log("Operation failed");
    return [currentDir, (isFail = true)];
  }
};
