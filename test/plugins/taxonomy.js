var Plugin = function(options) {
  options = options || {};

  return function(files, metalsmith, done) {
    if (!Array.isArray(options.collections) || options.collections.length === 0) {
      done(new Error('Taxonomy: No collection(s) specified'));
    }
    var metadata = metalsmith.metadata();

    var singular = {
      tags: 'Tag', categories: 'Category'
    };

    var taxonomies = {
      tags: {},
      categories: {}
    };

    options.collections.forEach(function(colName) {
      var col = metadata.collections[colName];
      col.forEach(function(item) {
        for (var taxonomy in taxonomies) {
          if (item[taxonomy]) {
            item[taxonomy].forEach(function(term) {
              term = term.toLowerCase();
              if (!taxonomies[taxonomy][term]) taxonomies[taxonomy][term] = []
              taxonomies[taxonomy][term].push(item);
            });
          }
        }
      });
    });

    metadata.taxonomies = taxonomies;

    for (var taxonomy in taxonomies) {
      for (var term in taxonomies[taxonomy]) {
        var termTitle = term[0].toUpperCase() + term.substring(1);
        files['/' + taxonomy + '/' + term + '/index.html'] = {
          template: 'taxonomy/index.jade',
          contents: '',
          mode: '0644',
          title: singular[taxonomy] + ': ' + termTitle,
          taxonomy: {
            typeTitle: singular[taxonomy],
            type: taxonomy,
            items: taxonomies[taxonomy][term],
            term: termTitle
          }
        };
      }
    }

    done();
  };
};

module.exports = Plugin