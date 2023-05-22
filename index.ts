import ora, { Ora } from "ora";
import chalk, { BackgroundColorName, ColorName } from "chalk";
import boxen from "boxen";

export interface LoggerConfigI {
  color?: string;
  bgColor?: string;
  box?: string;
  title?: string;
  status?: "warn" | "success" | "fail" | "info" | "end";
}
function makeText(msg: string, config?: LoggerConfigI): string {
  let txt = msg;
  if (!config) {
    return txt;
  }
  if (config.color || config.bgColor) {
    let c = chalk;
    if (config.color) {
      c = c[config.color as ColorName];
    }
    if (config.bgColor) {
      c = c[config.bgColor as BackgroundColorName];
    }
    txt = c(txt);
  }
  if (config.box || config.title) {
    let b: { [key: string]: any } = {
      borderStyle: config.box ?? "single",
      padding: 1,
      margin: 1,
    };
    if (config.title) {
      b["title"] = config.title;
    }
    txt = boxen(txt, b);
  }
  return txt;
}
export default class Logger {
  static log(msg: string, config?: LoggerConfigI) {
    const txt = makeText(msg, config);
    console.log(txt);
  }
  static startLog(msg: string, config?: LoggerConfigI): Ora {
    const txt = makeText(msg, config);
    return ora(txt).start();
  }
  static endLog(oraPtr: Ora, msg: string, config?: LoggerConfigI) {
    const txt = makeText(msg, config);
    switch (config?.status) {
      case "warn":
        oraPtr.warn(txt);
        break;
      case "success":
        oraPtr.succeed(txt);
        break;
      case "info":
        oraPtr.info(txt);
        break;
      case "fail":
        oraPtr.fail(txt);
        break;
      default:
        oraPtr.stopAndPersist({ text: txt });
        break;
    }
    oraPtr.stop()
  }
  static error(msg: string, config?: LoggerConfigI) {
    const conf = {
      ...config,
      color: "red",
    };
    Logger.log(msg, conf);
  }
  static warn(msg: string, config?: LoggerConfigI) {
    const conf = {
      ...config,
      color: "yellow",
    };
    Logger.log(msg, conf);
  }
  static info(msg: string, config?: LoggerConfigI) {
    const conf = {
      ...config,
      color: "blue",
    };
    Logger.log(msg, conf);
  }
  static debug(msg: string, config?: LoggerConfigI) {
    const conf = {
      ...config,
      color: "green",
    };
    Logger.log(msg, conf);
  }
}
