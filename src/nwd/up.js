import path from "path";

export const commandUp = async (currentDir) =>
  currentDir === path.parse(currentDir).root
    ? currentDir
    : path.resolve(currentDir, "../");
