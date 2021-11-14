import { p as patchBrowser, b as bootstrapLazy } from './index-844e35db.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["stellar-loader",[[1,"stellar-loader",{"interval":[8],"chances":[32],"chance":[32]}]]],["stellar-prompt",[[1,"stellar-prompt",{"prompter":[1040],"input":[32]}]]],["stellar-wallet",[[1,"stellar-wallet",{"server":[16],"account":[32],"prompter":[32],"loading":[32],"error":[32]}]]]], options);
});
