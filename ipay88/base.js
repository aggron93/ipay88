module.exports = require('eden-class').extend(function() {
    /* Require
     -------------------------------*/
    /* Constants
     -------------------------------*/
    this.LIVE_PAYMENT_URL = 'https://payment.ipay88.com.ph/epayment/entry.asp';
    this.LIVE_ENQUIRY_URL = 'https://payment.ipay88.com.ph/epayment/enquiry.asp';

    this.TEST_PAYMENT_URL = 'https://sandbox.ipay88.com.ph/epayment/entry.asp';
    this.TEST_ENQUIRY_URL = 'https://sandbox.ipay88.com.ph/epayment/enquiry.asp';

    /* Public Properties
     -------------------------------*/
    /* Protected Properties
     -------------------------------*/
    this.__config = {};

    /* Private Properties
     -------------------------------*/
    var __noop = function() {};

    /* Magic
     -------------------------------*/
    this.___construct = function(merchantCode, merchantKey, live) {
        this.argument()
            .test(1, 'string')
            .test(2, 'string');

        this.__config = {
            code: merchantCode,
            key: merchantKey,
            live: live || false
        };
    };

    /* Public Methods
     -------------------------------*/
    /* Protected Methods
     -------------------------------*/
    /* Private Methods
     -------------------------------*/
}).register('eden/ipay88/base');