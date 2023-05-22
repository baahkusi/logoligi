import { assert } from "chai";
import Logger from "./index.js";
import { describe } from "mocha";

describe("#test", function () {
  it("should log", async function () {
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
    await new Promise((r) => setTimeout(r, 1000));
    Logger.endLog(logger, "Finished Downloading!");
    Logger.endLog(logger, "Finished Downloading!", { status: "success" });
    Logger.endLog(logger, "failed Downloading!", { status: "fail" });
    assert.ok("Well Done ...");
  });
});
