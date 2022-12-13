import { readdir, stat } from "fs/promises";
import path from "path";

function Row(Name, Type) {
  this.Name = Name;
  this.Type = Type;
}

export const commandLs = async (currentDir, isFail) => {
  try {
    const data = [];
    const files = await readdir(currentDir);

    files.forEach((file) => {
      data.push(
        new Promise(async (resolve, reject) => {
          const stats = await stat(path.join(currentDir, file));
          const dir = stats.isDirectory();
          resolve([dir ? "Directory" : "File", file]);
        })
      );
    });

    const result = await Promise.allSettled(data);
    const currData = result
      .map(({ value }) => new Row(value[1], value[0]))
      .sort((a, b) => (a.Name < b.Name ? 1 : -1))
      .sort((a, b) => (a.Type > b.Type ? 1 : -1));

    console.table(currData);
  } catch (e) {
    console.log("Operation failed");
    isFail = true;
    return isFail;
  }
};

// TODO: подумать над решением для C:\
