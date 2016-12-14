module.exports = {
    sitemap: function(req, res) {
        var fs = require('fs');

        var SitemapGenerator = require('sitemap-generator');
        var generator = new SitemapGenerator('http://bcgs.gr');

        generator.on('done', function (sitemap) {
            console.log(sitemap);

            fs.writeFile("./assets/sitemap.xml", sitemap, function(err){
                if(err) {
                    return res.negotiate(err);
                }
                console.log("The file was saved!");
                return res.ok();
            });
        });

        generator.start();
    },
}