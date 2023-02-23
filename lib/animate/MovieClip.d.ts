import { Timeline } from './Timeline';
import { TweenProps, EaseMethod, KeyframeData } from './Tween';
import { AnimateContainer } from './Container';
import type { AnimateDisplayObject } from './DisplayObject';
import type { Graphics } from '@pixi/graphics';
import type { Sprite } from '@pixi/sprite';
import type { IDestroyOptions } from '@pixi/display';
export interface MovieClipOptions {
    /**
     * The default playback mode is independent (0). Child movieclips are given a different value as subordinate objects.
     */
    mode?: number;
    /**
     * The starting frame. Default is 0.
     */
    startPosition?: number;
    /**
     * If playback is looped. Default is true.
     */
    loop?: boolean;
    /**
     * The frame labels map - label to frames
     */
    labels?: LabelMap;
    /**
     * The duration of the clip. If no duration is provided, length is automatically determined.
     */
    duration?: number;
    /**
     * The framerate to use for an independent mode MovieClip. Default is 24.
     */
    framerate?: number;
}
export interface FrameLabel {
    label: string;
    position: number;
}
export interface LabelMap {
    [label: string]: number;
}
export type FrameAction = (this: MovieClip) => void;
type TimedChildTimeline = boolean[] & {
    target?: AnimateDisplayObject;
};
/**
 * Provide timeline playback of movieclip
 */
export declare class MovieClip extends AnimateContainer {
    /**
     * The MovieClip will advance independently of its parent, even if its parent is paused.
     * This is the default mode.
     */
    static readonly INDEPENDENT = 0;
    /**
     * The MovieClip will only display a single frame (as determined by the startPosition property).
     */
    static readonly SINGLE_FRAME = 1;
    /**
     * The MovieClip will be advanced only when its parent advances and will be synched to the position of
     * the parent MovieClip.
     */
    static readonly SYNCHED = 2;
    /**
     * The default framerate if none is specified or there's not parent clip with a framerate.
     */
    static readonly DEFAULT_FRAMERATE = 24;
    /**
     * Fast way of checking if a movie clip is actually a movie clip.
     * Prevents circular references and is faster than instanceof.
     */
    isMovieClip: boolean;
    /**
     * Controls how this MovieClip advances its time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
     * See each constant for a description of the behaviour.
     */
    mode: number;
    /**
     * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
     */
    startPosition: number;
    /**
     * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
     */
    loop: boolean;
    /**
     * The current frame of the movieclip.
     * @readOnly
     */
    currentFrame: number;
    /**
     * The collection of private labels
     */
    private _labels;
    /**
     * The collection of private labels
     */
    private _labelDict;
    /**
     * If true, this movieclip will animate automatically whenever it is on the stage.
     */
    selfAdvance: boolean;
    /**
     * If true, the MovieClip's position will not advance when ticked.
     */
    paused: boolean;
    /**
     * If true, actions in this MovieClip's tweens will be run when the playhead advances.
     */
    actionsEnabled: boolean;
    /**
     * If true, the MovieClip will automatically be reset to its first frame whenever the timeline adds
     * it back onto the display list. This only applies to MovieClip instances with mode=INDEPENDENT.
     * <br><br>
     * For example, if you had a character animation with a 'body' child MovieClip instance
     * with different costumes on each frame, you could set body.autoReset = false, so that
     * you can manually change the frame it is on, without worrying that it will be reset
     * automatically.
     */
    autoReset: boolean;
    /**
     * Offset from parent frame for a synched movieclip.
     */
    private _synchOffset;
    /**
     * Previous position that this movieclip was stopped on.
     */
    private _prevPos;
    /**
     * Note - changed from default: When the MovieClip is framerate independent, this is the time
     * elapsed from frame 0 in seconds.
     */
    private _t;
    /**
     * By default MovieClip instances advance one frame per tick. Specifying a framerate for the MovieClip
     * will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
     * framerate.
     */
    protected _framerate: number;
    /**
     * The total time in seconds for the animation. This is changed when setting the framerate.
     */
    private _duration;
    /**
     * The total duration in frames for the animation.
     */
    private _totalFrames;
    /**
     * Standard tween timelines for all objects. Each element in the _timelines array
     * is a Timeline object - an array of tweens for one target, in order of occurrence.
     */
    protected _timelines: Timeline[];
    /**
     * Array of child timelines denoting if a child is actively a child of this movieclip
     * on any given frame. Each element in the _timedChildTimelines is an array with a 'target'
     * property, and is an array of boolean values indexed by frame.
     * @private
     */
    _timedChildTimelines: TimedChildTimeline[];
    /**
     * Array to depth sort timed children
     */
    protected _depthSorted: AnimateDisplayObject[];
    /**
     * Array of frame scripts, indexed by frame.
     */
    protected _actions: FrameAction[][];
    /**
     * Optional callback fired before timeline is updated.
     * Can be used to clamp or update the currentFrame.
     * @private
     */
    _beforeUpdate: (target: MovieClip) => (() => void | null);
    /**
     * Internal property used to control child MovieClips relative to parents.
     */
    private parentStartPosition;
    /**
     * @param options - The options object
     */
    constructor(options?: MovieClipOptions);
    /**
     * @param mode - The playback mode default is independent (0),
     * @param duration - The duration, if no duration is provided, auto determines length
     * @param loop - If playback is looped
     * @param framerate - The framerate to use for independent mode
     * @param labels - The frame labels map of label to frames
     */
    constructor(mode?: number, duration?: number, loop?: boolean, framerate?: number, labels?: LabelMap);
    private _onAdded;
    private _tickListener;
    private _onRemoved;
    /**
     * Returns an array of objects with label and position (aka frame) properties, sorted by position.
     */
    get labels(): FrameLabel[];
    /**
     * Returns a dictionary of labels where key is the label and value is the frame.
     */
    get labelsMap(): LabelMap;
    /**
     * Returns the name of the label on or immediately before the current frame.
     */
    get currentLabel(): string | null;
    /**
     * When the MovieClip is framerate independent, this is the time elapsed from frame 0 in seconds.
     */
    get elapsedTime(): number;
    set elapsedTime(value: number);
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
    get framerate(): number;
    set framerate(value: number);
    /**
     * Get the total number of frames (duration) of this MovieClip
     */
    get totalFrames(): number;
    /**
     * Extend the timeline to the last frame.
     */
    private _autoExtend;
    /**
     * Convert values of properties
     */
    private _parseProperties;
    /**
     * Get a timeline for a child, synced timeline.
     */
    private _getChildTimeline;
    /**
     * Add mask or masks
     */
    addTimedMask(instance: AnimateDisplayObject, keyframes: {
        [frame: number]: Graphics | Sprite;
    }): this;
    /**
     * Shortcut alias for `addTimedMask`
     */
    am: (instance: AnimateDisplayObject, keyframes: {
        [frame: number]: Graphics | Sprite;
    }) => this;
    /**
     * Shortcut alias for `addTween`
     */
    tw: (instance: AnimateDisplayObject, properties: TweenProps, startFrame: number, duration?: number, ease?: EaseMethod) => this;
    /**
     * Add a tween to the clip
     * @param instance - The clip to tween
     * @param properties - The property or property to tween
     * @param startFrame - The frame to start tweening
     * @param duration - Number of frames to tween. If 0, then the properties are set with no tweening.
     * @param ease - An optional easing function that takes the tween time from 0-1.
     */
    addTween(instance: AnimateDisplayObject, properties: TweenProps, startFrame: number, duration?: number, ease?: EaseMethod): this;
    /**
     * Add a tween to the clip
     * @param instance - The clip to tween
     * @param properties - The property or property to tween
     * @param startFrame - The frame to start tweening
     */
    addKeyframe(instance: AnimateDisplayObject, properties: KeyframeData, startFrame: number): this;
    /**
     * Alias for method `addTimedChild`
     */
    at: (instance: AnimateDisplayObject, startFrame: number, duration?: number, keyframes?: string | {
        [frame: number]: KeyframeData;
    }) => this;
    /**
     * Add a child to show for a certain number of frames before automatic removal.
     * @param instance - The clip to show
     * @param startFrame - The starting frame
     * @param duration - The number of frames to display the child before removing it.
     * @param keyframes - The collection of static keyframes to add
     */
    addTimedChild(instance: AnimateDisplayObject, startFrame: number, duration?: number, keyframes?: string | {
        [frame: number]: KeyframeData;
    }): this;
    /**
     * Short cut for `addAction`
     */
    aa: (callback: FrameAction, startFrame: number | string) => this;
    /**
     * Handle frame actions, callback is bound to the instance of the MovieClip.
     * @param callback - The clip call on a certain frame
     * @param startFrame - The starting frame index or label
     */
    addAction(callback: FrameAction, startFrame: number | string): this;
    /**
     * Short cut for `playSound`
     */
    ps: (alias: string, loop?: boolean) => this;
    /**
     * Handle sounds.
     * @param alias - The name of the Sound
     * @param loop - The loop property of the sound
     */
    playSound(alias: string, loop?: boolean): this;
    /**
     * Sets paused to false.
     */
    play(): void;
    /**
     * Sets paused to true.
     */
    stop(): void;
    /**
     * Advances this movie clip to the specified position or label and sets paused to false.
     * @param positionOrLabel - The animation name or frame number to go to.
     */
    gotoAndPlay(positionOrLabel: string | number): void;
    /**
     * Advances this movie clip to the specified position or label and sets paused to true.
     * @param positionOrLabel - The animation or frame name to go to.
     */
    gotoAndStop(positionOrLabel: string | number): void;
    /**
     * Get the close parent with a valid framerate. If no parent, returns the default framerate.
     */
    get parentFramerate(): number;
    /**
     * Advances the playhead. This occurs automatically each tick by default.
     * @param time - The amount of time in seconds to advance by. Only applicable if framerate is set.
     */
    advance(time?: number): void;
    /**
     * @param positionOrLabel - The animation name or frame number to go to.
     */
    protected _goto(positionOrLabel: string | number): void;
    /**
     * Reset the movieclip to the first frame (without advancing the timeline).
     */
    private _reset;
    /**
     * Update timeline position according to playback, performing actions and updating children.
     * @private
     */
    _updateTimeline(): void;
    /**
     * Set the timeline position
     */
    protected _setTimelinePosition(startFrame: number, currentFrame: number, doActions: boolean): void;
    destroy(options?: IDestroyOptions | boolean): void;
}
export {};
