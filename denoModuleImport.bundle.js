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

"use strict";
System.register("file:///Users/laurelineparis/Desktop/deno-exploration/deno-module-export", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function denode(inputText) {
        return inputText.split('').sort().join('');
    }
    exports_1("denode", denode);
    return {
        setters: [],
        execute: function () {
        }
    };
});
console.log("Welcome to Deno 🦕");
System.register("file:///Users/laurelineparis/Desktop/deno-exploration/deno-module-import", ["file:///Users/laurelineparis/Desktop/deno-exploration/deno-module-export", "https://deno.land/std@0.63.0/examples/welcome.ts"], function (exports_2, context_2) {
    "use strict";
    var deno_module_export_ts_1, word;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (deno_module_export_ts_1_1) {
                deno_module_export_ts_1 = deno_module_export_ts_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            word = 'NODE';
            console.log(`💌 original word: ${word} --> reversed: ${deno_module_export_ts_1.denode('NODE')}`);
        }
    };
});

__instantiate("file:///Users/laurelineparis/Desktop/deno-exploration/deno-module-import", false);
