import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
};


export default JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
  ].Inbox;
