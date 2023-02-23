import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';
import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
/**
 * Utility subclass of PIXI.Sprite
 */
export declare class AnimateSprite extends Sprite {
    /**
     * Function to set if this is renderable or not. Useful for setting masks.
     * @param renderable - Make renderable. Defaults to false.
     * @return This instance, for chaining.
     */
    setRenderable(renderable?: boolean): this;
    /**
     * Shortcut for `setRenderable`.
     */
    re: (renderable?: boolean) => this;
    /**
     * Shortcut for `setTransform`.
     */
    t: (x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, pivotX?: number, pivotY?: number) => this;
    /**
     * Setter for mask to be able to chain.
     * @param mask - The mask shape to use
     * @return Instance for chaining
     */
    setMask(mask: Graphics | Sprite): this;
    /**
     * Shortcut for `setMask`.
     */
    ma: (mask: Graphics | Sprite) => this;
    /**
     * Chainable setter for alpha
     * @param alpha - The alpha amount to use, from 0 to 1
     * @return Instance for chaining
     */
    setAlpha(alpha: number): this;
    /**
     * Shortcut for `setAlpha`.
     */
    a: (alpha: number) => this;
    /**
     * Set the tint values by color.
     * @param tint - The color value to tint
     * @return Object for chaining
     */
    setTint(tint: string | number): this;
    /**
     * Shortcut for `setTint`.
     */
    i: (tint: string | number) => this;
    /**
     * Set additive and multiply color, tinting
     * @param r - The multiply red value
     * @param rA - The additive red value
     * @param g - The multiply green value
     * @param gA - The additive green value
     * @param b - The multiply blue value
     * @param bA - The additive blue value
     * @return Object for chaining
     */
    setColorTransform(r: number, rA: number, g: number, gA: number, b: number, bA: number): this;
    /**
     * Shortcut for `setColor`.
     */
    c: (r: number, rA: number, g: number, gA: number, b: number, bA: number) => this;
    protected _colorTransformFilter: ColorMatrixFilter;
    /**
     * The current default color transforming filter
     */
    set colorTransformFilter(filter: ColorMatrixFilter);
    get colorTransformFilter(): ColorMatrixFilter;
}
