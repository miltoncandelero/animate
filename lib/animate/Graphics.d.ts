import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { Graphics, GraphicsGeometry, ILineStyleOptions } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
export type DrawCommands = (string | number)[];
export declare class AnimateGraphics extends Graphics {
    constructor(geometry?: GraphicsGeometry);
    /**
     * Execute a series of commands, this is the name of the short function
     * followed by the parameters -, e.g., `["f", "#ff0000", "r", 0, 0, 100, 200]`
     * @param commands - The commands and parameters - to draw
     * @return This instance for chaining.
     */
    drawCommands(commands: DrawCommands): this;
    /**
     * Shortcut for `drawCommands`.
     */
    d: (commands: DrawCommands) => this;
    /**
     * Shortcut for `closePath`.
     **/
    cp: () => this;
    /**
     * Shortcut for `beginHole`
     **/
    bh: () => this;
    /**
     * Shortcut for `endHole`
     **/
    eh: () => this;
    /**
     * Shortcut for `moveTo`.
     **/
    m: (x: number, y: number) => this;
    /**
     * Shortcut for `lineTo`.
     **/
    l: (x: number, y: number) => this;
    /**
     * Shortcut for `quadraticCurveTo`.
     **/
    q: (cpX: number, cpY: number, toX: number, toY: number) => this;
    /**
     * Shortcut for `bezierCurveTo`.
     **/
    b: (cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number) => this;
    /**
     * Shortcut for `beginFill`.
     **/
    f: (color?: number, alpha?: number) => this;
    /**
     * Shortcut for `lineStyle`.
     **/
    s(width: number, color?: number, alpha?: number, alignment?: number, native?: boolean): this;
    s(options?: ILineStyleOptions): this;
    /**
     * Shortcut for `drawRect`.
     **/
    dr: (x: number, y: number, width: number, height: number) => this;
    /**
     * Shortcut for `drawRoundedRect`.
     **/
    rr: (x: number, y: number, width: number, height: number, radius: number) => this;
    /**
     * Shortcut for `drawRoundedRect`.
     **/
    rc: (x: number, y: number, width: number, height: number, radius: number) => this;
    /**
     * Shortcut for `drawCircle`.
     **/
    dc: (x: number, y: number, radius: number) => this;
    /**
     * Shortcut for `arc`.
     **/
    ar: (cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) => this;
    /**
     * Shortcut for `arcTo`.
     **/
    at: (x1: number, y1: number, x2: number, y2: number, radius: number) => this;
    /**
     * Shortcut for `drawEllipse`.
     */
    de: (x: number, y: number, width: number, height: number) => this;
    /**
     * Placeholder method for a linear gradient fill. Pixi does not support linear gradient fills,
     * so we just pick the first color in colorArray
     * @param colorArray - An array of CSS compatible color values @see `f`
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    lf(colorArray: number[]): this;
    /**
     * Placeholder method for a radial gradient fill. Pixi does not support radial gradient fills,
     * so we just pick the first color in colorArray
     * @param colorArray - An array of CSS compatible color values @see `f`
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    rf(colorArray: number[]): this;
    /**
     * Placeholder method for a `beginBitmapFill`. Pixi does not support bitmap fills.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    bf(): this;
    /**
     * Placeholder method for a `setStrokeDash`. Pixi does not support dashed strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    sd(): this;
    /**
     * Placeholder method for a `beginBitmapStroke`. Pixi does not support bitmap strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    bs(): this;
    /**
     * Placeholder method for a `beginLinearGradientStroke`. Pixi does not support gradient strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    ls(): this;
    /**
     * Placeholder method for a `beginRadialGradientStroke`. Pixi does not support gradient strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    rs(): this;
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
    c(r: number, rA: number, g: number, gA: number, b: number, bA: number): this;
    protected _colorTransformFilter: ColorMatrixFilter;
    /**
     * The current default color transforming filter
     */
    set colorTransformFilter(filter: ColorMatrixFilter);
    get colorTransformFilter(): ColorMatrixFilter;
}
