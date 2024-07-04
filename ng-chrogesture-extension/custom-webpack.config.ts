import type { Configuration } from 'webpack';

module.exports = {
  entry: { 
    background: { import: 'src/chrome-extensions/background.ts', runtime: false },
    content_script: { import: 'src/chrome-extensions/content_script.ts', runtime: false },
    options: { import: 'src/chrome-extensions/options.ts', runtime: false },
    popup: { import: 'src/chrome-extensions/popup.ts', runtime: false },
 },
} as Configuration;
