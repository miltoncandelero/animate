import { Tween } from './Tween.mjs';

class Timeline extends Array {
  // exists to be private to prevent usage
  constructor() {
    super();
  }
  /**
   * Creates a new Timeline. Must be used instead of a constructor because extending the Array
   * class is a pain: https://blog.simontest.net/extend-array-with-typescript-965cc1134b3
   * @param target - The target for this string of tweens.
   * @returns A new Timeline instance.
   */
  static create(target) {
    const out = Object.create(Timeline.prototype);
    out.target = target;
    out._currentProps = {};
    return out;
  }
  /**
   * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to
   * remove them from the normal ticking system and managed by this timeline. Adding a tween to
   * multiple timelines will result in unexpected behaviour.
   * @param tween - The tween(s) to add. Accepts multiple arguments.
   * @return Tween The first tween that was passed in.
   */
  addTween(properties, startFrame, duration, ease) {
    this.extendLastFrame(startFrame - 1);
    const startProps = Object.assign({}, this._currentProps);
    for (const prop in properties) {
      const p = prop;
      if (!Object.hasOwnProperty.call(this._currentProps, prop)) {
        const startValue = startProps[p] = this.getPropFromShorthand(p);
        for (let i = this.length - 1; i >= 0; --i) {
          this[i].startProps[p] = startValue;
          this[i].endProps[p] = startValue;
        }
      }
    }
    const tween = new Tween(this.target, startProps, properties, startFrame, duration, ease);
    if (startFrame === this[this.length - 1].startFrame) {
      this[this.length - 1] = tween;
    } else {
      this.push(tween);
    }
    Object.assign(this._currentProps, tween.endProps);
  }
  /**
   * Add a single keyframe that doesn't tween.
   * Note that this has some capability to insert keyframes into the middle of a timeline, in order to
   * handle how masks are published, it should only be relied upon to add keyframes to the end of a timeline.
   * @param properties - The properties to set.
   * @param startFrame - The starting frame index.
   * @param duration - The number of frames to hold beyond startFrame (0 is single frame)
   */
  addKeyframe(properties, startFrame, duration = 0) {
    if (this.length && this[this.length - 1].startFrame >= startFrame) {
      for (let i = this.length - 1; i >= 0; --i) {
        const prev = this[i];
        if (prev.startFrame === startFrame) {
          Object.assign(prev.startProps, properties);
          prev.endProps = Object.assign({}, prev.startProps, prev.endProps);
          for (let k = i + 1; k < this.length; ++k) {
            const next = this[k];
            next.startProps = Object.assign({}, properties, next.startProps);
            next.endProps = Object.assign({}, next.startProps, next.endProps);
          }
          break;
        } else if (prev.startFrame < startFrame && prev.endFrame > startFrame && prev.isTweenlessFrame) {
          prev.endFrame = startFrame - 1;
          const startProps = Object.assign({}, prev.endProps, properties);
          const tween = new Tween(this.target, startProps, null, startFrame, duration);
          this.splice(i, 0, tween);
          for (let k = i + 1; k < this.length; ++k) {
            const next = this[k];
            next.startProps = Object.assign({}, properties, next.startProps);
            next.endProps = Object.assign({}, next.startProps, next.endProps);
          }
          break;
        } else if (prev.endFrame < startFrame) {
          const startProps = Object.assign({}, prev.endProps, properties);
          const tween = new Tween(this.target, startProps, null, startFrame, duration);
          this.splice(i, 0, tween);
          for (let k = i + 1; k < this.length; ++k) {
            const next = this[k];
            next.startProps = Object.assign({}, properties, next.startProps);
            next.endProps = Object.assign({}, next.startProps, next.endProps);
          }
          break;
        }
      }
      Object.assign(this._currentProps, properties, this._currentProps);
    } else {
      this.extendLastFrame(startFrame - 1);
      const startProps = Object.assign({}, this._currentProps, properties);
      const tween = new Tween(this.target, startProps, null, startFrame, duration);
      this.push(tween);
      Object.assign(this._currentProps, tween.endProps);
    }
  }
  /**
   * Extend the last frame of the tween.
   * @param endFrame - The ending frame index.
   */
  extendLastFrame(endFrame) {
    if (this.length) {
      const prevTween = this[this.length - 1];
      if (prevTween.endFrame < endFrame) {
        if (prevTween.isTweenlessFrame) {
          prevTween.endFrame = endFrame;
          prevTween.duration = endFrame - prevTween.startFrame;
        } else {
          this.addKeyframe(
            this._currentProps,
            prevTween.endFrame + 1,
            endFrame - (prevTween.endFrame + 1)
          );
        }
      }
    }
  }
  /**
   * Get the value for a property
   * @param prop
   */
  getPropFromShorthand(prop) {
    const target = this.target;
    switch (prop) {
      case "x":
        return target.position.x;
      case "y":
        return target.position.y;
      case "sx":
        return target.scale.x;
      case "sy":
        return target.scale.y;
      case "kx":
        return target.skew.x;
      case "ky":
        return target.skew.y;
      case "r":
        return target.rotation;
      case "a":
        return target.alpha;
      case "v":
        return target.visible;
      case "m":
        return target.mask;
    }
    return null;
  }
  destroy() {
    this._currentProps = null;
    this.length = 0;
  }
}

export { Timeline };
//# sourceMappingURL=Timeline.mjs.map
