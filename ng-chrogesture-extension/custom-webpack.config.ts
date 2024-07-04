import type { Configuration } from 'webpack';

module.exports = {
  entry: { 
    background: { import: 'src/extension/background.ts', runtime: false },
    content_script: { import: 'src/extension/content_script.ts', runtime: false },
    options: { import: 'src/extension/options.ts', runtime: false },
    popup: { import: 'src/extension/popup.ts', runtime: false },
 },
} as Configuration;
