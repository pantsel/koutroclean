/**
 * Authentication Controller
 *
 */

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var ContactController = {

    submitOfferInterest : function(req, res) {


        var transporter = nodemailer.createTransport(mg({
                auth: {
                    api_key: process.env.MAILGUN_API_KEY,
                    domain: process.env.MAILGUN_DOMAIN
                }
            }
        ));


        var translateHours = function(hours) {

            switch (hours) {
                case "morning":
                    hours = "Πρωινές"
                    break;
                case "noon":
                    hours = "Μεσημεριανές"
                    break;
                case "afternoon":
                    hours = "Απογευματινές"
                    break;
                case "night":
                    hours = "Βραδυνές"
                    break;
            }

            return hours;
        }

        var html = '<h3>Εκδηλώθηκε ενδιαφέρον για κάποια από τις υπηρεσίες σας.</h3>'

        html += '<table>' +
            '<tr>' +
            '<th style="text-align: left">Όνομα ενδιαφερόμενου</th>' +
            '<td>' + req.body.contact.name + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th style="text-align: left">Τηλέφωνο επικοινωνίας</th>' +
            '<td>' + req.body.contact.phone + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th style="text-align: left">Υπηρεσία/Προσφορά</th>' +
            '<td>' + ( req.body.promotion.slot || req.body.promotion.title )+ '</td>' +
            '</tr>' +
            '<tr>' +
            '<th style="text-align: left">Επιθυμητές ώρες επικοινωνίας</th>' +
            '<td>' + translateHours(req.body.contact.hours) + '</td>' +
            '</tr>' +
            '</table>'

        if(req.body.promotion.title) {
            html += "<hr>"
            html += "<h3>Περιγραφή</h3>"
            html += req.body.promotion.text
        }

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"BCGS Admin" <admin@BCGS.gr>', // sender address
            to: process.env.ADMIN_EMAILS, // list of receivers
            subject: 'Νέα υποβολή φόρμας ενδιαφέροντος από  BCGS.gr', // Subject line
            html: html
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error) return res.negotiate(error);
            return res.ok()
        });

    },


    contact : function(req, res) {


        var transporter = nodemailer.createTransport(mg({
                auth: {
                    api_key: process.env.MAILGUN_API_KEY,
                    domain: process.env.MAILGUN_DOMAIN
                }
            }
        ));


        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"BCGS Admin" <admin@BCGS.gr>', // sender address
            to: process.env.ADMIN_EMAILS, // list of receivers
            subject: 'Νέα υποβολή φόρμας επικοινωνίας από  BCGS.gr', // Subject line
            html: '<p>Όνομα: ' + req.body.name + '</p>' +
            '<p>Email: ' + req.body.email + '</p>' +
            '<p>Τηλέφωνο επικοινωνίας: ' + req.body.phone + '</p>' +
            '<h3>Κείμενο</h3>' +  req.body.text
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.negotiate(error);
            }
            console.log('Message sent: ' + info.response);
            return res.ok()
        });

    }

};

module.exports = ContactController;
