import { AnimatorTimeline } from './AnimatorTimeline';
import type { MovieClip } from './MovieClip';
/**
 * Play animation via start/stop frame labels
 * @class Animator
 */
export declare class Animator {
    /**
     * The collection of timelines
     */
    private static get _timelines();
    /**
     * Suffix added to label for a stop.
     */
    static get STOP_LABEL(): string;
    /**
     * Suffix added to label for a loop.
     */
    static get LOOP_LABEL(): string;
    /**
     * Play the entire duration of the MovieClip.
     * @param instance - Movie clip to play.
     * @param callback - Optional callback when complete
     * @return Timeline object for stopping or getting progress.
     */
    static play(instance: MovieClip, callback?: () => void): AnimatorTimeline;
    /**
     * Play an animation by frame labels. For instance, play animation sequence from
     * 'idle' to 'idle_stop' or 'idle_loop'. If no event label is provided, will
     * play the entire duration of the MovieClip.
     * @param instance - Movie clip to play.
     * @param label - The frame label event to call, if no event is provided
     *        will use the entire length of the MovieClip.
     * @param callback - Optional callback when complete
     * @return Timeline object for stopping or getting progress.
     */
    static play(instance: MovieClip, label: string, callback?: () => void): AnimatorTimeline;
    /**
     * Play an animation from the current frame to an end frame or label.
     * @param instance - Movie clip to play.
     * @param end - The end frame or label.
     * @param callback - Optional callback when complete
     * @return Timeline object for stopping or getting progress.
     */
    static to(instance: MovieClip, end: string | number, callback?: () => void): AnimatorTimeline;
    /**
     * Play a MovieClip from a start to end frame.
     * @param instance - Movie clip to play.
     * @param start - The starting frame index or label.
     * @param end - The ending frame index or label.
     * @param loop - If the animation should loop.
     * @param callback - Optional callback when complete
     * @return Timeline object for stopping or getting progress.
     */
    static fromTo(instance: MovieClip, start: number | string, end: number | string, loop?: boolean, callback?: () => void): AnimatorTimeline;
    /**
     * Stop the animation by instance.
     * @param instance - Movie clip to play.
     */
    static stop(instance: MovieClip): void;
    /**
     * Stop all the currently playing animations.
     */
    static stopAll(): void;
    /**
     * Stop the animation
     * @private
     * @param timeline - Timeline to stop.
     */
    static _internalStop(timeline: AnimatorTimeline): void;
}
