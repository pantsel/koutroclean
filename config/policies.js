/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions (`true` allows public     *
   * access)                                                                  *
   *                                                                          *
   ***************************************************************************/

  '*': false,

  AppController : {
    home : true
  },

  AuthController : {
    login : true
  },

  HomePageController : {
    getHome: true,
    getProfile : 'authToken',
    upsertProfile : 'authToken'
  },

  SettingsController : {
    getSettings : true,
    upsertSettings : 'authToken'
  },

  ServicesController : {
    getServices : true,
    upsertService : 'authToken',
    delete : 'authToken'
  },

  PromotionsController : {
    retrieve : true,
    upsert : 'authToken',
    delete : 'authToken'
  },

  EmailsController : {
    query : 'authToken',
    createEmail : 'authToken',
    retrieveEmail : 'authToken',
    deleteEmail : 'authToken'
  },

  BlogPostsController : {
    query : true,
    getById : true,
    getByAlias : true,
    image : true,
    delete : 'authToken',
    create : 'authToken',
    update : 'authToken'
  },

  BlogCategoriesController : {
    query : true,
    getById : true,
    delete : 'authToken',
    create : 'authToken',
    update : 'authToken'
  },

  ContactController : {
    contact : true,
    submitOfferInterest : true
  },
};
