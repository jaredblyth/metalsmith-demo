var Plugin = function(options) {
  options = options || {};

  options.collections = options.collections || [];

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    options.collections.forEach(function(colName) {
      files['/feeds/rss2/' + colName + '.xml'] = {
        contents: '',
        mode: '0644',
        title: '',
        feedCollection: metadata.collections[colName],
        template: 'feeds/rss2.jade'
      };
    });

    if (options.taxonomy && metadata.taxonomies) {
      for (var taxonomy in metadata.taxonomies) {
        for (var term in metadata.taxonomies[taxonomy]) {
          files['/' + taxonomy + '/' + term + '/feed.xml'] = {
            contents: '',
            mode: '0644',
            title: taxonomy + ': ' + term,
            feedCollection: metadata.taxonomies[taxonomy][term],
            template: 'feeds/rss2.jade'
          };
        }
      }
    };
    
    done();
  };
};

module.exports = Plugin