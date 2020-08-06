// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("https://deno.land/std@0.63.0/fmt/colors", [], function (exports_1, context_1) {
    "use strict";
    var noColor, enabled, ANSI_PATTERN;
    var __moduleName = context_1 && context_1.id;
    function setColorEnabled(value) {
        if (noColor) {
            return;
        }
        enabled = value;
    }
    exports_1("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
        return enabled;
    }
    exports_1("getColorEnabled", getColorEnabled);
    function code(open, close) {
        return {
            open: `\x1b[${open.join(";")}m`,
            close: `\x1b[${close}m`,
            regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
        };
    }
    function run(str, code) {
        return enabled
            ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
            : str;
    }
    function reset(str) {
        return run(str, code([0], 0));
    }
    exports_1("reset", reset);
    function bold(str) {
        return run(str, code([1], 22));
    }
    exports_1("bold", bold);
    function dim(str) {
        return run(str, code([2], 22));
    }
    exports_1("dim", dim);
    function italic(str) {
        return run(str, code([3], 23));
    }
    exports_1("italic", italic);
    function underline(str) {
        return run(str, code([4], 24));
    }
    exports_1("underline", underline);
    function inverse(str) {
        return run(str, code([7], 27));
    }
    exports_1("inverse", inverse);
    function hidden(str) {
        return run(str, code([8], 28));
    }
    exports_1("hidden", hidden);
    function strikethrough(str) {
        return run(str, code([9], 29));
    }
    exports_1("strikethrough", strikethrough);
    function black(str) {
        return run(str, code([30], 39));
    }
    exports_1("black", black);
    function red(str) {
        return run(str, code([31], 39));
    }
    exports_1("red", red);
    function green(str) {
        return run(str, code([32], 39));
    }
    exports_1("green", green);
    function yellow(str) {
        return run(str, code([33], 39));
    }
    exports_1("yellow", yellow);
    function blue(str) {
        return run(str, code([34], 39));
    }
    exports_1("blue", blue);
    function magenta(str) {
        return run(str, code([35], 39));
    }
    exports_1("magenta", magenta);
    function cyan(str) {
        return run(str, code([36], 39));
    }
    exports_1("cyan", cyan);
    function white(str) {
        return run(str, code([37], 39));
    }
    exports_1("white", white);
    function gray(str) {
        return run(str, code([90], 39));
    }
    exports_1("gray", gray);
    function bgBlack(str) {
        return run(str, code([40], 49));
    }
    exports_1("bgBlack", bgBlack);
    function bgRed(str) {
        return run(str, code([41], 49));
    }
    exports_1("bgRed", bgRed);
    function bgGreen(str) {
        return run(str, code([42], 49));
    }
    exports_1("bgGreen", bgGreen);
    function bgYellow(str) {
        return run(str, code([43], 49));
    }
    exports_1("bgYellow", bgYellow);
    function bgBlue(str) {
        return run(str, code([44], 49));
    }
    exports_1("bgBlue", bgBlue);
    function bgMagenta(str) {
        return run(str, code([45], 49));
    }
    exports_1("bgMagenta", bgMagenta);
    function bgCyan(str) {
        return run(str, code([46], 49));
    }
    exports_1("bgCyan", bgCyan);
    function bgWhite(str) {
        return run(str, code([47], 49));
    }
    exports_1("bgWhite", bgWhite);
    function clampAndTruncate(n, max = 255, min = 0) {
        return Math.trunc(Math.max(Math.min(n, max), min));
    }
    function rgb8(str, color) {
        return run(str, code([38, 5, clampAndTruncate(color)], 39));
    }
    exports_1("rgb8", rgb8);
    function bgRgb8(str, color) {
        return run(str, code([48, 5, clampAndTruncate(color)], 49));
    }
    exports_1("bgRgb8", bgRgb8);
    function rgb24(str, color) {
        if (typeof color === "number") {
            return run(str, code([38, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff], 39));
        }
        return run(str, code([
            38,
            2,
            clampAndTruncate(color.r),
            clampAndTruncate(color.g),
            clampAndTruncate(color.b),
        ], 39));
    }
    exports_1("rgb24", rgb24);
    function bgRgb24(str, color) {
        if (typeof color === "number") {
            return run(str, code([48, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff], 49));
        }
        return run(str, code([
            48,
            2,
            clampAndTruncate(color.r),
            clampAndTruncate(color.g),
            clampAndTruncate(color.b),
        ], 49));
    }
    exports_1("bgRgb24", bgRgb24);
    function stripColor(string) {
        return string.replace(ANSI_PATTERN, "");
    }
    exports_1("stripColor", stripColor);
    return {
        setters: [],
        execute: function () {
            noColor = globalThis.Deno?.noColor ?? true;
            enabled = !noColor;
            ANSI_PATTERN = new RegExp([
                "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
                "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
            ].join("|"), "g");
        }
    };
});
System.register("https://deno.land/std@0.63.0/fs/exists", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    async function exists(filePath) {
        try {
            await Deno.lstat(filePath);
            return true;
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return false;
            }
            throw err;
        }
    }
    exports_2("exists", exists);
    function existsSync(filePath) {
        try {
            Deno.lstatSync(filePath);
            return true;
        }
        catch (err) {
            if (err instanceof Deno.errors.NotFound) {
                return false;
            }
            throw err;
        }
    }
    exports_2("existsSync", existsSync);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.63.0/_util/assert", [], function (exports_3, context_3) {
    "use strict";
    var DenoStdInternalError;
    var __moduleName = context_3 && context_3.id;
    function assert(expr, msg = "") {
        if (!expr) {
            throw new DenoStdInternalError(msg);
        }
    }
    exports_3("assert", assert);
    return {
        setters: [],
        execute: function () {
            DenoStdInternalError = class DenoStdInternalError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "DenoStdInternalError";
                }
            };
            exports_3("DenoStdInternalError", DenoStdInternalError);
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/_constants", [], function (exports_4, context_4) {
    "use strict";
    var CHAR_UPPERCASE_A, CHAR_LOWERCASE_A, CHAR_UPPERCASE_Z, CHAR_LOWERCASE_Z, CHAR_DOT, CHAR_FORWARD_SLASH, CHAR_BACKWARD_SLASH, CHAR_VERTICAL_LINE, CHAR_COLON, CHAR_QUESTION_MARK, CHAR_UNDERSCORE, CHAR_LINE_FEED, CHAR_CARRIAGE_RETURN, CHAR_TAB, CHAR_FORM_FEED, CHAR_EXCLAMATION_MARK, CHAR_HASH, CHAR_SPACE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_LEFT_ANGLE_BRACKET, CHAR_RIGHT_ANGLE_BRACKET, CHAR_LEFT_CURLY_BRACKET, CHAR_RIGHT_CURLY_BRACKET, CHAR_HYPHEN_MINUS, CHAR_PLUS, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_PERCENT, CHAR_SEMICOLON, CHAR_CIRCUMFLEX_ACCENT, CHAR_GRAVE_ACCENT, CHAR_AT, CHAR_AMPERSAND, CHAR_EQUAL, CHAR_0, CHAR_9, navigator, isWindows;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("CHAR_UPPERCASE_A", CHAR_UPPERCASE_A = 65);
            exports_4("CHAR_LOWERCASE_A", CHAR_LOWERCASE_A = 97);
            exports_4("CHAR_UPPERCASE_Z", CHAR_UPPERCASE_Z = 90);
            exports_4("CHAR_LOWERCASE_Z", CHAR_LOWERCASE_Z = 122);
            exports_4("CHAR_DOT", CHAR_DOT = 46);
            exports_4("CHAR_FORWARD_SLASH", CHAR_FORWARD_SLASH = 47);
            exports_4("CHAR_BACKWARD_SLASH", CHAR_BACKWARD_SLASH = 92);
            exports_4("CHAR_VERTICAL_LINE", CHAR_VERTICAL_LINE = 124);
            exports_4("CHAR_COLON", CHAR_COLON = 58);
            exports_4("CHAR_QUESTION_MARK", CHAR_QUESTION_MARK = 63);
            exports_4("CHAR_UNDERSCORE", CHAR_UNDERSCORE = 95);
            exports_4("CHAR_LINE_FEED", CHAR_LINE_FEED = 10);
            exports_4("CHAR_CARRIAGE_RETURN", CHAR_CARRIAGE_RETURN = 13);
            exports_4("CHAR_TAB", CHAR_TAB = 9);
            exports_4("CHAR_FORM_FEED", CHAR_FORM_FEED = 12);
            exports_4("CHAR_EXCLAMATION_MARK", CHAR_EXCLAMATION_MARK = 33);
            exports_4("CHAR_HASH", CHAR_HASH = 35);
            exports_4("CHAR_SPACE", CHAR_SPACE = 32);
            exports_4("CHAR_NO_BREAK_SPACE", CHAR_NO_BREAK_SPACE = 160);
            exports_4("CHAR_ZERO_WIDTH_NOBREAK_SPACE", CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279);
            exports_4("CHAR_LEFT_SQUARE_BRACKET", CHAR_LEFT_SQUARE_BRACKET = 91);
            exports_4("CHAR_RIGHT_SQUARE_BRACKET", CHAR_RIGHT_SQUARE_BRACKET = 93);
            exports_4("CHAR_LEFT_ANGLE_BRACKET", CHAR_LEFT_ANGLE_BRACKET = 60);
            exports_4("CHAR_RIGHT_ANGLE_BRACKET", CHAR_RIGHT_ANGLE_BRACKET = 62);
            exports_4("CHAR_LEFT_CURLY_BRACKET", CHAR_LEFT_CURLY_BRACKET = 123);
            exports_4("CHAR_RIGHT_CURLY_BRACKET", CHAR_RIGHT_CURLY_BRACKET = 125);
            exports_4("CHAR_HYPHEN_MINUS", CHAR_HYPHEN_MINUS = 45);
            exports_4("CHAR_PLUS", CHAR_PLUS = 43);
            exports_4("CHAR_DOUBLE_QUOTE", CHAR_DOUBLE_QUOTE = 34);
            exports_4("CHAR_SINGLE_QUOTE", CHAR_SINGLE_QUOTE = 39);
            exports_4("CHAR_PERCENT", CHAR_PERCENT = 37);
            exports_4("CHAR_SEMICOLON", CHAR_SEMICOLON = 59);
            exports_4("CHAR_CIRCUMFLEX_ACCENT", CHAR_CIRCUMFLEX_ACCENT = 94);
            exports_4("CHAR_GRAVE_ACCENT", CHAR_GRAVE_ACCENT = 96);
            exports_4("CHAR_AT", CHAR_AT = 64);
            exports_4("CHAR_AMPERSAND", CHAR_AMPERSAND = 38);
            exports_4("CHAR_EQUAL", CHAR_EQUAL = 61);
            exports_4("CHAR_0", CHAR_0 = 48);
            exports_4("CHAR_9", CHAR_9 = 57);
            navigator = globalThis.navigator;
            isWindows = false;
            exports_4("isWindows", isWindows);
            if (globalThis.Deno != null) {
                exports_4("isWindows", isWindows = Deno.build.os == "windows");
            }
            else if (navigator?.appVersion != null) {
                exports_4("isWindows", isWindows = navigator.appVersion.includes("Win"));
            }
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/_interface", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/_util", ["https://deno.land/std@0.63.0/path/_constants"], function (exports_6, context_6) {
    "use strict";
    var _constants_ts_1;
    var __moduleName = context_6 && context_6.id;
    function assertPath(path) {
        if (typeof path !== "string") {
            throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
        }
    }
    exports_6("assertPath", assertPath);
    function isPosixPathSeparator(code) {
        return code === _constants_ts_1.CHAR_FORWARD_SLASH;
    }
    exports_6("isPosixPathSeparator", isPosixPathSeparator);
    function isPathSeparator(code) {
        return isPosixPathSeparator(code) || code === _constants_ts_1.CHAR_BACKWARD_SLASH;
    }
    exports_6("isPathSeparator", isPathSeparator);
    function isWindowsDeviceRoot(code) {
        return ((code >= _constants_ts_1.CHAR_LOWERCASE_A && code <= _constants_ts_1.CHAR_LOWERCASE_Z) ||
            (code >= _constants_ts_1.CHAR_UPPERCASE_A && code <= _constants_ts_1.CHAR_UPPERCASE_Z));
    }
    exports_6("isWindowsDeviceRoot", isWindowsDeviceRoot);
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
        let res = "";
        let lastSegmentLength = 0;
        let lastSlash = -1;
        let dots = 0;
        let code;
        for (let i = 0, len = path.length; i <= len; ++i) {
            if (i < len)
                code = path.charCodeAt(i);
            else if (isPathSeparator(code))
                break;
            else
                code = _constants_ts_1.CHAR_FORWARD_SLASH;
            if (isPathSeparator(code)) {
                if (lastSlash === i - 1 || dots === 1) {
                }
                else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 ||
                        lastSegmentLength !== 2 ||
                        res.charCodeAt(res.length - 1) !== _constants_ts_1.CHAR_DOT ||
                        res.charCodeAt(res.length - 2) !== _constants_ts_1.CHAR_DOT) {
                        if (res.length > 2) {
                            const lastSlashIndex = res.lastIndexOf(separator);
                            if (lastSlashIndex === -1) {
                                res = "";
                                lastSegmentLength = 0;
                            }
                            else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                        else if (res.length === 2 || res.length === 1) {
                            res = "";
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        if (res.length > 0)
                            res += `${separator}..`;
                        else
                            res = "..";
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0)
                        res += separator + path.slice(lastSlash + 1, i);
                    else
                        res = path.slice(lastSlash + 1, i);
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === _constants_ts_1.CHAR_DOT && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    exports_6("normalizeString", normalizeString);
    function _format(sep, pathObject) {
        const dir = pathObject.dir || pathObject.root;
        const base = pathObject.base ||
            (pathObject.name || "") + (pathObject.ext || "");
        if (!dir)
            return base;
        if (dir === pathObject.root)
            return dir + base;
        return dir + sep + base;
    }
    exports_6("_format", _format);
    return {
        setters: [
            function (_constants_ts_1_1) {
                _constants_ts_1 = _constants_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/win32", ["https://deno.land/std@0.63.0/path/_constants", "https://deno.land/std@0.63.0/path/_util", "https://deno.land/std@0.63.0/_util/assert"], function (exports_7, context_7) {
    "use strict";
    var _constants_ts_2, _util_ts_1, assert_ts_1, sep, delimiter;
    var __moduleName = context_7 && context_7.id;
    function resolve(...pathSegments) {
        let resolvedDevice = "";
        let resolvedTail = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
            }
            else if (!resolvedDevice) {
                if (globalThis.Deno == null) {
                    throw new TypeError("Resolved a drive-letter-less path without a CWD.");
                }
                path = Deno.cwd();
            }
            else {
                if (globalThis.Deno == null) {
                    throw new TypeError("Resolved a relative path without a CWD.");
                }
                path = Deno.env.get(`=${resolvedDevice}`) || Deno.cwd();
                if (path === undefined ||
                    path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                    path = `${resolvedDevice}\\`;
                }
            }
            _util_ts_1.assertPath(path);
            const len = path.length;
            if (len === 0)
                continue;
            let rootEnd = 0;
            let device = "";
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            if (len > 1) {
                if (_util_ts_1.isPathSeparator(code)) {
                    isAbsolute = true;
                    if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                        let j = 2;
                        let last = j;
                        for (; j < len; ++j) {
                            if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            const firstPart = path.slice(last, j);
                            last = j;
                            for (; j < len; ++j) {
                                if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j < len && j !== last) {
                                last = j;
                                for (; j < len; ++j) {
                                    if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                        break;
                                }
                                if (j === len) {
                                    device = `\\\\${firstPart}\\${path.slice(last)}`;
                                    rootEnd = j;
                                }
                                else if (j !== last) {
                                    device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                    rootEnd = j;
                                }
                            }
                        }
                    }
                    else {
                        rootEnd = 1;
                    }
                }
                else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                    if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                        device = path.slice(0, 2);
                        rootEnd = 2;
                        if (len > 2) {
                            if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                                isAbsolute = true;
                                rootEnd = 3;
                            }
                        }
                    }
                }
            }
            else if (_util_ts_1.isPathSeparator(code)) {
                rootEnd = 1;
                isAbsolute = true;
            }
            if (device.length > 0 &&
                resolvedDevice.length > 0 &&
                device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                continue;
            }
            if (resolvedDevice.length === 0 && device.length > 0) {
                resolvedDevice = device;
            }
            if (!resolvedAbsolute) {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
            }
            if (resolvedAbsolute && resolvedDevice.length > 0)
                break;
        }
        resolvedTail = _util_ts_1.normalizeString(resolvedTail, !resolvedAbsolute, "\\", _util_ts_1.isPathSeparator);
        return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
    }
    exports_7("resolve", resolve);
    function normalize(path) {
        _util_ts_1.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (_util_ts_1.isPathSeparator(code)) {
                isAbsolute = true;
                if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for (; j < len; ++j) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for (; j < len; ++j) {
                            if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for (; j < len; ++j) {
                                if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                return `\\\\${firstPart}\\${path.slice(last)}\\`;
                            }
                            else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        }
        else if (_util_ts_1.isPathSeparator(code)) {
            return "\\";
        }
        let tail;
        if (rootEnd < len) {
            tail = _util_ts_1.normalizeString(path.slice(rootEnd), !isAbsolute, "\\", _util_ts_1.isPathSeparator);
        }
        else {
            tail = "";
        }
        if (tail.length === 0 && !isAbsolute)
            tail = ".";
        if (tail.length > 0 && _util_ts_1.isPathSeparator(path.charCodeAt(len - 1))) {
            tail += "\\";
        }
        if (device === undefined) {
            if (isAbsolute) {
                if (tail.length > 0)
                    return `\\${tail}`;
                else
                    return "\\";
            }
            else if (tail.length > 0) {
                return tail;
            }
            else {
                return "";
            }
        }
        else if (isAbsolute) {
            if (tail.length > 0)
                return `${device}\\${tail}`;
            else
                return `${device}\\`;
        }
        else if (tail.length > 0) {
            return device + tail;
        }
        else {
            return device;
        }
    }
    exports_7("normalize", normalize);
    function isAbsolute(path) {
        _util_ts_1.assertPath(path);
        const len = path.length;
        if (len === 0)
            return false;
        const code = path.charCodeAt(0);
        if (_util_ts_1.isPathSeparator(code)) {
            return true;
        }
        else if (_util_ts_1.isWindowsDeviceRoot(code)) {
            if (len > 2 && path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                if (_util_ts_1.isPathSeparator(path.charCodeAt(2)))
                    return true;
            }
        }
        return false;
    }
    exports_7("isAbsolute", isAbsolute);
    function join(...paths) {
        const pathsCount = paths.length;
        if (pathsCount === 0)
            return ".";
        let joined;
        let firstPart = null;
        for (let i = 0; i < pathsCount; ++i) {
            const path = paths[i];
            _util_ts_1.assertPath(path);
            if (path.length > 0) {
                if (joined === undefined)
                    joined = firstPart = path;
                else
                    joined += `\\${path}`;
            }
        }
        if (joined === undefined)
            return ".";
        let needsReplace = true;
        let slashCount = 0;
        assert_ts_1.assert(firstPart != null);
        if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1) {
                if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(1))) {
                    ++slashCount;
                    if (firstLen > 2) {
                        if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(2)))
                            ++slashCount;
                        else {
                            needsReplace = false;
                        }
                    }
                }
            }
        }
        if (needsReplace) {
            for (; slashCount < joined.length; ++slashCount) {
                if (!_util_ts_1.isPathSeparator(joined.charCodeAt(slashCount)))
                    break;
            }
            if (slashCount >= 2)
                joined = `\\${joined.slice(slashCount)}`;
        }
        return normalize(joined);
    }
    exports_7("join", join);
    function relative(from, to) {
        _util_ts_1.assertPath(from);
        _util_ts_1.assertPath(to);
        if (from === to)
            return "";
        const fromOrig = resolve(from);
        const toOrig = resolve(to);
        if (fromOrig === toOrig)
            return "";
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to)
            return "";
        let fromStart = 0;
        let fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        for (; fromEnd - 1 > fromStart; --fromEnd) {
            if (from.charCodeAt(fromEnd - 1) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        let toStart = 0;
        let toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        for (; toEnd - 1 > toStart; --toEnd) {
            if (to.charCodeAt(toEnd - 1) !== _constants_ts_2.CHAR_BACKWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                        return toOrig.slice(toStart + i + 1);
                    }
                    else if (i === 2) {
                        return toOrig.slice(toStart + i);
                    }
                }
                if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                        lastCommonSep = i;
                    }
                    else if (i === 2) {
                        lastCommonSep = 3;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === _constants_ts_2.CHAR_BACKWARD_SLASH)
                lastCommonSep = i;
        }
        if (i !== length && lastCommonSep === -1) {
            return toOrig;
        }
        let out = "";
        if (lastCommonSep === -1)
            lastCommonSep = 0;
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "\\..";
            }
        }
        if (out.length > 0) {
            return out + toOrig.slice(toStart + lastCommonSep, toEnd);
        }
        else {
            toStart += lastCommonSep;
            if (toOrig.charCodeAt(toStart) === _constants_ts_2.CHAR_BACKWARD_SLASH)
                ++toStart;
            return toOrig.slice(toStart, toEnd);
        }
    }
    exports_7("relative", relative);
    function toNamespacedPath(path) {
        if (typeof path !== "string")
            return path;
        if (path.length === 0)
            return "";
        const resolvedPath = resolve(path);
        if (resolvedPath.length >= 3) {
            if (resolvedPath.charCodeAt(0) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                if (resolvedPath.charCodeAt(1) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                    const code = resolvedPath.charCodeAt(2);
                    if (code !== _constants_ts_2.CHAR_QUESTION_MARK && code !== _constants_ts_2.CHAR_DOT) {
                        return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                    }
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
                if (resolvedPath.charCodeAt(1) === _constants_ts_2.CHAR_COLON &&
                    resolvedPath.charCodeAt(2) === _constants_ts_2.CHAR_BACKWARD_SLASH) {
                    return `\\\\?\\${resolvedPath}`;
                }
            }
        }
        return path;
    }
    exports_7("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        _util_ts_1.assertPath(path);
        const len = path.length;
        if (len === 0)
            return ".";
        let rootEnd = -1;
        let end = -1;
        let matchedSlash = true;
        let offset = 0;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (_util_ts_1.isPathSeparator(code)) {
                rootEnd = offset = 1;
                if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for (; j < len; ++j) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for (; j < len; ++j) {
                                if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                return path;
                            }
                            if (j !== last) {
                                rootEnd = offset = j + 1;
                            }
                        }
                    }
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                    rootEnd = offset = 2;
                    if (len > 2) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(2)))
                            rootEnd = offset = 3;
                    }
                }
            }
        }
        else if (_util_ts_1.isPathSeparator(code)) {
            return path;
        }
        for (let i = len - 1; i >= offset; --i) {
            if (_util_ts_1.isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                matchedSlash = false;
            }
        }
        if (end === -1) {
            if (rootEnd === -1)
                return ".";
            else
                end = rootEnd;
        }
        return path.slice(0, end);
    }
    exports_7("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        _util_ts_1.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (path.length >= 2) {
            const drive = path.charCodeAt(0);
            if (_util_ts_1.isWindowsDeviceRoot(drive)) {
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON)
                    start = 2;
            }
        }
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (_util_ts_1.isPathSeparator(code)) {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                end = i;
                            }
                        }
                        else {
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= start; --i) {
                if (_util_ts_1.isPathSeparator(path.charCodeAt(i))) {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_7("basename", basename);
    function extname(path) {
        _util_ts_1.assertPath(path);
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let preDotState = 0;
        if (path.length >= 2 &&
            path.charCodeAt(1) === _constants_ts_2.CHAR_COLON &&
            _util_ts_1.isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }
        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (_util_ts_1.isPathSeparator(code)) {
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_2.CHAR_DOT) {
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            preDotState === 0 ||
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_7("extname", extname);
    function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return _util_ts_1._format("\\", pathObject);
    }
    exports_7("format", format);
    function parse(path) {
        _util_ts_1.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        const len = path.length;
        if (len === 0)
            return ret;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        if (len > 1) {
            if (_util_ts_1.isPathSeparator(code)) {
                rootEnd = 1;
                if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for (; j < len; ++j) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                            break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for (; j < len; ++j) {
                            if (!_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for (; j < len; ++j) {
                                if (_util_ts_1.isPathSeparator(path.charCodeAt(j)))
                                    break;
                            }
                            if (j === len) {
                                rootEnd = j;
                            }
                            else if (j !== last) {
                                rootEnd = j + 1;
                            }
                        }
                    }
                }
            }
            else if (_util_ts_1.isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
                    rootEnd = 2;
                    if (len > 2) {
                        if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                            if (len === 3) {
                                ret.root = ret.dir = path;
                                return ret;
                            }
                            rootEnd = 3;
                        }
                    }
                    else {
                        ret.root = ret.dir = path;
                        return ret;
                    }
                }
            }
        }
        else if (_util_ts_1.isPathSeparator(code)) {
            ret.root = ret.dir = path;
            return ret;
        }
        if (rootEnd > 0)
            ret.root = path.slice(0, rootEnd);
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        let preDotState = 0;
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (_util_ts_1.isPathSeparator(code)) {
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_2.CHAR_DOT) {
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            preDotState === 0 ||
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
        else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else
            ret.dir = ret.root;
        return ret;
    }
    exports_7("parse", parse);
    function fromFileUrl(url) {
        url = url instanceof URL ? url : new URL(url);
        if (url.protocol != "file:") {
            throw new TypeError("Must be a file URL.");
        }
        let path = decodeURIComponent(url.pathname
            .replace(/^\/*([A-Za-z]:)(\/|$)/, "$1/")
            .replace(/\//g, "\\"));
        if (url.hostname != "") {
            path = `\\\\${url.hostname}${path}`;
        }
        return path;
    }
    exports_7("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (_constants_ts_2_1) {
                _constants_ts_2 = _constants_ts_2_1;
            },
            function (_util_ts_1_1) {
                _util_ts_1 = _util_ts_1_1;
            },
            function (assert_ts_1_1) {
                assert_ts_1 = assert_ts_1_1;
            }
        ],
        execute: function () {
            exports_7("sep", sep = "\\");
            exports_7("delimiter", delimiter = ";");
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/posix", ["https://deno.land/std@0.63.0/path/_constants", "https://deno.land/std@0.63.0/path/_util"], function (exports_8, context_8) {
    "use strict";
    var _constants_ts_3, _util_ts_2, sep, delimiter;
    var __moduleName = context_8 && context_8.id;
    function resolve(...pathSegments) {
        let resolvedPath = "";
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            let path;
            if (i >= 0)
                path = pathSegments[i];
            else {
                if (globalThis.Deno == null) {
                    throw new TypeError("Resolved a relative path without a CWD.");
                }
                path = Deno.cwd();
            }
            _util_ts_2.assertPath(path);
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        }
        resolvedPath = _util_ts_2.normalizeString(resolvedPath, !resolvedAbsolute, "/", _util_ts_2.isPosixPathSeparator);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
                return `/${resolvedPath}`;
            else
                return "/";
        }
        else if (resolvedPath.length > 0)
            return resolvedPath;
        else
            return ".";
    }
    exports_8("resolve", resolve);
    function normalize(path) {
        _util_ts_2.assertPath(path);
        if (path.length === 0)
            return ".";
        const isAbsolute = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === _constants_ts_3.CHAR_FORWARD_SLASH;
        path = _util_ts_2.normalizeString(path, !isAbsolute, "/", _util_ts_2.isPosixPathSeparator);
        if (path.length === 0 && !isAbsolute)
            path = ".";
        if (path.length > 0 && trailingSeparator)
            path += "/";
        if (isAbsolute)
            return `/${path}`;
        return path;
    }
    exports_8("normalize", normalize);
    function isAbsolute(path) {
        _util_ts_2.assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
    }
    exports_8("isAbsolute", isAbsolute);
    function join(...paths) {
        if (paths.length === 0)
            return ".";
        let joined;
        for (let i = 0, len = paths.length; i < len; ++i) {
            const path = paths[i];
            _util_ts_2.assertPath(path);
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `/${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalize(joined);
    }
    exports_8("join", join);
    function relative(from, to) {
        _util_ts_2.assertPath(from);
        _util_ts_2.assertPath(to);
        if (from === to)
            return "";
        from = resolve(from);
        to = resolve(to);
        if (from === to)
            return "";
        let fromStart = 1;
        const fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (from.charCodeAt(fromStart) !== _constants_ts_3.CHAR_FORWARD_SLASH)
                break;
        }
        const fromLen = fromEnd - fromStart;
        let toStart = 1;
        const toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (to.charCodeAt(toStart) !== _constants_ts_3.CHAR_FORWARD_SLASH)
                break;
        }
        const toLen = toEnd - toStart;
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                        return to.slice(toStart + i + 1);
                    }
                    else if (i === 0) {
                        return to.slice(toStart + i);
                    }
                }
                else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                        lastCommonSep = i;
                    }
                    else if (i === 0) {
                        lastCommonSep = 0;
                    }
                }
                break;
            }
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === _constants_ts_3.CHAR_FORWARD_SLASH)
                lastCommonSep = i;
        }
        let out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                if (out.length === 0)
                    out += "..";
                else
                    out += "/..";
            }
        }
        if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === _constants_ts_3.CHAR_FORWARD_SLASH)
                ++toStart;
            return to.slice(toStart);
        }
    }
    exports_8("relative", relative);
    function toNamespacedPath(path) {
        return path;
    }
    exports_8("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
        _util_ts_2.assertPath(path);
        if (path.length === 0)
            return ".";
        const hasRoot = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                matchedSlash = false;
            }
        }
        if (end === -1)
            return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
            return "//";
        return path.slice(0, end);
    }
    exports_8("dirname", dirname);
    function basename(path, ext = "") {
        if (ext !== undefined && typeof ext !== "string") {
            throw new TypeError('"ext" argument must be a string');
        }
        _util_ts_2.assertPath(path);
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return "";
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                end = i;
                            }
                        }
                        else {
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return "";
            return path.slice(start, end);
        }
    }
    exports_8("basename", basename);
    function extname(path) {
        _util_ts_2.assertPath(path);
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            const code = path.charCodeAt(i);
            if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_3.CHAR_DOT) {
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            preDotState === 0 ||
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            return "";
        }
        return path.slice(startDot, end);
    }
    exports_8("extname", extname);
    function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
        }
        return _util_ts_2._format("/", pathObject);
    }
    exports_8("format", format);
    function parse(path) {
        _util_ts_2.assertPath(path);
        const ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
            return ret;
        const isAbsolute = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = "/";
            start = 1;
        }
        else {
            start = 0;
        }
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        let preDotState = 0;
        for (; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
            if (code === _constants_ts_3.CHAR_DOT) {
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            preDotState === 0 ||
            (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute) {
                    ret.base = ret.name = path.slice(1, end);
                }
                else {
                    ret.base = ret.name = path.slice(startPart, end);
                }
            }
        }
        else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
            ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
            ret.dir = "/";
        return ret;
    }
    exports_8("parse", parse);
    function fromFileUrl(url) {
        url = url instanceof URL ? url : new URL(url);
        if (url.protocol != "file:") {
            throw new TypeError("Must be a file URL.");
        }
        return decodeURIComponent(url.pathname);
    }
    exports_8("fromFileUrl", fromFileUrl);
    return {
        setters: [
            function (_constants_ts_3_1) {
                _constants_ts_3 = _constants_ts_3_1;
            },
            function (_util_ts_2_1) {
                _util_ts_2 = _util_ts_2_1;
            }
        ],
        execute: function () {
            exports_8("sep", sep = "/");
            exports_8("delimiter", delimiter = ":");
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/separator", ["https://deno.land/std@0.63.0/path/_constants"], function (exports_9, context_9) {
    "use strict";
    var _constants_ts_4, SEP, SEP_PATTERN;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (_constants_ts_4_1) {
                _constants_ts_4 = _constants_ts_4_1;
            }
        ],
        execute: function () {
            exports_9("SEP", SEP = _constants_ts_4.isWindows ? "\\" : "/");
            exports_9("SEP_PATTERN", SEP_PATTERN = _constants_ts_4.isWindows ? /[\\/]+/ : /\/+/);
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/common", ["https://deno.land/std@0.63.0/path/separator"], function (exports_10, context_10) {
    "use strict";
    var separator_ts_1;
    var __moduleName = context_10 && context_10.id;
    function common(paths, sep = separator_ts_1.SEP) {
        const [first = "", ...remaining] = paths;
        if (first === "" || remaining.length === 0) {
            return first.substring(0, first.lastIndexOf(sep) + 1);
        }
        const parts = first.split(sep);
        let endOfPrefix = parts.length;
        for (const path of remaining) {
            const compare = path.split(sep);
            for (let i = 0; i < endOfPrefix; i++) {
                if (compare[i] !== parts[i]) {
                    endOfPrefix = i;
                }
            }
            if (endOfPrefix === 0) {
                return "";
            }
        }
        const prefix = parts.slice(0, endOfPrefix).join(sep);
        return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
    }
    exports_10("common", common);
    return {
        setters: [
            function (separator_ts_1_1) {
                separator_ts_1 = separator_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/_globrex", ["https://deno.land/std@0.63.0/path/_constants"], function (exports_11, context_11) {
    "use strict";
    var _constants_ts_5, SEP, SEP_ESC, SEP_RAW, GLOBSTAR, WILDCARD, GLOBSTAR_SEGMENT, WILDCARD_SEGMENT;
    var __moduleName = context_11 && context_11.id;
    function globrex(glob, { extended = false, globstar = false, strict = false, filepath = false, flags = "", } = {}) {
        const sepPattern = new RegExp(`^${SEP}${strict ? "" : "+"}$`);
        let regex = "";
        let segment = "";
        let pathRegexStr = "";
        const pathSegments = [];
        let inGroup = false;
        let inRange = false;
        const ext = [];
        function add(str, options = { split: false, last: false, only: "" }) {
            const { split, last, only } = options;
            if (only !== "path")
                regex += str;
            if (filepath && only !== "regex") {
                pathRegexStr += str.match(sepPattern) ? SEP : str;
                if (split) {
                    if (last)
                        segment += str;
                    if (segment !== "") {
                        if (!flags.includes("g"))
                            segment = `^${segment}$`;
                        pathSegments.push(new RegExp(segment, flags));
                    }
                    segment = "";
                }
                else {
                    segment += str;
                }
            }
        }
        let c, n;
        for (let i = 0; i < glob.length; i++) {
            c = glob[i];
            n = glob[i + 1];
            if (["\\", "$", "^", ".", "="].includes(c)) {
                add(`\\${c}`);
                continue;
            }
            if (c.match(sepPattern)) {
                add(SEP, { split: true });
                if (n != null && n.match(sepPattern) && !strict)
                    regex += "?";
                continue;
            }
            if (c === "(") {
                if (ext.length) {
                    add(`${c}?:`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ")") {
                if (ext.length) {
                    add(c);
                    const type = ext.pop();
                    if (type === "@") {
                        add("{1}");
                    }
                    else if (type === "!") {
                        add(WILDCARD);
                    }
                    else {
                        add(type);
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "|") {
                if (ext.length) {
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "+") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "@" && extended) {
                if (n === "(") {
                    ext.push(c);
                    continue;
                }
            }
            if (c === "!") {
                if (extended) {
                    if (inRange) {
                        add("^");
                        continue;
                    }
                    if (n === "(") {
                        ext.push(c);
                        add("(?!");
                        i++;
                        continue;
                    }
                    add(`\\${c}`);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "?") {
                if (extended) {
                    if (n === "(") {
                        ext.push(c);
                    }
                    else {
                        add(".");
                    }
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "[") {
                if (inRange && n === ":") {
                    i++;
                    let value = "";
                    while (glob[++i] !== ":")
                        value += glob[i];
                    if (value === "alnum")
                        add("(?:\\w|\\d)");
                    else if (value === "space")
                        add("\\s");
                    else if (value === "digit")
                        add("\\d");
                    i++;
                    continue;
                }
                if (extended) {
                    inRange = true;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "]") {
                if (extended) {
                    inRange = false;
                    add(c);
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "{") {
                if (extended) {
                    inGroup = true;
                    add("(?:");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "}") {
                if (extended) {
                    inGroup = false;
                    add(")");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === ",") {
                if (inGroup) {
                    add("|");
                    continue;
                }
                add(`\\${c}`);
                continue;
            }
            if (c === "*") {
                if (n === "(" && extended) {
                    ext.push(c);
                    continue;
                }
                const prevChar = glob[i - 1];
                let starCount = 1;
                while (glob[i + 1] === "*") {
                    starCount++;
                    i++;
                }
                const nextChar = glob[i + 1];
                if (!globstar) {
                    add(".*");
                }
                else {
                    const isGlobstar = starCount > 1 &&
                        [SEP_RAW, "/", undefined].includes(prevChar) &&
                        [SEP_RAW, "/", undefined].includes(nextChar);
                    if (isGlobstar) {
                        add(GLOBSTAR, { only: "regex" });
                        add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
                        i++;
                    }
                    else {
                        add(WILDCARD, { only: "regex" });
                        add(WILDCARD_SEGMENT, { only: "path" });
                    }
                }
                continue;
            }
            add(c);
        }
        if (!flags.includes("g")) {
            regex = `^${regex}$`;
            segment = `^${segment}$`;
            if (filepath)
                pathRegexStr = `^${pathRegexStr}$`;
        }
        const result = { regex: new RegExp(regex, flags) };
        if (filepath) {
            pathSegments.push(new RegExp(segment, flags));
            result.path = {
                regex: new RegExp(pathRegexStr, flags),
                segments: pathSegments,
                globstar: new RegExp(!flags.includes("g") ? `^${GLOBSTAR_SEGMENT}$` : GLOBSTAR_SEGMENT, flags),
            };
        }
        return result;
    }
    exports_11("globrex", globrex);
    return {
        setters: [
            function (_constants_ts_5_1) {
                _constants_ts_5 = _constants_ts_5_1;
            }
        ],
        execute: function () {
            SEP = _constants_ts_5.isWindows ? `(?:\\\\|\\/)` : `\\/`;
            SEP_ESC = _constants_ts_5.isWindows ? `\\\\` : `/`;
            SEP_RAW = _constants_ts_5.isWindows ? `\\` : `/`;
            GLOBSTAR = `(?:(?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD = `(?:[^${SEP_ESC}/]*)`;
            GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
            WILDCARD_SEGMENT = `(?:[^${SEP_ESC}/]*)`;
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/glob", ["https://deno.land/std@0.63.0/path/separator", "https://deno.land/std@0.63.0/path/_globrex", "https://deno.land/std@0.63.0/path/mod", "https://deno.land/std@0.63.0/_util/assert"], function (exports_12, context_12) {
    "use strict";
    var separator_ts_2, _globrex_ts_1, mod_ts_1, assert_ts_2;
    var __moduleName = context_12 && context_12.id;
    function globToRegExp(glob, { extended = false, globstar = true } = {}) {
        const result = _globrex_ts_1.globrex(glob, {
            extended,
            globstar,
            strict: false,
            filepath: true,
        });
        assert_ts_2.assert(result.path != null);
        return result.path.regex;
    }
    exports_12("globToRegExp", globToRegExp);
    function isGlob(str) {
        const chars = { "{": "}", "(": ")", "[": "]" };
        const regex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
        if (str === "") {
            return false;
        }
        let match;
        while ((match = regex.exec(str))) {
            if (match[2])
                return true;
            let idx = match.index + match[0].length;
            const open = match[1];
            const close = open ? chars[open] : null;
            if (open && close) {
                const n = str.indexOf(close, idx);
                if (n !== -1) {
                    idx = n + 1;
                }
            }
            str = str.slice(idx);
        }
        return false;
    }
    exports_12("isGlob", isGlob);
    function normalizeGlob(glob, { globstar = false } = {}) {
        if (glob.match(/\0/g)) {
            throw new Error(`Glob contains invalid characters: "${glob}"`);
        }
        if (!globstar) {
            return mod_ts_1.normalize(glob);
        }
        const s = separator_ts_2.SEP_PATTERN.source;
        const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
        return mod_ts_1.normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
    }
    exports_12("normalizeGlob", normalizeGlob);
    function joinGlobs(globs, { extended = false, globstar = false } = {}) {
        if (!globstar || globs.length == 0) {
            return mod_ts_1.join(...globs);
        }
        if (globs.length === 0)
            return ".";
        let joined;
        for (const glob of globs) {
            const path = glob;
            if (path.length > 0) {
                if (!joined)
                    joined = path;
                else
                    joined += `${separator_ts_2.SEP}${path}`;
            }
        }
        if (!joined)
            return ".";
        return normalizeGlob(joined, { extended, globstar });
    }
    exports_12("joinGlobs", joinGlobs);
    return {
        setters: [
            function (separator_ts_2_1) {
                separator_ts_2 = separator_ts_2_1;
            },
            function (_globrex_ts_1_1) {
                _globrex_ts_1 = _globrex_ts_1_1;
            },
            function (mod_ts_1_1) {
                mod_ts_1 = mod_ts_1_1;
            },
            function (assert_ts_2_1) {
                assert_ts_2 = assert_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/std@0.63.0/path/mod", ["https://deno.land/std@0.63.0/path/_constants", "https://deno.land/std@0.63.0/path/win32", "https://deno.land/std@0.63.0/path/posix", "https://deno.land/std@0.63.0/path/common", "https://deno.land/std@0.63.0/path/separator", "https://deno.land/std@0.63.0/path/_interface", "https://deno.land/std@0.63.0/path/glob"], function (exports_13, context_13) {
    "use strict";
    var _constants_ts_6, _win32, _posix, path, win32, posix, basename, delimiter, dirname, extname, format, fromFileUrl, isAbsolute, join, normalize, parse, relative, resolve, sep, toNamespacedPath;
    var __moduleName = context_13 && context_13.id;
    var exportedNames_1 = {
        "win32": true,
        "posix": true,
        "basename": true,
        "delimiter": true,
        "dirname": true,
        "extname": true,
        "format": true,
        "fromFileUrl": true,
        "isAbsolute": true,
        "join": true,
        "normalize": true,
        "parse": true,
        "relative": true,
        "resolve": true,
        "sep": true,
        "toNamespacedPath": true,
        "SEP": true,
        "SEP_PATTERN": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters: [
            function (_constants_ts_6_1) {
                _constants_ts_6 = _constants_ts_6_1;
            },
            function (_win32_1) {
                _win32 = _win32_1;
            },
            function (_posix_1) {
                _posix = _posix_1;
            },
            function (common_ts_1_1) {
                exportStar_1(common_ts_1_1);
            },
            function (separator_ts_3_1) {
                exports_13({
                    "SEP": separator_ts_3_1["SEP"],
                    "SEP_PATTERN": separator_ts_3_1["SEP_PATTERN"]
                });
            },
            function (_interface_ts_1_1) {
                exportStar_1(_interface_ts_1_1);
            },
            function (glob_ts_1_1) {
                exportStar_1(glob_ts_1_1);
            }
        ],
        execute: function () {
            path = _constants_ts_6.isWindows ? _win32 : _posix;
            exports_13("win32", win32 = _win32);
            exports_13("posix", posix = _posix);
            exports_13("basename", basename = path.basename), exports_13("delimiter", delimiter = path.delimiter), exports_13("dirname", dirname = path.dirname), exports_13("extname", extname = path.extname), exports_13("format", format = path.format), exports_13("fromFileUrl", fromFileUrl = path.fromFileUrl), exports_13("isAbsolute", isAbsolute = path.isAbsolute), exports_13("join", join = path.join), exports_13("normalize", normalize = path.normalize), exports_13("parse", parse = path.parse), exports_13("relative", relative = path.relative), exports_13("resolve", resolve = path.resolve), exports_13("sep", sep = path.sep), exports_13("toNamespacedPath", toNamespacedPath = path.toNamespacedPath);
        }
    };
});
System.register("https://deno.land/std@0.63.0/fs/walk", ["https://deno.land/std@0.63.0/_util/assert", "https://deno.land/std@0.63.0/path/mod"], function (exports_14, context_14) {
    "use strict";
    var assert_ts_3, mod_ts_2;
    var __moduleName = context_14 && context_14.id;
    function createWalkEntrySync(path) {
        path = mod_ts_2.normalize(path);
        const name = mod_ts_2.basename(path);
        const info = Deno.statSync(path);
        return {
            path,
            name,
            isFile: info.isFile,
            isDirectory: info.isDirectory,
            isSymlink: info.isSymlink,
        };
    }
    exports_14("createWalkEntrySync", createWalkEntrySync);
    async function createWalkEntry(path) {
        path = mod_ts_2.normalize(path);
        const name = mod_ts_2.basename(path);
        const info = await Deno.stat(path);
        return {
            path,
            name,
            isFile: info.isFile,
            isDirectory: info.isDirectory,
            isSymlink: info.isSymlink,
        };
    }
    exports_14("createWalkEntry", createWalkEntry);
    function include(path, exts, match, skip) {
        if (exts && !exts.some((ext) => path.endsWith(ext))) {
            return false;
        }
        if (match && !match.some((pattern) => !!path.match(pattern))) {
            return false;
        }
        if (skip && skip.some((pattern) => !!path.match(pattern))) {
            return false;
        }
        return true;
    }
    async function* walk(root, { maxDepth = Infinity, includeFiles = true, includeDirs = true, followSymlinks = false, exts = undefined, match = undefined, skip = undefined, } = {}) {
        if (maxDepth < 0) {
            return;
        }
        if (includeDirs && include(root, exts, match, skip)) {
            yield await createWalkEntry(root);
        }
        if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
            return;
        }
        for await (const entry of Deno.readDir(root)) {
            if (entry.isSymlink) {
                if (followSymlinks) {
                    throw new Error("unimplemented");
                }
                else {
                    continue;
                }
            }
            assert_ts_3.assert(entry.name != null);
            const path = mod_ts_2.join(root, entry.name);
            if (entry.isFile) {
                if (includeFiles && include(path, exts, match, skip)) {
                    yield { path, ...entry };
                }
            }
            else {
                yield* walk(path, {
                    maxDepth: maxDepth - 1,
                    includeFiles,
                    includeDirs,
                    followSymlinks,
                    exts,
                    match,
                    skip,
                });
            }
        }
    }
    exports_14("walk", walk);
    function* walkSync(root, { maxDepth = Infinity, includeFiles = true, includeDirs = true, followSymlinks = false, exts = undefined, match = undefined, skip = undefined, } = {}) {
        if (maxDepth < 0) {
            return;
        }
        if (includeDirs && include(root, exts, match, skip)) {
            yield createWalkEntrySync(root);
        }
        if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
            return;
        }
        for (const entry of Deno.readDirSync(root)) {
            if (entry.isSymlink) {
                if (followSymlinks) {
                    throw new Error("unimplemented");
                }
                else {
                    continue;
                }
            }
            assert_ts_3.assert(entry.name != null);
            const path = mod_ts_2.join(root, entry.name);
            if (entry.isFile) {
                if (includeFiles && include(path, exts, match, skip)) {
                    yield { path, ...entry };
                }
            }
            else {
                yield* walkSync(path, {
                    maxDepth: maxDepth - 1,
                    includeFiles,
                    includeDirs,
                    followSymlinks,
                    exts,
                    match,
                    skip,
                });
            }
        }
    }
    exports_14("walkSync", walkSync);
    return {
        setters: [
            function (assert_ts_3_1) {
                assert_ts_3 = assert_ts_3_1;
            },
            function (mod_ts_2_1) {
                mod_ts_2 = mod_ts_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/deps", ["https://deno.land/std@0.63.0/fmt/colors", "https://deno.land/std@0.63.0/fs/exists", "https://deno.land/std@0.63.0/fs/walk", "https://deno.land/std@0.63.0/path/mod"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (colors_1) {
                exports_15("colors", colors_1);
            },
            function (exists_ts_1_1) {
                exports_15({
                    "existsSync": exists_ts_1_1["existsSync"]
                });
            },
            function (walk_ts_1_1) {
                exports_15({
                    "walkSync": walk_ts_1_1["walkSync"]
                });
            },
            function (path_1) {
                exports_15("path", path_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/utils", ["https://deno.land/x/drake@v1.2.6/lib/deps", "https://deno.land/x/drake@v1.2.6/lib/env"], function (exports_16, context_16) {
    "use strict";
    var deps_ts_1, env_ts_1, DRAKE_VERS, DrakeError;
    var __moduleName = context_16 && context_16.id;
    function vers() {
        return DRAKE_VERS;
    }
    exports_16("vers", vers);
    function abort(message) {
        if (env_ts_1.env("--abort-exits")) {
            message = `${deps_ts_1.colors.red(deps_ts_1.colors.bold("drake error:"))} ${message}`;
            if (env_ts_1.env("--debug")) {
                const e = new Error();
                if (e.stack) {
                    message += `\n${e.stack}`;
                }
            }
            console.error(message);
            Deno.exit(1);
        }
        else {
            throw new DrakeError(message);
        }
    }
    exports_16("abort", abort);
    function log(message) {
        if (!env_ts_1.env("--quiet")) {
            console.log(message);
        }
    }
    exports_16("log", log);
    function debug(title, message = "") {
        if (typeof message === "object") {
            message = JSON.stringify(message, null, 1);
        }
        if (env_ts_1.env("--debug") && Deno.isatty(Deno.stderr.rid)) {
            console.error(`${deps_ts_1.colors.yellow(deps_ts_1.colors.bold(title + ":"))} ${message}`);
        }
    }
    exports_16("debug", debug);
    function quote(values, sep = " ") {
        values = values.map((value) => `"${value.replace(/"/g, '\\"')}"`);
        return values.join(sep);
    }
    exports_16("quote", quote);
    async function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    exports_16("sleep", sleep);
    function readFile(filename) {
        const result = Deno.readTextFileSync(filename);
        debug("readFile", `${filename}: ${result.length} characters read`);
        return result;
    }
    exports_16("readFile", readFile);
    function writeFile(filename, text) {
        const exists = deps_ts_1.existsSync(filename);
        debug("writeFile", `${filename}: ${text.length} characters written`);
        Deno.writeTextFileSync(filename, text);
        return !exists;
    }
    exports_16("writeFile", writeFile);
    function updateFile(filename, find, replace) {
        debug("updateFile", `${filename}: find: ${find}, replace: "${replace}"`);
        let changed = false;
        const text = readFile(filename);
        const updatedText = text.replace(find, replace);
        if (text !== updatedText) {
            writeFile(filename, updatedText);
            changed = true;
        }
        return changed;
    }
    exports_16("updateFile", updateFile);
    function makeDir(dir) {
        debug("makeDir", dir);
        const exists = deps_ts_1.existsSync(dir);
        if (exists) {
            if (!Deno.statSync(dir).isDirectory) {
                abort(`file is not directory: ${dir}`);
            }
        }
        else {
            Deno.mkdirSync(dir, { recursive: true });
        }
        return !exists;
    }
    exports_16("makeDir", makeDir);
    function glob(...patterns) {
        function glob1(pattern) {
            const globOptions = { extended: true, globstar: true };
            pattern = deps_ts_1.path.normalizeGlob(pattern, globOptions);
            let root = deps_ts_1.path.dirname(pattern);
            while (root !== "." && deps_ts_1.path.isGlob(root)) {
                root = deps_ts_1.path.dirname(root);
            }
            const regexp = deps_ts_1.path.globToRegExp(pattern, globOptions);
            const iter = deps_ts_1.walkSync(root, { match: [regexp], includeDirs: false });
            return Array.from(iter, (info) => info.path);
        }
        let result = [];
        for (const pattern of patterns) {
            result = [...result, ...glob1(pattern)];
        }
        result = [...new Set(result)].map((p) => deps_ts_1.path.normalize(p)).sort();
        debug("glob", `${quote(patterns, ", ")}:\n${result.join("\n")}`);
        return result;
    }
    exports_16("glob", glob);
    function shArgs(command) {
        let cmdArgs;
        if (Deno.build.os === "windows") {
            const cmdFile = Deno.makeTempFileSync({ prefix: "drake_", suffix: ".cmd" });
            writeFile(cmdFile, `@echo off\n${command}`);
            return [[cmdFile], cmdFile];
        }
        else {
            const shellExe = Deno.env.get("SHELL");
            if (!shellExe) {
                abort(`cannot locate shell: missing SHELL environment variable`);
            }
            return [[shellExe, "-c", command], ""];
        }
    }
    async function sh(commands, opts = {}) {
        if (typeof commands === "string") {
            commands = [commands];
        }
        debug("sh", `${commands.join("\n")}\nopts: ${JSON.stringify(opts)}`);
        const tempFiles = [];
        const processes = [];
        const results = [];
        try {
            for (const cmd of commands) {
                let cmdArgs;
                let cmdFile = "";
                [cmdArgs, cmdFile] = shArgs(cmd);
                if (cmdFile)
                    tempFiles.push(cmdFile);
                const p = Deno.run({
                    cmd: cmdArgs,
                    cwd: opts.cwd,
                    env: opts.env,
                    stdout: opts.stdout ?? "inherit",
                    stderr: opts.stderr ?? "inherit",
                });
                processes.push(p);
            }
            results.push(...await Promise.all(processes.map((p) => p.status())));
        }
        finally {
            for (const p of processes) {
                p.close();
            }
        }
        for (const f of tempFiles) {
            Deno.removeSync(f);
        }
        for (const i in results) {
            const cmd = commands[i];
            const code = results[i].code;
            if (code === undefined) {
                abort(`sh: ${cmd}: undefined exit code`);
            }
            if (code !== 0) {
                abort(`sh: ${cmd}: error code: ${code}`);
            }
        }
    }
    exports_16("sh", sh);
    async function shCapture(command, opts = {}) {
        let cmdArgs;
        let cmdFile = "";
        [cmdArgs, cmdFile] = shArgs(command);
        const p = Deno.run({
            cmd: cmdArgs,
            cwd: opts.cwd,
            env: opts.env,
            stdin: opts.input !== undefined ? "piped" : undefined,
            stdout: opts.stdout ?? "piped",
            stderr: opts.stderr ?? "inherit",
        });
        let status;
        let outputBytes, errorBytes;
        try {
            if (p.stdin) {
                await p.stdin.write(new TextEncoder().encode(opts.input));
                p.stdin.close();
            }
            [status, outputBytes, errorBytes] = await Promise.all([
                p.status(),
                p.stdout ? p.output() : Promise.resolve(new Uint8Array()),
                p.stderr ? p.stderrOutput() : Promise.resolve(new Uint8Array()),
            ]);
        }
        finally {
            p.close();
        }
        if (cmdFile)
            Deno.removeSync(cmdFile);
        const result = {
            code: status.code,
            output: new TextDecoder().decode(outputBytes),
            error: new TextDecoder().decode(errorBytes),
        };
        debug("shCapture", `${command}\nopts:      ${JSON.stringify(opts)}\noutputs:   ${JSON.stringify(result)}`);
        return result;
    }
    exports_16("shCapture", shCapture);
    return {
        setters: [
            function (deps_ts_1_1) {
                deps_ts_1 = deps_ts_1_1;
            },
            function (env_ts_1_1) {
                env_ts_1 = env_ts_1_1;
            }
        ],
        execute: function () {
            DRAKE_VERS = "1.2.6";
            DrakeError = class DrakeError extends Error {
                constructor(message) {
                    super(message);
                    this.name = "DrakeError";
                }
            };
            exports_16("DrakeError", DrakeError);
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/env", ["https://deno.land/x/drake@v1.2.6/lib/deps", "https://deno.land/x/drake@v1.2.6/lib/utils"], function (exports_17, context_17) {
    "use strict";
    var deps_ts_2, utils_ts_1, Env, env;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (deps_ts_2_1) {
                deps_ts_2 = deps_ts_2_1;
            },
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            }
        ],
        execute: function () {
            Env = class Env {
                constructor() {
                    this.values = {
                        ...{
                            "--tasks": [],
                            "--debug": !!Deno.env.get("DRAKE_DEBUG"),
                            "--default-task": "",
                            "--directory": Deno.cwd(),
                            "--abort-exits": false,
                            "--always-make": false,
                            "--dry-run": false,
                            "--help": false,
                            "--list-all": false,
                            "--list-tasks": false,
                            "--quiet": false,
                            "--version": false,
                        },
                    };
                }
                setValue(name, value) {
                    switch (name) {
                        case "--abort-exits":
                        case "--always-make":
                        case "--debug":
                        case "--dry-run":
                        case "--help":
                        case "--list-all":
                        case "--list-tasks":
                        case "--quiet":
                        case "--version":
                            if (typeof value !== "boolean") {
                                utils_ts_1.abort(`${name} must be a boolean`);
                            }
                            break;
                        case "--directory":
                            if (typeof value !== "string") {
                                utils_ts_1.abort(`${name} must be a string`);
                            }
                            if (!deps_ts_2.existsSync(value) || !Deno.statSync(value).isDirectory) {
                                utils_ts_1.abort(`--directory missing or not a directory: ${value}`);
                            }
                            value = Deno.realPathSync(value);
                            Deno.chdir(value);
                            break;
                        case "--default-task":
                            if (typeof value !== "string") {
                                utils_ts_1.abort(`${name} must be a string`);
                            }
                            break;
                        case "--tasks":
                            if (!(value instanceof Array) ||
                                !value.every((v) => typeof v === "string")) {
                                utils_ts_1.abort("--tasks must be a string array");
                            }
                            break;
                        default:
                            if (name.startsWith("-")) {
                                utils_ts_1.abort(`illegal option: ${name}`);
                            }
                            if (!/^[a-zA-Z]\w*$/.test(name)) {
                                utils_ts_1.abort(`illegal variable name: ${name}`);
                            }
                            if (typeof value !== "string") {
                                utils_ts_1.abort(`variable value must be a string: ${name}`);
                            }
                    }
                    this.values[name] = value;
                }
                static create() {
                    const env = new Env();
                    return function (name, value) {
                        if (name === undefined) {
                            return this;
                        }
                        if (arguments.length !== 1) {
                            utils_ts_1.debug("set", `${name}: ${value}`);
                            this.setValue(name, value);
                        }
                        return this.values[name];
                    }.bind(env);
                }
                parseArgs(args) {
                    let arg;
                    while (!!(arg = args.shift())) {
                        const match = arg.match(/^([a-zA-Z]\w*)=(.*)$/);
                        if (match) {
                            this.values[match[1]] = match[2];
                            continue;
                        }
                        const shortOpts = {
                            "-a": "--always-make",
                            "-D": "--debug",
                            "-d": "--directory",
                            "-n": "--dry-run",
                            "-h": "--help",
                            "-l": "--list-tasks",
                            "-L": "--list-all",
                            "-q": "--quiet",
                        };
                        if (shortOpts[arg] !== undefined) {
                            arg = shortOpts[arg];
                        }
                        switch (arg) {
                            case "--always-make":
                            case "--debug":
                            case "--dry-run":
                            case "--help":
                            case "--list-tasks":
                            case "--list-all":
                            case "--quiet":
                            case "--version":
                                this.setValue(arg, true);
                                break;
                            case "--directory":
                                arg = args.shift();
                                if (arg === undefined) {
                                    utils_ts_1.abort("missing --directory option value");
                                }
                                this.setValue("--directory", arg);
                                break;
                            default:
                                if (arg.startsWith("-")) {
                                    utils_ts_1.abort(`illegal option: ${arg}`);
                                }
                                this.values["--tasks"].push(arg);
                                break;
                        }
                    }
                }
            };
            exports_17("Env", Env);
            exports_17("env", env = Env.create());
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/graph", [], function (exports_18, context_18) {
    "use strict";
    var Graph;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            Graph = class Graph {
                constructor() {
                    this.nodes = new Map();
                    this.errors = [];
                }
                addNode(node, adjacents) {
                    this.nodes.set(node, adjacents);
                }
                searchForCycles() {
                    this.errors = [];
                    let discovered = new Set();
                    let finished = new Set();
                    for (let node of this.nodes.keys()) {
                        if (!discovered.has(node) && !finished.has(node)) {
                            this.dfsVisit(node, discovered, finished);
                        }
                    }
                }
                dfsVisit(node, discovered, finished) {
                    discovered.add(node);
                    for (let adjacent of this.nodes.get(node)) {
                        if (discovered.has(adjacent)) {
                            this.errors.push(`cyclic dependency between '${node}' and '${adjacent}'`);
                        }
                        if (!discovered.has(adjacent) && !finished.has(adjacent)) {
                            this.dfsVisit(adjacent, discovered, finished);
                        }
                    }
                    discovered.delete(node);
                    finished.add(node);
                }
            };
            exports_18("Graph", Graph);
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/tasks", ["https://deno.land/x/drake@v1.2.6/lib/deps", "https://deno.land/x/drake@v1.2.6/lib/env", "https://deno.land/x/drake@v1.2.6/lib/graph", "https://deno.land/x/drake@v1.2.6/lib/utils"], function (exports_19, context_19) {
    "use strict";
    var deps_ts_3, env_ts_2, graph_ts_1, utils_ts_2, Task, TaskRegistry;
    var __moduleName = context_19 && context_19.id;
    function logStart(message) {
        utils_ts_2.log(`${deps_ts_3.colors.green(deps_ts_3.colors.bold(`${message}:`))} started`);
        return new Date().getTime();
    }
    function logFinish(message, startTime) {
        const endTime = new Date().getTime();
        utils_ts_2.log(`${deps_ts_3.colors.green(deps_ts_3.colors.bold(`${message}:`))} finished (${endTime -
            startTime}ms)`);
    }
    function isNormalTask(name) {
        return /^\w[\w-]*$/.test(name);
    }
    exports_19("isNormalTask", isNormalTask);
    function isFileTask(name) {
        return !isNormalTask(name);
    }
    exports_19("isFileTask", isFileTask);
    function normalizePath(name) {
        name = deps_ts_3.path.normalize(name);
        if (isNormalTask(name)) {
            name = "." + deps_ts_3.path.sep + name;
        }
        return name;
    }
    exports_19("normalizePath", normalizePath);
    function normalizeTaskName(name) {
        name = name.trim();
        if (name === "") {
            utils_ts_2.abort("blank task name");
        }
        if (deps_ts_3.path.isGlob(name)) {
            utils_ts_2.abort(`wildcard task name not allowed: ${name}`);
        }
        if (isFileTask(name)) {
            name = normalizePath(name);
        }
        return name;
    }
    exports_19("normalizeTaskName", normalizeTaskName);
    function normalizePrereqs(prereqs) {
        const result = [];
        for (let prereq of prereqs) {
            prereq = prereq.trim();
            if (prereq === "") {
                utils_ts_2.abort("blank prerequisite name");
            }
            if (!isFileTask(prereq)) {
                result.push(prereq);
            }
            else if (deps_ts_3.path.isGlob(prereq)) {
                result.push(...utils_ts_2.glob(prereq).map((p) => normalizePath(p)));
            }
            else {
                result.push(normalizePath(prereq));
            }
        }
        return result;
    }
    exports_19("normalizePrereqs", normalizePrereqs);
    return {
        setters: [
            function (deps_ts_3_1) {
                deps_ts_3 = deps_ts_3_1;
            },
            function (env_ts_2_1) {
                env_ts_2 = env_ts_2_1;
            },
            function (graph_ts_1_1) {
                graph_ts_1 = graph_ts_1_1;
            },
            function (utils_ts_2_1) {
                utils_ts_2 = utils_ts_2_1;
            }
        ],
        execute: function () {
            Task = class Task {
                constructor(name, desc, prereqs, action) {
                    name = normalizeTaskName(name);
                    this.name = name;
                    this.desc = desc;
                    prereqs = normalizePrereqs(prereqs);
                    const dup = prereqs.find((x) => prereqs.indexOf(x) !== prereqs.lastIndexOf(x));
                    if (dup) {
                        utils_ts_2.abort(`${name}: duplicate prerequisite: ${dup}`);
                    }
                    this.prereqs = prereqs;
                    if (action) {
                        this.action = action.bind(this);
                    }
                }
                static fileInfo(path) {
                    const info = Deno.statSync(path);
                    if (!info.mtime) {
                        utils_ts_2.abort(`${path}: invalid mtime: ${info.mtime}`);
                    }
                    return {
                        size: info.size,
                        mtime: info.mtime.toISOString(),
                    };
                }
                updateCache() {
                    const taskCache = {};
                    if (deps_ts_3.existsSync(this.name)) {
                        taskCache[this.name] = Task.fileInfo(this.name);
                    }
                    for (const prereq of this.prereqs) {
                        if (isFileTask(prereq)) {
                            if (deps_ts_3.existsSync(prereq)) {
                                const info = Deno.statSync(prereq);
                                taskCache[prereq] = Task.fileInfo(prereq);
                            }
                        }
                        else {
                            delete taskCache[prereq];
                        }
                    }
                    utils_ts_2.debug("updateCache", `${this.name}`);
                    this.cache = taskCache;
                }
                isOutOfDate() {
                    const prereqs = this.prereqs.filter((p) => isFileTask(p));
                    let result = false;
                    let debugMsg = "false";
                    for (const prereq of prereqs) {
                        if (!deps_ts_3.existsSync(prereq)) {
                            if (env_ts_2.env("--dry-run")) {
                                debugMsg = `true: dry run`;
                                result = true;
                                break;
                            }
                            utils_ts_2.abort(`${this.name}: missing prerequisite file: "${prereq}"`);
                        }
                    }
                    if (result) {
                    }
                    else if (!this.cache) {
                        debugMsg = "true: no previous task cache";
                        result = true;
                    }
                    else if (!deps_ts_3.existsSync(this.name)) {
                        debugMsg = "true: no target file";
                        result = true;
                    }
                    else {
                        for (const filename of [this.name, ...prereqs]) {
                            const prev = this.cache[filename];
                            if (!prev) {
                                debugMsg = `true: no previous cache: ${filename}`;
                                result = true;
                                break;
                            }
                            const curr = Task.fileInfo(filename);
                            if (curr.size !== prev.size || curr.mtime !== prev.mtime) {
                                debugMsg = `true: ${filename}\nfrom: ${JSON.stringify(prev)}\nto:   ${JSON.stringify(curr)}`;
                                result = true;
                                break;
                            }
                        }
                    }
                    utils_ts_2.debug("isOutOfDate", `${this.name}: ${debugMsg}`);
                    return result;
                }
            };
            exports_19("Task", Task);
            TaskRegistry = class TaskRegistry extends Map {
                constructor() {
                    super();
                    this.lastDesc = "";
                }
                get(name) {
                    name = normalizeTaskName(name);
                    if (!this.has(name)) {
                        utils_ts_2.abort(`missing task: ${name}`);
                    }
                    return super.get(name);
                }
                set(name, task) {
                    name = normalizeTaskName(name);
                    if (this.has(name)) {
                        utils_ts_2.abort(`task already exists: ${name}`);
                    }
                    return super.set(name, task);
                }
                desc(description) {
                    this.lastDesc = description;
                }
                register(name, prereqs, action) {
                    utils_ts_2.debug("register", `${name}: ${this.lastDesc}`);
                    this.set(name, new Task(name, this.lastDesc, prereqs, action));
                    this.lastDesc = "";
                }
                cacheFile() {
                    return deps_ts_3.path.join(env_ts_2.env("--directory"), ".drake.cache.json");
                }
                loadCache() {
                    const filename = this.cacheFile();
                    if (!deps_ts_3.existsSync(filename)) {
                        utils_ts_2.debug("loadCache:", `no cache file: ${filename}`);
                        return;
                    }
                    utils_ts_2.debug("loadCache");
                    const json = utils_ts_2.readFile(filename);
                    let cache;
                    let deleteCache = false;
                    try {
                        cache = JSON.parse(json);
                        if (cache.version !== utils_ts_2.vers()) {
                            utils_ts_2.log(`drake version changed: deleting cache file: ${filename}`);
                            deleteCache = true;
                        }
                        else if (cache.os !== Deno.build.os) {
                            utils_ts_2.log(`operating system changed: deleting cache file: ${filename}`);
                            deleteCache = true;
                        }
                        else {
                            for (const taskname of Object.keys(cache.tasks)) {
                                if (this.has(taskname)) {
                                    this.get(taskname).cache = cache.tasks[taskname];
                                }
                            }
                        }
                    }
                    catch {
                        utils_ts_2.abort(`corrupt cache file: ${filename}`);
                    }
                    if (deleteCache) {
                        Deno.removeSync(filename);
                    }
                }
                saveCache() {
                    if (env_ts_2.env("--dry-run")) {
                        utils_ts_2.debug("saveCache", "dry run");
                        return;
                    }
                    const filename = this.cacheFile();
                    const tasksCache = {};
                    for (const task of this.values()) {
                        if (isFileTask(task.name) && task.cache) {
                            tasksCache[task.name] = task.cache;
                        }
                    }
                    if (Object.keys(tasksCache).length !== 0) {
                        utils_ts_2.debug("saveCache");
                        const cache = {
                            version: utils_ts_2.vers(),
                            os: Deno.build.os,
                            tasks: tasksCache,
                        };
                        utils_ts_2.writeFile(filename, JSON.stringify(cache, null, 1));
                    }
                    else {
                        utils_ts_2.debug("saveCache", "no cache");
                    }
                }
                list() {
                    let keys = Array.from(this.keys());
                    if (!env_ts_2.env("--list-all")) {
                        keys = keys.filter((k) => this.get(k).desc);
                    }
                    const maxLen = keys.reduce(function (a, b) {
                        return a.length > b.length ? a : b;
                    }).length;
                    const result = [];
                    for (const k of keys.sort()) {
                        const task = this.get(k);
                        const padding = " ".repeat(maxLen - k.length);
                        let msg = k;
                        if (k === env_ts_2.env("--default-task")) {
                            msg = deps_ts_3.colors.underline(msg);
                        }
                        msg += padding;
                        if (task.desc) {
                            msg = `${deps_ts_3.colors.green(deps_ts_3.colors.bold(msg))} ${task.desc}`;
                        }
                        else {
                            msg = deps_ts_3.colors.green(msg);
                        }
                        if (env_ts_2.env("--list-all") && task.prereqs.length > 0) {
                            msg += `\n${task.prereqs.map((prereq) => `${" ".repeat(maxLen)} ${deps_ts_3.colors.yellow(prereq)}`).join("\n")}`;
                        }
                        result.push(msg);
                    }
                    return result;
                }
                expand(names) {
                    let result = [];
                    names = [...names];
                    names.reverse();
                    for (const name of names) {
                        if (isFileTask(name) && !this.has(name)) {
                            continue;
                        }
                        const task = this.get(name);
                        for (const prereq of task.prereqs) {
                            if (isNormalTask(prereq) && !this.has(prereq)) {
                                utils_ts_2.abort(`${name}: missing prerequisite task: ${prereq}`);
                            }
                            if (isNormalTask(name) && isFileTask(prereq) && !this.has(prereq)) {
                                utils_ts_2.abort(`${name}: missing prerequisite task: ${prereq}`);
                            }
                        }
                        result.unshift(task);
                        result = [...this.resolveDependencies(task.prereqs), ...result];
                    }
                    return result;
                }
                resolveDependencies(names) {
                    const result = [];
                    for (const task of this.expand(names)) {
                        if (result.find((t) => t.name === task.name)) {
                            continue;
                        }
                        result.push(task);
                    }
                    return result;
                }
                checkForCycles() {
                    const graph = new graph_ts_1.Graph();
                    for (const task of this.keys()) {
                        graph.addNode(task, this.get(task).prereqs.filter((p) => this.has(p)));
                    }
                    graph.searchForCycles();
                    if (graph.errors.length > 0) {
                        utils_ts_2.abort(graph.errors.join(", "));
                    }
                }
                async run(...names) {
                    names = names.map((name) => normalizeTaskName(name));
                    for (const name of names) {
                        if (!this.has(name)) {
                            utils_ts_2.abort(`missing task: ${name}`);
                        }
                    }
                    this.loadCache();
                    this.checkForCycles();
                    const tasks = this.resolveDependencies(names);
                    utils_ts_2.debug("run", `${names.join(" ")}`);
                    for (const task of tasks) {
                        const savedAbortExits = env_ts_2.env("--abort-exits");
                        env_ts_2.env().setValue("--abort-exits", false);
                        try {
                            if (isNormalTask(task.name)) {
                                await this.executeNormalTask(task);
                            }
                            else {
                                await this.executeFileTask(task);
                            }
                            env_ts_2.env().setValue("--abort-exits", savedAbortExits);
                        }
                        catch (e) {
                            env_ts_2.env().setValue("--abort-exits", savedAbortExits);
                            this.saveCache();
                            if (e instanceof utils_ts_2.DrakeError) {
                                utils_ts_2.abort(e.message);
                            }
                            else {
                                throw e;
                            }
                        }
                    }
                    this.saveCache();
                }
                async executeNormalTask(task) {
                    await this.execute(task.name);
                }
                async executeFileTask(task) {
                    if (!env_ts_2.env("--always-make") && !task.isOutOfDate()) {
                        utils_ts_2.log(deps_ts_3.colors.yellow(`${task.name}:`) + " up to date");
                        return;
                    }
                    await this.execute(task.name);
                    task.updateCache();
                }
                async execute(...names) {
                    names = names.map((name) => normalizeTaskName(name));
                    if (names.every((name) => !this.get(name).action)) {
                        utils_ts_2.log(deps_ts_3.colors.yellow(`${names}:`) + " no action");
                        return;
                    }
                    if (env_ts_2.env("--dry-run")) {
                        utils_ts_2.log(`${deps_ts_3.colors.green(deps_ts_3.colors.bold(`${names}:`))} dry run`);
                        return;
                    }
                    const msg = names.join(" ");
                    const startTime = logStart(msg);
                    const promises = [];
                    for (const name of names) {
                        const task = this.get(name);
                        if (!task.action) {
                            utils_ts_2.log(deps_ts_3.colors.yellow(`${name}:`) + " no action");
                            continue;
                        }
                        if (task.action.constructor.name === "AsyncFunction") {
                            promises.push(task.action());
                        }
                        else {
                            task.action();
                        }
                    }
                    await Promise.all(promises);
                    logFinish(msg, startTime);
                }
            };
            exports_19("TaskRegistry", TaskRegistry);
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/registry", ["https://deno.land/x/drake@v1.2.6/lib/env", "https://deno.land/x/drake@v1.2.6/lib/tasks", "https://deno.land/x/drake@v1.2.6/lib/utils"], function (exports_20, context_20) {
    "use strict";
    var env_ts_3, tasks_ts_1, utils_ts_3, taskRegistry;
    var __moduleName = context_20 && context_20.id;
    function desc(description) {
        taskRegistry.desc(description);
    }
    exports_20("desc", desc);
    function task(name, prereqs, action) {
        if (prereqs !== undefined) {
            taskRegistry.register(name, prereqs, action);
        }
        return taskRegistry.get(name);
    }
    exports_20("task", task);
    async function run(...names) {
        if (env_ts_3.env("--help") || env_ts_3.env("--version")) {
            return;
        }
        if (env_ts_3.env("--list-tasks") || env_ts_3.env("--list-all")) {
            taskRegistry.list().forEach((t) => console.log(t));
        }
        else {
            if (names.length === 0) {
                names = env_ts_3.env("--tasks");
                if (names.length === 0 && env_ts_3.env("--default-task")) {
                    names.push(env_ts_3.env("--default-task"));
                }
            }
            if (names.length === 0) {
                utils_ts_3.abort("no task specified");
            }
            await taskRegistry.run(...names);
        }
    }
    exports_20("run", run);
    async function execute(...names) {
        await taskRegistry.execute(...names);
    }
    exports_20("execute", execute);
    return {
        setters: [
            function (env_ts_3_1) {
                env_ts_3 = env_ts_3_1;
            },
            function (tasks_ts_1_1) {
                tasks_ts_1 = tasks_ts_1_1;
            },
            function (utils_ts_3_1) {
                utils_ts_3 = utils_ts_3_1;
            }
        ],
        execute: function () {
            taskRegistry = new tasks_ts_1.TaskRegistry();
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/lib/help", [], function (exports_21, context_21) {
    "use strict";
    var manpage;
    var __moduleName = context_21 && context_21.id;
    function help() {
        console.log(manpage);
    }
    exports_21("help", help);
    return {
        setters: [],
        execute: function () {
            manpage = String.raw `
NAME
  drake - a make-like task runner for Deno.

SYNOPSIS
  deno run -A DRAKEFILE [OPTION|VARIABLE|TASK]...

DESCRIPTION
  The Drake TypeScript module provides functions for defining and executing
  build TASKs on the Deno runtime.

  A DRAKEFILE is a TypeScript module file containing Drake task definitions.
  Drakefiles are run with the Deno 'run' command.

  A Drake VARIABLE is a named string value e.g. 'vers=0.1.0'.  Variables are
  accessed using the Drake 'env' API e.g. 'env("vers")'.

OPTIONS
  -a, --always-make     Unconditionally execute tasks.
  -d, --directory DIR   Change to directory DIR before running drakefile.
  -D, --debug           Write debug information to stderr.
  -h, --help            Display this help message.
  -l, -L, --list-tasks  List tasks (-L for hidden tasks and prerequisites).
  -n, --dry-run         Skip task execution.
  -q, --quiet           Do not log drake messages to standard output.
  --version             Display the drake version.

ENVIRONMENT VARIABLES
  NO_COLOR              Set to disable color (see https://no-color.org/).

SEE ALSO
  The Drake user guide: https://github.com/srackham/drake
`;
        }
    };
});
System.register("https://deno.land/x/drake@v1.2.6/mod", ["https://deno.land/x/drake@v1.2.6/lib/env", "https://deno.land/x/drake@v1.2.6/lib/registry", "https://deno.land/x/drake@v1.2.6/lib/utils", "https://deno.land/x/drake@v1.2.6/lib/help"], function (exports_22, context_22) {
    "use strict";
    var env_ts_4, help_ts_1, utils_ts_4;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (env_ts_5_1) {
                exports_22({
                    "env": env_ts_5_1["env"]
                });
                env_ts_4 = env_ts_5_1;
            },
            function (registry_ts_1_1) {
                exports_22({
                    "desc": registry_ts_1_1["desc"],
                    "execute": registry_ts_1_1["execute"],
                    "run": registry_ts_1_1["run"],
                    "task": registry_ts_1_1["task"]
                });
            },
            function (utils_ts_5_1) {
                exports_22({
                    "abort": utils_ts_5_1["abort"],
                    "debug": utils_ts_5_1["debug"],
                    "DrakeError": utils_ts_5_1["DrakeError"],
                    "glob": utils_ts_5_1["glob"],
                    "log": utils_ts_5_1["log"],
                    "makeDir": utils_ts_5_1["makeDir"],
                    "quote": utils_ts_5_1["quote"],
                    "readFile": utils_ts_5_1["readFile"],
                    "sh": utils_ts_5_1["sh"],
                    "shCapture": utils_ts_5_1["shCapture"],
                    "updateFile": utils_ts_5_1["updateFile"],
                    "vers": utils_ts_5_1["vers"],
                    "writeFile": utils_ts_5_1["writeFile"]
                });
                utils_ts_4 = utils_ts_5_1;
            },
            function (help_ts_1_1) {
                help_ts_1 = help_ts_1_1;
            }
        ],
        execute: function () {
            env_ts_4.env("--abort-exits", true);
            env_ts_4.env().parseArgs([...Deno.args]);
            if (env_ts_4.env("--help")) {
                help_ts_1.help();
            }
            else if (env_ts_4.env("--version")) {
                console.log(utils_ts_4.vers());
            }
        }
    };
});
System.register("file:///Users/laurelineparis/Desktop/deno-exploration/deno-task-runner-drake", ["https://deno.land/x/drake@v1.2.6/mod"], function (exports_23, context_23) {
    "use strict";
    var mod_ts_3;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (mod_ts_3_1) {
                mod_ts_3 = mod_ts_3_1;
            }
        ],
        execute: function () {
            mod_ts_3.desc("Minimal Drake task");
            mod_ts_3.task("helloTask", [], async function () {
                console.log("Hello from task runner Drake!");
                await mod_ts_3.sh('deno run --allow-env deno-permissions.ts');
            });
            mod_ts_3.run('helloTask');
        }
    };
});

__instantiate("file:///Users/laurelineparis/Desktop/deno-exploration/deno-task-runner-drake", false);
