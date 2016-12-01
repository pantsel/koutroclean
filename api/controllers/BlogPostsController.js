/**
 * Authentication Controller
 *
 */

var qs  = require('qs');



var BlogPostsController = {

    query : function(req,res) {

        var find = {}
        find['published'] = ( req.query.published && req.query.published == 'unpublished' ) ? false : true
        if(req.query.title) find['title'] = {'like': '%' + req.query.title + '%'}
        if(req.query.categories) {
            if(req.query.categories instanceof Array) {
                find['category'] = {
                    $in : req.query.categories
                }
            }else{
                find['category'] = req.query.categories
            }
        }

        console.log("find",find)
        BlogPost.pagify('posts', {
            findQuery: find,
            sort: ['createdAt DESC'],
            populate: ['category'],
            page: parseInt(req.query.page) || 1,
            perPage: parseInt(req.query.perPage) || 10
        }).then(function(data){
            return res.json(data)
        }).catch(function(err){
            return res.negotiate(err.Errors);
        });

    },

    getById : function(req,res) {
        BlogPost.findOne({
            id : req.params.id,
        }).exec(function(err,post){
            if(err) return res.negotiate(err)
            return res.json(post)
        })
    },

    getByAlias : function(req,res) {

        BlogPost.findOne({
            alias : req.params.alias,
            published : true
        }).populate(["category"]).exec(function(err,post){
            if(err) return res.negotiate(err)
            if(!post) return res.notFound()
            return res.json(post)
        })
    },

    delete : function(req,res) {
        BlogPost.destroy(req.params.id).exec(function(err,deleted){
            if(err) return res.negotiate(err)

            return res.ok()
        })
    },



    image : function(req,res) {
        BlogPost.findOne(req.param('id')).exec(function (err, post){
            if (err) return res.negotiate(err);
            if (!post) return res.notFound();

            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!post.fd) {
                return res.notFound();
            }

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk();

            // set the filename to the same file as the user uploaded
            res.set("Content-disposition", "attachment; filename='" + post.filename + "'");

            // Stream the file down
            fileAdapter.read(post.fd)
                .on('error', function (err){
                    return res.serverError(err);
                })
                .pipe(res);
        });
    },

    update : function(req,res) {

        req.file('file').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            var post;

            if(req.body.title) {
                post = req.body
            }else{
                var parsed = qs.parse(req.body)
                post = parsed.post

                console.log("parsed",parsed)
                console.log("post",post)

                delete post.id
            }


            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length > 0){
                console.log(uploadedFiles[0])
                post.fd = uploadedFiles[0].fd
                post.filename =  uploadedFiles[0].filename
            }

            BlogPost.update({id:req.params.id},post).exec(function afterwards(err, updated){

                if (err) {
                    return res.negotiate(err);
                }

                return res.json(updated)
            });
        });


    },

    create : function(req,res) {

        req.file('file').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            var post;

            var parsed = qs.parse(req.body)
            post = parsed.post

            console.log("parsed",parsed)
            console.log("post",post)

            if(!post) return res.badRequest("Δεν έχετε συμπληρώσει όλα τα απαραίτητα πεδία!")



            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length > 0){
                post.fd = uploadedFiles[0].fd
                post.filename =  uploadedFiles[0].filename
            }else{
                return res.badRequest("Η εικόνα είναι απαραίτητη!")
            }

            BlogPost.create(post).exec(function afterwards(err, created){

                if (err) {
                    return res.negotiate(err);
                }

                return res.json(created)
            });
        });


    },




};

module.exports = BlogPostsController;
