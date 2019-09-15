var { Builder } = require('selenium-webdriver');
var browserstack = require('browserstack-local');
var fs = require("fs");

var setup = {};
var isLocal;
var browserStackLocal = new browserstack.Local()

exports.start = () => {
  return new Promise((resolve, reject) => {
    const LOCALHOST = "localhost";
    var env = process.env.ENVIRONMENT || LOCALHOST;
    isLocal = env === LOCALHOST;
    if (!isLocal) {
      console.log('Testing only configured for localhost');
      process.exit(-1);
    }
    var capabilities = JSON.parse(fs.readFileSync("test/ui/config/capabilities.json", "utf-8"));
    var config = JSON.parse(fs.readFileSync("test/ui/config/" + env + ".json", "utf-8"));

    // browserStackLocal and webdriver.
    (function () {
      // Start browserStackLocal if required.
      return new Promise((resolve, reject) => {
        if (isLocal) {
          browserStackLocal.start({ key: capabilities["browserstack.key"] }, () => {
            resolve();
          });
        } else {
          resolve();
        }
      })
    })().then(() => {
      // Start webdriver.
      var driver = new Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();

      console.log("BrowserStackLocal: start");
      setup = {
        config,
        driver
      };
      resolve(setup);
    });
  });
};

exports.stop = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      setup.driver.quit();
      if (isLocal) {
        browserStackLocal.stop(() => {
          console.log("BrowserStackLocal: stop");
          resolve();
        });
      } else {
        resolve();
      }
    }, 2000); // Wait 2 secs for browserstack video log.
  });
};
