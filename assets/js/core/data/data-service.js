angular.module('app.core.data.service', [
    'ngSails'
  ])
  .service('DataService', [
    '$sails', '$q', '$log', '$http', 'Notification', 'PubSub',
    'AuthService','$location',
    function(
      $sails, $q, $log, $http, Notification, PubSub,
      AuthService,$location
    ) {


      var self = this;
      /**
       * Main Data object, containing all of the version objects and their
       * nested assets
       * @type {array}
       */
      self.data = [];

      var UNKNOWN_ERROR_MESSAGE = 'An Unkown Error Occurred.';

        var showAttributeWarnings = function(response) {
            if (!_.has(response, 'data.invalidAttributes')) {
                return;
            }

            _.forEach(response.data.invalidAttributes,
                function(attribute, attributeName) {
                    warningMessage = '';

                    _.forEach(attribute, function(attributeError) {
                        warningMessage += (attributeError.message || '') + '<br />';
                    });

                    Notification.warning({
                        title: 'Invalid attribute: ' + attributeName,
                        message: warningMessage
                    });
                });
        };

      /**
       * Shows notifications detailing the various errors described by the
       * response object
       * @param  {Object} response   A response object returned by sails after a
       *                             erroneous request.
       * @param  {String} errorTitle The string to be used as a title for the
       *                             main error notification.
       */
      var showErrors = function(response, errorTitle) {
        if (!response) {
          return Notification.error({
            title: errorTitle,
            message: UNKNOWN_ERROR_MESSAGE
          });
        }

        console.error("err:response",response)
        Notification.error({
          title: errorTitle,
          message: response.data.error || response.data.message || response.data.details || response.summary || UNKNOWN_ERROR_MESSAGE
        });

        showAttributeWarnings(response);
      };

      /**
       * Creates a version using the api.
       * Requires authentication (token is auto-injected).
       * @param  {Object}  version     A object containing all of the parameters
       *                               we would like to create the version with.
       * @return {Promise}             A promise which is resolve/rejected as
       *                               soon as we know the result of the operation
       *                               Contains the response object.
       */
      self.createVersion = function(version) {
        console.info('Creating version',version)
        if (!version) {
          throw new Error('A version object is required for creation');
        }

        return $http.post('/api/version', version)
          .then(function(response) {
            Notification.success('Version Created Successfully.');
            PubSub.publish('data-change');
            return response;
          }, function(response) {

            var errorTitle = 'Unable to Create Version';

            showErrors(response, errorTitle);

            return $q.reject(response);
          });
      };

      self.getHome = function() {


        return $http.get('/api/home')
            .then(function(response) {

              return response;
            }, function(response) {

              var errorTitle = 'Unable to retrieve profile';

              showErrors(response, errorTitle);

              return $q.reject(response);
            });
      };

      self.getProfile = function() {


        return $http.get('/api/profile')
            .then(function(response) {

              return response;
            }, function(response) {

              var errorTitle = 'Unable to retrieve profile';

              showErrors(response, errorTitle);

              return $q.reject(response);
            });
      };


        self.getSettings = function() {


            return $http.get('/api/settings')
                .then(function(response) {

                    return response;
                }, function(response) {

                    var errorTitle = 'Unable to retrieve settings';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        };

        self.getPromotions = function() {
            return $http.get('/api/promotions')
                .then(function(response) {
                    console.log("Retrieve Promotions",response)
                    return response;
                }, function(response) {

                    var errorTitle = 'Unable to retrieve promotions';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        }

        self.saveEmail = function(email) {

            return $http.post('/api/emails', {
                email:email
            })
                .then(function(response) {
                    Notification.success('Email saved Successfully.');
                    PubSub.publish('data-change');
                    return response;
                }, function(response) {


                    Notification.error({
                        title: 'Κάτι πήγε στραβά',
                        message: response.data.message || response.data.details || response.summary || UNKNOWN_ERROR_MESSAGE
                    });

                    return $q.reject(response);
                });
        };

        self.upsertPromotion = function(promotion) {

            return $http.post('/api/promotions', promotion)
                .then(function(response) {
                    Notification.success('promotion upserted Successfully.');
                    PubSub.publish('data-change');
                    return response;
                }, function(response) {

                    var errorTitle = 'Unable to upsert promotion';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        };

        self.getServices = function() {
            return $http.get('/api/services')
                .then(function(response) {
                    return response;
                }, function(response) {

                    var errorTitle = 'Unable to upsert service';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        }

        self.deleteService = function(id) {
            return $http.delete('/api/services/' + id)
                .then(function(response) {
                    PubSub.publish('data-change');
                    Notification.success('Η υπηρεσία διαγράφτηκε με επιτυχία.');
                    return response;
                }, function(response) {
                    var errorTitle = 'Unable to delete service';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        }

      self.upsertService = function(service) {

          console.log("service",service)
        return $http.post('/api/services', service)
            .then(function(response) {
              Notification.success('Service upserted Successfully.');
              PubSub.publish('data-change');
              return response;
            }, function(response) {

              var errorTitle = 'Unable to upsert service';

              showErrors(response, errorTitle);

              return $q.reject(response);
            });
      };


        self.upsertSettings = function(settings) {

            settings['version'] = 'initial'
            return $http.post('/api/settings', settings)
                .then(function(response) {
                    Notification.success('settings upserted Successfully.');
                    PubSub.publish('data-change');
                    return response;
                }, function(response) {

                    var errorTitle = 'Unable to upsert settings';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        };


      self.upsertProfile = function(data) {

        data['version'] = "initital"
        console.log("DATA",data)

        return $http.post('/api/profile', data)
            .then(function(response) {
              Notification.success('Profile upserted Successfully.');
              PubSub.publish('data-change');
              return response;
            }, function(response) {

              var errorTitle = 'Unable to upsert profile';

              showErrors(response, errorTitle);

              return $q.reject(response);
            });
      };


      //self.updateHomePage = function(data) {
      //
      //
      //  return $http.post('/api/homepage', data)
      //      .then(function(response) {
      //        Notification.success('HomePage Updated Successfully.');
      //        PubSub.publish('data-change');
      //        return response;
      //      }, function(response) {
      //
      //        var errorTitle = 'Unable to Update HomePage';
      //
      //        showErrors(response, errorTitle);
      //
      //        return $q.reject(response);
      //      });
      //};

        self.queryPosts = function(query) {


            return $http({
                url: '/api/posts',
                method: "GET",
                params: query
            }).then(function(response) {

                    return response;
                }, function(response) {

                    var errorTitle = 'Unable to retrieve posts';

                    showErrors(response, errorTitle);

                    return $q.reject(response);
                });
        };

        self.deletePost = function(post) {


            return $http({
                url: '/api/posts/' + post.id,
                method: "DELETE",
            }).then(function(response) {
                Notification.success("Post deleted!")
                return response;
            }, function(response) {

                var errorTitle = 'Unable to delete posts';

                showErrors(response, errorTitle);

                return $q.reject(response);
            });
        };

        self.getPostByAlias = function(alias) {

            return $http({
                url: '/api/posts/alias/' + alias,
                method: "GET",
            }).then(function(response) {
                return response;
            }).catch(function(response) {

                var errorTitle = 'Unable to retrieve post';

                console.error("sdvsvsvsdvsdvsdvdsv",response)
                showErrors(response, errorTitle);

                $location.path("/" + response.status)


                return $q.reject(response);
            });
        };

        self.getPostById = function(id) {

            return $http({
                url: '/api/posts/' + id,
                method: "GET",
            }).then(function(response) {

                return response;
            }, function(response) {

                var errorTitle = 'Unable to retrieve post';

                showErrors(response, errorTitle);

                return $q.reject(response);
            });
        };

        self.updatePost = function(post) {

            var postId = post.id
            delete post.id

            if(post.category.id) post.category = post.category.id

            return $http({
                url: '/api/posts/' + postId,
                method: "PATCH",
                data : post
            }).then(function(response) {
                Notification.success('Post updated!');
                return response;
            }, function(response) {

                var errorTitle = 'Unable to retrieve post';

                showErrors(response, errorTitle);

                return $q.reject(response);
            });
        };

        self.queryBlogCategories = function(query) {


            return $http({
                url: '/api/blog/categories',
                method: "GET",
                params: query
            }).then(function(response) {
                return response;
            }, function(response) {

                var errorTitle = 'Unable to retrieve blog categories';

                showErrors(response, errorTitle);

                return $q.reject(response);
            });
        };






        /**
       * Retrieve & subscribe to all version & asset data.
       * @return {Promise} Resolved once data has been retrieved
       */
      self.initialize = function() {
        var deferred = $q.defer();
        // Get the initial set of releases from the server.
        // XXX This will also subscribe us to future changes regarding releases


        deferred.resolve(true);



        return deferred.promise;
      };

    }
  ]);
