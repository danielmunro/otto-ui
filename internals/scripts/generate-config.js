const fs = require('fs');
const { parse } = require('dotenv');

generateConfig({
  outFile: 'app/config.js',
  whitelist: ['API_ENDPOINT'],
  esm: true,
});

function generateConfig(opts) {
  // set up options
  const o = opts || {};
  const options = {
    outFile: o.outFile || 'config.js',
    readFile: o.readFile || '.env',
    whitelist: o.whitelist && o.whitelist.length ? o.whitelist : false,
  };

  // read values from .env file
  let valuesFromFile = {};
  if (fs.existsSync(options.readFile)) {
    valuesFromFile = parse(fs.readFileSync(options.readFile));
  }

  // delete the previous output file if it exists
  if (fs.existsSync(options.outFile)) {
    fs.unlinkSync(options.outFile);
  }

  fs.appendFileSync(options.outFile, 'export default ');

  // iterate over whitelist and build result
  const result = {};
  if (options.whitelist && Array.isArray(options.whitelist)) {
    options.whitelist.forEach(prop => {
      if (valuesFromFile[prop]) {
        result[prop] = valuesFromFile[prop];
      } else if (process.env[prop]) {
        result[prop] = process.env[prop];
      }
    });
  }

  // write the config file
  fs.appendFileSync(options.outFile,  `${JSON.stringify(result, null, 2)};\n`);
}
