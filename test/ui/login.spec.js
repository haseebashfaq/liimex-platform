var { By, until } = require('selenium-webdriver');
var { done, assert, expect } = require('chai');
var webdriverHelper = require('./helper/webdriverHelper.js');
var uuid = require('node-uuid');

describe('Login', function() {
  var driver, config, elem;
  this.timeout(60000);  // Enough for browserstack to spin up a machine.

  /**
   * Initialize.
   */
  before(done => {
    webdriverHelper.start().then(setup => {
      driver = setup.driver;
      config = setup.config;
      elem = selector => driver.findElement(By.css(selector));
      done();
    });
  });

  /**
   * Fail cases of login.
   */
  it("should validate login input fields", done => {
    var spanSelector = 'div.notification-content > p > span';
    var logoutButton;

    driver.get(config.url).then(() => {
      return driver.findElement(By.css('input[type=email]')).sendKeys("aaa@aaa");
    }).then(() => {
      return driver.findElement(By.css('input[type=password]')).sendKeys("aaa");
    }).then(() => {
      return driver.findElement(By.css('button[type=submit]')).click();
    }).then(() => {
      return logoutButton = driver.wait(until.elementLocated(By.css(spanSelector)), 10000);
    }).then(() => {
      return driver.wait(until.elementIsVisible(logoutButton), 10000);
    }).then(() => {
      return logoutButton.getAttribute("innerHTML");
    }).then(innerHTML => {
      innerHTML = innerHTML.trim();
      assert.equal(innerHTML.trim(), 'Invalid Email');
      done();
    }).catch(reason => {
      assert.isNotOk(true, reason);
      done();
    });
  });

  /**
   * login-1
   * Login (correctly).
   */
  it("should login with a test user (login-1)", done => {
    var testUser = config.testUsers[0];

    driver.get(config.url).then(() => {
      return driver.findElement(By.css('input[type=email]')).sendKeys(testUser.username);
    }).then(() => {
      return driver.findElement(By.css('input[type=password]')).sendKeys(testUser.password);
    }).then(() => {
      return driver.findElement(By.css('button[type=submit]')).click();
    }).then(() => {
      return driver.wait(until.elementLocated(By.css('button.logoutbtn')), 10000);
    }).then(logoutButton => {
      return driver.wait(until.elementIsVisible(logoutButton), 10000).then(() => {
        done();
      }).catch(reason => {
        assert.isNotOk(true, reason);
        done();
      });
    });
  });

  /**
   * login-2
   * Logout.
   */
  it("should logout (login-2)", done => {
    // It expects that the logout button is already visible becuase of the previous test case.
    driver.wait(until.elementLocated(By.css('button.logoutbtn')), 10000).then(btn => {
      return driver.wait(until.elementIsVisible(btn), 10000).click();
    }).then(() => {
      driver.wait(until.elementLocated(By.css('button[type=submit]')), 10000).then(() => {
        // Logged out successfully.
        done();
      }).catch(reason => {
        assert.isNotOk(true, reason);
        done();
      });
    }).catch(reason => {
      assert.isNotOk(true, reason);
      done();
    });
  });

  /**
   * login-3
   * Login (newly created).
   */
  it("should login with a test user with unverified email (login-3)", done => {
    var newTestUser = config.testUsers[1];

    driver.get(config.url).then(() => {
      return driver.findElement(By.css('input[type=email]')).sendKeys(newTestUser.username);
    }).then(() => {
      return driver.findElement(By.css('input[type=password]')).sendKeys(newTestUser.password);
    }).then(() => {
      return driver.findElement(By.css('button[type=submit]')).click();
    }).then(() => {
      return driver.wait(until.elementLocated(By.css('button.logoutbtn')), 10000);
    }).then(logoutButton => {
      return driver.wait(until.elementIsVisible(logoutButton), 10000).then(() => {
        done();
      }).catch(reason => {
        assert.isNotOk(true, reason);
        done();
      });
    });
  });

  /**
   * login-4
   * Logout.
   */
  it("should logout (login-4)", done => {
    // It expects that the logout button is already visible becuase of the previous test case.
    driver.wait(until.elementLocated(By.css('button.logoutbtn')), 10000).then(btn => {
      return driver.wait(until.elementIsVisible(btn), 10000).click();
    }).then(() => {
      driver.wait(until.elementLocated(By.css('button[type=submit]')), 10000).then(() => {
        // Logged out successfully.
        done();
      }).catch(reason => {
        assert.isNotOk(true, reason);
        done();
      });
    }).catch(reason => {
      assert.isNotOk(true, reason);
      done();
    });
  });

  /**
   * login-5
   * Login (incorrectly).
   */
  it("should not login with in correct credentials (login-5)", done => {
    var invalidCredentials = {
      username: "dummer@example.com",
      password: uuid.v4()
    };

    driver.get(config.url).then(() => {
      return driver.findElement(By.css('input[type=email]')).sendKeys(invalidCredentials.username);
    }).then(() => {
      return driver.findElement(By.css('input[type=password]')).sendKeys(invalidCredentials.password);
    }).then(() => {
      return driver.findElement(By.css('button[type=submit]')).click();
    }).then(() => {
      return driver.wait(until.elementLocated(By.js('return jQuery("span:contains(User not found)")[0]')), 10000).then(() => {
        done();
      }).catch(reason => {
        assert.isNotOk(true, reason);
        done();
      });
    });
  });

  /**
   * Teardown.
   */
  after(done => {
    webdriverHelper.stop().then(done);
  });
});
