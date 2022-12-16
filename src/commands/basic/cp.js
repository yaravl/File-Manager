import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const cp = async (currentDir, paths, isFail) => {
  return new Promise((resolve) => {
    const [current, target, ...rest] = paths.split(" ");
    if (rest.length !== 0) {
      console.log("Operation failed");
      resolve((isFail = true));
    } else {
      const curDir = path.isAbsolute(current)
        ? current
        : path.join(currentDir, current);
      const curFileName = path.basename(curDir);
      const tarDir = path.isAbsolute(target)
        ? target
        : path.join(currentDir, target);
      const rs = createReadStream(curDir);
      const ws = createWriteStream(path.join(tarDir, curFileName), {
        flags: "wx",
      });
      isFail = false;
      pipeline(rs, ws, (err) => {
        if (err) console.log("Operation failed");
        if (err) isFail = true;
        resolve(isFail);
      });
      rs.on("end", () => {
        ws.close();
        resolve(isFail);
      });
    }
  });
};
