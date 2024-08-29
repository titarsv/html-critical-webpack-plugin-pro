# HTML Critical Webpack Plugin Pro

This plugin extracts critical CSS and runs after all files have been emitted so you can use it after Mini CSS Extract Plugin and HTML Webpack Plugin. 

## Installation

```
npm i --save-dev html-critical-webpack-plugin-pro
```

> **Note**: [As **critical** itself has a dependency on puppeteer](https://github.com/addyosmani/critical/releases/tag/v1.0.0) in order to run Headless Chrome, consumers of this plugin will need to make sure that their build environment (local, CI, etc) where they are running Webpack with this plugin has the necessary operating system packages installed.  See this page for more information on [troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) puppeteer.

## Example

```js
...

const HtmlCriticalWebpackPluginPro = require("html-critical-webpack-plugin-pro");

module.exports = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({ ... }),
    new MiniCssExtractPlugin({ ... }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
	  excludedSources: [
		'excluded.css'
	  ]
    })
  ]
  ...
};
```

**Note:** Order is import here since [**critical**](https://www.npmjs.com/package/critical), the underlying package used by this plugin, only operates against the _file system_, and not against **webpack**'s build time compilation.  The order of operations by critical is as such:
1. Reads the file from disk as defined by the _src_ option
2. Extracts the CSS from that file that is deemed as "critical"
3. Writes the new file back to disk with that critical CSS inlined, at the location of the _dest_ option

## Development

### Workflows

1. To run unit tests - `npm run test`
1. To build the project - `npm run ci`
1. To build the project for release - `npm run build`
