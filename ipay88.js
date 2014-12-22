module.exports = require('./ipay88/base').extend(function() {
    /* Require
     -------------------------------*/
    var hash = require('./ipay88/hash')();
    var rest = require('eden-rest');
    var string = require('eden-string');
    /* Constants
     -------------------------------*/
    /* Public Properties
     -------------------------------*/
    /* Protected Properties
     -------------------------------*/

    /* Private Properties
     -------------------------------*/
    /* Magic
     -------------------------------*/
    /* Public Methods
     -------------------------------*/
    /**
     * will return the checkout class
     *
     * @return class checkout
     */
    this.checkout = function() {
        return require('./ipay88/checkout')(this.__config.code, this.__config.key, this.__config.live);
    };

    /**
     * Generate a response hash
     *
     * @param string payment mode 1=creditcard 5=bancnet
     * @param string merchant order id
     * @param string amount
     * @param string currency (PHP)
     * @param string Order status
     *
     * @return string
     */
    this.getResponseSignature = function(paymentId, refno, amount, currency, status) {
        var signature = this.__config.key.toString() +
            this.__config.code.toString() +
            paymentId.toString() +
            refno.toString() +
            amount.toString().replace(',', '').replace('.', '') +
            currency.toString() +
            status.toString();

        return hash.iPay88Signature(signature);
    }

    /**
     * Generate a response hash
     *
     * @param string merchant order id
     * @param string amount with 2 decimal
     * @param function callback
     *
     * @return this
     */
    this.requery = function(refno, amount, callback) {
        var data = {
            MerchantCode : this.__config.code,
            RefNo : refno,
            Amount : amount.toString()
        };

        var url = this.TEST_ENQUIRY_URL;
        if(this.__config.live) {
            url = this.LIVE_ENQUIRY_URL;
        }

        rest().setUrl(url + '?' + string().hashToQuery(data))
            .getResponse(callback || __noop);

        return this;
    };

    /* Protected Methods
     -------------------------------*/
    /* Private Methods
     -------------------------------*/

}).register('eden/ipay88');