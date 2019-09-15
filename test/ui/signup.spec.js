var { By, until, Key } = require('selenium-webdriver');
var { done, assert, expect } = require('chai');
var webdriverHelper = require('./helper/webdriverHelper.js');
var uuid = require('node-uuid');

describe('Register', function() {
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
   * Load the signup page with some valid values.
   */
  var loadSignupPage = () => {
    return new Promise((resolve, reject) => {
      var url = config.url + '#!/en/signup';

      driver.get(url).then(() => {
        return elem('select[name=typeselector]').sendKeys("GmbH");
      }).then(() => {
        return elem('input[name=compName]').sendKeys("Company123131321");
        // return elem('input[name=compName]').sendKeys("Company" + uuid.v4());
      }).then(() => {
        return elem('input[name=compAddress]').sendKeys("Test");
      }).then(() => {
        return elem('input[name=compZipCode]').sendKeys("12345");
      }).then(() => {
        return elem('input[name=compCity]').sendKeys("Test");
      }).then(() => {
        return elem('input[name=compPhoneNum]').sendKeys("12345");
      }).then(() => {
        return elem('input[name=userFirstName]').sendKeys("Test");
      }).then(() => {
        return elem('input[name=userLastName]').sendKeys("Test");
      }).then(() => {
        return elem('input[name=userEmail]').sendKeys(Key.CONTROL, 'a', Key.NULL, uuid.v4().replace(/\-/g, '').substr(0, 10) + "@example.com");
      }).then(() => {
        return elem('input[type=password]').sendKeys("123456");
      }).then(() => {
        elem('label[for=test5]').click();      // this is terms button
        resolve();
      }).catch(reason => {
        assert.isNotOk('exception', reason);
        reject();
      });

    });
  };

  /**
   * registering-1
   * Bad email.
   */
  it("should not resigter with invalid email address (registering-1)", done => {
    var spanSelector = 'div.notification-content > p > span';
    var badEmail = 'example@example';

    loadSignupPage().then(() => {
      return elem('input[name=userEmail]').sendKeys(Key.CONTROL, 'a', Key.NULL, badEmail);     // Bad email.
    }).then(() => {
      return elem('button.btn-yellow').click();   // It submits the page then gives error
    }).then(() => {
      return driver.wait(until.elementLocated(By.css(spanSelector)), 10000);
    }).then(errorSpan => {
      return driver.wait(until.elementIsVisible(errorSpan), 10000);
    }).then(errorSpan => {
      return errorSpan.getAttribute('innerHTML');
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
   * registering-2
   * Bad phone number.
   */
  it("should not register with invalid phone number (registering-2)", done => {
    // TODO: we should remove this test case? this has client side checked and is not even submittable.
    var spanSelector = 'div.notification-content > p > span';

    loadSignupPage().then(() => {
      return elem('input[name=compPhoneNum]').sendKeys(Key.CONTROL, 'a', Key.NULL, "abcdef");  // Bad phone nummer.
    }).then(() => {
      return elem('button.btn-yellow').click();
    }).then(() => {
      driver.wait(until.elementLocated(By.css(spanSelector)), 10000).then(() => {
        assert.isNotOk(true, 'Phone number cannot be text');
        // Fail.
        done();
      }).catch(reason => {
        // Timeout => catch => success.
        done();
      });
    });
  });

  /**
   * registering-3
   * Signing with Incorrect Information (terms of service).
   */
  it("should not register with incorrect information (terms of service) (registering-3)", done => {
    var spanSelector = 'div.notification-content > p > span';

    loadSignupPage().then(() => {
      return elem('label[for=test5]').click();      // this is terms button
    }).then(() => {
      return elem('button.btn-yellow').click();     // Next button
    }).then(() => {
      driver.wait(until.elementLocated(By.css(spanSelector)), 10000).then(() => {
        assert.isNotOk(true, 'Terms of service should be clicked');
        // Fail.
        done();
      }).catch(reason => {
        // Timeout => catch => success.
        done();
      });
    });
  });

  /**
   * registering-4
   * Register with taken information (email).
   */
  it("should not register with email already in use (registering-4)", done => {
    var spanSelector = 'div.notification-content > p > span';
    var emailAlreadyInUse = config.testUsers[0].username;

    loadSignupPage().then(() => {
      return elem('input[name=userEmail]').sendKeys(Key.CONTROL, 'a', Key.NULL, emailAlreadyInUse);
    }).then(() => {
      return elem('button.btn-yellow').click();
    }).then(() => {
      driver.wait(until.elementLocated(By.js('return jQuery("span:contains(Email Already In Use)")[0]')), 10000).then(() => {
        assert.isNotOk(true, 'Email Already In Use');
        // Fail.
        done();
      }).catch(reason => {
        // Timeout => catch => success.
        done();
      });
    });
  });

  /**
   * registering-5
   * Register with correct information.
   */
  it("should register with correct information (registering-5)", done => {
    loadSignupPage().then(() => {
      return driver.takeScreenshot();
    }).then(() => {
      return elem('button.btn-yellow').click();
    }).then(() => {
      driver.wait(until.elementLocated(By.js('return jQuery("p:contains(Please use the email we sent you to verify your email address)")[0]')), 10000).then(() => {
        done(); // success
      }).catch(reason => {
        assert.isNotOk(true, 'Not on the verify email page.');
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
