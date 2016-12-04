angular.module('app.admin.blog',[
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/admin/blog', {
                templateUrl: 'js/admin-blog/admin-blog.html',
                controller : 'AdminBlogController',
                data: {
                    private: true
                }
            })
            .when('/admin/blog/:id/edit', {
                templateUrl: 'js/admin-blog/admin-blog-edit.html',
                controller : 'AdminBlogEditController',
                data: {
                    private: true
                }
            })
            .when('/admin/blog/create', {
                templateUrl: 'js/admin-blog/admin-blog-create.html',
                controller : 'AdminBlogCreateController',
                data: {
                    private: true
                }
            });
    }])
    .controller('AdminBlogController', [
        '$scope','DataService','$uibModal',
        '$log','$document','$timeout','$location',
        function($scope,DataService,$uibModal,
                 $log,$document,$timeout,$location) {

            $scope.selectedCategories = []
            $scope.showPost = function(ev) {}
            $scope.queryPosts = queryPosts
            $scope.postSearch = ""
            $scope.filterPublished = "published"
            $scope.filterSort = "createdAt DESC"
            $scope.pageChanged = function() {
                $log.log('Page changed to: ' + $scope.pagination.currentPage);
                queryPosts()
            };

            $scope.onCategorySelected = function(cat) {
                makeCategoriesMap()
                queryPosts()
            }

            $scope.togglePublished = function(post) {
                post.published = !post.published
                DataService.updatePost(post)
                    .then(function(resp){
                        post = resp.data[0]

                    })
            }

            $scope.deleteChecked = function() {

                var toDelete = []
                $scope.posts.forEach(function(post){
                    if(post.isChecked) toDelete.push(post)
                })

                if(!toDelete.length) {
                    alert("Δεν έχετε επιλέξει αναρτήσεις για διαγραφή")
                    return;
                }

                var r = confirm("Θέλετε σίγουρα να διαγράψετε τις επιλεγμένες αναρτήσεις;");
                if (r == true) {


                    toDelete.forEach(function(item){
                        DataService.deletePost(item)
                            .then(function(success){
                                $scope.posts.splice($scope.posts.indexOf(item),1);
                            })
                    })
                }

            }

            $scope.onEditPost = function(post) {
                $location.path("/admin/blog/" + post.id + "/edit")
            }

            var inputChangedPromise;
            $scope.inputChanged = function(){
                if(inputChangedPromise){
                    $timeout.cancel(inputChangedPromise);
                }
                inputChangedPromise = $timeout(function(){
                    queryPosts()
                },1000);
            }

            $scope.deleteCategory = function(cat) {

                var r = confirm("Θέλετε σίγουρα να διαγράψετε την επιλεγμένη κατηγορία;");
                if (r == true) {
                    DataService.deleteBlogCategory(cat)
                        .then(function(success){
                            getBlogCategories();
                        })
                }
            }


            $scope.openCategoryModal = function(category) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/js/admin-blog/category-modal.html',
                    controller: function($uibModalInstance,DataService,category){
                        var $ctrl = this
                        $ctrl.category = category || {}

                        $ctrl.ok = function () {
                            DataService.createBlogCategory($ctrl.category)
                                .then(function(success){
                                    $uibModalInstance.dismiss('ok');

                                }).catch(function(err){

                            })



                        };

                        $ctrl.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };


                    },
                    controllerAs: '$ctrl',
                    size: 'sm',
                    resolve: {
                        category: function () {
                            return category;
                        }
                    }
                });

                modalInstance.result.then(function (action) {

                }, function (action) {
                    if(action == 'ok') {
                        getBlogCategories()
                    }
                });
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
                    published : $scope.filterPublished,
                    title : $scope.postSearch,
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
    ])
    .controller('AdminBlogEditController',
        ['$scope','DataService','$uibModal','$log','AuthService','$timeout',
            '$document','$routeParams','Upload','Notification',
        function($scope,DataService,$uibModal,$log,AuthService,$timeout,
                 $document,$routeParams,Upload,Notification) {


            DataService.getPostById($routeParams.id)
                .then(function(resp){
                    $log.debug("Post",resp.data)
                    $scope.post = resp.data
                })

            DataService.queryBlogCategories()
                .then(function(resp){
                    $scope.categories = resp.data
                })



            $scope.tinymceOptions = {
                setup: function(editor) {
                    editor.on("init", function() {
                        //editor.execCommand("fontName", false, "Lato");
                        //this.getDoc().body.style.fontFamily = 'Lato';
                    });
                    editor.on("click", function() {

                    });
                },
                onChange: function(e) {
                    // put logic here for keypress and cut/paste changes
                },
                inline: false,
                plugins : 'advlist autolink link image lists charmap print preview',
                skin: 'lightgray',
                theme : 'modern'
            };

            $scope.update = function() {
                $log.debug("Post",$scope.post)
                //DataService.updatePost($scope.post)
                //    .then(function(resp){
                //
                //    })

                $scope.uploader.uploadItem(0)
            }

            $scope.update = function () {

                if($scope.file) {
                    $scope.file.upload = Upload.upload({
                        url: '/api/posts/' + $scope.post.id,
                        method: "PATCH",
                        headers: {
                            'optional-header': 'header-value'
                        },
                        data: {
                            post: $scope.post,
                            file: $scope.file
                        }
                    });

                    $scope.file.upload.then(function (response) {
                        $timeout(function () {
                            $scope.file.result = response.data;
                            $log.debug("Update post", response.data);
                            $scope.post = response.data[0]
                            Notification.success('Post updated!');
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        $scope.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });

                    $scope.file.upload.xhr(function (xhr) {
                        // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
                    });
                }else{
                    DataService.updatePost($scope.post)
                        .then(function(resp){
                            $log.debug("POST",resp.data)
                            $scope.post = resp.data[0]
                        })
                }


            };





        }
    ])
    .controller('AdminBlogCreateController',
        ['$scope','DataService','$uibModal','$log','AuthService','$timeout',
            '$document','$routeParams','Upload','Notification','$location',
            function($scope,DataService,$uibModal,$log,AuthService,$timeout,
                     $document,$routeParams,Upload,Notification,$location) {


                $scope.post = {}

                DataService.queryBlogCategories()
                    .then(function(resp){
                        $scope.categories = resp.data
                    })

                $scope.tinymceOptions = {
                    setup: function(editor) {
                        editor.on("init", function() {
                            //editor.execCommand("fontName", false, "Lato");
                            //this.getDoc().body.style.fontFamily = 'Lato';
                        });
                        editor.on("click", function() {

                        });
                    },
                    onChange: function(e) {
                        // put logic here for keypress and cut/paste changes
                    },
                    inline: false,
                    plugins : 'advlist autolink link image lists charmap print preview',
                    skin: 'lightgray',
                    theme : 'modern'
                };

                $scope.update = function() {
                    $log.debug("Post",$scope.post)
                    $scope.uploader.uploadItem(0)
                }

                $scope.update = function () {

                    $log.debug("POST",$scope.post)
                    if(!$scope.file) {
                        Notification.error("Δεν έχει ορίστεί εικόνα. Η εικόνα είναι απαραίτητη.");
                        return false;
                    }
                    $scope.file.upload = Upload.upload({
                        url: '/api/posts',
                        headers: {
                            'optional-header': 'header-value'
                        },
                        data: {
                            post: $scope.post,
                            file: $scope.file
                        }
                    });

                    $scope.file.upload.then(function (response) {
                        $timeout(function () {

                            Notification.success('Post created!');
                            $location.path("/admin/blog")
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.errorMsg = response.status + ': ' + response.data;
                            Notification.error($scope.errorMsg);
                        }

                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        $scope.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });

                    $scope.file.upload.xhr(function (xhr) {
                        // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
                    });


                };





            }
        ]);

