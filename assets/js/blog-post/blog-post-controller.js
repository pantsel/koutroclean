angular.module('app.blog.post', [
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/blog/posts/:alias', {
        templateUrl: 'js/blog-post/post.html',
        controller: 'BlogPostController',
        name : 'blog-post',
        resolve : {
            init : function() {
                $('.init-hidden').css('display','block')
                return true
            }
        }
      });
  }])
  .controller('BlogPostController', ['$scope','DataService','$uibModal','$log','$routeParams',
    function($scope,DataService,$uibModal,$log,$routeParams) {

        DataService.getPostByAlias($routeParams.alias).then(function(resp){
            $log.debug("Post",resp)
            $scope.post = resp.data
        })

        DataService.queryPosts({
            page : $scope.pagination ? $scope.pagination.currentPage : 1
        }).then(function(success){
            $scope.olderPosts = success.data.posts
        }).catch(function(error){
            $scope.loadingPosts = false;
        })
    }

  ]);
