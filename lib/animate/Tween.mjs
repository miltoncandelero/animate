function lerpValue(start, end, t) {
  return start + (end - start) * t;
}
const PI = Math.PI;
const TWO_PI = PI * 2;
function lerpRotation(start, end, t) {
  const difference = Math.abs(end - start);
  if (difference > PI) {
    if (end > start) {
      start += TWO_PI;
    } else {
      end += TWO_PI;
    }
  }
  const value = start + (end - start) * t;
  return value;
}
function lerpSkew(start, end, t) {
  const difference = Math.abs(end - start);
  if (difference > PI) {
    if (end > start) {
      start += TWO_PI;
    } else {
      end += TWO_PI;
    }
  }
  const value = start + (end - start) * t;
  if (value > PI)
    return value - TWO_PI;
  if (value < -PI)
    return value + TWO_PI;
  return value;
}
function lerpTint(start, end, t) {
  const sR = start >> 16 & 255;
  const sG = start >> 8 & 255;
  const sB = start & 255;
  const eR = end >> 16 & 255;
  const eG = end >> 8 & 255;
  const eB = end & 255;
  let r = sR + (eR - sR) * t;
  if (r < 0)
    r = 0;
  else if (r > 255)
    r = 255;
  let g = sG + (eG - sG) * t;
  if (g < 0)
    g = 0;
  else if (g > 255)
    g = 255;
  let b = sB + (eB - sB) * t;
  if (b < 0)
    b = 0;
  else if (b > 255)
    b = 255;
  const combined = r << 16 | g << 8 | b;
  return combined;
}
const COLOR_HELPER = [];
function lerpColor(start, end, t) {
  COLOR_HELPER[0] = start[0] + (end[0] - start[0]) * t;
  COLOR_HELPER[1] = start[1] + (end[1] - start[1]) * t;
  COLOR_HELPER[2] = start[2] + (end[2] - start[2]) * t;
  COLOR_HELPER[3] = start[3] + (end[3] - start[3]) * t;
  COLOR_HELPER[4] = start[4] + (end[4] - start[4]) * t;
  COLOR_HELPER[5] = start[5] + (end[5] - start[5]) * t;
  return COLOR_HELPER;
}
const PROP_LERPS = {
  // position
  x: lerpValue,
  y: lerpValue,
  // scale
  sx: lerpValue,
  sy: lerpValue,
  // skew
  kx: lerpSkew,
  ky: lerpSkew,
  // rotation
  r: lerpRotation,
  // alpha
  a: lerpValue,
  // tinting
  t: lerpTint,
  // values to be set
  v: null,
  // visible
  c: lerpColor,
  // colorTransform
  m: null,
  // mask
  g: null
  // not sure if we'll actually handle graphics this way?
};
function setPropFromShorthand(target, prop, value) {
  switch (prop) {
    case "x":
      target.transform.position.x = value;
      break;
    case "y":
      target.transform.position.y = value;
      break;
    case "sx":
      target.transform.scale.x = value;
      break;
    case "sy":
      target.transform.scale.y = value;
      break;
    case "kx":
      target.transform.skew.x = value;
      break;
    case "ky":
      target.transform.skew.y = value;
      break;
    case "r":
      target.transform.rotation = value;
      break;
    case "a":
      target.alpha = value;
      break;
    case "t":
      target.i(value);
      break;
    case "c":
      target.setColorTransform(...value);
      break;
    case "v":
      target.visible = value;
      break;
    case "m":
      target.ma(value);
      break;
  }
}
function buildPowIn(power) {
  return (t) => Math.pow(t, power);
}
function buildPowOut(power) {
  return (t) => 1 - Math.pow(1 - t, power);
}
function buildPowInOut(power) {
  return (t) => {
    if ((t *= 2) < 1)
      return 0.5 * Math.pow(t, power);
    return 1 - 0.5 * Math.abs(Math.pow(2 - t, power));
  };
}
const ELASTIC_AMPLITUDE = 1;
const ELASTIC_PERIOD = 0.3;
const ELASTIC_INOUT_PERIOD = 0.3 * 1.5;
const EASE_DICT = {
  quadIn: buildPowIn(2),
  quadOut: buildPowOut(2),
  quadInOut: buildPowInOut(2),
  cubicIn: buildPowIn(3),
  cubicOut: buildPowOut(3),
  cubicInOut: buildPowInOut(3),
  quartIn: buildPowIn(4),
  quartOut: buildPowOut(4),
  quartInOut: buildPowInOut(4),
  quintIn: buildPowIn(5),
  quintOut: buildPowOut(5),
  quintInOut: buildPowInOut(5),
  sineIn: (t) => 1 - Math.cos(t * PI / 2),
  sineOut: (t) => Math.sin(t * PI / 2),
  sineInOut: (t) => -0.5 * (Math.cos(PI * t) - 1),
  backIn: (t) => t * t * ((1.7 + 1) * t - 1.7),
  backOut: (t) => --t * t * ((1.7 + 1) * t + 1.7) + 1,
  backInOut: (t) => {
    const constVal = 1.7 * 1.525;
    if ((t *= 2) < 1)
      return 0.5 * (t * t * ((constVal + 1) * t - constVal));
    return 0.5 * ((t -= 2) * t * ((constVal + 1) * t + constVal) + 2);
  },
  circIn: (t) => -(Math.sqrt(1 - t * t) - 1),
  circOut: (t) => Math.sqrt(1 - --t * t),
  circInOut: (t) => {
    if ((t *= 2) < 1)
      return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  bounceIn: (t) => 1 - EASE_DICT.bounceOut(1 - t),
  bounceOut: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    }
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  // eslint-disable-next-line no-confusing-arrow
  bounceInOut: (t) => t < 0.5 ? EASE_DICT.bounceIn(t * 2) * 0.5 : EASE_DICT.bounceOut(t * 2 - 1) * 0.5 + 0.5,
  elasticIn: (t) => {
    if (t === 0 || t === 1)
      return t;
    const s = ELASTIC_PERIOD / TWO_PI * Math.asin(1 / ELASTIC_AMPLITUDE);
    return -(ELASTIC_AMPLITUDE * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TWO_PI / ELASTIC_PERIOD));
  },
  elasticOut: (t) => {
    if (t === 0 || t === 1)
      return t;
    const s = ELASTIC_PERIOD / TWO_PI * Math.asin(1 / ELASTIC_AMPLITUDE);
    return ELASTIC_AMPLITUDE * Math.pow(2, -10 * t) * Math.sin((t - s) * TWO_PI / ELASTIC_PERIOD) + 1;
  },
  elasticInOut: (t) => {
    const s = ELASTIC_INOUT_PERIOD / TWO_PI * Math.asin(1 / ELASTIC_AMPLITUDE);
    if ((t *= 2) < 1) {
      return -0.5 * (ELASTIC_AMPLITUDE * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TWO_PI / ELASTIC_INOUT_PERIOD));
    }
    return ELASTIC_AMPLITUDE * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * TWO_PI / ELASTIC_INOUT_PERIOD) * 0.5 + 1;
  }
};
function getEaseFromConfig(config) {
  if (!config)
    return null;
  if (typeof config === "function")
    return config;
  if (config.n === "classic") {
    const s = config.s / 100;
    return (t) => (s + 1) * t + -s * t * t;
  }
  return EASE_DICT[config.n];
}
class Tween {
  /**
   * @param target - The target to play
   * @param startProps - The starting properties
   * @param endProps - The ending properties
   * @param startFrame - frame number on which to begin tweening
   * @param duration - Number of frames to tween
   * @param ease - Ease function to use
   */
  constructor(target, startProps, endProps, startFrame, duration, ease) {
    this.target = target;
    this.startProps = startProps;
    this.endProps = {};
    this.duration = duration;
    this.startFrame = startFrame;
    this.endFrame = startFrame + duration;
    this.ease = {};
    this.isTweenlessFrame = !endProps;
    if (endProps) {
      for (const prop in endProps) {
        if (prop === "e")
          continue;
        this.endProps[prop] = endProps[prop];
        if (endProps.e?.[prop]) {
          this.ease[prop] = getEaseFromConfig(endProps.e[prop]);
        } else {
          this.ease[prop] = ease;
        }
      }
    }
    for (const prop in startProps) {
      if (!this.endProps.hasOwnProperty(prop)) {
        this.endProps[prop] = startProps[prop];
      }
    }
  }
  /**
   * Set the current frame.
   */
  setPosition(currentFrame) {
    if (currentFrame >= this.endFrame) {
      this.setToEnd();
      return;
    }
    if (this.isTweenlessFrame) {
      this.setToEnd();
      return;
    }
    const time = (currentFrame - this.startFrame) / this.duration;
    const target = this.target;
    const startProps = this.startProps;
    const endProps = this.endProps;
    for (const prop in endProps) {
      const p = prop;
      const lerp = PROP_LERPS[p];
      let lerpedTime = time;
      if (this.ease[prop]) {
        lerpedTime = this.ease[prop](time);
      }
      if (lerp) {
        setPropFromShorthand(target, p, lerp(startProps[p], endProps[p], lerpedTime));
      } else {
        setPropFromShorthand(target, p, startProps[p]);
      }
    }
  }
  /**
   * Set to the end position
   */
  setToEnd() {
    const endProps = this.endProps;
    const target = this.target;
    for (const prop in endProps) {
      setPropFromShorthand(target, prop, endProps[prop]);
    }
  }
}

export { Tween, getEaseFromConfig };
//# sourceMappingURL=Tween.mjs.map
