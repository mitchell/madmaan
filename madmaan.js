
const parse = require('./syntax/parser.js');
const fs = require('fs');

const argv = require('yargs')
  .usage('Usage: $0 <command> [file]')
  .command('parse', 'Parses program into an AST.')
  .boolean('v')
  .describe('v', 'Print version of the program.')
  .alias('v', 'version')
  .help('h', 'Show help.')
  .alias('h', 'help')
  .argv;

switch (argv._[0]) {
  case 'parse': {
    const inFile = fs.readFileSync(argv._[1], 'utf8');
    const ast = parse(inFile);
    console.log(ast); // eslint-disable-line no-console
    break;
  }
  default:
    break;
}

if (argv.v === true) {
  console.log('v1.0.0'); // eslint-disable-line no-console
}
