import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { createBrotliCompress, constants } from "zlib";

export const compress = async (currentDir, paths, isFail) => {
  try {
    const [current, target] = paths.split(" ");
    const curDir = path.isAbsolute(current)
      ? current
      : path.join(currentDir, current);
    const tarDir = path.isAbsolute(target)
      ? target
      : path.join(currentDir, target);

    await stat(curDir);
    if (curDir !== tarDir) {
      return new Promise((resolve) => {
        const inp = createReadStream(curDir);
        const out = createWriteStream(tarDir);
        isFail = false;
        const stream = inp
          .pipe(
            createBrotliCompress({
              params: {
                [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
              },
            })
          )
          .pipe(out);
        stream.on("error", () => {
          console.log("Operation failed");
          isFail = true;
        });
        stream.on("finish", () => {
          resolve(isFail);
        });
      });
    } else {
      console.log("Operation failed");
      return (isFail = true);
    }
  } catch {
    console.log("Operation failed");
    return (isFail = true);
  }
};
