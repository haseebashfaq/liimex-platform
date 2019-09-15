var { By, until, Key } = require('selenium-webdriver');
var { done, assert, expect } = require('chai');
var webdriverHelper = require('./helper/webdriverHelper.js');
var uuid = require('node-uuid');

describe('Forgot password', function() {
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
   * forgotpassword-1
   * Navigate to Forgot password.
   */
  it("should navigate to Forgot password form (forgotpassword-1)", done => {
    var url = config.url + '#!/en/login';
    var forgotPasswordLinkSelector = 'button[ui-sref="forgot_en"]';
    var resetPasswordButtonLocator = By.js('return jQuery("button:contains(Reset Password)")[0]');

    // Start with this url
    driver.get(url).then(() => {
      // Click on forgot password button
      return elem(forgotPasswordLinkSelector).click();
    }).then(() => {
      // Now find the 'reset password' button
      return driver.wait(until.elementLocated(resetPasswordButtonLocator), 10000);
    }).then(btn => {
      driver.wait(until.elementIsVisible(btn), 10000).then(() => {
        done();
      }).catch(reason => {
        assert.isNotOk(false, reason);
        done();
      });
    });
  });

  /**
   * forgotpassword-2
   * Submit the forgot password form.
   */
  it("should submit the Forgot password form (forgotpassword-2)", done => {
    var resetPasswordButtonLocator = By.js('return jQuery("button:contains(Reset Password)")[0]');
    var emailSelector = 'input[type=email]';
    var email = 'email@example.com';

    // Type in email.
    elem(emailSelector).sendKeys(email).then(() => {
      // Click on reset password button
      return driver.findElement(resetPasswordButtonLocator).click();
    }).then(() => {
      // Wait for the error message and see.
      driver.wait(until.elementLocated(By.js("return jQuery('span:contains(We have sent you an email with instructions)')[0]")), 10000).then(() => {
        done();
      }).catch(reason => {
        assert.isNotOk(true, reason);
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
