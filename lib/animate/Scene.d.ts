import type { MovieClip } from './MovieClip';
import { Application } from '@pixi/app';
import type { EventEmitter } from '@pixi/utils';
import type { IDestroyOptions } from '@pixi/display';
import type { AnimateAsset } from '../AnimateAsset';
/**
 * Extends the PIXI.Application class to provide easy loading.
 * ```
 * const scene = new PIXI.animate.Scene();
 * scene.load(lib.StageName);
 * ```
 */
export declare class Scene extends Application {
    /**
     * Reference to the global sound object
     * @readOnly
     */
    readonly sound: EventEmitter;
    /**
     * The stage object created.
     */
    instance: MovieClip;
    /**
     * Load a stage scene and add it to the stage.
     * @param asset - Reference to the scene to load.
     * @param complete - Callback when finished loading.
     * @param basePath - Optional base directory to prepend to assets.
     * @return instance of PIXI resource loader
     */
    load(asset: AnimateAsset, complete?: (instance?: MovieClip) => void, basePath?: string): void;
    /**
     * Destroy and don't use after calling.
     * @param removeView - Automatically remove canvas from DOM.
     * @param stageOptions - Options parameter. A boolean will act as if all options
     *  have been set to that value
     */
    destroy(removeView?: boolean, stageOptions?: IDestroyOptions | boolean): void;
}
