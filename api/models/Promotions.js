// api/models/Promotion.js
module.exports = {
    attributes: {
        price : 'object',
        chargeInterval : 'string',
        slot : {
            type: 'string',
            enum: ['basic', 'standard', 'premium','current']
        },
        details : 'array',
        ordering : {
            type : 'integer',
            defaultsTo : 0
        }
    },
    seedData:[
        {
            price: {
                value : 30
            },
            chargeInterval : 'month',
            slot : 'basic',
            details : [
                {content : 'Έκδοση κοινοχρήστων (μηνιαίως)'},
                {content : '2x Απολύμανση/Απεντόμωση (ετησίως)'},
                {content : 'Συντήρηση καυστήρα (ετησίως)'},
                {content : 'Αναγόμωση πυροσβεστήρων (ετησίως)'},
            ],
            ordering : 1
        },
        {
            price: {
                value : 60
            },
            chargeInterval : 'month',
            slot : 'standard',
            details : [
                {content : 'Έκδοση κοινοχρήστων (μηνιαίως)'},
                {content : '2x Απολύμανση/Απεντόμωση (ετησίως)'},
                {content : 'Συντήρηση καυστήρα (ετησίως)'},
                {content : 'Αναγόμωση πυροσβεστήρων (ετησίως)'},
                {content : 'Συντήρηση αποχέτευσης (ετησίως)'},
            ],
            ordering : 2
        },
        {
            price: {
                value : 60
            },
            chargeInterval : 'month',
            slot : 'premium',
            details : [
                {content : 'Έκδοση κοινοχρήστων (μηνιαίως)'},
                {content : '2x Απολύμανση/Απεντόμωση (ετησίως)'},
                {content : 'Συντήρηση καυστήρα (ετησίως)'},
                {content : 'Αναγόμωση πυροσβεστήρων (ετησίως)'},
                {content : 'Συντήρηση αποχέτευσης (ετησίως)'},
                {content : 'Καθαρισμός κοινόχρηστων χώρων (2 ανά εβδομάδα)'},
            ],
            ordering : 3
        }
    ]
};
