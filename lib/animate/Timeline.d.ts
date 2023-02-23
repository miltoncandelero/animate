import { Tween, TweenProps, EaseMethod } from './Tween';
import type { AnimateDisplayObject } from './DisplayObject';
/**
 * The Timeline class represents a series of tweens, tied to keyframes.
 */
export declare class Timeline extends Array<Tween> {
    /**
     * The target DisplayObject.
     */
    target: AnimateDisplayObject;
    /**
     * Current properties in the tween, to make building the timeline more
     * efficient.
     */
    private _currentProps;
    /**
     * Creates a new Timeline. Must be used instead of a constructor because extending the Array
     * class is a pain: https://blog.simontest.net/extend-array-with-typescript-965cc1134b3
     * @param target - The target for this string of tweens.
     * @returns A new Timeline instance.
     */
    static create(target: AnimateDisplayObject): Timeline;
    private constructor();
    /**
     * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to
     * remove them from the normal ticking system and managed by this timeline. Adding a tween to
     * multiple timelines will result in unexpected behaviour.
     * @param tween - The tween(s) to add. Accepts multiple arguments.
     * @return Tween The first tween that was passed in.
     */
    addTween(properties: TweenProps, startFrame: number, duration: number, ease?: EaseMethod): void;
    /**
     * Add a single keyframe that doesn't tween.
     * Note that this has some capability to insert keyframes into the middle of a timeline, in order to
     * handle how masks are published, it should only be relied upon to add keyframes to the end of a timeline.
     * @param properties - The properties to set.
     * @param startFrame - The starting frame index.
     * @param duration - The number of frames to hold beyond startFrame (0 is single frame)
     */
    addKeyframe(properties: TweenProps, startFrame: number, duration?: number): void;
    /**
     * Extend the last frame of the tween.
     * @param endFrame - The ending frame index.
     */
    extendLastFrame(endFrame: number): void;
    /**
     * Get the value for a property
     * @param prop
     */
    private getPropFromShorthand;
    destroy(): void;
}
