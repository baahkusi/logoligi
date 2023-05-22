import ora from "ora";
import chalk from "chalk";
import boxen from "boxen";
function makeText(msg, config) {
    var _a;
    let txt = msg;
    if (!config) {
        return txt;
    }
    if (config.color || config.bgColor) {
        let c = chalk;
        if (config.color) {
            c = c[config.color];
        }
        if (config.bgColor) {
            c = c[config.bgColor];
        }
        txt = c(txt);
    }
    if (config.box || config.title) {
        let b = {
            borderStyle: (_a = config.box) !== null && _a !== void 0 ? _a : "single",
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
    static log(msg, config) {
        const txt = makeText(msg, config);
        console.log(txt);
    }
    static startLog(msg, config) {
        const txt = makeText(msg, config);
        return ora(txt).start();
    }
    static endLog(oraPtr, msg, config) {
        const txt = makeText(msg, config);
        switch (config === null || config === void 0 ? void 0 : config.status) {
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
        oraPtr.stop();
    }
    static error(msg, config) {
        const conf = Object.assign(Object.assign({}, config), { color: "red" });
        Logger.log(msg, conf);
    }
    static warn(msg, config) {
        const conf = Object.assign(Object.assign({}, config), { color: "yellow" });
        Logger.log(msg, conf);
    }
    static info(msg, config) {
        const conf = Object.assign(Object.assign({}, config), { color: "blue" });
        Logger.log(msg, conf);
    }
    static debug(msg, config) {
        const conf = Object.assign(Object.assign({}, config), { color: "green" });
        Logger.log(msg, conf);
    }
}
