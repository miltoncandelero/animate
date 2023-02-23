let _prepare = null;
var utils;
((utils2) => {
  function hexToUint(hex) {
    hex = hex.substr(1);
    if (hex.length === 3) {
      hex = hex.replace(/([a-f0-9])/g, "$1$1");
    }
    return parseInt(hex, 16);
  }
  utils2.hexToUint = hexToUint;
  function fillFrames(timeline, startFrame, duration) {
    const oldLength = timeline.length;
    if (oldLength < startFrame + duration) {
      timeline.length = startFrame + duration;
      if (oldLength < startFrame) {
        if (timeline.fill) {
          timeline.fill(false, oldLength, startFrame);
        } else {
          for (let i = oldLength; i < startFrame; ++i) {
            timeline[i] = false;
          }
        }
      }
    }
    if (timeline.fill) {
      timeline.fill(true, startFrame, startFrame + duration);
    } else {
      const length = timeline.length;
      for (let i = startFrame; i < length; ++i) {
        timeline[i] = true;
      }
    }
  }
  utils2.fillFrames = fillFrames;
  const keysMap = {
    X: "x",
    // x position
    Y: "y",
    // y position
    A: "sx",
    // scale x
    B: "sy",
    // scale y
    C: "kx",
    // skew x
    D: "ky",
    // skew y
    R: "r",
    // rotation
    L: "a",
    // alpha
    T: "t",
    // tint
    F: "c",
    // colorTransform
    V: "v"
    // visibility
  };
  function parseValue(prop, buffer) {
    switch (prop) {
      case "c": {
        const buff = buffer.split(",");
        buff.forEach((val, i, buffer2) => {
          buffer2[i] = parseFloat(val);
        });
        return buff;
      }
      case "t": {
        return buffer;
      }
      case "v": {
        return !!parseInt(buffer, 10);
      }
      default: {
        return parseFloat(buffer);
      }
    }
  }
  const tweenKeysMap = {
    D: "d",
    // duration
    // E: 'e', // easing - disabled for manual handling
    P: "p"
    // props
  };
  const basicEase = /(\-?\d*\.?\d*)([a-zA-Z]+)/;
  function parseTween(tweenBuffer) {
    const result = { d: 0, p: {} };
    let i = 0;
    let buffer = "";
    let handlingProps = false;
    let prop;
    while (i <= tweenBuffer.length) {
      const c = tweenBuffer[i];
      if (!handlingProps && (tweenKeysMap[prop] || tweenKeysMap[c])) {
        if (prop === "d") {
          result.d = parseValue(prop, buffer);
          prop = null;
        }
        if (c === "P") {
          handlingProps = true;
          ++i;
        } else {
          prop = tweenKeysMap[c];
          ++i;
        }
        buffer = "";
      } else if (c === "E") {
        let index = tweenBuffer.indexOf(";", i);
        if (index < 0) {
          index = tweenBuffer.length;
        }
        const easeBuffer = tweenBuffer.substring(i + 1, index);
        if (basicEase.test(easeBuffer)) {
          const [, strength, name] = basicEase.exec(easeBuffer);
          if (!handlingProps) {
            result.e = {
              s: parseFloat(strength),
              n: name
            };
          } else if (prop) {
            result.p[prop] = parseValue(prop, buffer);
            if (!result.p.e) {
              result.p.e = {};
            }
            result.p.e[prop] = {
              s: parseFloat(strength),
              n: name
            };
            prop = null;
            buffer = "";
          }
        }
        i = index + 1;
      } else if (keysMap[c]) {
        if (prop) {
          result.p[prop] = parseValue(prop, buffer);
        }
        prop = keysMap[c];
        buffer = "";
        i++;
      } else if (!c) {
        if (prop) {
          result.p[prop] = parseValue(prop, buffer);
        }
        buffer = "";
        prop = null;
        i++;
      } else {
        buffer += c;
        i++;
      }
    }
    return result;
  }
  function deserializeKeyframes(keyframes) {
    const result = {};
    let i = 0;
    let buffer = "";
    let isFrameStarted = false;
    let prop;
    let frame = {};
    while (i <= keyframes.length) {
      const c = keyframes[i];
      if (keysMap[c]) {
        if (!isFrameStarted) {
          isFrameStarted = true;
          result[buffer] = frame;
        }
        if (prop) {
          frame[prop] = parseValue(prop, buffer);
        }
        prop = keysMap[c];
        buffer = "";
        i++;
      } else if (c === "W") {
        if (!isFrameStarted) {
          isFrameStarted = true;
          result[buffer] = frame;
        }
        if (prop) {
          frame[prop] = parseValue(prop, buffer);
          buffer = "";
          prop = null;
        }
        let index = keyframes.indexOf(" ", i);
        if (index < 0) {
          index = keyframes.length;
        }
        frame.tw = parseTween(keyframes.substring(i + 1, index));
        i = index;
      } else if (!c || c === " ") {
        i++;
        if (prop) {
          frame[prop] = parseValue(prop, buffer);
        }
        buffer = "";
        prop = null;
        frame = {};
        isFrameStarted = false;
      } else {
        buffer += c;
        i++;
      }
    }
    return result;
  }
  utils2.deserializeKeyframes = deserializeKeyframes;
  function deserializeShapes(str) {
    const result = [];
    const shapes = str.split("\n");
    const isCommand = /^[a-z]{1,2}$/;
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i].split(" ");
      for (let j = 0; j < shape.length; j++) {
        const arg = shape[j];
        if (arg[0] !== "#" && !isCommand.test(arg)) {
          shape[j] = parseFloat(arg);
        }
      }
      result.push(shape);
    }
    return result;
  }
  utils2.deserializeShapes = deserializeShapes;
  function addMovieClips(item) {
    if (item.isMovieClip) {
      const mc = item;
      mc._timedChildTimelines.forEach((timeline) => {
        const index = mc.children.indexOf(timeline.target);
        if (index === -1) {
          _prepare?.add(timeline.target);
        }
      });
      return true;
    }
    return false;
  }
  utils2.addMovieClips = addMovieClips;
  function upload(renderer, displayObject, done) {
    if (!_prepare) {
      _prepare = renderer.plugins.prepare;
      _prepare.registerFindHook(addMovieClips);
    }
    _prepare?.upload(displayObject).then(done);
  }
  utils2.upload = upload;
})(utils || (utils = {}));

export { utils };
//# sourceMappingURL=utils.mjs.map
