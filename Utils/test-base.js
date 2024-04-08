const base  = require("@playwright/test");

exports.customTest = base.test.extend({
  testData: {
    username: "test.user8@test.com",
    password: "Test@1234",
    productName: "ADIDAS ORIGINAL",
  },
});
