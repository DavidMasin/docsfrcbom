Quick fix for Prism theme error
===============================

If you get:
  Cannot find module 'prism-react-renderer/themes/github'

Option A (recommended):
  npm i prism-react-renderer@^2.3.1 --save

Option B (no extra dependency):
  Rename docusaurus.config.js.bare -> docusaurus.config.js
  (or copy its contents over your config). This version removes the Prism theme
  imports and uses Docusaurus defaults.
