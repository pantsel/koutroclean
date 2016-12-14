/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  //'/': {
  //  view: 'layout'
  //},

  'GET /': 'AppController.home',
  'GET /blog': 'AppController.home',
  'GET /blog/posts/:alias': 'AppController.home',
  //'GET /admin': 'AppController.home',
  'GET /admin': { view: 'admin' },
  'GET /admin/profile': { view: 'admin' },
  'GET /admin/services': { view: 'admin' },
  'GET /admin/settings': { view: 'admin' },
  'GET /admin/promotions': { view: 'admin' },
  'GET /admin/blog': { view: 'admin' },
  'GET /admin/blog/*': { view: 'admin' },
  'GET /admin/newsletter': { view: 'admin' },
  'GET /auth/login': 'AppController.home',
  'GET /auth/logout': 'AppController.home',


  'GET /api/home': 'HomePageController.getHome',

  /**
   * PROFILE
   */
  'GET /api/settings': 'SettingsController.getSettings',
  'POST /api/settings': 'SettingsController.upsertSettings',

  /**
   * SERVICES
   */
  'GET /api/services': 'ServicesController.getServices',
  'POST /api/services': 'ServicesController.upsertService',
  'DELETE /api/services/:id': 'ServicesController.delete',


  /**
   * PROMOTIONS
   */
  'GET /api/promotions': 'PromotionsController.retrieve',
  'POST /api/promotions': 'PromotionsController.upsert',
  'DELETE /api/promotions/:id': 'PromotionsController.delete',


  /**
   * EMAILS
   */
  'GET /api/emails': 'EmailsController.query',
  'GET /api/emails/:email': 'EmailsController.retrieveEmail',
  'POST /api/emails': 'EmailsController.createEmail',
  'DELETE /api/emails/:email': 'EmailsController.deleteEmail',

  /**
   * PROFILE
   */
  'GET /api/profile': 'HomePageController.getProfile',
  'POST /api/profile': 'HomePageController.upsertProfile',


  /**
   * BLOG CATEGORIES
   */

  'POST /api/blog/categories': 'BlogCategoriesController.create',
  'GET /api/blog/categories': 'BlogCategoriesController.query',
  'GET /api/blog/categories/:id': 'BlogCategoriesController.getById',
  'PATCH /api/blog/categories/:id': 'BlogCategoriesController.update',
  'DELETE /api/blog/categories/:id': 'BlogCategoriesController.delete',

  /**
   * BLOG POSTS
   */

  'POST /api/posts': 'BlogPostsController.create',
  'GET /api/posts': 'BlogPostsController.query',
  'GET /api/posts/:id': 'BlogPostsController.getById',
  'GET /posts/:id/image': 'BlogPostsController.image',
  'GET /api/posts/alias/:alias': 'BlogPostsController.getByAlias',
  'PATCH /api/posts/:id': 'BlogPostsController.update',
  'DELETE /api/posts/:id': 'BlogPostsController.delete',



  'POST /api/contact': 'ContactController.contact',
  'POST /api/offerInterest': 'ContactController.submitOfferInterest',


  'GET /api/current_offers': 'CurrentOfferController.query',
  'POST /api/current_offers': 'CurrentOfferController.createOrUpdate',



  'get /sitemap' : 'SitemapController.sitemap',



};
