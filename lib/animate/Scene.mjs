import { load } from './load.mjs';
import { sound } from './sound.mjs';
import { Application } from '@pixi/app';

class Scene extends Application {
  constructor() {
    super(...arguments);
    /**
     * Reference to the global sound object
     * @readOnly
     */
    this.sound = sound;
    /**
     * The stage object created.
     */
    this.instance = null;
  }
  /**
   * Load a stage scene and add it to the stage.
   * @param asset - Reference to the scene to load.
   * @param complete - Callback when finished loading.
   * @param basePath - Optional base directory to prepend to assets.
   * @return instance of PIXI resource loader
   */
  load(asset, complete, basePath) {
    return load(asset, {
      parent: this.stage,
      createInstance: true,
      complete: (instance) => {
        this.instance = instance;
        if (complete) {
          complete(this.instance);
        }
      },
      basePath
    });
  }
  /**
   * Destroy and don't use after calling.
   * @param removeView - Automatically remove canvas from DOM.
   * @param stageOptions - Options parameter. A boolean will act as if all options
   *  have been set to that value
   */
  destroy(removeView, stageOptions) {
    if (this.instance) {
      this.instance.destroy(true);
      this.instance = null;
    }
    super.destroy(removeView, stageOptions);
  }
}

export { Scene };
//# sourceMappingURL=Scene.mjs.map
