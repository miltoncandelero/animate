import { utils } from './utils.mjs';
import { Assets } from '@pixi/assets';
import { Texture } from '@pixi/core';
import { Spritesheet } from '@pixi/spritesheet';

const EXPECTED_ASSET_VERSION = 2;
function load(scene, optionsOrComplete) {
  const complete = typeof optionsOrComplete === "function" ? optionsOrComplete : optionsOrComplete?.complete;
  let basePath = "";
  let parent = null;
  let metadata;
  let createInstance = false;
  const { version } = scene;
  if (typeof version === "number") {
    if (Math.floor(version) !== Math.floor(EXPECTED_ASSET_VERSION)) {
      console.warn(`Asset version is not the major version expected of ${Math.floor(EXPECTED_ASSET_VERSION)} - it may not load properly`, scene);
    } else if (version > EXPECTED_ASSET_VERSION) {
      console.warn("Asset has been published with a newer version than PixiAnimate expects. It may not load properly.", scene);
    }
  }
  if (optionsOrComplete && typeof optionsOrComplete !== "function") {
    basePath = optionsOrComplete.basePath || "";
    parent = optionsOrComplete.parent;
    metadata = optionsOrComplete.metadata;
    createInstance = !!optionsOrComplete.createInstance;
  }
  function done() {
    const instance = createInstance && typeof scene.stage === "function" ? new scene.stage() : null;
    if (parent && instance) {
      parent.addChild(instance);
    }
    if (complete) {
      complete(instance);
    }
  }
  const assets = scene.assets || {};
  if (assets && Object.keys(assets).length) {
    const promises = [];
    if (basePath) {
      basePath += "/";
    }
    for (const id in assets) {
      let data = null;
      if (metadata) {
        if (metadata[id]) {
          data = metadata[id];
        } else if (metadata.default) {
          data = metadata.default;
        }
      }
      promises.push(Assets.load({ alias: [id], src: basePath + assets[id], data }).then((loadedAsset) => {
        if (!loadedAsset) {
          return;
        }
        if (loadedAsset instanceof Spritesheet) {
          scene.spritesheets.push(loadedAsset);
        } else if (loadedAsset instanceof Texture) {
          scene.textures[id] = loadedAsset;
        } else if (Array.isArray(loadedAsset) || typeof loadedAsset === "string") {
          let items = loadedAsset;
          if (typeof items === "string") {
            items = utils.deserializeShapes(items);
          }
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            for (let j = 0; j < item.length; j++) {
              const arg = item[j];
              if (typeof arg === "string" && arg[0] === "#") {
                item[j] = utils.hexToUint(arg);
              }
            }
          }
          scene.shapes[id] = items;
        }
      }));
    }
    Promise.all(promises).then(done);
  } else {
    done();
  }
}

export { load };
//# sourceMappingURL=load.mjs.map
