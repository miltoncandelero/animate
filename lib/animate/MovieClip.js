'use strict';

var Timeline = require('./Timeline.js');
var Tween = require('./Tween.js');
var utils = require('./utils.js');
var sound = require('./sound.js');
var Container = require('./Container.js');
var ticker = require('@pixi/ticker');
var settings = require('@pixi/settings');

const SharedTicker = ticker.Ticker.shared;
const _MovieClip = class extends Container.AnimateContainer {
  constructor(options, duration, loop, framerate, labels) {
    super();
    /**
     * Fast way of checking if a movie clip is actually a movie clip.
     * Prevents circular references and is faster than instanceof.
     */
    this.isMovieClip = true;
    /**
     * Shortcut alias for `addTimedMask`
     */
    this.am = this.addTimedMask;
    /**
     * Shortcut alias for `addTween`
     */
    this.tw = this.addTween;
    /**
     * Alias for method `addTimedChild`
     */
    this.at = this.addTimedChild;
    /**
     * Short cut for `addAction`
     */
    this.aa = this.addAction;
    /**
     * Short cut for `playSound`
     */
    this.ps = this.playSound;
    options = options === void 0 ? {} : options;
    if (typeof options === "number") {
      options = {
        mode: options || _MovieClip.INDEPENDENT,
        duration: duration || 0,
        loop: loop === void 0 ? true : loop,
        labels: labels || {},
        framerate: framerate || 0,
        startPosition: 0
      };
    } else {
      options = Object.assign({
        mode: _MovieClip.INDEPENDENT,
        startPosition: 0,
        loop: true,
        labels: {},
        duration: 0,
        framerate: 0
      }, options);
    }
    this.mode = options.mode;
    this.startPosition = options.startPosition;
    this.loop = !!options.loop;
    this.currentFrame = 0;
    this._labels = [];
    this._labelDict = options.labels;
    if (options.labels) {
      for (const name in options.labels) {
        const label = {
          label: name,
          position: options.labels[name]
        };
        this._labels.push(label);
      }
      this._labels.sort((a, b) => a.position - b.position);
    }
    this.selfAdvance = true;
    this.paused = false;
    this.actionsEnabled = true;
    this.autoReset = true;
    this._synchOffset = 0;
    this._prevPos = -1;
    this._t = 0;
    this._framerate = options.framerate;
    this._duration = 0;
    this._totalFrames = options.duration;
    this._timelines = [];
    this._timedChildTimelines = [];
    this._depthSorted = [];
    this._actions = [];
    this._beforeUpdate = null;
    this.parentStartPosition = 0;
    if (this.mode === _MovieClip.INDEPENDENT) {
      this._tickListener = this._tickListener.bind(this);
      this._onAdded = this._onAdded.bind(this);
      this._onRemoved = this._onRemoved.bind(this);
      this.on("added", this._onAdded);
      this.on("removed", this._onRemoved);
    }
    if (options.framerate) {
      this.framerate = options.framerate;
    }
    this.advance = this.advance;
    this._updateTimeline = this._updateTimeline;
    this._setTimelinePosition = this._setTimelinePosition;
    this._goto = this._goto;
  }
  _onAdded() {
    if (!this._framerate) {
      this.framerate = this.parentFramerate;
    }
    SharedTicker.add(this._tickListener, null);
  }
  _tickListener(tickerDeltaTime) {
    if (this.paused || !this.selfAdvance) {
      if (this._prevPos < 0) {
        this._goto(this.currentFrame);
      }
      return;
    }
    const seconds = tickerDeltaTime / settings.settings.TARGET_FPMS / 1e3;
    this.advance(seconds);
  }
  _onRemoved() {
    SharedTicker.remove(this._tickListener, null);
  }
  /**
   * Returns an array of objects with label and position (aka frame) properties, sorted by position.
   */
  get labels() {
    return this._labels;
  }
  /**
   * Returns a dictionary of labels where key is the label and value is the frame.
   */
  get labelsMap() {
    return this._labelDict;
  }
  /**
   * Returns the name of the label on or immediately before the current frame.
   */
  get currentLabel() {
    const labels = this._labels;
    let current = null;
    for (let i = 0, len = labels.length; i < len; ++i) {
      if (labels[i].position <= this.currentFrame) {
        current = labels[i].label;
      } else {
        break;
      }
    }
    return current;
  }
  /**
   * When the MovieClip is framerate independent, this is the time elapsed from frame 0 in seconds.
   */
  get elapsedTime() {
    return this._t;
  }
  set elapsedTime(value) {
    this._t = value;
  }
  /**
   * By default MovieClip instances advance one frame per tick. Specifying a framerate for the
   * MovieClip will cause it to advance based on elapsed time between ticks as appropriate to
   * maintain the target framerate.
   *
   * For example, if a MovieClip with a framerate of 10 is placed on a Stage being updated at
   * 40fps, then the MovieClip advance roughly one frame every 4 ticks. This will not be exact,
   * because the time between each tick vary slightly between frames.
   *
   * This feature is dependent on the tick event object (or an object with an appropriate 'delta' property) being
   * passed into {{#crossLink 'Stage/update'}}{{/crossLink}}.
   */
  get framerate() {
    return this._framerate;
  }
  set framerate(value) {
    if (value > 0) {
      if (this._framerate) {
        this._t *= this._framerate / value;
      } else {
        this._t = this.currentFrame / value;
      }
      this._framerate = value;
      this._duration = value ? this._totalFrames / value : 0;
    } else {
      this._t = this._framerate = this._duration = 0;
    }
  }
  /**
   * Get the total number of frames (duration) of this MovieClip
   */
  get totalFrames() {
    return this._totalFrames;
  }
  /**
   * Extend the timeline to the last frame.
   */
  _autoExtend(endFrame) {
    if (this._totalFrames < endFrame) {
      this._totalFrames = endFrame;
    }
  }
  /**
   * Convert values of properties
   */
  _parseProperties(properties) {
    if (typeof properties.t === "string") {
      properties.t = utils.utils.hexToUint(properties.t);
    } else if (typeof properties.v === "number") {
      properties.v = !!properties.v;
    }
  }
  /**
   * Get a timeline for a child, synced timeline.
   */
  _getChildTimeline(instance) {
    for (let i = this._timelines.length - 1; i >= 0; --i) {
      if (this._timelines[i].target === instance) {
        return this._timelines[i];
      }
    }
    const timeline = Timeline.Timeline.create(instance);
    this._timelines.push(timeline);
    return timeline;
  }
  /**
   * Add mask or masks
   */
  addTimedMask(instance, keyframes) {
    for (const i in keyframes) {
      this.addKeyframe(instance, {
        m: keyframes[i]
      }, parseInt(i, 10));
    }
    this._setTimelinePosition(this.currentFrame, this.currentFrame, true);
    return this;
  }
  /**
   * Add a tween to the clip
   * @param instance - The clip to tween
   * @param properties - The property or property to tween
   * @param startFrame - The frame to start tweening
   * @param duration - Number of frames to tween. If 0, then the properties are set with no tweening.
   * @param ease - An optional easing function that takes the tween time from 0-1.
   */
  addTween(instance, properties, startFrame, duration, ease) {
    const timeline = this._getChildTimeline(instance);
    this._parseProperties(properties);
    timeline.addTween(properties, startFrame, duration, ease);
    this._autoExtend(startFrame + duration);
    return this;
  }
  /**
   * Add a tween to the clip
   * @param instance - The clip to tween
   * @param properties - The property or property to tween
   * @param startFrame - The frame to start tweening
   */
  addKeyframe(instance, properties, startFrame) {
    const timeline = this._getChildTimeline(instance);
    const { tw } = properties;
    delete properties.tw;
    this._parseProperties(properties);
    timeline.addKeyframe(properties, startFrame);
    this._autoExtend(startFrame);
    if (tw) {
      this.addTween(instance, tw.p, startFrame, tw.d, Tween.getEaseFromConfig(tw.e));
    }
    return this;
  }
  /**
   * Add a child to show for a certain number of frames before automatic removal.
   * @param instance - The clip to show
   * @param startFrame - The starting frame
   * @param duration - The number of frames to display the child before removing it.
   * @param keyframes - The collection of static keyframes to add
   */
  addTimedChild(instance, startFrame, duration, keyframes) {
    if (startFrame === void 0) {
      startFrame = 0;
    }
    if (duration === void 0 || duration < 1) {
      duration = this._totalFrames || 1;
    }
    if (instance instanceof _MovieClip && instance.mode === _MovieClip.SYNCHED) {
      instance.parentStartPosition = startFrame;
    }
    let timeline;
    for (let i = this._timedChildTimelines.length - 1; i >= 0; --i) {
      if (this._timedChildTimelines[i].target === instance) {
        timeline = this._timedChildTimelines[i];
        break;
      }
    }
    if (!timeline) {
      timeline = [];
      timeline.target = instance;
      this._timedChildTimelines.push(timeline);
    }
    utils.utils.fillFrames(timeline, startFrame, duration);
    if (this._totalFrames < startFrame + duration) {
      this._totalFrames = startFrame + duration;
    }
    if (keyframes) {
      if (typeof keyframes === "string") {
        keyframes = utils.utils.deserializeKeyframes(keyframes);
      }
      let sequenceUsesSkew = false;
      for (const i in keyframes) {
        if (keyframes[i].kx || keyframes[i].ky) {
          sequenceUsesSkew = true;
          break;
        }
      }
      if (sequenceUsesSkew) {
        for (const i in keyframes) {
          if (keyframes[i].r !== void 0) {
            keyframes[i].kx = keyframes[i].kx || keyframes[i].r * -1;
            keyframes[i].ky = keyframes[i].ky || keyframes[i].r;
            delete keyframes[i].r;
          }
          if (keyframes[i].tw?.p?.r !== void 0) {
            keyframes[i].tw.p.kx = keyframes[i].tw.p.kx || keyframes[i].tw.p.r * -1;
            keyframes[i].tw.p.ky = keyframes[i].tw.p.ky || keyframes[i].tw.p.r;
            delete keyframes[i].tw.p.r;
          }
        }
      }
      for (const i in keyframes) {
        this.addKeyframe(instance, keyframes[i], parseInt(i, 10));
      }
      this._getChildTimeline(instance).extendLastFrame(startFrame + duration - 1);
    }
    this._setTimelinePosition(startFrame, this.currentFrame, true);
    return this;
  }
  /**
   * Handle frame actions, callback is bound to the instance of the MovieClip.
   * @param callback - The clip call on a certain frame
   * @param startFrame - The starting frame index or label
   */
  addAction(callback, startFrame) {
    if (typeof startFrame === "string") {
      const index = this._labelDict[startFrame];
      if (index === void 0) {
        throw new Error(`The label '${startFrame}' does not exist on this timeline`);
      }
      startFrame = index;
    }
    const actions = this._actions;
    if (actions.length <= startFrame) {
      actions.length = startFrame + 1;
    }
    if (this._totalFrames < startFrame) {
      this._totalFrames = startFrame;
    }
    if (actions[startFrame]) {
      actions[startFrame].push(callback);
    } else {
      actions[startFrame] = [callback];
    }
    return this;
  }
  /**
   * Handle sounds.
   * @param alias - The name of the Sound
   * @param loop - The loop property of the sound
   */
  playSound(alias, loop) {
    sound.sound.emit("play", alias, !!loop, this);
    return this;
  }
  /**
   * Sets paused to false.
   */
  play() {
    this.paused = false;
  }
  /**
   * Sets paused to true.
   */
  stop() {
    this.paused = true;
  }
  /**
   * Advances this movie clip to the specified position or label and sets paused to false.
   * @param positionOrLabel - The animation name or frame number to go to.
   */
  gotoAndPlay(positionOrLabel) {
    this.paused = false;
    this._goto(positionOrLabel);
  }
  /**
   * Advances this movie clip to the specified position or label and sets paused to true.
   * @param positionOrLabel - The animation or frame name to go to.
   */
  gotoAndStop(positionOrLabel) {
    this.paused = true;
    this._goto(positionOrLabel);
  }
  /**
   * Get the close parent with a valid framerate. If no parent, returns the default framerate.
   */
  get parentFramerate() {
    let o = this;
    let fps = o._framerate;
    while ((o = o.parent) && !fps) {
      if (o.mode === _MovieClip.INDEPENDENT) {
        fps = o._framerate;
      }
    }
    return fps || _MovieClip.DEFAULT_FRAMERATE;
  }
  /**
   * Advances the playhead. This occurs automatically each tick by default.
   * @param time - The amount of time in seconds to advance by. Only applicable if framerate is set.
   */
  advance(time) {
    if (!this._framerate) {
      this.framerate = this.parentFramerate;
    }
    if (time) {
      this._t += time;
    }
    if (this._t > this._duration) {
      this._t = this.loop ? this._t % this._duration : this._duration;
    }
    this.currentFrame = Math.floor(this._t * this._framerate + 1e-8);
    if (this.currentFrame >= this._totalFrames) {
      this.currentFrame = this._totalFrames - 1;
    }
    let afterUpdateOnce;
    if (this._beforeUpdate) {
      afterUpdateOnce = this._beforeUpdate(this);
    }
    this._updateTimeline();
    if (afterUpdateOnce) {
      afterUpdateOnce();
    }
  }
  /**
   * @param positionOrLabel - The animation name or frame number to go to.
   */
  _goto(positionOrLabel) {
    const pos = typeof positionOrLabel === "string" ? this._labelDict[positionOrLabel] : positionOrLabel;
    if (pos === void 0) {
      return;
    }
    this._prevPos = NaN;
    this.currentFrame = pos;
    if (!this._framerate) {
      this.framerate = this.parentFramerate;
    }
    if (this._framerate > 0) {
      this._t = pos / this._framerate;
    } else {
      this._t = 0;
    }
    this._updateTimeline();
  }
  /**
   * Reset the movieclip to the first frame (without advancing the timeline).
   */
  _reset() {
    this._prevPos = -1;
    this._t = 0;
    this.currentFrame = 0;
  }
  /**
   * Update timeline position according to playback, performing actions and updating children.
   * @private
   */
  _updateTimeline() {
    const synched = this.mode !== _MovieClip.INDEPENDENT;
    if (synched) {
      this.currentFrame = this.startPosition + (this.mode === _MovieClip.SINGLE_FRAME ? 0 : this._synchOffset);
      if (this.currentFrame >= this._totalFrames) {
        this.currentFrame %= this._totalFrames;
      }
    }
    if (this._prevPos === this.currentFrame) {
      return;
    }
    this._setTimelinePosition(this._prevPos, this.currentFrame, synched ? false : this.actionsEnabled);
    this._prevPos = this.currentFrame;
  }
  /**
   * Set the timeline position
   */
  _setTimelinePosition(startFrame, currentFrame, doActions) {
    if (startFrame !== currentFrame && doActions) {
      let startPos;
      if (isNaN(startFrame)) {
        startPos = currentFrame;
      } else {
        startPos = startFrame >= this._totalFrames - 1 ? 0 : startFrame + 1;
      }
      const actionFrames = [];
      if (currentFrame < startPos) {
        for (let i = startPos; i < this._actions.length; ++i) {
          if (this._actions[i]) {
            actionFrames.push(i);
          }
        }
        for (let i = 0; i <= currentFrame; ++i) {
          if (this._actions[i]) {
            actionFrames.push(i);
          }
        }
      } else {
        for (let i = startPos; i <= currentFrame; ++i) {
          if (this._actions[i]) {
            actionFrames.push(i);
          }
        }
      }
      if (actionFrames.length) {
        const oldCurrentFrame = this.currentFrame;
        for (let i = 0; i < actionFrames.length; ++i) {
          const frame = actionFrames[i];
          this._setTimelinePosition(frame, frame, true);
          if (this.currentFrame !== oldCurrentFrame || frame === currentFrame) {
            return;
          } else if (this.paused) {
            this.currentFrame = frame;
            return;
          }
        }
      }
    }
    const _timelines = this._timelines;
    for (let i = _timelines.length - 1; i >= 0; --i) {
      const timeline = _timelines[i];
      for (let j = 0, length = timeline.length; j < length; ++j) {
        const tween = timeline[j];
        if (currentFrame >= tween.startFrame && currentFrame <= tween.endFrame) {
          tween.setPosition(currentFrame);
          break;
        }
      }
    }
    const timedChildTimelines = this._timedChildTimelines;
    const depthSorted = this._depthSorted;
    for (let i = 0, length = timedChildTimelines.length; i < length; ++i) {
      const target = timedChildTimelines[i].target;
      const shouldBeChild = timedChildTimelines[i][currentFrame];
      if (shouldBeChild) {
        depthSorted.push(target);
        if (target.parent !== this) {
          this.addChild(target);
          if (target instanceof _MovieClip && target.mode === _MovieClip.INDEPENDENT && target.autoReset) {
            target._reset();
          }
        }
      } else if (!shouldBeChild && target.parent === this) {
        this.removeChild(target);
      }
    }
    for (let i = 0, length = depthSorted.length; i < length; i++) {
      const target = depthSorted[i];
      const currentIndex = this.children.indexOf(target);
      if (currentIndex !== i) {
        this.addChildAt(target, i);
      }
    }
    depthSorted.length = 0;
    const children = this.children;
    for (let i = 0, length = children.length; i < length; ++i) {
      const child = children[i];
      if (child instanceof _MovieClip && child.mode === _MovieClip.SYNCHED) {
        child._synchOffset = currentFrame - child.parentStartPosition;
        child._updateTimeline();
      }
    }
    if (doActions && this._actions && this._actions[currentFrame]) {
      const frameActions = this._actions[currentFrame];
      for (let j = 0; j < frameActions.length; ++j) {
        frameActions[j].call(this);
      }
    }
  }
  destroy(options) {
    if (this._tickListener) {
      SharedTicker.remove(this._tickListener, null);
      this._tickListener = null;
    }
    const hiddenChildren = [];
    const timelines = this._timelines;
    if (timelines) {
      for (let i = 0; i < timelines.length; i++) {
        const timeline = timelines[i];
        hiddenChildren.push(timeline.target);
        timeline.destroy();
      }
    }
    const childTimelines = this._timedChildTimelines;
    if (childTimelines) {
      for (let i = 0; i < childTimelines.length; i++) {
        const timeline = childTimelines[i];
        if (hiddenChildren.indexOf(timeline.target) < 0) {
          hiddenChildren.push(timeline.target);
        }
        timeline.length = 0;
      }
    }
    for (let i = 0; i < hiddenChildren.length; i++) {
      if (this.children.indexOf(hiddenChildren[i]) < 0) {
        hiddenChildren[i].destroy(options);
      }
    }
    hiddenChildren.length = 0;
    this._actions = null;
    this._timelines = null;
    this._depthSorted = null;
    this._timedChildTimelines = null;
    this._beforeUpdate = null;
    this._labels = null;
    this._labelDict = null;
    super.destroy(options);
  }
};
let MovieClip = _MovieClip;
/**
 * The MovieClip will advance independently of its parent, even if its parent is paused.
 * This is the default mode.
 */
MovieClip.INDEPENDENT = 0;
/**
 * The MovieClip will only display a single frame (as determined by the startPosition property).
 */
MovieClip.SINGLE_FRAME = 1;
/**
 * The MovieClip will be advanced only when its parent advances and will be synched to the position of
 * the parent MovieClip.
 */
MovieClip.SYNCHED = 2;
/**
 * The default framerate if none is specified or there's not parent clip with a framerate.
 */
MovieClip.DEFAULT_FRAMERATE = 24;

exports.MovieClip = MovieClip;
//# sourceMappingURL=MovieClip.js.map
