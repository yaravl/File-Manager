import { EOL, cpus, homedir, userInfo, arch } from "os";

export const os = async (data, isFail) => {
  switch (data) {
    case "--EOL":
      console.log(`${JSON.stringify(EOL)}`);
      isFail = false;
      break;
    case "--cpus":
      const cpusArr = cpus().map((cpu) => {
        const { model, speed } = cpu;
        return speed < 1000
          ? { model, speed: speed / 10 + " GHz" }
          : { model, speed: speed / 1000 + " GHz" };
      });
      console.log(cpusArr);
      isFail = false;
      break;
    case "--homedir":
      console.log(`${homedir()}`);
      isFail = false;
      break;
    case "--username":
      console.log(`${userInfo().username}`);
      isFail = false;
      break;
    case "--architecture":
      console.log(`${arch()}`);
      isFail = false;
      break;
    default:
      isFail = true;
      console.log("Operation failed");
  }
  return isFail;
};
