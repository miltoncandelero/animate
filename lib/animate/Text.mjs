import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { Text } from '@pixi/text';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { utils } from './utils.mjs';

var ALIGN_VALUES = /* @__PURE__ */ ((ALIGN_VALUES2) => {
  ALIGN_VALUES2[ALIGN_VALUES2["center"] = 0] = "center";
  ALIGN_VALUES2[ALIGN_VALUES2["right"] = 1] = "right";
  ALIGN_VALUES2[ALIGN_VALUES2["left"] = -1] = "left";
  return ALIGN_VALUES2;
})(ALIGN_VALUES || {});
const STYLE_PROPS = {
  o: "font",
  // TODO: deprecate in Pixi v4
  z: "fontSize",
  f: "fontFamily",
  y: "fontStyle",
  g: "fontWeight",
  i: "fill",
  a: "align",
  s: "stroke",
  t: "strokeThickness",
  w: "wordWrap",
  d: "wordWrapWidth",
  l: "lineHeight",
  h: "dropShadow",
  c: "dropShadowColor",
  n: "dropShadowAngle",
  b: "dropShadowBlur",
  p: "padding",
  x: "textBaseline",
  j: "lineJoin",
  m: "miterLimit",
  e: "letterSpacing"
};
function isUndefinedOr(value, defaultValue) {
  return value === void 0 ? defaultValue : value;
}
class AnimateText extends Text {
  constructor() {
    super(...arguments);
    /**
     * Shortcut for `setAlign`.
     */
    this.g = this.setAlign;
    /**
     * Shortcut for `setStyle`.
     */
    this.ss = this.setStyle;
    /**
     * Shortcut for `setShadow`.
     */
    this.sh = this.setShadow;
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
  //     Text methods
  // **************************
  /**
   * Setter for the alignment, also sets the anchor point
   * to make sure the positioning is correct.
   * @param align - Either center (0), right (1), left (-1)
   * @return This instance for chaining
   */
  setAlign(align) {
    if (typeof align === "string") {
      align = ALIGN_VALUES[align];
    }
    this.style.align = ALIGN_VALUES[align] || "left";
    this.anchor.x = (align + 1) / 2;
    return this;
  }
  /**
   * Set the style, a chainable version of style setter
   * @param style -
   * @return This instance for chaining.
   */
  // TODO: improve typing of style parameter - (needs ITextStyle interface to exist)
  setStyle(style) {
    for (const k in STYLE_PROPS) {
      if (style[k] !== void 0) {
        style[STYLE_PROPS[k]] = style[k];
        delete style[k];
      }
    }
    this.style = style;
    return this;
  }
  /**
   * Initial setting of the drop shadow.
   * @param color - The color to set
   * @param angle - The angle of offset, in radians
   * @param distance - The offset distance
   * @return This instance for chaining
   */
  setShadow(color, angle, distance) {
    const style = this.style;
    style.dropShadow = true;
    if (color && typeof color === "number") {
      color = `#${color.toString(16)}`;
    }
    style.dropShadowColor = isUndefinedOr(color, style.dropShadowColor);
    style.dropShadowAngle = isUndefinedOr(angle, style.dropShadowAngle);
    style.dropShadowDistance = isUndefinedOr(distance, style.dropShadowDistance);
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
      if (!(mask instanceof Graphics) && !(mask instanceof Sprite)) {
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
      tint = utils.hexToUint(tint);
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
   * The current default color transforming filter
   */
  set colorTransformFilter(filter) {
    this._colorTransformFilter = filter;
  }
  get colorTransformFilter() {
    return this._colorTransformFilter || new ColorMatrixFilter();
  }
}

export { AnimateText };
//# sourceMappingURL=Text.mjs.map
