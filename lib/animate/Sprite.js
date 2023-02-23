'use strict';

var sprite = require('@pixi/sprite');
var graphics = require('@pixi/graphics');
var filterColorMatrix = require('@pixi/filter-color-matrix');
var utils = require('./utils.js');

class AnimateSprite extends sprite.Sprite {
  constructor() {
    super(...arguments);
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
    /**
     * Shortcut for `setColor`.
     */
    this.c = this.setColorTransform;
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
    this.tint = tint;
    return this;
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
   * The current default color transforming filter
   */
  set colorTransformFilter(filter) {
    this._colorTransformFilter = filter;
  }
  get colorTransformFilter() {
    return this._colorTransformFilter || new filterColorMatrix.ColorMatrixFilter();
  }
}

exports.AnimateSprite = AnimateSprite;
//# sourceMappingURL=Sprite.js.map
