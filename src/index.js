const path = require('path');
const critical = require('critical');

class HtmlCriticalWebpackPlugin {

  constructor(options) {
    this.options = options;
  }

  emit(compilation, callback) {
    let options = this.options;
    const css = Object.keys(compilation.assets)
      .filter(function (filename) { return /\.css$/.test(filename) && (typeof options.excludedSources === 'undefined' || options.excludedSources.indexOf(filename) === -1); })
      .map(function (filename) { return path.join(compilation.outputOptions.path, filename); });

    critical.generate(Object.assign({ css }, this.options), (err) => {
      callback(err);
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('HtmlCriticalWebpackPlugin', (compilation, callback) => {
      this.emit(compilation, callback);
    });
  }
  
}

module.exports = HtmlCriticalWebpackPlugin;