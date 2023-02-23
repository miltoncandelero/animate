import type { Container } from '@pixi/display';
import type { AnimateAsset } from '../AnimateAsset';
import type { MovieClip } from './MovieClip';
type Complete = (instance: MovieClip | null) => void;
export interface LoadOptions {
    /**
     * The Container to auto-add the stage to, if createInstance is true.
     */
    parent?: Container;
    /**
     * Callback for load completion.
     */
    complete?: Complete;
    /**
     * Base root directory
     */
    basePath?: string;
    /**
     * Enable or disable automatic instantiation of stage - defaults to false.
     */
    createInstance?: boolean;
    /**
     * Metadata to be handed off to the loader for assets that are loaded.
     */
    metadata?: any;
}
/**
 * Load the stage class and preload any assets
 * ```
 * import MyAsset from './myAsset.js';
 * let renderer = new PIXI.autoDetectRenderer(1280, 720);
 * let stage = new PIXI.Container();
 * PIXI.animate.load(MyAsset, function(asset){
 *     stage.addChild(new asset.stage());
 * });
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @param scene - Reference to the scene data.
 * @param complete - The callback function when complete.
 * @return instance of PIXI resource loader
 */
export declare function load(scene: AnimateAsset, complete?: Complete): void;
/**
 * Load the stage class and preload any assets
 * ```
 * import MyAsset from './myAsset.js';
 * let basePath = 'file:/path/to/assets';
 * let renderer = new PIXI.Renderer(1280, 720);
 *
 * let extensions = PIXI.compressedTextures.detectExtensions(renderer);
 * let loader = new PIXI.Loader();
 * // this is an example of setting up a pre loader plugin to handle compressed textures in this case
 * loader.pre(PIXI.compressedTextures.extensionChooser(extensions));
 *
 * // specify metadata this way if you want to provide a default loading strategy for all assets listed in the PIXI animation
 * let metadata = { default: { metadata: { imageMetadata: { choice: ['.crn'] } } } };
 * // specify metadata this way if you want to provide a specific loading strategy for a
 * // certain asset listed inside the PIXI animation library
 * let metadata = { MyStage_atlas_1: { metadata: { imageMetadata: { choice: ['.crn'] } } } };
 *
 * let stage = new PIXI.Container();
 * PIXI.animate.load(MyAsset, {
 *     parent: stage,
 *     complete: ()=>{},
 *     basePath: basePath,
 *     loader: loader,
 *     metadata: metadata
 * });
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @param scene - Reference to the scene data.
 * @param options - Options for loading.
 * @return instance of PIXI resource loader
 */
export declare function load(scene: AnimateAsset, options: LoadOptions): void;
export {};
