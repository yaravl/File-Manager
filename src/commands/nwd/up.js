import path from "path";

export const up = async (currentDir) =>
  currentDir === path.parse(currentDir).root
    ? currentDir
    : path.resolve(currentDir, "../");
