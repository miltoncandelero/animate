'use strict';

var filterColorMatrix = require('@pixi/filter-color-matrix');
var graphics = require('@pixi/graphics');
var sprite = require('@pixi/sprite');
var utils = require('./utils.js');

class AnimateGraphics extends graphics.Graphics {
  constructor(geometry) {
    super(geometry);
    /**
     * Shortcut for `drawCommands`.
     */
    this.d = this.drawCommands;
    /**
     * Shortcut for `closePath`.
     **/
    this.cp = super.closePath;
    /**
     * Shortcut for `beginHole`
     **/
    this.bh = super.beginHole;
    /**
     * Shortcut for `endHole`
     **/
    this.eh = super.endHole;
    /**
     * Shortcut for `moveTo`.
     **/
    this.m = super.moveTo;
    /**
     * Shortcut for `lineTo`.
     **/
    this.l = super.lineTo;
    /**
     * Shortcut for `quadraticCurveTo`.
     **/
    this.q = super.quadraticCurveTo;
    /**
     * Shortcut for `bezierCurveTo`.
     **/
    this.b = super.bezierCurveTo;
    /**
     * Shortcut for `beginFill`.
     **/
    this.f = super.beginFill;
    /**
     * Shortcut for `drawRect`.
     **/
    this.dr = super.drawRect;
    /**
     * Shortcut for `drawRoundedRect`.
     **/
    this.rr = super.drawRoundedRect;
    /**
     * Shortcut for `drawRoundedRect`.
     **/
    this.rc = super.drawRoundedRect;
    /**
     * Shortcut for `drawCircle`.
     **/
    this.dc = super.drawCircle;
    /**
     * Shortcut for `arc`.
     **/
    this.ar = super.arc;
    /**
     * Shortcut for `arcTo`.
     **/
    this.at = super.arcTo;
    /**
     * Shortcut for `drawEllipse`.
     */
    this.de = super.drawEllipse;
    /**
     * Shortcut for `setRenderable`.
     */
    this.re = this.setRenderable;
    /**
     * Shortcut for `setTransform`.
     */
    this.t = super.setTransform;
    /**
     * Shortcut for `setMask`.
     */
    this.ma = this.setMask;
    /**
     * Shortcut for `setAlpha`.
     */
    this.a = this.setAlpha;
    /**
     * Shortcut for `setTint`.
     */
    this.i = this.setTint;
    this.s = super.lineStyle;
  }
  // **************************
  //     Graphics methods
  // **************************
  /**
   * Execute a series of commands, this is the name of the short function
   * followed by the parameters -, e.g., `["f", "#ff0000", "r", 0, 0, 100, 200]`
   * @param commands - The commands and parameters - to draw
   * @return This instance for chaining.
   */
  drawCommands(commands) {
    let currentCommand;
    const params = [];
    let i = 0;
    while (i <= commands.length) {
      const item = commands[i++];
      if (item === void 0 || this[item]) {
        if (currentCommand) {
          this[currentCommand].apply(this, params);
          params.length = 0;
        }
        currentCommand = item;
      } else {
        params.push(item);
      }
    }
    return this;
  }
  s(...args) {
    return super.lineStyle(...args);
  }
  /**
   * Placeholder method for a linear gradient fill. Pixi does not support linear gradient fills,
   * so we just pick the first color in colorArray
   * @param colorArray - An array of CSS compatible color values @see `f`
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  lf(colorArray) {
    console.warn("Linear gradient fills are not supported");
    return this.f(colorArray[0]);
  }
  /**
   * Placeholder method for a radial gradient fill. Pixi does not support radial gradient fills,
   * so we just pick the first color in colorArray
   * @param colorArray - An array of CSS compatible color values @see `f`
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  rf(colorArray) {
    console.warn("Radial gradient fills are not supported");
    return this.f(colorArray[0]);
  }
  /**
   * Placeholder method for a `beginBitmapFill`. Pixi does not support bitmap fills.
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  bf() {
    console.warn("Bitmap fills are not supported");
    return this.f(0);
  }
  /**
   * Placeholder method for a `setStrokeDash`. Pixi does not support dashed strokes.
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  sd() {
    console.warn("Dashed strokes are not supported");
    return this;
  }
  /**
   * Placeholder method for a `beginBitmapStroke`. Pixi does not support bitmap strokes.
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  bs() {
    console.warn("Bitmap strokes are not supported");
    return this;
  }
  /**
   * Placeholder method for a `beginLinearGradientStroke`. Pixi does not support gradient strokes.
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  ls() {
    console.warn("Linear gradient strokes are not supported");
    return this;
  }
  /**
   * Placeholder method for a `beginRadialGradientStroke`. Pixi does not support gradient strokes.
   * @return The Graphics instance the method is called on (useful for chaining calls.)
   **/
  rs() {
    console.warn("Radial gradient strokes are not supported");
    return this;
  }
  // **************************
  //     DisplayObject methods
  // **************************
  /**
   * Function to set if this is renderable or not. Useful for setting masks.
   * @param renderable - Make renderable. Defaults to false.
   * @return This instance, for chaining.
   */
  setRenderable(renderable) {
    this.renderable = !!renderable;
    return this;
  }
  /**
   * Setter for mask to be able to chain.
   * @param mask - The mask shape to use
   * @return Instance for chaining
   */
  setMask(mask) {
    if (mask) {
      if (!(mask instanceof graphics.Graphics) && !(mask instanceof sprite.Sprite)) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects.");
        }
        return this;
      }
    }
    this.mask = mask;
    return this;
  }
  /**
   * Chainable setter for alpha
   * @param alpha - The alpha amount to use, from 0 to 1
   * @return Instance for chaining
   */
  setAlpha(alpha) {
    this.alpha = alpha;
    return this;
  }
  /**
   * Set the tint values by color.
   * @param tint - The color value to tint
   * @return Object for chaining
   */
  setTint(tint) {
    if (typeof tint === "string") {
      tint = utils.utils.hexToUint(tint);
    }
    const r = tint >> 16 & 255;
    const g = tint >> 8 & 255;
    const b = tint & 255;
    return this.setColorTransform(r / 255, 0, g / 255, 0, b / 255, 0);
  }
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
  setColorTransform(r, rA, g, gA, b, bA) {
    const filter = this.colorTransformFilter;
    filter.matrix[0] = r;
    filter.matrix[4] = rA;
    filter.matrix[6] = g;
    filter.matrix[9] = gA;
    filter.matrix[12] = b;
    filter.matrix[14] = bA;
    this.filters = [filter];
    return this;
  }
  /**
   * Shortcut for `setColor`.
   */
  // method instead of direct reference to allow override in v1 shim
  c(r, rA, g, gA, b, bA) {
    return this.setColorTransform(r, rA, g, gA, b, bA);
  }
  /**
   * The current default color transforming filter
   */
  set colorTransformFilter(filter) {
    this._colorTransformFilter = filter;
  }
  get colorTransformFilter() {
    return this._colorTransformFilter || new filterColorMatrix.ColorMatrixFilter();
  }
}

exports.AnimateGraphics = AnimateGraphics;
//# sourceMappingURL=Graphics.js.map
