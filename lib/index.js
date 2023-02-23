'use strict';

var load = require('./animate/load.js');
var sound = require('./animate/sound.js');
var utils = require('./animate/utils.js');
var MovieClip = require('./animate/MovieClip.js');
var Scene = require('./animate/Scene.js');
var Timeline = require('./animate/Timeline.js');
var Tween = require('./animate/Tween.js');
var Animator = require('./animate/Animator.js');
var AnimatorTimeline = require('./animate/AnimatorTimeline.js');
var Container = require('./animate/Container.js');
var Sprite = require('./animate/Sprite.js');
var Graphics = require('./animate/Graphics.js');
var Text = require('./animate/Text.js');

const VERSION = "2.0.5";

exports.load = load.load;
exports.sound = sound.sound;
Object.defineProperty(exports, 'utils', {
    enumerable: true,
    get: function () { return utils.utils; }
});
exports.MovieClip = MovieClip.MovieClip;
exports.Scene = Scene.Scene;
exports.Timeline = Timeline.Timeline;
exports.Tween = Tween.Tween;
exports.Animator = Animator.Animator;
exports.AnimatorTimeline = AnimatorTimeline.AnimatorTimeline;
exports.Container = Container.AnimateContainer;
exports.Sprite = Sprite.AnimateSprite;
exports.Graphics = Graphics.AnimateGraphics;
exports.Text = Text.AnimateText;
exports.VERSION = VERSION;
//# sourceMappingURL=index.js.map
