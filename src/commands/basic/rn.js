import path from "path";
import { rename, readdir } from "fs/promises";

export const rn = async (currentDir, paths, isFail) => {
  try {
    const [current, target, ...rest] = paths.split(" ");
    const curDir = path.isAbsolute(current)
      ? current
      : path.join(currentDir, current);
    const arrayFiles = await readdir(path.dirname(curDir));
    const curFile = arrayFiles.find((file) => file === path.basename(current));
    const targetFile = arrayFiles.find((file) => file === target);
    if (!!curFile && targetFile === undefined && rest.length === 0) {
      await rename(curDir, path.join(path.dirname(curDir), target));
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
