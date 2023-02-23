import type { DrawCommands } from './Graphics';
import type { KeyframeData } from './Tween';
import type { DisplayObject } from '@pixi/display';
import type { Renderer } from '@pixi/core';
export declare namespace utils {
    /**
     * Convert the Hexidecimal string (e.g., "#fff") to uint
     */
    function hexToUint(hex: string): number;
    /**
     * Fill frames with booleans of true (showing) and false (hidden).
     * @param timeline -
     * @param startFrame - The start frame when the timeline shows up
     * @param duration - The length of showing
     */
    function fillFrames(timeline: boolean[], startFrame: number, duration: number): void;
    /**
     * Convert serialized array into keyframes
     * `"0x100y100 1x150"` to: `{ "0": {"x":100, "y": 100}, "1": {"x": 150} }`
     * @param keyframes -
     * @return Resulting keyframes
     */
    function deserializeKeyframes(keyframes: string): {
        [s: number]: KeyframeData;
    };
    /**
     * Convert serialized shapes into draw commands for PIXI.Graphics.
     * @param str -
     */
    function deserializeShapes(str: string): DrawCommands[];
    /**
     * Add movie clips to the upload prepare.
     * @param item - item To add to the queue
     */
    function addMovieClips(item: any): boolean;
    /**
     * Upload all the textures and graphics to the GPU.
     * @param renderer - Render to upload to
     * @param clip - MovieClip to upload
     * @param done - When complete
     */
    function upload(renderer: Renderer, displayObject: DisplayObject, done: () => void): void;
}
