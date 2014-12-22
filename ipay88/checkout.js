module.exports = require('./base').extend(function() {
    /* Require
     -------------------------------*/
    var hash = require('./hash')();
    /* Constants
     -------------------------------*/
    var FORM = '<form action="{url}" method="POST" name="ePayment" id="ePayment">' +
        '<input type="hidden" name="MerchantCode" value="{merchantCode}" />' +
        '<input type="hidden" name="PaymentId" value="{paymentId}" />' +
        '<input type="hidden" name="RefNo" value="{refNo}" />' +
        '<input type="hidden" name="Amount" value="{amount}" />' +
        '<input type="hidden" name="Currency" value="PHP" />' +
        '<input type="hidden" name="ProdDesc" value="{prodDesc}" />' +
        '<input type="hidden" name="UserName" value="{userName}" />' +
        '<input type="hidden" name="UserEmail" value="{userEmail}" />' +
        '<input type="hidden" name="UserContact" value="{userContact}" />' +
        '<input type="hidden" name="Remark" value="{remark}" />' +
        '<input type="hidden" name="Lang" value="{lang}" />' +
        '<input type="hidden" name="Signature" value="{signature}" />' +
        '<input type="hidden" name="ResponseURL" value="{responseURL}" />' +
        '<input type="hidden" name="BackendURL" value="{backendURL}" />' +
        '</form>';
    /* Public Properties
     -------------------------------*/
    /* Protected Properties
     -------------------------------*/
    // 1 = credit card
    // 5 = bancnet
    this.__paymentId = 1;
    this.__refNo = '';
    this.__amount = 0;
    this.__currency = 'PHP';
    this.__description = '';
    this.__name = '';
    this.__email = '';
    this.__contact = '';
    this.__remark = '';
    this.__lang = 'UTF-8';
    this.__signature = '';
    this.__responseURL = '';
    this.__backendURL = '';

    /* Private Properties
     -------------------------------*/
    /* Magic
     -------------------------------*/
    /* Public Methods
     -------------------------------*/
    /**
     * Generate a checkout form
     *
     * @param boll will generate auto redirect script
     *
     * @return string
     */
    this.generate = function(redirect) {
        var url = this.TEST_PAYMENT_URL;

        if(this.__config.live) {
            var url = this.LIVE_PAYMENT_URL;
        }

        if(!this.__refNo) {
            throw 'Reference is required.';
        }

        var form = FORM.replace('{url}', url)
            .replace('{merchantCode}', this.__config.code)
            .replace('{paymentId}', this.__paymentId)
            .replace('{refNo}', this.__refNo)
            .replace('{amount}', this.__amount)
            .replace('{currency}', this.__currency)
            .replace('{prodDesc}', this.__description)
            .replace('{userName}', this.__name)
            .replace('{userEmail}', this.__email)
            .replace('{userContact}', this.__contact)
            .replace('{remark}', this.__remark)
            .replace('{lang}', this.__lang)
            .replace('{responseURL}', this.__responseURL)
            .replace('{backendURL}', this.__backendURL);

        var signature = this.__config.key +
            this.__config.code + this.__refNo +
            (this.__amount.toString().replace('.','').replace(',','')) +
            this.__currency;

        form = form.replace('{signature}', hash.iPay88Signature(signature))

        if(redirect) {
            form += '<script>document.getElementById("ePayment").submit()</script>';
        }

        return form;
    };

    this.setPaymentId = function(id) {
        this.__paymentId = id;

        return this;
    };

    /**
     * Set Merchant Reference no. or order id
     *
     * @param string
     *
     * @return this
     */
    this.setRefNo = function(refNo) {
        this.__refNo = refNo;

        return this;
    };

    /**
     * Set amount
     *
     * @param string
     *
     * @return this
     */
    this.setAmount = function(amount) {
        this.__amount = amount;

        return this;
    };

    /**
     * Set Currency only PHP is currently supported
     *
     * @param string
     *
     * @return this
     */
    this.setCurrency = function(currency) {
        this.__currency = currency;

        return this;
    };

    /**
     * Set the order description
     *
     * @param string
     *
     * @return this
     */
    this.setDescription = function(desc) {
        this.__description = desc;

        return this;
    };

    /**
     * Set the Buyer name
     *
     * @param string
     *
     * @return this
     */
    this.setName = function(name) {
        this.__name = name;

        return this;
    };

    /**
     * Set Buyer email
     *
     * @param string
     *
     * @return this
     */
    this.setEmail = function(email) {
        this.__email = email;

        return this;
    };

    /**
     * Set Buyer Contact
     *
     * @param string
     *
     * @return this
     */
    this.setContact = function(contact) {
        this.__contact = contact;

        return this;
    };

    /**
     * Set the order remark
     *
     * @param string
     *
     * @return this
     */
    this.setRemark = function(remark) {
        this.__remark = remark;

        return this;
    };

    /**
     * Set Language
     *
     * @param string
     *
     * @return this
     */
    this.setLang = function(lang) {
        this.__lang = lang;

        return this;
    };

    /**
     * Set the response url
     * buyer will redirected to this page after payment
     *
     * @param string
     *
     * @return this
     */
    this.setResponseURL = function(url) {
        this.__responseURL = url;

        return this;
    };

    /**
     * Set the BackendURL
     * ipay88 system will post to this page for orde status update
     *
     * @param string
     *
     * @return this
     */
    this.setBackendURL = function(url) {
        this.__backendURL = url;

        return this;
    };

    /* Protected Methods
     -------------------------------*/
    /* Private Methods
     -------------------------------*/
}).register('eden/ipay88');