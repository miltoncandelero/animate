'use strict';

var Animator = require('./Animator.js');

const pool = [];
class AnimatorTimeline {
  constructor() {
    this._update = this.update.bind(this);
    this.init(null, 0, 0, false, null);
  }
  /**
   * The pool of timelines to use
   * @param instance
   * @param start
   * @param end
   * @param loop
   * @param callback
   */
  init(instance, start, end, loop, callback) {
    this.instance = instance;
    this.loop = loop;
    this.start = start;
    this.end = end;
    this.callback = callback;
    if (instance) {
      instance.loop = false;
      instance.gotoAndStop(start);
      instance._beforeUpdate = this._update;
    }
  }
  /**
   * Don't use after this
   * @private
   */
  destroy() {
    this.instance._beforeUpdate = null;
    this.init(null, 0, 0, false, null);
    AnimatorTimeline._pool.push(this);
  }
  /**
   * Is the animation complete
   * @param instance
   * @return Callback to do after updateTimeline
   * @private
   */
  update(instance) {
    let completed;
    if (instance.currentFrame >= this.end) {
      instance.currentFrame = this.end;
      if (this.loop) {
        instance._updateTimeline();
        instance.gotoAndPlay(this.start);
      } else {
        instance.stop();
        if (this.callback) {
          completed = this.callback;
        }
        this.stop();
      }
    }
    return completed;
  }
  /**
   * Stop the animation, cannot be reused.
   */
  stop() {
    Animator.Animator._internalStop(this);
  }
  /**
   * The progress from 0 to 1 of the playback.
   */
  get progress() {
    const progress = (this.instance.currentFrame - this.start) / (this.end - this.start);
    return Math.max(0, Math.min(1, progress));
  }
  /**
   * The pool of timelines to use
   * @private
   */
  static get _pool() {
    return pool;
  }
  /**
   * Create a new timeline
   */
  static create(instance, start, end, loop, callback) {
    let timeline;
    if (this._pool.length) {
      timeline = this._pool.pop();
    } else {
      timeline = new AnimatorTimeline();
    }
    timeline.init(instance, start, end, loop, callback);
    return timeline;
  }
}

exports.AnimatorTimeline = AnimatorTimeline;
//# sourceMappingURL=AnimatorTimeline.js.map
