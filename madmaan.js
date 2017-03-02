const ohm = require('ohm-js');
const fs = require('fs');

/* eslint-disable no-unused-vars, no-useless-escape */
const madmaanGrammar = ohm.grammar(fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
}));
