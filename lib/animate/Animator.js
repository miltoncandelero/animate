'use strict';

var AnimatorTimeline = require('./AnimatorTimeline.js');

const timelines = [];
class Animator {
  /**
   * The collection of timelines
   */
  static get _timelines() {
    return timelines;
  }
  /**
   * Suffix added to label for a stop.
   */
  static get STOP_LABEL() {
    return "_stop";
  }
  /**
   * Suffix added to label for a loop.
   */
  static get LOOP_LABEL() {
    return "_loop";
  }
  static play(instance, label, callback) {
    let loop = false;
    let start;
    let end;
    if (!label || typeof label === "function") {
      start = 0;
      end = instance.totalFrames - 1;
      if (label && typeof label === "function") {
        callback = label;
        label = null;
      }
    } else {
      start = instance.labelsMap[label];
      end = instance.labelsMap[label + this.STOP_LABEL];
      if (end === void 0) {
        end = instance.labelsMap[label + this.LOOP_LABEL];
        loop = true;
      }
      if (start === void 0) {
        throw new Error(`No start label matching "${label}"`);
      } else if (end === void 0) {
        throw new Error(`No end label matching "${label}"`);
      }
    }
    return this.fromTo(
      instance,
      start,
      end,
      loop,
      callback
    );
  }
  /**
   * Play an animation from the current frame to an end frame or label.
   * @param instance - Movie clip to play.
   * @param end - The end frame or label.
   * @param callback - Optional callback when complete
   * @return Timeline object for stopping or getting progress.
   */
  static to(instance, end, callback) {
    return this.fromTo(
      instance,
      instance.currentFrame,
      end,
      false,
      callback
    );
  }
  /**
   * Play a MovieClip from a start to end frame.
   * @param instance - Movie clip to play.
   * @param start - The starting frame index or label.
   * @param end - The ending frame index or label.
   * @param loop - If the animation should loop.
   * @param callback - Optional callback when complete
   * @return Timeline object for stopping or getting progress.
   */
  static fromTo(instance, start, end, loop, callback) {
    if (typeof start === "string") {
      const startLabel = start;
      start = instance.labelsMap[startLabel];
      if (start === void 0) {
        throw new Error(`No start label matching "${startLabel}"`);
      }
    }
    if (typeof end === "string") {
      const endLabel = end;
      end = instance.labelsMap[endLabel];
      if (end === void 0) {
        throw new Error(`No end label matching "${endLabel}"`);
      }
    }
    if (start < 0) {
      throw new Error("Start frame is out of bounds");
    }
    if (end >= instance.totalFrames) {
      throw new Error("End frame is out of bounds");
    }
    if (start >= end) {
      throw new Error("End frame is before start frame");
    }
    this.stop(instance);
    loop = !!loop;
    const timeline = AnimatorTimeline.AnimatorTimeline.create(
      instance,
      start,
      end,
      loop,
      callback
    );
    this._timelines.push(timeline);
    if (instance.currentFrame !== start) {
      instance.gotoAndPlay(start);
    } else {
      instance.play();
    }
    return timeline;
  }
  /**
   * Stop the animation by instance.
   * @param instance - Movie clip to play.
   */
  static stop(instance) {
    for (let i = 0, len = this._timelines.length; i < len; i++) {
      const timeline = this._timelines[i];
      if (timeline.instance === instance) {
        this._internalStop(timeline);
        break;
      }
    }
  }
  /**
   * Stop all the currently playing animations.
   */
  static stopAll() {
    for (let i = this._timelines.length - 1; i >= 0; i--) {
      this._internalStop(this._timelines[i]);
    }
  }
  /**
   * Stop the animation
   * @private
   * @param timeline - Timeline to stop.
   */
  static _internalStop(timeline) {
    this._timelines.splice(this._timelines.indexOf(timeline), 1);
    timeline.instance.stop();
    timeline.destroy();
  }
}

exports.Animator = Animator;
//# sourceMappingURL=Animator.js.map
