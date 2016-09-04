/**
 * Version Service
 */
var _ = require('lodash');
var crypto = require('crypto');
var CryptoService = {};

// Normalize version name
CryptoService.decrypt = function(str) {
    var key = 'MySecretKey12345';
    var iv = '1234567890123456';
    var imeToken = str;
    if(imeToken) {
        var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        var decrypted = decipher.update(imeToken, 'hex', 'binary');
        decrypted += decipher.final('binary');
        return decrypted
    }

    return null;
};

module.exports = CryptoService;
