var fs = require('fs');

module.exports = exports = function(optimizer, config) {
    optimizer.dependencies.registerJavaScriptType(
        'foo',
        {
            properties: {
                'path': 'string'
            },

            init: function() {
                if (!this.path) {
                    throw new Error('"path" is required for a less dependency');
                }

                this.path = this.resolvePath(this.path);
            },

            read: function(optimizerContext, callback) {
                // console.log(module.id, 'READ: ', this.path);
                module.exports.counter++;

                var path = this.path;

                fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, src.toUpperCase());
                });
            },

            getSourceFile: function() {
                return this.path;
            },

            lastModified: function(optimizerContext, callback) {
                return callback(null, -1);
            }
        });
};

module.exports.counter = 0;
