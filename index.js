const fs = require( 'fs' );

module.exports = (opts = {}) => {

  let colorJson = opts.defaults || {};
  let colors = opts.colors || [
    '--slate',
    '--gray',
    '--zinc',
    '--neutral',
    '--stone',
    '--red',
    '--orange',
    '--amber',
    '--yellow',
    '--lime',
    '--green',
    '--emerald',
    '--teal',
    '--cyan',
    '--sky',
    '--blue',
    '--indigo',
    '--violet',
    '--purple',
    '--fuchsia',
    '--pink',
    '--rose',
    '--white',
    '--gray-dark'
  ];
  let output = opts.output || 'inc/editor-color-palette.json';

  return {
    postcssPlugin: 'postcss-understrap-palette-generator',
    prepare (result) {
      return {
        Declaration (decl) {
          if (colors.indexOf(decl.prop) > -1) {
            colorJson[decl.prop] = decl.value;
          }
        },
        OnceExit () {
          if (!(Object.keys(colorJson).length === 0)){
            fs.writeFile(output, JSON.stringify(colorJson), function(){});
          }
          return colorJson;
        }
      }
    }
  }
}
module.exports.postcss = true
