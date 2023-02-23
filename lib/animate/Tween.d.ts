import type { AnimateDisplayObject } from './DisplayObject';
import type { Graphics } from '@pixi/graphics';
import type { Sprite } from '@pixi/sprite';
export type EaseMethod = (input: number) => number;
export interface TweenProps {
    x?: number;
    y?: number;
    sx?: number;
    sy?: number;
    kx?: number;
    ky?: number;
    r?: number;
    a?: number;
    t?: number;
    v?: boolean;
    c?: number[];
    m?: Graphics | Sprite;
    g?: any;
    /** Eases for any of the tweenable properties, if published as a per-property ease */
    e?: {
        [P in TweenablePropNames]?: EaseMethod | {
            n: string;
            s: number;
        };
    };
}
export type TweenablePropNames = keyof Omit<TweenProps, 'm' | 'g' | 'e' | 'v'>;
export interface TweenData {
    d: number;
    p: TweenProps;
    e?: EaseMethod | {
        n: string;
        s: number;
    };
}
export interface KeyframeData extends TweenProps {
    /** Not tweenable, but information about a tween that starts on this frame */
    tw?: TweenData;
}
export declare function getEaseFromConfig(config: EaseMethod | {
    n: string;
    s: number;
}): EaseMethod | null;
/**
 * Provides timeline playback of movieclip
 */
export declare class Tween {
    /**
     * Target display object.
     */
    target: AnimateDisplayObject;
    /**
     * Properties at the start of the tween
     */
    startProps: TweenProps;
    /**
     * Properties at the end of the tween, as well as any properties that are set
     * instead of tweened
     */
    endProps: TweenProps;
    /**
     * duration of tween in frames. A single-frame keyframe has a duration of 0.
     */
    duration: number;
    /**
     * The frame that the tween starts on
     */
    startFrame: number;
    /**
     * the frame that the tween ends on
     */
    endFrame: number;
    /**
     * easing function to use, if any
     */
    ease: {
        [P in TweenablePropNames]?: EaseMethod;
    };
    /**
     * If we don't tween.
     */
    isTweenlessFrame: boolean;
    /**
     * @param target - The target to play
     * @param startProps - The starting properties
     * @param endProps - The ending properties
     * @param startFrame - frame number on which to begin tweening
     * @param duration - Number of frames to tween
     * @param ease - Ease function to use
     */
    constructor(target: AnimateDisplayObject, startProps: TweenProps, endProps: TweenProps | null, startFrame: number, duration: number, ease?: EaseMethod);
    /**
     * Set the current frame.
     */
    setPosition(currentFrame: number): void;
    /**
     * Set to the end position
     */
    setToEnd(): void;
}
