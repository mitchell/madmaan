const ohm = require('ohm-js');
const fs = require('fs');

/* eslint-disable no-unused-vars, no-useless-escape */
const madmaanGrammar = ohm.grammar(fs.readFile('./madmaan.ohm', (err, data) => {
  if (err) throw err;
  console.log(data); // eslint-disable-line no-console
}));
