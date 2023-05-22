var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from "chai";
import Logger from "./index.js";
import { describe } from "mocha";
describe("#test", function () {
    it("should log", function () {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.log("Hi");
            Logger.log("Hello", {
                color: "blue",
                bgColor: "white",
                box: "double",
            });
            Logger.info("H");
            Logger.debug("E");
            Logger.warn("LL");
            Logger.error("O");
            Logger.info("Okay!", {
                color: "yello",
            });
            const logger = Logger.startLog("Downloading ...");
            yield new Promise((r) => setTimeout(r, 1000));
            Logger.endLog(logger, "Finished Downloading!");
            Logger.endLog(logger, "Finished Downloading!", { status: "success" });
            Logger.endLog(logger, "failed Downloading!", { status: "fail" });
            assert.ok("Well Done ...");
        });
    });
});
