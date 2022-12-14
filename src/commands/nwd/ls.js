import { readdir } from "fs/promises";

function Row(Name, Type) {
  this.Name = Name;
  this.Type = Type;
}

export const ls = async (currentDir, isFail) => {
  try {
    const data = [];
    const files = await readdir(currentDir, { withFileTypes: true });

    files.forEach((file) => {
      data.push(
        new Promise((resolve) => {
          const dir = file.isDirectory();
          resolve([file.name, dir ? "Directory" : "File"]);
        })
      );
    });

    const result = await Promise.allSettled(data);
    const currData = result
      .map(({ value }) => new Row(value[0], value[1]))
      .sort((a, b) => (a.Name < b.Name ? 1 : -1))
      .sort((a, b) => (a.Type > b.Type ? 1 : -1));

    console.table(currData);
  } catch (e) {
    console.log("Operation failed");
    isFail = true;
    return isFail;
  }
};
