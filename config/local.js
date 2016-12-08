/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system: for example, this would be a good place
 * to store database or email passwords that apply only to you, and shouldn't
 * be shared with others in your organization.
 *
 * These settings take precedence over all other config files, including those
 * in the env/ subfolder.
 *
 * PLEASE NOTE:
 *		local.js is included in your .gitignore, so if you're using git
 *		as a version control solution for your Sails app, keep in mind that
 *		this file won't be committed to your repository!
 *
 *		Good news is, that means you can specify configuration for your local
 *		machine in this file without inadvertently committing personal information
 *		(like database passwords) to the repo.  Plus, this prevents other members
 *		of your team from commiting their local configuration changes on top of yours.
 *
 *    In a production environment, you probably want to leave this file out
 *    entirely and leave all your settings in env/production.js
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#!/documentation/anatomy/myApp/config/local.js.html
 */

var dotenv = require('dotenv')
dotenv.load()

module.exports = {

    port: process.env.PORT,
    host: process.env.IP,
    environment: process.env.ENV,

    hookTimeout: 50000, // 50 seconds

    //
    // The full base url at which your site will be primarily available.
    // Include an http:// prefix
    // ex. 'http://my-site.com'
    appUrl: process.env.APP_URL,



    auth: {
        // Provide a set of credentials that can be used to access the admin interface.
        static: {
            username: process.env.ADMIN_LOGIN,
            password: process.env.ADMIN_PASS,
        },
        custom : {

        }

        },

        jwt: {
            // Recommended: 63 random alpha-numeric characters
            // Generate using: https://www.grc.com/passwords.htm
            token_secret: process.env.JWT_TOKEN_SECRET
        },

        //
        connections: {
            mongodb: {
                adapter: 'sails-mongo',
                host: process.env.MONGODB_DB_HOST, // defaults to `localhost` if omitted
                port: process.env.MONGODB_DB_PORT, // defaults to 27017 if omitted
                user: process.env. MONGODB_DB_USERNAME, // or omit if not relevant
                password: process.env. MONGODB_DB_PASSWORD, // or omit if not relevant
                database: 'koutrocleandemo' // or omit if not relevant
            }
        },

        session: {
            adapter : 'connect-mongo',
            url: process.env.MONGODB_DB_URL,
            secret: process.env.SESSION_SECRET,
            database: 'koutrocleandemo',
            host: process.env.MONGODB_DB_HOST,
            user: process.env. MONGODB_DB_USERNAME, // or omit if not relevant
            password: process.env. MONGODB_DB_PASSWORD, // or omit if not relevant
            collection: 'sessions',
            auto_reconnect: false,
            ssl: false,
            port: 27017,
            stringify: false
        },

        files: {
            // Folder must exist and user running the server must have adequate perms
            dirname: 'apps',
            // Maximum allowed file size in bytes
            // Defaults to 500MB
            // maxBytes: 524288000
        },
        icons: {
            // Folder must exist and user running the server must have adequate perms
            dirname: 'icons',
            // Maximum allowed file size in bytes
            // Defaults to 500MB
            // maxBytes: 524288000
        }

        /***************************************************************************
         * Your SSL certificate and key, if you want to be able to serve HTTP      *
         * responses over https:// and/or use websockets over the wss:// protocol  *
         * (recommended for HTTP, strongly encouraged for WebSockets)              *
         *                                                                         *
         * In this example, we'll assume you created a folder in your project,     *
         * `config/ssl` and dumped your certificate/key files there:               *
         ***************************************************************************/

        // ssl: {
        //   ca: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl_gd_bundle.crt'),
        //   key: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.key'),
        //   cert: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.crt')
        // },

        /***************************************************************************
         * The `port` setting determines which TCP port your app will be           *
         * deployed on.                                                            *
         *                                                                         *
         * Ports are a transport-layer concept designed to allow many different    *
         * networking applications run at the same time on a single computer.      *
         * More about ports:                                                       *
         * http://en.wikipedia.org/wiki/Port_(computer_networking)                 *
         *                                                                         *
         * By default, if it's set, Sails uses the `PORT` environment variable.    *
         * Otherwise it falls back to port 1337.                                   *
         *                                                                         *
         * In env/production.js, you'll probably want to change this setting       *
         * to 80 (http://) or 443 (https://) if you have an SSL certificate        *
         ***************************************************************************/

        // port: process.env.PORT || 1337,

        /***************************************************************************
         * The runtime "environment" of your Sails app is either typically         *
         * 'development' or 'production'.                                          *
         *                                                                         *
         * In development, your Sails app will go out of its way to help you       *
         * (for instance you will receive more descriptive error and               *
         * debugging output)                                                       *
         *                                                                         *
         * In production, Sails configures itself (and its dependencies) to        *
         * optimize performance. You should always put your app in production mode *
         * before you deploy it to a server.  This helps ensure that your Sails    *
         * app remains stable, performant, and scalable.                           *
         *                                                                         *
         * By default, Sails sets its environment using the `NODE_ENV` environment *
         * variable.  If NODE_ENV is not set, Sails will run in the                *
         * 'development' environment.                                              *
         ***************************************************************************/

        // environment: process.env.NODE_ENV || 'development'

    };
