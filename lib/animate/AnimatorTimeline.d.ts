import type { MovieClip } from './MovieClip';
/**
 * Represents a single animation play.
 */
export declare class AnimatorTimeline {
    /**
     * Bound copy of update().
     */
    private _update;
    /**
     * Instance of clip to play.
     * @readOnly
     */
    instance: MovieClip;
    /**
     * `true` if the timeline is suppose to loop.
     * @readOnly
     */
    loop: boolean;
    /**
     * Frame number of the starting farme.
     * @readOnly
     */
    start: number;
    /**
     * Frame number of the ending frame.
     * @readOnly
     */
    end: number;
    /**
     * Callback called when completed (non-looping animation).
     * @readOnly
     */
    callback: () => void;
    constructor();
    /**
     * The pool of timelines to use
     * @param instance
     * @param start
     * @param end
     * @param loop
     * @param callback
     */
    private init;
    /**
     * Don't use after this
     * @private
     */
    destroy(): void;
    /**
     * Is the animation complete
     * @param instance
     * @return Callback to do after updateTimeline
     * @private
     */
    update(instance: MovieClip): (() => void) | null;
    /**
     * Stop the animation, cannot be reused.
     */
    stop(): void;
    /**
     * The progress from 0 to 1 of the playback.
     */
    get progress(): number;
    /**
     * The pool of timelines to use
     * @private
     */
    static get _pool(): AnimatorTimeline[];
    /**
     * Create a new timeline
     */
    static create(instance: MovieClip, start: number, end: number, loop: boolean, callback: () => void): AnimatorTimeline;
}
