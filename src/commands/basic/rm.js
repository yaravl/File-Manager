import path from "path";
import { unlink, access } from "fs/promises";

export const rm = async (currentDir, paths, isFail) => {
  try {
    const [filePath, ...rest] = paths.split(" ");
    if (rest.length === 0) {
      const curDir = path.isAbsolute(filePath)
        ? filePath
        : path.join(currentDir, filePath);
      await access(curDir);
      await unlink(curDir);
      return (isFail = false);
    } else {
      console.log("Operation failed");
      return (isFail = true);
    }
  } catch {
    console.log("Operation failed");
    return (isFail = true);
  }
};
