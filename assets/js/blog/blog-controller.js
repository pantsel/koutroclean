angular.module('app.blog', [
    'ui.bootstrap.pagination'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/blog', {
        templateUrl: 'js/blog/blog.html',
        controller: 'BlogController',
        name : 'blog',
        resolve : {
            init : function() {
                $('.init-hidden').css('display','block')
                return true
            }
        }
      });
  }])
  .controller('BlogController', ['$scope','DataService','$uibModal','$log','$document','$location',
    function($scope,DataService,$uibModal,$log,$document,$location) {

        $scope.selectedCategories = []
        $scope.showPost = function(ev,post) {
            $location.path('/blog/' + post.alias)
        }

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.pagination.currentPage);
            queryPosts()
        };

        $scope.onCategorySelected = function(cat) {
            makeCategoriesMap()
            queryPosts()
        }


        /**
         * -----------------------------------------
         * Functions
         * -----------------------------------------
         */

        function makeCategoriesMap() {
            $scope.selectedCategories = $scope.categories.map(function(cat){
                return cat.isChecked ? cat.id : null
            })
            $scope.selectedCategories = $scope.selectedCategories.filter(function(n){ return n != null });
        }

        function getBlogCategories() {
            $scope.loadingCategs = true;
            DataService.queryBlogCategories({}).then(function(success){

                //$log.info("Retrieved categories!",success)
                $scope.categories = success.data
                $scope.loadingCategs = false;
            }).catch(function(error){
                $scope.loadingCategs = false;
            })
        }

        function queryPosts() {
            $scope.loadingPosts = true;
            DataService.queryPosts({
                //category : $scope.selectedCategory ? $scope.selectedCategory.id : null,
                categories : $scope.selectedCategories || null,
                page : $scope.pagination ? $scope.pagination.currentPage : 1
            }).then(function(success){

                //$log.info("Retrieved posts!",success)
                $document.scrollTop(0, 500).then(function() {
                    $scope.posts = success.data.posts
                    $scope.pagination = success.data.meta.paginate
                    $scope.loadingPosts = false;
                });
            }).catch(function(error){
                $scope.loadingPosts = false;
            })
        }

        // Init
        queryPosts()
        getBlogCategories()


    }

  ]);
