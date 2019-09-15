"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (_dereq_, module, exports) {
    (function (global) {
      "use strict";

      _dereq_(295);

      _dereq_(296);

      _dereq_(2);

      if (global._babelPolyfill) {
        throw new Error("only one instance of babel-polyfill is allowed");
      }
      global._babelPolyfill = true;

      var DEFINE_PROPERTY = "defineProperty";
      function define(O, key, value) {
        O[key] || Object[DEFINE_PROPERTY](O, key, {
          writable: true,
          configurable: true,
          value: value
        });
      }

      define(String.prototype, "padLeft", "".padStart);
      define(String.prototype, "padRight", "".padEnd);

      "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
        [][key] && define(Array, key, Function.call.bind([][key]));
      });
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, { "2": 2, "295": 295, "296": 296 }], 2: [function (_dereq_, module, exports) {
    _dereq_(119);
    module.exports = _dereq_(23).RegExp.escape;
  }, { "119": 119, "23": 23 }], 3: [function (_dereq_, module, exports) {
    module.exports = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };
  }, {}], 4: [function (_dereq_, module, exports) {
    var cof = _dereq_(18);
    module.exports = function (it, msg) {
      if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
      return +it;
    };
  }, { "18": 18 }], 5: [function (_dereq_, module, exports) {
    // 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES = _dereq_(117)('unscopables'),
        ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == undefined) _dereq_(40)(ArrayProto, UNSCOPABLES, {});
    module.exports = function (key) {
      ArrayProto[UNSCOPABLES][key] = true;
    };
  }, { "117": 117, "40": 40 }], 6: [function (_dereq_, module, exports) {
    module.exports = function (it, Constructor, name, forbiddenField) {
      if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
        throw TypeError(name + ': incorrect invocation!');
      }return it;
    };
  }, {}], 7: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49);
    module.exports = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };
  }, { "49": 49 }], 8: [function (_dereq_, module, exports) {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    'use strict';

    var toObject = _dereq_(109),
        toIndex = _dereq_(105),
        toLength = _dereq_(108);

    module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
      var O = toObject(this),
          len = toLength(O.length),
          to = toIndex(target, len),
          from = toIndex(start, len),
          end = arguments.length > 2 ? arguments[2] : undefined,
          count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
          inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count-- > 0) {
        if (from in O) O[to] = O[from];else delete O[to];
        to += inc;
        from += inc;
      }return O;
    };
  }, { "105": 105, "108": 108, "109": 109 }], 9: [function (_dereq_, module, exports) {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    'use strict';

    var toObject = _dereq_(109),
        toIndex = _dereq_(105),
        toLength = _dereq_(108);
    module.exports = function fill(value /*, start = 0, end = @length */) {
      var O = toObject(this),
          length = toLength(O.length),
          aLen = arguments.length,
          index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
          end = aLen > 2 ? arguments[2] : undefined,
          endPos = end === undefined ? length : toIndex(end, length);
      while (endPos > index) {
        O[index++] = value;
      }return O;
    };
  }, { "105": 105, "108": 108, "109": 109 }], 10: [function (_dereq_, module, exports) {
    var forOf = _dereq_(37);

    module.exports = function (iter, ITERATOR) {
      var result = [];
      forOf(iter, false, result.push, result, ITERATOR);
      return result;
    };
  }, { "37": 37 }], 11: [function (_dereq_, module, exports) {
    // false -> Array#indexOf
    // true  -> Array#includes
    var toIObject = _dereq_(107),
        toLength = _dereq_(108),
        toIndex = _dereq_(105);
    module.exports = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIObject($this),
            length = toLength(O.length),
            index = toIndex(fromIndex, length),
            value;
        // Array#includes uses SameValueZero equality algorithm
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          if (value != value) return true;
          // Array#toIndex ignores holes, Array#includes - not
        } else for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }return !IS_INCLUDES && -1;
      };
    };
  }, { "105": 105, "107": 107, "108": 108 }], 12: [function (_dereq_, module, exports) {
    // 0 -> Array#forEach
    // 1 -> Array#map
    // 2 -> Array#filter
    // 3 -> Array#some
    // 4 -> Array#every
    // 5 -> Array#find
    // 6 -> Array#findIndex
    var ctx = _dereq_(25),
        IObject = _dereq_(45),
        toObject = _dereq_(109),
        toLength = _dereq_(108),
        asc = _dereq_(15);
    module.exports = function (TYPE, $create) {
      var IS_MAP = TYPE == 1,
          IS_FILTER = TYPE == 2,
          IS_SOME = TYPE == 3,
          IS_EVERY = TYPE == 4,
          IS_FIND_INDEX = TYPE == 6,
          NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
          create = $create || asc;
      return function ($this, callbackfn, that) {
        var O = toObject($this),
            self = IObject(O),
            f = ctx(callbackfn, that, 3),
            length = toLength(self.length),
            index = 0,
            result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
            val,
            res;
        for (; length > index; index++) {
          if (NO_HOLES || index in self) {
            val = self[index];
            res = f(val, index, O);
            if (TYPE) {
              if (IS_MAP) result[index] = res; // map
              else if (res) switch (TYPE) {
                  case 3:
                    return true; // some
                  case 5:
                    return val; // find
                  case 6:
                    return index; // findIndex
                  case 2:
                    result.push(val); // filter
                } else if (IS_EVERY) return false; // every
            }
          }
        }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
      };
    };
  }, { "108": 108, "109": 109, "15": 15, "25": 25, "45": 45 }], 13: [function (_dereq_, module, exports) {
    var aFunction = _dereq_(3),
        toObject = _dereq_(109),
        IObject = _dereq_(45),
        toLength = _dereq_(108);

    module.exports = function (that, callbackfn, aLen, memo, isRight) {
      aFunction(callbackfn);
      var O = toObject(that),
          self = IObject(O),
          length = toLength(O.length),
          index = isRight ? length - 1 : 0,
          i = isRight ? -1 : 1;
      if (aLen < 2) for (;;) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (isRight ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
      for (; isRight ? index >= 0 : length > index; index += i) {
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      }return memo;
    };
  }, { "108": 108, "109": 109, "3": 3, "45": 45 }], 14: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49),
        isArray = _dereq_(47),
        SPECIES = _dereq_(117)('species');

    module.exports = function (original) {
      var C;
      if (isArray(original)) {
        C = original.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
        if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      }return C === undefined ? Array : C;
    };
  }, { "117": 117, "47": 47, "49": 49 }], 15: [function (_dereq_, module, exports) {
    // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
    var speciesConstructor = _dereq_(14);

    module.exports = function (original, length) {
      return new (speciesConstructor(original))(length);
    };
  }, { "14": 14 }], 16: [function (_dereq_, module, exports) {
    'use strict';

    var aFunction = _dereq_(3),
        isObject = _dereq_(49),
        invoke = _dereq_(44),
        arraySlice = [].slice,
        factories = {};

    var construct = function construct(F, len, args) {
      if (!(len in factories)) {
        for (var n = [], i = 0; i < len; i++) {
          n[i] = 'a[' + i + ']';
        }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
      }return factories[len](F, args);
    };

    module.exports = Function.bind || function bind(that /*, args... */) {
      var fn = aFunction(this),
          partArgs = arraySlice.call(arguments, 1);
      var bound = function bound() /* args... */{
        var args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
      };
      if (isObject(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };
  }, { "3": 3, "44": 44, "49": 49 }], 17: [function (_dereq_, module, exports) {
    // getting tag from 19.1.3.6 Object.prototype.toString()
    var cof = _dereq_(18),
        TAG = _dereq_(117)('toStringTag')
    // ES3 wrong here
    ,
        ARG = cof(function () {
      return arguments;
    }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function tryGet(it, key) {
      try {
        return it[key];
      } catch (e) {/* empty */}
    };

    module.exports = function (it) {
      var O, T, B;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
      // builtinTag case
      : ARG ? cof(O)
      // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
  }, { "117": 117, "18": 18 }], 18: [function (_dereq_, module, exports) {
    var toString = {}.toString;

    module.exports = function (it) {
      return toString.call(it).slice(8, -1);
    };
  }, {}], 19: [function (_dereq_, module, exports) {
    'use strict';

    var dP = _dereq_(67).f,
        create = _dereq_(66),
        redefineAll = _dereq_(86),
        ctx = _dereq_(25),
        anInstance = _dereq_(6),
        defined = _dereq_(27),
        forOf = _dereq_(37),
        $iterDefine = _dereq_(53),
        step = _dereq_(55),
        setSpecies = _dereq_(91),
        DESCRIPTORS = _dereq_(28),
        fastKey = _dereq_(62).fastKey,
        SIZE = DESCRIPTORS ? '_s' : 'size';

    var getEntry = function getEntry(that, key) {
      // fast case
      var index = fastKey(key),
          entry;
      if (index !== 'F') return that._i[index];
      // frozen object case
      for (entry = that._f; entry; entry = entry.n) {
        if (entry.k == key) return entry;
      }
    };

    module.exports = {
      getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, NAME, '_i');
          that._i = create(null); // index
          that._f = undefined; // first entry
          that._l = undefined; // last entry
          that[SIZE] = 0; // size
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        });
        redefineAll(C.prototype, {
          // 23.1.3.1 Map.prototype.clear()
          // 23.2.3.2 Set.prototype.clear()
          clear: function clear() {
            for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
              entry.r = true;
              if (entry.p) entry.p = entry.p.n = undefined;
              delete data[entry.i];
            }
            that._f = that._l = undefined;
            that[SIZE] = 0;
          },
          // 23.1.3.3 Map.prototype.delete(key)
          // 23.2.3.4 Set.prototype.delete(value)
          'delete': function _delete(key) {
            var that = this,
                entry = getEntry(that, key);
            if (entry) {
              var next = entry.n,
                  prev = entry.p;
              delete that._i[entry.i];
              entry.r = true;
              if (prev) prev.n = next;
              if (next) next.p = prev;
              if (that._f == entry) that._f = next;
              if (that._l == entry) that._l = prev;
              that[SIZE]--;
            }return !!entry;
          },
          // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
          // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
          forEach: function forEach(callbackfn /*, that = undefined */) {
            anInstance(this, C, 'forEach');
            var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
                entry;
            while (entry = entry ? entry.n : this._f) {
              f(entry.v, entry.k, this);
              // revert to the last existing entry
              while (entry && entry.r) {
                entry = entry.p;
              }
            }
          },
          // 23.1.3.7 Map.prototype.has(key)
          // 23.2.3.7 Set.prototype.has(value)
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });
        if (DESCRIPTORS) dP(C.prototype, 'size', {
          get: function get() {
            return defined(this[SIZE]);
          }
        });
        return C;
      },
      def: function def(that, key, value) {
        var entry = getEntry(that, key),
            prev,
            index;
        // change existing entry
        if (entry) {
          entry.v = value;
          // create new entry
        } else {
          that._l = entry = {
            i: index = fastKey(key, true), // <- index
            k: key, // <- key
            v: value, // <- value
            p: prev = that._l, // <- previous entry
            n: undefined, // <- next entry
            r: false // <- removed
          };
          if (!that._f) that._f = entry;
          if (prev) prev.n = entry;
          that[SIZE]++;
          // add to index
          if (index !== 'F') that._i[index] = entry;
        }return that;
      },
      getEntry: getEntry,
      setStrong: function setStrong(C, NAME, IS_MAP) {
        // add .keys, .values, .entries, [@@iterator]
        // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
        $iterDefine(C, NAME, function (iterated, kind) {
          this._t = iterated; // target
          this._k = kind; // kind
          this._l = undefined; // previous
        }, function () {
          var that = this,
              kind = that._k,
              entry = that._l;
          // revert to the last existing entry
          while (entry && entry.r) {
            entry = entry.p;
          } // get next entry
          if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
            // or finish the iteration
            that._t = undefined;
            return step(1);
          }
          // return step by kind
          if (kind == 'keys') return step(0, entry.k);
          if (kind == 'values') return step(0, entry.v);
          return step(0, [entry.k, entry.v]);
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        // add [@@species], 23.1.2.2, 23.2.2.2
        setSpecies(NAME);
      }
    };
  }, { "25": 25, "27": 27, "28": 28, "37": 37, "53": 53, "55": 55, "6": 6, "62": 62, "66": 66, "67": 67, "86": 86, "91": 91 }], 20: [function (_dereq_, module, exports) {
    // https://github.com/DavidBruant/Map-Set.prototype.toJSON
    var classof = _dereq_(17),
        from = _dereq_(10);
    module.exports = function (NAME) {
      return function toJSON() {
        if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
        return from(this);
      };
    };
  }, { "10": 10, "17": 17 }], 21: [function (_dereq_, module, exports) {
    'use strict';

    var redefineAll = _dereq_(86),
        getWeak = _dereq_(62).getWeak,
        anObject = _dereq_(7),
        isObject = _dereq_(49),
        anInstance = _dereq_(6),
        forOf = _dereq_(37),
        createArrayMethod = _dereq_(12),
        $has = _dereq_(39),
        arrayFind = createArrayMethod(5),
        arrayFindIndex = createArrayMethod(6),
        id = 0;

    // fallback for uncaught frozen keys
    var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
      return that._l || (that._l = new UncaughtFrozenStore());
    };
    var UncaughtFrozenStore = function UncaughtFrozenStore() {
      this.a = [];
    };
    var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
      return arrayFind(store.a, function (it) {
        return it[0] === key;
      });
    };
    UncaughtFrozenStore.prototype = {
      get: function get(key) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) return entry[1];
      },
      has: function has(key) {
        return !!findUncaughtFrozen(this, key);
      },
      set: function set(key, value) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) entry[1] = value;else this.a.push([key, value]);
      },
      'delete': function _delete(key) {
        var index = arrayFindIndex(this.a, function (it) {
          return it[0] === key;
        });
        if (~index) this.a.splice(index, 1);
        return !!~index;
      }
    };

    module.exports = {
      getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, NAME, '_i');
          that._i = id++; // collection id
          that._l = undefined; // leak store for uncaught frozen objects
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        });
        redefineAll(C.prototype, {
          // 23.3.3.2 WeakMap.prototype.delete(key)
          // 23.4.3.3 WeakSet.prototype.delete(value)
          'delete': function _delete(key) {
            if (!isObject(key)) return false;
            var data = getWeak(key);
            if (data === true) return uncaughtFrozenStore(this)['delete'](key);
            return data && $has(data, this._i) && delete data[this._i];
          },
          // 23.3.3.4 WeakMap.prototype.has(key)
          // 23.4.3.4 WeakSet.prototype.has(value)
          has: function has(key) {
            if (!isObject(key)) return false;
            var data = getWeak(key);
            if (data === true) return uncaughtFrozenStore(this).has(key);
            return data && $has(data, this._i);
          }
        });
        return C;
      },
      def: function def(that, key, value) {
        var data = getWeak(anObject(key), true);
        if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
        return that;
      },
      ufstore: uncaughtFrozenStore
    };
  }, { "12": 12, "37": 37, "39": 39, "49": 49, "6": 6, "62": 62, "7": 7, "86": 86 }], 22: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        $export = _dereq_(32),
        redefine = _dereq_(87),
        redefineAll = _dereq_(86),
        meta = _dereq_(62),
        forOf = _dereq_(37),
        anInstance = _dereq_(6),
        isObject = _dereq_(49),
        fails = _dereq_(34),
        $iterDetect = _dereq_(54),
        setToStringTag = _dereq_(92),
        inheritIfRequired = _dereq_(43);

    module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
      var Base = global[NAME],
          C = Base,
          ADDER = IS_MAP ? 'set' : 'add',
          proto = C && C.prototype,
          O = {};
      var fixMethod = function fixMethod(KEY) {
        var fn = proto[KEY];
        redefine(proto, KEY, KEY == 'delete' ? function (a) {
          return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'has' ? function has(a) {
          return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'get' ? function get(a) {
          return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'add' ? function add(a) {
          fn.call(this, a === 0 ? 0 : a);return this;
        } : function set(a, b) {
          fn.call(this, a === 0 ? 0 : a, b);return this;
        });
      };
      if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
        new C().entries().next();
      }))) {
        // create collection constructor
        C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
        redefineAll(C.prototype, methods);
        meta.NEED = true;
      } else {
        var instance = new C()
        // early implementations not supports chaining
        ,
            HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
        // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
        ,
            THROWS_ON_PRIMITIVES = fails(function () {
          instance.has(1);
        })
        // most early implementations doesn't supports iterables, most modern - not close it correctly
        ,
            ACCEPT_ITERABLES = $iterDetect(function (iter) {
          new C(iter);
        }) // eslint-disable-line no-new
        // for early implementations -0 and +0 not the same
        ,
            BUGGY_ZERO = !IS_WEAK && fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new C(),
              index = 5;
          while (index--) {
            $instance[ADDER](index, index);
          }return !$instance.has(-0);
        });
        if (!ACCEPT_ITERABLES) {
          C = wrapper(function (target, iterable) {
            anInstance(target, C, NAME);
            var that = inheritIfRequired(new Base(), target, C);
            if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
            return that;
          });
          C.prototype = proto;
          proto.constructor = C;
        }
        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete');
          fixMethod('has');
          IS_MAP && fixMethod('get');
        }
        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
        // weak collections should not contains .clear method
        if (IS_WEAK && proto.clear) delete proto.clear;
      }

      setToStringTag(C, NAME);

      O[NAME] = C;
      $export($export.G + $export.W + $export.F * (C != Base), O);

      if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

      return C;
    };
  }, { "32": 32, "34": 34, "37": 37, "38": 38, "43": 43, "49": 49, "54": 54, "6": 6, "62": 62, "86": 86, "87": 87, "92": 92 }], 23: [function (_dereq_, module, exports) {
    var core = module.exports = { version: '2.4.0' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  }, {}], 24: [function (_dereq_, module, exports) {
    'use strict';

    var $defineProperty = _dereq_(67),
        createDesc = _dereq_(85);

    module.exports = function (object, index, value) {
      if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
    };
  }, { "67": 67, "85": 85 }], 25: [function (_dereq_, module, exports) {
    // optional / simple context binding
    var aFunction = _dereq_(3);
    module.exports = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 1:
          return function (a) {
            return fn.call(that, a);
          };
        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };
        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }
      return function () /* ...args */{
        return fn.apply(that, arguments);
      };
    };
  }, { "3": 3 }], 26: [function (_dereq_, module, exports) {
    'use strict';

    var anObject = _dereq_(7),
        toPrimitive = _dereq_(110),
        NUMBER = 'number';

    module.exports = function (hint) {
      if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
      return toPrimitive(anObject(this), hint != NUMBER);
    };
  }, { "110": 110, "7": 7 }], 27: [function (_dereq_, module, exports) {
    // 7.2.1 RequireObjectCoercible(argument)
    module.exports = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };
  }, {}], 28: [function (_dereq_, module, exports) {
    // Thank's IE8 for his funny defineProperty
    module.exports = !_dereq_(34)(function () {
      return Object.defineProperty({}, 'a', { get: function get() {
          return 7;
        } }).a != 7;
    });
  }, { "34": 34 }], 29: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49),
        document = _dereq_(38).document
    // in old IE typeof document.createElement is 'object'
    ,
        is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
      return is ? document.createElement(it) : {};
    };
  }, { "38": 38, "49": 49 }], 30: [function (_dereq_, module, exports) {
    // IE 8- don't enum bug keys
    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
  }, {}], 31: [function (_dereq_, module, exports) {
    // all enumerable object keys, includes symbols
    var getKeys = _dereq_(76),
        gOPS = _dereq_(73),
        pIE = _dereq_(77);
    module.exports = function (it) {
      var result = getKeys(it),
          getSymbols = gOPS.f;
      if (getSymbols) {
        var symbols = getSymbols(it),
            isEnum = pIE.f,
            i = 0,
            key;
        while (symbols.length > i) {
          if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }
      }return result;
    };
  }, { "73": 73, "76": 76, "77": 77 }], 32: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        core = _dereq_(23),
        hide = _dereq_(40),
        redefine = _dereq_(87),
        ctx = _dereq_(25),
        PROTOTYPE = 'prototype';

    var $export = function $export(type, name, source) {
      var IS_FORCED = type & $export.F,
          IS_GLOBAL = type & $export.G,
          IS_STATIC = type & $export.S,
          IS_PROTO = type & $export.P,
          IS_BIND = type & $export.B,
          target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
          exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
          expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
          key,
          own,
          out,
          exp;
      if (IS_GLOBAL) source = name;
      for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined;
        // export native or passed
        out = (own ? target : source)[key];
        // bind timers to global for call from export context
        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
        // extend global
        if (target) redefine(target, key, out, type & $export.U);
        // export
        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };
    global.core = core;
    // type bitmap
    $export.F = 1; // forced
    $export.G = 2; // global
    $export.S = 4; // static
    $export.P = 8; // proto
    $export.B = 16; // bind
    $export.W = 32; // wrap
    $export.U = 64; // safe
    $export.R = 128; // real proto method for `library` 
    module.exports = $export;
  }, { "23": 23, "25": 25, "38": 38, "40": 40, "87": 87 }], 33: [function (_dereq_, module, exports) {
    var MATCH = _dereq_(117)('match');
    module.exports = function (KEY) {
      var re = /./;
      try {
        '/./'[KEY](re);
      } catch (e) {
        try {
          re[MATCH] = false;
          return !'/./'[KEY](re);
        } catch (f) {/* empty */}
      }return true;
    };
  }, { "117": 117 }], 34: [function (_dereq_, module, exports) {
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
  }, {}], 35: [function (_dereq_, module, exports) {
    'use strict';

    var hide = _dereq_(40),
        redefine = _dereq_(87),
        fails = _dereq_(34),
        defined = _dereq_(27),
        wks = _dereq_(117);

    module.exports = function (KEY, length, exec) {
      var SYMBOL = wks(KEY),
          fns = exec(defined, SYMBOL, ''[KEY]),
          strfn = fns[0],
          rxfn = fns[1];
      if (fails(function () {
        var O = {};
        O[SYMBOL] = function () {
          return 7;
        };
        return ''[KEY](O) != 7;
      })) {
        redefine(String.prototype, KEY, strfn);
        hide(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) {
          return rxfn.call(string, this, arg);
        }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) {
          return rxfn.call(string, this);
        });
      }
    };
  }, { "117": 117, "27": 27, "34": 34, "40": 40, "87": 87 }], 36: [function (_dereq_, module, exports) {
    'use strict';
    // 21.2.5.3 get RegExp.prototype.flags

    var anObject = _dereq_(7);
    module.exports = function () {
      var that = anObject(this),
          result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };
  }, { "7": 7 }], 37: [function (_dereq_, module, exports) {
    var ctx = _dereq_(25),
        call = _dereq_(51),
        isArrayIter = _dereq_(46),
        anObject = _dereq_(7),
        toLength = _dereq_(108),
        getIterFn = _dereq_(118),
        BREAK = {},
        RETURN = {};
    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () {
        return iterable;
      } : getIterFn(iterable),
          f = ctx(fn, that, entries ? 2 : 1),
          index = 0,
          length,
          step,
          iterator,
          result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
      // fast case for arrays with default iterator
      if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
        result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = call(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  }, { "108": 108, "118": 118, "25": 25, "46": 46, "51": 51, "7": 7 }], 38: [function (_dereq_, module, exports) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  }, {}], 39: [function (_dereq_, module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function (it, key) {
      return hasOwnProperty.call(it, key);
    };
  }, {}], 40: [function (_dereq_, module, exports) {
    var dP = _dereq_(67),
        createDesc = _dereq_(85);
    module.exports = _dereq_(28) ? function (object, key, value) {
      return dP.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
  }, { "28": 28, "67": 67, "85": 85 }], 41: [function (_dereq_, module, exports) {
    module.exports = _dereq_(38).document && document.documentElement;
  }, { "38": 38 }], 42: [function (_dereq_, module, exports) {
    module.exports = !_dereq_(28) && !_dereq_(34)(function () {
      return Object.defineProperty(_dereq_(29)('div'), 'a', { get: function get() {
          return 7;
        } }).a != 7;
    });
  }, { "28": 28, "29": 29, "34": 34 }], 43: [function (_dereq_, module, exports) {
    var isObject = _dereq_(49),
        setPrototypeOf = _dereq_(90).set;
    module.exports = function (that, target, C) {
      var P,
          S = target.constructor;
      if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
        setPrototypeOf(that, P);
      }return that;
    };
  }, { "49": 49, "90": 90 }], 44: [function (_dereq_, module, exports) {
    // fast apply, http://jsperf.lnkit.com/fast-apply/5
    module.exports = function (fn, args, that) {
      var un = that === undefined;
      switch (args.length) {
        case 0:
          return un ? fn() : fn.call(that);
        case 1:
          return un ? fn(args[0]) : fn.call(that, args[0]);
        case 2:
          return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
        case 3:
          return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
        case 4:
          return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      }return fn.apply(that, args);
    };
  }, {}], 45: [function (_dereq_, module, exports) {
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof = _dereq_(18);
    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }, { "18": 18 }], 46: [function (_dereq_, module, exports) {
    // check on default Array iterator
    var Iterators = _dereq_(56),
        ITERATOR = _dereq_(117)('iterator'),
        ArrayProto = Array.prototype;

    module.exports = function (it) {
      return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
  }, { "117": 117, "56": 56 }], 47: [function (_dereq_, module, exports) {
    // 7.2.2 IsArray(argument)
    var cof = _dereq_(18);
    module.exports = Array.isArray || function isArray(arg) {
      return cof(arg) == 'Array';
    };
  }, { "18": 18 }], 48: [function (_dereq_, module, exports) {
    // 20.1.2.3 Number.isInteger(number)
    var isObject = _dereq_(49),
        floor = Math.floor;
    module.exports = function isInteger(it) {
      return !isObject(it) && isFinite(it) && floor(it) === it;
    };
  }, { "49": 49 }], 49: [function (_dereq_, module, exports) {
    module.exports = function (it) {
      return (typeof it === "undefined" ? "undefined" : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
    };
  }, {}], 50: [function (_dereq_, module, exports) {
    // 7.2.8 IsRegExp(argument)
    var isObject = _dereq_(49),
        cof = _dereq_(18),
        MATCH = _dereq_(117)('match');
    module.exports = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
    };
  }, { "117": 117, "18": 18, "49": 49 }], 51: [function (_dereq_, module, exports) {
    // call something on iterator step with safe closing on error
    var anObject = _dereq_(7);
    module.exports = function (iterator, fn, value, entries) {
      try {
        return entries ? fn(anObject(value)[0], value[1]) : fn(value);
        // 7.4.6 IteratorClose(iterator, completion)
      } catch (e) {
        var ret = iterator['return'];
        if (ret !== undefined) anObject(ret.call(iterator));
        throw e;
      }
    };
  }, { "7": 7 }], 52: [function (_dereq_, module, exports) {
    'use strict';

    var create = _dereq_(66),
        descriptor = _dereq_(85),
        setToStringTag = _dereq_(92),
        IteratorPrototype = {};

    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    _dereq_(40)(IteratorPrototype, _dereq_(117)('iterator'), function () {
      return this;
    });

    module.exports = function (Constructor, NAME, next) {
      Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
      setToStringTag(Constructor, NAME + ' Iterator');
    };
  }, { "117": 117, "40": 40, "66": 66, "85": 85, "92": 92 }], 53: [function (_dereq_, module, exports) {
    'use strict';

    var LIBRARY = _dereq_(58),
        $export = _dereq_(32),
        redefine = _dereq_(87),
        hide = _dereq_(40),
        has = _dereq_(39),
        Iterators = _dereq_(56),
        $iterCreate = _dereq_(52),
        setToStringTag = _dereq_(92),
        getPrototypeOf = _dereq_(74),
        ITERATOR = _dereq_(117)('iterator'),
        BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
    ,
        FF_ITERATOR = '@@iterator',
        KEYS = 'keys',
        VALUES = 'values';

    var returnThis = function returnThis() {
      return this;
    };

    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME, next);
      var getMethod = function getMethod(kind) {
        if (!BUGGY && kind in proto) return proto[kind];
        switch (kind) {
          case KEYS:
            return function keys() {
              return new Constructor(this, kind);
            };
          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }return function entries() {
          return new Constructor(this, kind);
        };
      };
      var TAG = NAME + ' Iterator',
          DEF_VALUES = DEFAULT == VALUES,
          VALUES_BUG = false,
          proto = Base.prototype,
          $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
          $default = $native || getMethod(DEFAULT),
          $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
          $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
          methods,
          key,
          IteratorPrototype;
      // Fix native
      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
        if (IteratorPrototype !== Object.prototype) {
          // Set @@toStringTag to native iterators
          setToStringTag(IteratorPrototype, TAG, true);
          // fix for some old engines
          if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
        }
      }
      // fix Array#{values, @@iterator}.name in V8 / FF
      if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
      // Define iterator
      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
      }
      // Plug for library
      Iterators[NAME] = $default;
      Iterators[TAG] = returnThis;
      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key in methods) {
          if (!(key in proto)) redefine(proto, key, methods[key]);
        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
      }
      return methods;
    };
  }, { "117": 117, "32": 32, "39": 39, "40": 40, "52": 52, "56": 56, "58": 58, "74": 74, "87": 87, "92": 92 }], 54: [function (_dereq_, module, exports) {
    var ITERATOR = _dereq_(117)('iterator'),
        SAFE_CLOSING = false;

    try {
      var riter = [7][ITERATOR]();
      riter['return'] = function () {
        SAFE_CLOSING = true;
      };
      Array.from(riter, function () {
        throw 2;
      });
    } catch (e) {/* empty */}

    module.exports = function (exec, skipClosing) {
      if (!skipClosing && !SAFE_CLOSING) return false;
      var safe = false;
      try {
        var arr = [7],
            iter = arr[ITERATOR]();
        iter.next = function () {
          return { done: safe = true };
        };
        arr[ITERATOR] = function () {
          return iter;
        };
        exec(arr);
      } catch (e) {/* empty */}
      return safe;
    };
  }, { "117": 117 }], 55: [function (_dereq_, module, exports) {
    module.exports = function (done, value) {
      return { value: value, done: !!done };
    };
  }, {}], 56: [function (_dereq_, module, exports) {
    module.exports = {};
  }, {}], 57: [function (_dereq_, module, exports) {
    var getKeys = _dereq_(76),
        toIObject = _dereq_(107);
    module.exports = function (object, el) {
      var O = toIObject(object),
          keys = getKeys(O),
          length = keys.length,
          index = 0,
          key;
      while (length > index) {
        if (O[key = keys[index++]] === el) return key;
      }
    };
  }, { "107": 107, "76": 76 }], 58: [function (_dereq_, module, exports) {
    module.exports = false;
  }, {}], 59: [function (_dereq_, module, exports) {
    // 20.2.2.14 Math.expm1(x)
    var $expm1 = Math.expm1;
    module.exports = !$expm1
    // Old FF bug
    || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
    // Tor Browser bug
    || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
      return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
    } : $expm1;
  }, {}], 60: [function (_dereq_, module, exports) {
    // 20.2.2.20 Math.log1p(x)
    module.exports = Math.log1p || function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
    };
  }, {}], 61: [function (_dereq_, module, exports) {
    // 20.2.2.28 Math.sign(x)
    module.exports = Math.sign || function sign(x) {
      return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
    };
  }, {}], 62: [function (_dereq_, module, exports) {
    var META = _dereq_(114)('meta'),
        isObject = _dereq_(49),
        has = _dereq_(39),
        setDesc = _dereq_(67).f,
        id = 0;
    var isExtensible = Object.isExtensible || function () {
      return true;
    };
    var FREEZE = !_dereq_(34)(function () {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function setMeta(it) {
      setDesc(it, META, { value: {
          i: 'O' + ++id, // object ID
          w: {} // weak collections IDs
        } });
    };
    var fastKey = function fastKey(it, create) {
      // return primitive with prefix
      if (!isObject(it)) return (typeof it === "undefined" ? "undefined" : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMeta(it);
        // return object ID
      }return it[META].i;
    };
    var getWeak = function getWeak(it, create) {
      if (!has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
        // return hash weak collections IDs
      }return it[META].w;
    };
    // add metadata on freeze-family methods calling
    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
  }, { "114": 114, "34": 34, "39": 39, "49": 49, "67": 67 }], 63: [function (_dereq_, module, exports) {
    var Map = _dereq_(149),
        $export = _dereq_(32),
        shared = _dereq_(94)('metadata'),
        store = shared.store || (shared.store = new (_dereq_(255))());

    var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
      var targetMetadata = store.get(target);
      if (!targetMetadata) {
        if (!create) return undefined;
        store.set(target, targetMetadata = new Map());
      }
      var keyMetadata = targetMetadata.get(targetKey);
      if (!keyMetadata) {
        if (!create) return undefined;
        targetMetadata.set(targetKey, keyMetadata = new Map());
      }return keyMetadata;
    };
    var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
    };
    var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
    };
    var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
    };
    var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
      var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
          keys = [];
      if (metadataMap) metadataMap.forEach(function (_, key) {
        keys.push(key);
      });
      return keys;
    };
    var toMetaKey = function toMetaKey(it) {
      return it === undefined || (typeof it === "undefined" ? "undefined" : _typeof(it)) == 'symbol' ? it : String(it);
    };
    var exp = function exp(O) {
      $export($export.S, 'Reflect', O);
    };

    module.exports = {
      store: store,
      map: getOrCreateMetadataMap,
      has: ordinaryHasOwnMetadata,
      get: ordinaryGetOwnMetadata,
      set: ordinaryDefineOwnMetadata,
      keys: ordinaryOwnMetadataKeys,
      key: toMetaKey,
      exp: exp
    };
  }, { "149": 149, "255": 255, "32": 32, "94": 94 }], 64: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        macrotask = _dereq_(104).set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = _dereq_(18)(process) == 'process';

    module.exports = function () {
      var head, last, notify;

      var flush = function flush() {
        var parent, fn;
        if (isNode && (parent = process.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (e) {
            if (head) notify();else last = undefined;
            throw e;
          }
        }last = undefined;
        if (parent) parent.enter();
      };

      // Node.js
      if (isNode) {
        notify = function notify() {
          process.nextTick(flush);
        };
        // browsers with MutationObserver
      } else if (Observer) {
        var toggle = true,
            node = document.createTextNode('');
        new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
        notify = function notify() {
          node.data = toggle = !toggle;
        };
        // environments with maybe non-completely correct, but existent Promise
      } else if (Promise && Promise.resolve) {
        var promise = Promise.resolve();
        notify = function notify() {
          promise.then(flush);
        };
        // for other environments - macrotask based on:
        // - setImmediate
        // - MessageChannel
        // - window.postMessag
        // - onreadystatechange
        // - setTimeout
      } else {
        notify = function notify() {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global, flush);
        };
      }

      return function (fn) {
        var task = { fn: fn, next: undefined };
        if (last) last.next = task;
        if (!head) {
          head = task;
          notify();
        }last = task;
      };
    };
  }, { "104": 104, "18": 18, "38": 38 }], 65: [function (_dereq_, module, exports) {
    'use strict';
    // 19.1.2.1 Object.assign(target, source, ...)

    var getKeys = _dereq_(76),
        gOPS = _dereq_(73),
        pIE = _dereq_(77),
        toObject = _dereq_(109),
        IObject = _dereq_(45),
        $assign = Object.assign;

    // should work with symbols and should have deterministic property order (V8 bug)
    module.exports = !$assign || _dereq_(34)(function () {
      var A = {},
          B = {},
          S = Symbol(),
          K = 'abcdefghijklmnopqrst';
      A[S] = 7;
      K.split('').forEach(function (k) {
        B[k] = k;
      });
      return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
    }) ? function assign(target, source) {
      // eslint-disable-line no-unused-vars
      var T = toObject(target),
          aLen = arguments.length,
          index = 1,
          getSymbols = gOPS.f,
          isEnum = pIE.f;
      while (aLen > index) {
        var S = IObject(arguments[index++]),
            keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
            length = keys.length,
            j = 0,
            key;
        while (length > j) {
          if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
        }
      }return T;
    } : $assign;
  }, { "109": 109, "34": 34, "45": 45, "73": 73, "76": 76, "77": 77 }], 66: [function (_dereq_, module, exports) {
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    var anObject = _dereq_(7),
        dPs = _dereq_(68),
        enumBugKeys = _dereq_(30),
        IE_PROTO = _dereq_(93)('IE_PROTO'),
        Empty = function Empty() {/* empty */},
        PROTOTYPE = 'prototype';

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var _createDict = function createDict() {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = _dereq_(29)('iframe'),
          i = enumBugKeys.length,
          lt = '<',
          gt = '>',
          iframeDocument;
      iframe.style.display = 'none';
      _dereq_(41).appendChild(iframe);
      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
      // createDict = iframe.contentWindow.Object;
      // html.removeChild(iframe);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
      iframeDocument.close();
      _createDict = iframeDocument.F;
      while (i--) {
        delete _createDict[PROTOTYPE][enumBugKeys[i]];
      }return _createDict();
    };

    module.exports = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = _createDict();
      return Properties === undefined ? result : dPs(result, Properties);
    };
  }, { "29": 29, "30": 30, "41": 41, "68": 68, "7": 7, "93": 93 }], 67: [function (_dereq_, module, exports) {
    var anObject = _dereq_(7),
        IE8_DOM_DEFINE = _dereq_(42),
        toPrimitive = _dereq_(110),
        dP = Object.defineProperty;

    exports.f = _dereq_(28) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) {/* empty */}
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
  }, { "110": 110, "28": 28, "42": 42, "7": 7 }], 68: [function (_dereq_, module, exports) {
    var dP = _dereq_(67),
        anObject = _dereq_(7),
        getKeys = _dereq_(76);

    module.exports = _dereq_(28) ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = getKeys(Properties),
          length = keys.length,
          i = 0,
          P;
      while (length > i) {
        dP.f(O, P = keys[i++], Properties[P]);
      }return O;
    };
  }, { "28": 28, "67": 67, "7": 7, "76": 76 }], 69: [function (_dereq_, module, exports) {
    // Forced replacement prototype accessors methods
    module.exports = _dereq_(58) || !_dereq_(34)(function () {
      var K = Math.random();
      // In FF throws only define methods
      __defineSetter__.call(null, K, function () {/* empty */});
      delete _dereq_(38)[K];
    });
  }, { "34": 34, "38": 38, "58": 58 }], 70: [function (_dereq_, module, exports) {
    var pIE = _dereq_(77),
        createDesc = _dereq_(85),
        toIObject = _dereq_(107),
        toPrimitive = _dereq_(110),
        has = _dereq_(39),
        IE8_DOM_DEFINE = _dereq_(42),
        gOPD = Object.getOwnPropertyDescriptor;

    exports.f = _dereq_(28) ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = toIObject(O);
      P = toPrimitive(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD(O, P);
      } catch (e) {/* empty */}
      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
  }, { "107": 107, "110": 110, "28": 28, "39": 39, "42": 42, "77": 77, "85": 85 }], 71: [function (_dereq_, module, exports) {
    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    var toIObject = _dereq_(107),
        gOPN = _dereq_(72).f,
        toString = {}.toString;

    var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function getWindowNames(it) {
      try {
        return gOPN(it);
      } catch (e) {
        return windowNames.slice();
      }
    };

    module.exports.f = function getOwnPropertyNames(it) {
      return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
    };
  }, { "107": 107, "72": 72 }], 72: [function (_dereq_, module, exports) {
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    var $keys = _dereq_(75),
        hiddenKeys = _dereq_(30).concat('length', 'prototype');

    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return $keys(O, hiddenKeys);
    };
  }, { "30": 30, "75": 75 }], 73: [function (_dereq_, module, exports) {
    exports.f = Object.getOwnPropertySymbols;
  }, {}], 74: [function (_dereq_, module, exports) {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    var has = _dereq_(39),
        toObject = _dereq_(109),
        IE_PROTO = _dereq_(93)('IE_PROTO'),
        ObjectProto = Object.prototype;

    module.exports = Object.getPrototypeOf || function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO)) return O[IE_PROTO];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }return O instanceof Object ? ObjectProto : null;
    };
  }, { "109": 109, "39": 39, "93": 93 }], 75: [function (_dereq_, module, exports) {
    var has = _dereq_(39),
        toIObject = _dereq_(107),
        arrayIndexOf = _dereq_(11)(false),
        IE_PROTO = _dereq_(93)('IE_PROTO');

    module.exports = function (object, names) {
      var O = toIObject(object),
          i = 0,
          result = [],
          key;
      for (key in O) {
        if (key != IE_PROTO) has(O, key) && result.push(key);
      } // Don't enum bug & hidden keys
      while (names.length > i) {
        if (has(O, key = names[i++])) {
          ~arrayIndexOf(result, key) || result.push(key);
        }
      }return result;
    };
  }, { "107": 107, "11": 11, "39": 39, "93": 93 }], 76: [function (_dereq_, module, exports) {
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    var $keys = _dereq_(75),
        enumBugKeys = _dereq_(30);

    module.exports = Object.keys || function keys(O) {
      return $keys(O, enumBugKeys);
    };
  }, { "30": 30, "75": 75 }], 77: [function (_dereq_, module, exports) {
    exports.f = {}.propertyIsEnumerable;
  }, {}], 78: [function (_dereq_, module, exports) {
    // most Object methods by ES6 should accept primitives
    var $export = _dereq_(32),
        core = _dereq_(23),
        fails = _dereq_(34);
    module.exports = function (KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY],
          exp = {};
      exp[KEY] = exec(fn);
      $export($export.S + $export.F * fails(function () {
        fn(1);
      }), 'Object', exp);
    };
  }, { "23": 23, "32": 32, "34": 34 }], 79: [function (_dereq_, module, exports) {
    var getKeys = _dereq_(76),
        toIObject = _dereq_(107),
        isEnum = _dereq_(77).f;
    module.exports = function (isEntries) {
      return function (it) {
        var O = toIObject(it),
            keys = getKeys(O),
            length = keys.length,
            i = 0,
            result = [],
            key;
        while (length > i) {
          if (isEnum.call(O, key = keys[i++])) {
            result.push(isEntries ? [key, O[key]] : O[key]);
          }
        }return result;
      };
    };
  }, { "107": 107, "76": 76, "77": 77 }], 80: [function (_dereq_, module, exports) {
    // all object keys, includes non-enumerable and symbols
    var gOPN = _dereq_(72),
        gOPS = _dereq_(73),
        anObject = _dereq_(7),
        Reflect = _dereq_(38).Reflect;
    module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
      var keys = gOPN.f(anObject(it)),
          getSymbols = gOPS.f;
      return getSymbols ? keys.concat(getSymbols(it)) : keys;
    };
  }, { "38": 38, "7": 7, "72": 72, "73": 73 }], 81: [function (_dereq_, module, exports) {
    var $parseFloat = _dereq_(38).parseFloat,
        $trim = _dereq_(102).trim;

    module.exports = 1 / $parseFloat(_dereq_(103) + '-0') !== -Infinity ? function parseFloat(str) {
      var string = $trim(String(str), 3),
          result = $parseFloat(string);
      return result === 0 && string.charAt(0) == '-' ? -0 : result;
    } : $parseFloat;
  }, { "102": 102, "103": 103, "38": 38 }], 82: [function (_dereq_, module, exports) {
    var $parseInt = _dereq_(38).parseInt,
        $trim = _dereq_(102).trim,
        ws = _dereq_(103),
        hex = /^[\-+]?0[xX]/;

    module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
      var string = $trim(String(str), 3);
      return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
    } : $parseInt;
  }, { "102": 102, "103": 103, "38": 38 }], 83: [function (_dereq_, module, exports) {
    'use strict';

    var path = _dereq_(84),
        invoke = _dereq_(44),
        aFunction = _dereq_(3);
    module.exports = function () /* ...pargs */{
      var fn = aFunction(this),
          length = arguments.length,
          pargs = Array(length),
          i = 0,
          _ = path._,
          holder = false;
      while (length > i) {
        if ((pargs[i] = arguments[i++]) === _) holder = true;
      }return function () /* ...args */{
        var that = this,
            aLen = arguments.length,
            j = 0,
            k = 0,
            args;
        if (!holder && !aLen) return invoke(fn, pargs, that);
        args = pargs.slice();
        if (holder) for (; length > j; j++) {
          if (args[j] === _) args[j] = arguments[k++];
        }while (aLen > k) {
          args.push(arguments[k++]);
        }return invoke(fn, args, that);
      };
    };
  }, { "3": 3, "44": 44, "84": 84 }], 84: [function (_dereq_, module, exports) {
    module.exports = _dereq_(38);
  }, { "38": 38 }], 85: [function (_dereq_, module, exports) {
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
  }, {}], 86: [function (_dereq_, module, exports) {
    var redefine = _dereq_(87);
    module.exports = function (target, src, safe) {
      for (var key in src) {
        redefine(target, key, src[key], safe);
      }return target;
    };
  }, { "87": 87 }], 87: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        hide = _dereq_(40),
        has = _dereq_(39),
        SRC = _dereq_(114)('src'),
        TO_STRING = 'toString',
        $toString = Function[TO_STRING],
        TPL = ('' + $toString).split(TO_STRING);

    _dereq_(23).inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === global) {
        O[key] = val;
      } else {
        if (!safe) {
          delete O[key];
          hide(O, key, val);
        } else {
          if (O[key]) O[key] = val;else hide(O, key, val);
        }
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  }, { "114": 114, "23": 23, "38": 38, "39": 39, "40": 40 }], 88: [function (_dereq_, module, exports) {
    module.exports = function (regExp, replace) {
      var replacer = replace === Object(replace) ? function (part) {
        return replace[part];
      } : replace;
      return function (it) {
        return String(it).replace(regExp, replacer);
      };
    };
  }, {}], 89: [function (_dereq_, module, exports) {
    // 7.2.9 SameValue(x, y)
    module.exports = Object.is || function is(x, y) {
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };
  }, {}], 90: [function (_dereq_, module, exports) {
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */
    var isObject = _dereq_(49),
        anObject = _dereq_(7);
    var check = function check(O, proto) {
      anObject(O);
      if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
    };
    module.exports = {
      set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = _dereq_(25)(Function.call, _dereq_(70).f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) {
          buggy = true;
        }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
      check: check
    };
  }, { "25": 25, "49": 49, "7": 7, "70": 70 }], 91: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        dP = _dereq_(67),
        DESCRIPTORS = _dereq_(28),
        SPECIES = _dereq_(117)('species');

    module.exports = function (KEY) {
      var C = global[KEY];
      if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
        configurable: true,
        get: function get() {
          return this;
        }
      });
    };
  }, { "117": 117, "28": 28, "38": 38, "67": 67 }], 92: [function (_dereq_, module, exports) {
    var def = _dereq_(67).f,
        has = _dereq_(39),
        TAG = _dereq_(117)('toStringTag');

    module.exports = function (it, tag, stat) {
      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
    };
  }, { "117": 117, "39": 39, "67": 67 }], 93: [function (_dereq_, module, exports) {
    var shared = _dereq_(94)('keys'),
        uid = _dereq_(114);
    module.exports = function (key) {
      return shared[key] || (shared[key] = uid(key));
    };
  }, { "114": 114, "94": 94 }], 94: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
      return store[key] || (store[key] = {});
    };
  }, { "38": 38 }], 95: [function (_dereq_, module, exports) {
    // 7.3.20 SpeciesConstructor(O, defaultConstructor)
    var anObject = _dereq_(7),
        aFunction = _dereq_(3),
        SPECIES = _dereq_(117)('species');
    module.exports = function (O, D) {
      var C = anObject(O).constructor,
          S;
      return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
  }, { "117": 117, "3": 3, "7": 7 }], 96: [function (_dereq_, module, exports) {
    var fails = _dereq_(34);

    module.exports = function (method, arg) {
      return !!method && fails(function () {
        arg ? method.call(null, function () {}, 1) : method.call(null);
      });
    };
  }, { "34": 34 }], 97: [function (_dereq_, module, exports) {
    var toInteger = _dereq_(106),
        defined = _dereq_(27);
    // true  -> String#at
    // false -> String#codePointAt
    module.exports = function (TO_STRING) {
      return function (that, pos) {
        var s = String(defined(that)),
            i = toInteger(pos),
            l = s.length,
            a,
            b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    };
  }, { "106": 106, "27": 27 }], 98: [function (_dereq_, module, exports) {
    // helper for String#{startsWith, endsWith, includes}
    var isRegExp = _dereq_(50),
        defined = _dereq_(27);

    module.exports = function (that, searchString, NAME) {
      if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
      return String(defined(that));
    };
  }, { "27": 27, "50": 50 }], 99: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        fails = _dereq_(34),
        defined = _dereq_(27),
        quot = /"/g;
    // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
    var createHTML = function createHTML(string, tag, attribute, value) {
      var S = String(defined(string)),
          p1 = '<' + tag;
      if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
      return p1 + '>' + S + '</' + tag + '>';
    };
    module.exports = function (NAME, exec) {
      var O = {};
      O[NAME] = exec(createHTML);
      $export($export.P + $export.F * fails(function () {
        var test = ''[NAME]('"');
        return test !== test.toLowerCase() || test.split('"').length > 3;
      }), 'String', O);
    };
  }, { "27": 27, "32": 32, "34": 34 }], 100: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-string-pad-start-end
    var toLength = _dereq_(108),
        repeat = _dereq_(101),
        defined = _dereq_(27);

    module.exports = function (that, maxLength, fillString, left) {
      var S = String(defined(that)),
          stringLength = S.length,
          fillStr = fillString === undefined ? ' ' : String(fillString),
          intMaxLength = toLength(maxLength);
      if (intMaxLength <= stringLength || fillStr == '') return S;
      var fillLen = intMaxLength - stringLength,
          stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
      return left ? stringFiller + S : S + stringFiller;
    };
  }, { "101": 101, "108": 108, "27": 27 }], 101: [function (_dereq_, module, exports) {
    'use strict';

    var toInteger = _dereq_(106),
        defined = _dereq_(27);

    module.exports = function repeat(count) {
      var str = String(defined(this)),
          res = '',
          n = toInteger(count);
      if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
      for (; n > 0; (n >>>= 1) && (str += str)) {
        if (n & 1) res += str;
      }return res;
    };
  }, { "106": 106, "27": 27 }], 102: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        defined = _dereq_(27),
        fails = _dereq_(34),
        spaces = _dereq_(103),
        space = '[' + spaces + ']',
        non = "\u200B\x85",
        ltrim = RegExp('^' + space + space + '*'),
        rtrim = RegExp(space + space + '*$');

    var exporter = function exporter(KEY, exec, ALIAS) {
      var exp = {};
      var FORCE = fails(function () {
        return !!spaces[KEY]() || non[KEY]() != non;
      });
      var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
      if (ALIAS) exp[ALIAS] = fn;
      $export($export.P + $export.F * FORCE, 'String', exp);
    };

    // 1 -> String#trimLeft
    // 2 -> String#trimRight
    // 3 -> String#trim
    var trim = exporter.trim = function (string, TYPE) {
      string = String(defined(string));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };

    module.exports = exporter;
  }, { "103": 103, "27": 27, "32": 32, "34": 34 }], 103: [function (_dereq_, module, exports) {
    module.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
  }, {}], 104: [function (_dereq_, module, exports) {
    var ctx = _dereq_(25),
        invoke = _dereq_(44),
        html = _dereq_(41),
        cel = _dereq_(29),
        global = _dereq_(38),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function run() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listener = function listener(event) {
      run.call(event.data);
    };
    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i) {
          args.push(arguments[i++]);
        }queue[++counter] = function () {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (_dereq_(18)(process) == 'process') {
        defer = function defer(id) {
          process.nextTick(ctx(run, id, 1));
        };
        // Browsers with MessageChannel, includes WebWorkers
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = ctx(port.postMessage, port, 1);
        // Browsers with postMessage, skip WebWorkers
        // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function defer(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listener, false);
        // IE8-
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function defer(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run.call(id);
          };
        };
        // Rest old browsers
      } else {
        defer = function defer(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  }, { "18": 18, "25": 25, "29": 29, "38": 38, "41": 41, "44": 44 }], 105: [function (_dereq_, module, exports) {
    var toInteger = _dereq_(106),
        max = Math.max,
        min = Math.min;
    module.exports = function (index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
  }, { "106": 106 }], 106: [function (_dereq_, module, exports) {
    // 7.1.4 ToInteger
    var ceil = Math.ceil,
        floor = Math.floor;
    module.exports = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
  }, {}], 107: [function (_dereq_, module, exports) {
    // to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject = _dereq_(45),
        defined = _dereq_(27);
    module.exports = function (it) {
      return IObject(defined(it));
    };
  }, { "27": 27, "45": 45 }], 108: [function (_dereq_, module, exports) {
    // 7.1.15 ToLength
    var toInteger = _dereq_(106),
        min = Math.min;
    module.exports = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };
  }, { "106": 106 }], 109: [function (_dereq_, module, exports) {
    // 7.1.13 ToObject(argument)
    var defined = _dereq_(27);
    module.exports = function (it) {
      return Object(defined(it));
    };
  }, { "27": 27 }], 110: [function (_dereq_, module, exports) {
    // 7.1.1 ToPrimitive(input [, PreferredType])
    var isObject = _dereq_(49);
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    module.exports = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
  }, { "49": 49 }], 111: [function (_dereq_, module, exports) {
    'use strict';

    if (_dereq_(28)) {
      var LIBRARY = _dereq_(58),
          global = _dereq_(38),
          fails = _dereq_(34),
          $export = _dereq_(32),
          $typed = _dereq_(113),
          $buffer = _dereq_(112),
          ctx = _dereq_(25),
          anInstance = _dereq_(6),
          propertyDesc = _dereq_(85),
          hide = _dereq_(40),
          redefineAll = _dereq_(86),
          toInteger = _dereq_(106),
          toLength = _dereq_(108),
          toIndex = _dereq_(105),
          toPrimitive = _dereq_(110),
          has = _dereq_(39),
          same = _dereq_(89),
          classof = _dereq_(17),
          isObject = _dereq_(49),
          toObject = _dereq_(109),
          isArrayIter = _dereq_(46),
          create = _dereq_(66),
          getPrototypeOf = _dereq_(74),
          gOPN = _dereq_(72).f,
          getIterFn = _dereq_(118),
          uid = _dereq_(114),
          wks = _dereq_(117),
          createArrayMethod = _dereq_(12),
          createArrayIncludes = _dereq_(11),
          speciesConstructor = _dereq_(95),
          ArrayIterators = _dereq_(130),
          Iterators = _dereq_(56),
          $iterDetect = _dereq_(54),
          setSpecies = _dereq_(91),
          arrayFill = _dereq_(9),
          arrayCopyWithin = _dereq_(8),
          $DP = _dereq_(67),
          $GOPD = _dereq_(70),
          dP = $DP.f,
          gOPD = $GOPD.f,
          RangeError = global.RangeError,
          TypeError = global.TypeError,
          Uint8Array = global.Uint8Array,
          ARRAY_BUFFER = 'ArrayBuffer',
          SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
          BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
          PROTOTYPE = 'prototype',
          ArrayProto = Array[PROTOTYPE],
          $ArrayBuffer = $buffer.ArrayBuffer,
          $DataView = $buffer.DataView,
          arrayForEach = createArrayMethod(0),
          arrayFilter = createArrayMethod(2),
          arraySome = createArrayMethod(3),
          arrayEvery = createArrayMethod(4),
          arrayFind = createArrayMethod(5),
          arrayFindIndex = createArrayMethod(6),
          arrayIncludes = createArrayIncludes(true),
          arrayIndexOf = createArrayIncludes(false),
          arrayValues = ArrayIterators.values,
          arrayKeys = ArrayIterators.keys,
          arrayEntries = ArrayIterators.entries,
          arrayLastIndexOf = ArrayProto.lastIndexOf,
          arrayReduce = ArrayProto.reduce,
          arrayReduceRight = ArrayProto.reduceRight,
          arrayJoin = ArrayProto.join,
          arraySort = ArrayProto.sort,
          arraySlice = ArrayProto.slice,
          arrayToString = ArrayProto.toString,
          arrayToLocaleString = ArrayProto.toLocaleString,
          ITERATOR = wks('iterator'),
          TAG = wks('toStringTag'),
          TYPED_CONSTRUCTOR = uid('typed_constructor'),
          DEF_CONSTRUCTOR = uid('def_constructor'),
          ALL_CONSTRUCTORS = $typed.CONSTR,
          TYPED_ARRAY = $typed.TYPED,
          VIEW = $typed.VIEW,
          WRONG_LENGTH = 'Wrong length!';

      var $map = createArrayMethod(1, function (O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });

      var LITTLE_ENDIAN = fails(function () {
        return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      });

      var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
        new Uint8Array(1).set({});
      });

      var strictToLength = function strictToLength(it, SAME) {
        if (it === undefined) throw TypeError(WRONG_LENGTH);
        var number = +it,
            length = toLength(it);
        if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
        return length;
      };

      var toOffset = function toOffset(it, BYTES) {
        var offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      var validate = function validate(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + ' is not a typed array!');
      };

      var allocate = function allocate(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        }return new C(length);
      };

      var speciesFromList = function speciesFromList(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function fromList(C, list) {
        var index = 0,
            length = list.length,
            result = allocate(C, length);
        while (length > index) {
          result[index] = list[index++];
        }return result;
      };

      var addGetter = function addGetter(it, key, internal) {
        dP(it, key, { get: function get() {
            return this._d[internal];
          } });
      };

      var $from = function from(source /*, mapfn, thisArg */) {
        var O = toObject(source),
            aLen = arguments.length,
            mapfn = aLen > 1 ? arguments[1] : undefined,
            mapping = mapfn !== undefined,
            iterFn = getIterFn(O),
            i,
            length,
            values,
            result,
            step,
            iterator;
        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }O = values;
        }
        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }
        return result;
      };

      var $of = function of() /*...items*/{
        var index = 0,
            length = arguments.length,
            result = allocate(this, length);
        while (length > index) {
          result[index] = arguments[index++];
        }return result;
      };

      // iOS Safari 6.x fails here
      var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
        arrayToLocaleString.call(new Uint8Array(1));
      });

      var $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      var proto = {
        copyWithin: function copyWithin(target, start /*, end */) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn /*, thisArg */) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value /*, start, end */) {
          // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn /*, thisArg */) {
          return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
        },
        find: function find(predicate /*, thisArg */) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate /*, thisArg */) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn /*, thisArg */) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement /*, fromIndex */) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement /*, fromIndex */) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) {
          // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
          // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn /*, thisArg */) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn /*, initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn /*, initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          var that = this,
              length = validate(that).length,
              middle = Math.floor(length / 2),
              index = 0,
              value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }return that;
        },
        some: function some(callbackfn /*, thisArg */) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          var O = validate(this),
              length = O.length,
              $begin = toIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
        }
      };

      var $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      var $set = function set(arrayLike /*, offset */) {
        validate(this);
        var offset = toOffset(arguments[1], 1),
            length = this.length,
            src = toObject(arrayLike),
            len = toLength(src.length),
            index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);
        while (index < len) {
          this[offset + index] = src[index++];
        }
      };

      var $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        }
      };

      var isTAIndex = function isTAIndex(target, key) {
        return isObject(target) && target[TYPED_ARRAY] && (typeof key === "undefined" ? "undefined" : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
      };
      var $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
      };
      var $setDesc = function defineProperty(target, key, desc) {
        if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
        // TODO: add validation descriptor w/o calling accessors
        && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
          target[key] = desc.value;
          return target;
        } else return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc
      });

      if (fails(function () {
        arrayToString.call({});
      })) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      var $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor: function constructor() {/* noop */},
        toString: arrayToString,
        toLocaleString: $toLocaleString
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get: function get() {
          return this[TYPED_ARRAY];
        }
      });

      module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
            ISNT_UINT8 = NAME != 'Uint8Array',
            GETTER = 'get' + KEY,
            SETTER = 'set' + KEY,
            TypedArray = global[NAME],
            Base = TypedArray || {},
            TAC = TypedArray && getPrototypeOf(TypedArray),
            FORCED = !TypedArray || !$typed.ABV,
            O = {},
            TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
        var getter = function getter(that, index) {
          var data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };
        var setter = function setter(that, index, value) {
          var data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };
        var addElement = function addElement(that, index) {
          dP(that, index, {
            get: function get() {
              return getter(this, index);
            },
            set: function set(value) {
              return setter(this, index, value);
            },
            enumerable: true
          });
        };
        if (FORCED) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, '_d');
            var index = 0,
                offset = 0,
                buffer,
                byteLength,
                length,
                klass;
            if (!isObject(data)) {
              length = strictToLength(data, true);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              var $len = data.byteLength;
              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }
              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }
            hide(that, '_d', {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer)
            });
            while (index < length) {
              addElement(that, index++);
            }
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (!$iterDetect(function (iter) {
          // V8 works with iterators, but fails in many other cases
          // https://code.google.com/p/v8/issues/detail?id=4552
          new TypedArray(null); // eslint-disable-line no-new
          new TypedArray(iter); // eslint-disable-line no-new
        }, true)) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            var klass;
            // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645
            if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
            }
            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }
        var $nativeIterator = TypedArrayPrototype[ITERATOR],
            CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
            $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get: function get() {
              return NAME;
            }
          });
        }

        O[NAME] = TypedArray;

        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES,
          from: $from,
          of: $of
        });

        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

        $export($export.P, NAME, proto);

        setSpecies(NAME);

        $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

        $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });

        $export($export.P + $export.F * fails(function () {
          new TypedArray(1).slice();
        }), NAME, { slice: $slice });

        $export($export.P + $export.F * (fails(function () {
          return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
        }) || !fails(function () {
          TypedArrayPrototype.toLocaleString.call([1, 2]);
        })), NAME, { toLocaleString: $toLocaleString });

        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else module.exports = function () {/* empty */};
  }, { "105": 105, "106": 106, "108": 108, "109": 109, "11": 11, "110": 110, "112": 112, "113": 113, "114": 114, "117": 117, "118": 118, "12": 12, "130": 130, "17": 17, "25": 25, "28": 28, "32": 32, "34": 34, "38": 38, "39": 39, "40": 40, "46": 46, "49": 49, "54": 54, "56": 56, "58": 58, "6": 6, "66": 66, "67": 67, "70": 70, "72": 72, "74": 74, "8": 8, "85": 85, "86": 86, "89": 89, "9": 9, "91": 91, "95": 95 }], 112: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        DESCRIPTORS = _dereq_(28),
        LIBRARY = _dereq_(58),
        $typed = _dereq_(113),
        hide = _dereq_(40),
        redefineAll = _dereq_(86),
        fails = _dereq_(34),
        anInstance = _dereq_(6),
        toInteger = _dereq_(106),
        toLength = _dereq_(108),
        gOPN = _dereq_(72).f,
        dP = _dereq_(67).f,
        arrayFill = _dereq_(9),
        setToStringTag = _dereq_(92),
        ARRAY_BUFFER = 'ArrayBuffer',
        DATA_VIEW = 'DataView',
        PROTOTYPE = 'prototype',
        WRONG_LENGTH = 'Wrong length!',
        WRONG_INDEX = 'Wrong index!',
        $ArrayBuffer = global[ARRAY_BUFFER],
        $DataView = global[DATA_VIEW],
        Math = global.Math,
        RangeError = global.RangeError,
        Infinity = global.Infinity,
        BaseBuffer = $ArrayBuffer,
        abs = Math.abs,
        pow = Math.pow,
        floor = Math.floor,
        log = Math.log,
        LN2 = Math.LN2,
        BUFFER = 'buffer',
        BYTE_LENGTH = 'byteLength',
        BYTE_OFFSET = 'byteOffset',
        $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
        $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
        $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

    // IEEE754 conversions based on https://github.com/feross/ieee754
    var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
      var buffer = Array(nBytes),
          eLen = nBytes * 8 - mLen - 1,
          eMax = (1 << eLen) - 1,
          eBias = eMax >> 1,
          rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
          i = 0,
          s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
          e,
          m,
          c;
      value = abs(value);
      if (value != value || value === Infinity) {
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);
        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
      buffer[--i] |= s * 128;
      return buffer;
    };
    var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
      var eLen = nBytes * 8 - mLen - 1,
          eMax = (1 << eLen) - 1,
          eBias = eMax >> 1,
          nBits = eLen - 7,
          i = nBytes - 1,
          s = buffer[i--],
          e = s & 127,
          m;
      s >>= 7;
      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      }return (s ? -1 : 1) * m * pow(2, e - mLen);
    };

    var unpackI32 = function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    };
    var packI8 = function packI8(it) {
      return [it & 0xff];
    };
    var packI16 = function packI16(it) {
      return [it & 0xff, it >> 8 & 0xff];
    };
    var packI32 = function packI32(it) {
      return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
    };
    var packF64 = function packF64(it) {
      return packIEEE754(it, 52, 8);
    };
    var packF32 = function packF32(it) {
      return packIEEE754(it, 23, 4);
    };

    var addGetter = function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, { get: function get() {
          return this[internal];
        } });
    };

    var get = function get(view, bytes, index, isLittleEndian) {
      var numIndex = +index,
          intIndex = toInteger(numIndex);
      if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b,
          start = intIndex + view[$OFFSET],
          pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    };
    var set = function set(view, bytes, index, conversion, value, isLittleEndian) {
      var numIndex = +index,
          intIndex = toInteger(numIndex);
      if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b,
          start = intIndex + view[$OFFSET],
          pack = conversion(+value);
      for (var i = 0; i < bytes; i++) {
        store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
      }
    };

    var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
      anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
      var numberLength = +length,
          byteLength = toLength(numberLength);
      if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
      return byteLength;
    };

    if (!$typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        var byteLength = validateArrayBufferArguments(this, length);
        this._b = arrayFill.call(Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        anInstance(this, $DataView, DATA_VIEW);
        anInstance(buffer, $ArrayBuffer, DATA_VIEW);
        var bufferLength = buffer[$LENGTH],
            offset = toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (DESCRIPTORS) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return get(this, 1, byteOffset)[0] << 24 >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset /*, littleEndian */) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16: function getUint16(byteOffset /*, littleEndian */) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32: function getInt32(byteOffset /*, littleEndian */) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset /*, littleEndian */) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
          set(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
          set(this, 8, byteOffset, packF64, value, arguments[2]);
        }
      });
    } else {
      if (!fails(function () {
        new $ArrayBuffer(); // eslint-disable-line no-new
      }) || !fails(function () {
        new $ArrayBuffer(.5); // eslint-disable-line no-new
      })) {
        $ArrayBuffer = function ArrayBuffer(length) {
          return new BaseBuffer(validateArrayBufferArguments(this, length));
        };
        var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
        };
        if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
      }
      // iOS Safari 7.x bug
      var view = new $DataView(new $ArrayBuffer(2)),
          $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
        setInt8: function setInt8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        },
        setUint8: function setUint8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        }
      }, true);
    }
    setToStringTag($ArrayBuffer, ARRAY_BUFFER);
    setToStringTag($DataView, DATA_VIEW);
    hide($DataView[PROTOTYPE], $typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  }, { "106": 106, "108": 108, "113": 113, "28": 28, "34": 34, "38": 38, "40": 40, "58": 58, "6": 6, "67": 67, "72": 72, "86": 86, "9": 9, "92": 92 }], 113: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        hide = _dereq_(40),
        uid = _dereq_(114),
        TYPED = uid('typed_array'),
        VIEW = uid('view'),
        ABV = !!(global.ArrayBuffer && global.DataView),
        CONSTR = ABV,
        i = 0,
        l = 9,
        Typed;

    var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

    while (i < l) {
      if (Typed = global[TypedArrayConstructors[i++]]) {
        hide(Typed.prototype, TYPED, true);
        hide(Typed.prototype, VIEW, true);
      } else CONSTR = false;
    }

    module.exports = {
      ABV: ABV,
      CONSTR: CONSTR,
      TYPED: TYPED,
      VIEW: VIEW
    };
  }, { "114": 114, "38": 38, "40": 40 }], 114: [function (_dereq_, module, exports) {
    var id = 0,
        px = Math.random();
    module.exports = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };
  }, {}], 115: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        core = _dereq_(23),
        LIBRARY = _dereq_(58),
        wksExt = _dereq_(116),
        defineProperty = _dereq_(67).f;
    module.exports = function (name) {
      var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
      if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
    };
  }, { "116": 116, "23": 23, "38": 38, "58": 58, "67": 67 }], 116: [function (_dereq_, module, exports) {
    exports.f = _dereq_(117);
  }, { "117": 117 }], 117: [function (_dereq_, module, exports) {
    var store = _dereq_(94)('wks'),
        uid = _dereq_(114),
        _Symbol = _dereq_(38).Symbol,
        USE_SYMBOL = typeof _Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
    };

    $exports.store = store;
  }, { "114": 114, "38": 38, "94": 94 }], 118: [function (_dereq_, module, exports) {
    var classof = _dereq_(17),
        ITERATOR = _dereq_(117)('iterator'),
        Iterators = _dereq_(56);
    module.exports = _dereq_(23).getIteratorMethod = function (it) {
      if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
  }, { "117": 117, "17": 17, "23": 23, "56": 56 }], 119: [function (_dereq_, module, exports) {
    // https://github.com/benjamingr/RexExp.escape
    var $export = _dereq_(32),
        $re = _dereq_(88)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

    $export($export.S, 'RegExp', { escape: function escape(it) {
        return $re(it);
      } });
  }, { "32": 32, "88": 88 }], 120: [function (_dereq_, module, exports) {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    var $export = _dereq_(32);

    $export($export.P, 'Array', { copyWithin: _dereq_(8) });

    _dereq_(5)('copyWithin');
  }, { "32": 32, "5": 5, "8": 8 }], 121: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $every = _dereq_(12)(4);

    $export($export.P + $export.F * !_dereq_(96)([].every, true), 'Array', {
      // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
      every: function every(callbackfn /* , thisArg */) {
        return $every(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 122: [function (_dereq_, module, exports) {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    var $export = _dereq_(32);

    $export($export.P, 'Array', { fill: _dereq_(9) });

    _dereq_(5)('fill');
  }, { "32": 32, "5": 5, "9": 9 }], 123: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $filter = _dereq_(12)(2);

    $export($export.P + $export.F * !_dereq_(96)([].filter, true), 'Array', {
      // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 124: [function (_dereq_, module, exports) {
    'use strict';
    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

    var $export = _dereq_(32),
        $find = _dereq_(12)(6),
        KEY = 'findIndex',
        forced = true;
    // Shouldn't skip holes
    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      findIndex: function findIndex(callbackfn /*, that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    _dereq_(5)(KEY);
  }, { "12": 12, "32": 32, "5": 5 }], 125: [function (_dereq_, module, exports) {
    'use strict';
    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

    var $export = _dereq_(32),
        $find = _dereq_(12)(5),
        KEY = 'find',
        forced = true;
    // Shouldn't skip holes
    if (KEY in []) Array(1)[KEY](function () {
      forced = false;
    });
    $export($export.P + $export.F * forced, 'Array', {
      find: function find(callbackfn /*, that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
    _dereq_(5)(KEY);
  }, { "12": 12, "32": 32, "5": 5 }], 126: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $forEach = _dereq_(12)(0),
        STRICT = _dereq_(96)([].forEach, true);

    $export($export.P + $export.F * !STRICT, 'Array', {
      // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
      forEach: function forEach(callbackfn /* , thisArg */) {
        return $forEach(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 127: [function (_dereq_, module, exports) {
    'use strict';

    var ctx = _dereq_(25),
        $export = _dereq_(32),
        toObject = _dereq_(109),
        call = _dereq_(51),
        isArrayIter = _dereq_(46),
        toLength = _dereq_(108),
        createProperty = _dereq_(24),
        getIterFn = _dereq_(118);

    $export($export.S + $export.F * !_dereq_(54)(function (iter) {
      Array.from(iter);
    }), 'Array', {
      // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
      from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
        var O = toObject(arrayLike),
            C = typeof this == 'function' ? this : Array,
            aLen = arguments.length,
            mapfn = aLen > 1 ? arguments[1] : undefined,
            mapping = mapfn !== undefined,
            index = 0,
            iterFn = getIterFn(O),
            length,
            result,
            step,
            iterator;
        if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
        // if object isn't iterable or it's array with default iterator - use simple case
        if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
          for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
            createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
          }
        } else {
          length = toLength(O.length);
          for (result = new C(length); length > index; index++) {
            createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
          }
        }
        result.length = index;
        return result;
      }
    });
  }, { "108": 108, "109": 109, "118": 118, "24": 24, "25": 25, "32": 32, "46": 46, "51": 51, "54": 54 }], 128: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $indexOf = _dereq_(11)(false),
        $native = [].indexOf,
        NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

    $export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
      // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
      indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
        return NEGATIVE_ZERO
        // convert -0 to +0
        ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
      }
    });
  }, { "11": 11, "32": 32, "96": 96 }], 129: [function (_dereq_, module, exports) {
    // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
    var $export = _dereq_(32);

    $export($export.S, 'Array', { isArray: _dereq_(47) });
  }, { "32": 32, "47": 47 }], 130: [function (_dereq_, module, exports) {
    'use strict';

    var addToUnscopables = _dereq_(5),
        step = _dereq_(55),
        Iterators = _dereq_(56),
        toIObject = _dereq_(107);

    // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()
    module.exports = _dereq_(53)(Array, 'Array', function (iterated, kind) {
      this._t = toIObject(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
      var O = this._t,
          kind = this._k,
          index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
      }
      if (kind == 'keys') return step(0, index);
      if (kind == 'values') return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
    Iterators.Arguments = Iterators.Array;

    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
  }, { "107": 107, "5": 5, "53": 53, "55": 55, "56": 56 }], 131: [function (_dereq_, module, exports) {
    'use strict';
    // 22.1.3.13 Array.prototype.join(separator)

    var $export = _dereq_(32),
        toIObject = _dereq_(107),
        arrayJoin = [].join;

    // fallback for not array-like strings
    $export($export.P + $export.F * (_dereq_(45) != Object || !_dereq_(96)(arrayJoin)), 'Array', {
      join: function join(separator) {
        return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
      }
    });
  }, { "107": 107, "32": 32, "45": 45, "96": 96 }], 132: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toIObject = _dereq_(107),
        toInteger = _dereq_(106),
        toLength = _dereq_(108),
        $native = [].lastIndexOf,
        NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

    $export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
      // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
      lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
        // convert -0 to +0
        if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
        var O = toIObject(this),
            length = toLength(O.length),
            index = length - 1;
        if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
        if (index < 0) index = length + index;
        for (; index >= 0; index--) {
          if (index in O) if (O[index] === searchElement) return index || 0;
        }return -1;
      }
    });
  }, { "106": 106, "107": 107, "108": 108, "32": 32, "96": 96 }], 133: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $map = _dereq_(12)(1);

    $export($export.P + $export.F * !_dereq_(96)([].map, true), 'Array', {
      // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 134: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        createProperty = _dereq_(24);

    // WebKit Array.of isn't generic
    $export($export.S + $export.F * _dereq_(34)(function () {
      function F() {}
      return !(Array.of.call(F) instanceof F);
    }), 'Array', {
      // 22.1.2.3 Array.of( ...items)
      of: function of() /* ...args */{
        var index = 0,
            aLen = arguments.length,
            result = new (typeof this == 'function' ? this : Array)(aLen);
        while (aLen > index) {
          createProperty(result, index, arguments[index++]);
        }result.length = aLen;
        return result;
      }
    });
  }, { "24": 24, "32": 32, "34": 34 }], 135: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $reduce = _dereq_(13);

    $export($export.P + $export.F * !_dereq_(96)([].reduceRight, true), 'Array', {
      // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
      reduceRight: function reduceRight(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments[1], true);
      }
    });
  }, { "13": 13, "32": 32, "96": 96 }], 136: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $reduce = _dereq_(13);

    $export($export.P + $export.F * !_dereq_(96)([].reduce, true), 'Array', {
      // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments[1], false);
      }
    });
  }, { "13": 13, "32": 32, "96": 96 }], 137: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        html = _dereq_(41),
        cof = _dereq_(18),
        toIndex = _dereq_(105),
        toLength = _dereq_(108),
        arraySlice = [].slice;

    // fallback for not array-like ES3 strings and DOM objects
    $export($export.P + $export.F * _dereq_(34)(function () {
      if (html) arraySlice.call(html);
    }), 'Array', {
      slice: function slice(begin, end) {
        var len = toLength(this.length),
            klass = cof(this);
        end = end === undefined ? len : end;
        if (klass == 'Array') return arraySlice.call(this, begin, end);
        var start = toIndex(begin, len),
            upTo = toIndex(end, len),
            size = toLength(upTo - start),
            cloned = Array(size),
            i = 0;
        for (; i < size; i++) {
          cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
        }return cloned;
      }
    });
  }, { "105": 105, "108": 108, "18": 18, "32": 32, "34": 34, "41": 41 }], 138: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $some = _dereq_(12)(3);

    $export($export.P + $export.F * !_dereq_(96)([].some, true), 'Array', {
      // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
      some: function some(callbackfn /* , thisArg */) {
        return $some(this, callbackfn, arguments[1]);
      }
    });
  }, { "12": 12, "32": 32, "96": 96 }], 139: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        aFunction = _dereq_(3),
        toObject = _dereq_(109),
        fails = _dereq_(34),
        $sort = [].sort,
        test = [1, 2, 3];

    $export($export.P + $export.F * (fails(function () {
      // IE8-
      test.sort(undefined);
    }) || !fails(function () {
      // V8 bug
      test.sort(null);
      // Old WebKit
    }) || !_dereq_(96)($sort)), 'Array', {
      // 22.1.3.25 Array.prototype.sort(comparefn)
      sort: function sort(comparefn) {
        return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
      }
    });
  }, { "109": 109, "3": 3, "32": 32, "34": 34, "96": 96 }], 140: [function (_dereq_, module, exports) {
    _dereq_(91)('Array');
  }, { "91": 91 }], 141: [function (_dereq_, module, exports) {
    // 20.3.3.1 / 15.9.4.4 Date.now()
    var $export = _dereq_(32);

    $export($export.S, 'Date', { now: function now() {
        return new Date().getTime();
      } });
  }, { "32": 32 }], 142: [function (_dereq_, module, exports) {
    'use strict';
    // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

    var $export = _dereq_(32),
        fails = _dereq_(34),
        getTime = Date.prototype.getTime;

    var lz = function lz(num) {
      return num > 9 ? num : '0' + num;
    };

    // PhantomJS / old WebKit has a broken implementations
    $export($export.P + $export.F * (fails(function () {
      return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
    }) || !fails(function () {
      new Date(NaN).toISOString();
    })), 'Date', {
      toISOString: function toISOString() {
        if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
        var d = this,
            y = d.getUTCFullYear(),
            m = d.getUTCMilliseconds(),
            s = y < 0 ? '-' : y > 9999 ? '+' : '';
        return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
      }
    });
  }, { "32": 32, "34": 34 }], 143: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        toPrimitive = _dereq_(110);

    $export($export.P + $export.F * _dereq_(34)(function () {
      return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
          return 1;
        } }) !== 1;
    }), 'Date', {
      toJSON: function toJSON(key) {
        var O = toObject(this),
            pv = toPrimitive(O);
        return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
      }
    });
  }, { "109": 109, "110": 110, "32": 32, "34": 34 }], 144: [function (_dereq_, module, exports) {
    var TO_PRIMITIVE = _dereq_(117)('toPrimitive'),
        proto = Date.prototype;

    if (!(TO_PRIMITIVE in proto)) _dereq_(40)(proto, TO_PRIMITIVE, _dereq_(26));
  }, { "117": 117, "26": 26, "40": 40 }], 145: [function (_dereq_, module, exports) {
    var DateProto = Date.prototype,
        INVALID_DATE = 'Invalid Date',
        TO_STRING = 'toString',
        $toString = DateProto[TO_STRING],
        getTime = DateProto.getTime;
    if (new Date(NaN) + '' != INVALID_DATE) {
      _dereq_(87)(DateProto, TO_STRING, function toString() {
        var value = getTime.call(this);
        return value === value ? $toString.call(this) : INVALID_DATE;
      });
    }
  }, { "87": 87 }], 146: [function (_dereq_, module, exports) {
    // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
    var $export = _dereq_(32);

    $export($export.P, 'Function', { bind: _dereq_(16) });
  }, { "16": 16, "32": 32 }], 147: [function (_dereq_, module, exports) {
    'use strict';

    var isObject = _dereq_(49),
        getPrototypeOf = _dereq_(74),
        HAS_INSTANCE = _dereq_(117)('hasInstance'),
        FunctionProto = Function.prototype;
    // 19.2.3.6 Function.prototype[@@hasInstance](V)
    if (!(HAS_INSTANCE in FunctionProto)) _dereq_(67).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
        if (typeof this != 'function' || !isObject(O)) return false;
        if (!isObject(this.prototype)) return O instanceof this;
        // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
        while (O = getPrototypeOf(O)) {
          if (this.prototype === O) return true;
        }return false;
      } });
  }, { "117": 117, "49": 49, "67": 67, "74": 74 }], 148: [function (_dereq_, module, exports) {
    var dP = _dereq_(67).f,
        createDesc = _dereq_(85),
        has = _dereq_(39),
        FProto = Function.prototype,
        nameRE = /^\s*function ([^ (]*)/,
        NAME = 'name';

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    // 19.2.4.2 name
    NAME in FProto || _dereq_(28) && dP(FProto, NAME, {
      configurable: true,
      get: function get() {
        try {
          var that = this,
              name = ('' + that).match(nameRE)[1];
          has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
          return name;
        } catch (e) {
          return '';
        }
      }
    });
  }, { "28": 28, "39": 39, "67": 67, "85": 85 }], 149: [function (_dereq_, module, exports) {
    'use strict';

    var strong = _dereq_(19);

    // 23.1 Map Objects
    module.exports = _dereq_(22)('Map', function (get) {
      return function Map() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = strong.getEntry(this, key);
        return entry && entry.v;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return strong.def(this, key === 0 ? 0 : key, value);
      }
    }, strong, true);
  }, { "19": 19, "22": 22 }], 150: [function (_dereq_, module, exports) {
    // 20.2.2.3 Math.acosh(x)
    var $export = _dereq_(32),
        log1p = _dereq_(60),
        sqrt = Math.sqrt,
        $acosh = Math.acosh;

    $export($export.S + $export.F * !($acosh
    // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
    && Math.floor($acosh(Number.MAX_VALUE)) == 710
    // Tor Browser bug: Math.acosh(Infinity) -> NaN 
    && $acosh(Infinity) == Infinity), 'Math', {
      acosh: function acosh(x) {
        return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
      }
    });
  }, { "32": 32, "60": 60 }], 151: [function (_dereq_, module, exports) {
    // 20.2.2.5 Math.asinh(x)
    var $export = _dereq_(32),
        $asinh = Math.asinh;

    function asinh(x) {
      return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
    }

    // Tor Browser bug: Math.asinh(0) -> -0 
    $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
  }, { "32": 32 }], 152: [function (_dereq_, module, exports) {
    // 20.2.2.7 Math.atanh(x)
    var $export = _dereq_(32),
        $atanh = Math.atanh;

    // Tor Browser bug: Math.atanh(-0) -> 0 
    $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
      atanh: function atanh(x) {
        return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
      }
    });
  }, { "32": 32 }], 153: [function (_dereq_, module, exports) {
    // 20.2.2.9 Math.cbrt(x)
    var $export = _dereq_(32),
        sign = _dereq_(61);

    $export($export.S, 'Math', {
      cbrt: function cbrt(x) {
        return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
      }
    });
  }, { "32": 32, "61": 61 }], 154: [function (_dereq_, module, exports) {
    // 20.2.2.11 Math.clz32(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      clz32: function clz32(x) {
        return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
      }
    });
  }, { "32": 32 }], 155: [function (_dereq_, module, exports) {
    // 20.2.2.12 Math.cosh(x)
    var $export = _dereq_(32),
        exp = Math.exp;

    $export($export.S, 'Math', {
      cosh: function cosh(x) {
        return (exp(x = +x) + exp(-x)) / 2;
      }
    });
  }, { "32": 32 }], 156: [function (_dereq_, module, exports) {
    // 20.2.2.14 Math.expm1(x)
    var $export = _dereq_(32),
        $expm1 = _dereq_(59);

    $export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
  }, { "32": 32, "59": 59 }], 157: [function (_dereq_, module, exports) {
    // 20.2.2.16 Math.fround(x)
    var $export = _dereq_(32),
        sign = _dereq_(61),
        pow = Math.pow,
        EPSILON = pow(2, -52),
        EPSILON32 = pow(2, -23),
        MAX32 = pow(2, 127) * (2 - EPSILON32),
        MIN32 = pow(2, -126);

    var roundTiesToEven = function roundTiesToEven(n) {
      return n + 1 / EPSILON - 1 / EPSILON;
    };

    $export($export.S, 'Math', {
      fround: function fround(x) {
        var $abs = Math.abs(x),
            $sign = sign(x),
            a,
            result;
        if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
        a = (1 + EPSILON32 / EPSILON) * $abs;
        result = a - (a - $abs);
        if (result > MAX32 || result != result) return $sign * Infinity;
        return $sign * result;
      }
    });
  }, { "32": 32, "61": 61 }], 158: [function (_dereq_, module, exports) {
    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
    var $export = _dereq_(32),
        abs = Math.abs;

    $export($export.S, 'Math', {
      hypot: function hypot(value1, value2) {
        // eslint-disable-line no-unused-vars
        var sum = 0,
            i = 0,
            aLen = arguments.length,
            larg = 0,
            arg,
            div;
        while (i < aLen) {
          arg = abs(arguments[i++]);
          if (larg < arg) {
            div = larg / arg;
            sum = sum * div * div + 1;
            larg = arg;
          } else if (arg > 0) {
            div = arg / larg;
            sum += div * div;
          } else sum += arg;
        }
        return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
      }
    });
  }, { "32": 32 }], 159: [function (_dereq_, module, exports) {
    // 20.2.2.18 Math.imul(x, y)
    var $export = _dereq_(32),
        $imul = Math.imul;

    // some WebKit versions fails with big numbers, some has wrong arity
    $export($export.S + $export.F * _dereq_(34)(function () {
      return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
    }), 'Math', {
      imul: function imul(x, y) {
        var UINT16 = 0xffff,
            xn = +x,
            yn = +y,
            xl = UINT16 & xn,
            yl = UINT16 & yn;
        return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
      }
    });
  }, { "32": 32, "34": 34 }], 160: [function (_dereq_, module, exports) {
    // 20.2.2.21 Math.log10(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      log10: function log10(x) {
        return Math.log(x) / Math.LN10;
      }
    });
  }, { "32": 32 }], 161: [function (_dereq_, module, exports) {
    // 20.2.2.20 Math.log1p(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', { log1p: _dereq_(60) });
  }, { "32": 32, "60": 60 }], 162: [function (_dereq_, module, exports) {
    // 20.2.2.22 Math.log2(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      log2: function log2(x) {
        return Math.log(x) / Math.LN2;
      }
    });
  }, { "32": 32 }], 163: [function (_dereq_, module, exports) {
    // 20.2.2.28 Math.sign(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', { sign: _dereq_(61) });
  }, { "32": 32, "61": 61 }], 164: [function (_dereq_, module, exports) {
    // 20.2.2.30 Math.sinh(x)
    var $export = _dereq_(32),
        expm1 = _dereq_(59),
        exp = Math.exp;

    // V8 near Chromium 38 has a problem with very small numbers
    $export($export.S + $export.F * _dereq_(34)(function () {
      return !Math.sinh(-2e-17) != -2e-17;
    }), 'Math', {
      sinh: function sinh(x) {
        return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
      }
    });
  }, { "32": 32, "34": 34, "59": 59 }], 165: [function (_dereq_, module, exports) {
    // 20.2.2.33 Math.tanh(x)
    var $export = _dereq_(32),
        expm1 = _dereq_(59),
        exp = Math.exp;

    $export($export.S, 'Math', {
      tanh: function tanh(x) {
        var a = expm1(x = +x),
            b = expm1(-x);
        return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
      }
    });
  }, { "32": 32, "59": 59 }], 166: [function (_dereq_, module, exports) {
    // 20.2.2.34 Math.trunc(x)
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      trunc: function trunc(it) {
        return (it > 0 ? Math.floor : Math.ceil)(it);
      }
    });
  }, { "32": 32 }], 167: [function (_dereq_, module, exports) {
    'use strict';

    var global = _dereq_(38),
        has = _dereq_(39),
        cof = _dereq_(18),
        inheritIfRequired = _dereq_(43),
        toPrimitive = _dereq_(110),
        fails = _dereq_(34),
        gOPN = _dereq_(72).f,
        gOPD = _dereq_(70).f,
        dP = _dereq_(67).f,
        $trim = _dereq_(102).trim,
        NUMBER = 'Number',
        $Number = global[NUMBER],
        Base = $Number,
        proto = $Number.prototype
    // Opera ~12 has broken Object#toString
    ,
        BROKEN_COF = cof(_dereq_(66)(proto)) == NUMBER,
        TRIM = 'trim' in String.prototype;

    // 7.1.3 ToNumber(argument)
    var toNumber = function toNumber(argument) {
      var it = toPrimitive(argument, false);
      if (typeof it == 'string' && it.length > 2) {
        it = TRIM ? it.trim() : $trim(it, 3);
        var first = it.charCodeAt(0),
            third,
            radix,
            maxCode;
        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66:case 98:
              radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
            case 79:case 111:
              radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
            default:
              return +it;
          }
          for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
            code = digits.charCodeAt(i);
            // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols
            if (code < 48 || code > maxCode) return NaN;
          }return parseInt(digits, radix);
        }
      }return +it;
    };

    if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
      $Number = function Number(value) {
        var it = arguments.length < 1 ? 0 : value,
            that = this;
        return that instanceof $Number
        // check on 1..constructor(foo) case
        && (BROKEN_COF ? fails(function () {
          proto.valueOf.call(that);
        }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
      };
      for (var keys = _dereq_(28) ? gOPN(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
        if (has(Base, key = keys[j]) && !has($Number, key)) {
          dP($Number, key, gOPD(Base, key));
        }
      }
      $Number.prototype = proto;
      proto.constructor = $Number;
      _dereq_(87)(global, NUMBER, $Number);
    }
  }, { "102": 102, "110": 110, "18": 18, "28": 28, "34": 34, "38": 38, "39": 39, "43": 43, "66": 66, "67": 67, "70": 70, "72": 72, "87": 87 }], 168: [function (_dereq_, module, exports) {
    // 20.1.2.1 Number.EPSILON
    var $export = _dereq_(32);

    $export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
  }, { "32": 32 }], 169: [function (_dereq_, module, exports) {
    // 20.1.2.2 Number.isFinite(number)
    var $export = _dereq_(32),
        _isFinite = _dereq_(38).isFinite;

    $export($export.S, 'Number', {
      isFinite: function isFinite(it) {
        return typeof it == 'number' && _isFinite(it);
      }
    });
  }, { "32": 32, "38": 38 }], 170: [function (_dereq_, module, exports) {
    // 20.1.2.3 Number.isInteger(number)
    var $export = _dereq_(32);

    $export($export.S, 'Number', { isInteger: _dereq_(48) });
  }, { "32": 32, "48": 48 }], 171: [function (_dereq_, module, exports) {
    // 20.1.2.4 Number.isNaN(number)
    var $export = _dereq_(32);

    $export($export.S, 'Number', {
      isNaN: function isNaN(number) {
        return number != number;
      }
    });
  }, { "32": 32 }], 172: [function (_dereq_, module, exports) {
    // 20.1.2.5 Number.isSafeInteger(number)
    var $export = _dereq_(32),
        isInteger = _dereq_(48),
        abs = Math.abs;

    $export($export.S, 'Number', {
      isSafeInteger: function isSafeInteger(number) {
        return isInteger(number) && abs(number) <= 0x1fffffffffffff;
      }
    });
  }, { "32": 32, "48": 48 }], 173: [function (_dereq_, module, exports) {
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    var $export = _dereq_(32);

    $export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
  }, { "32": 32 }], 174: [function (_dereq_, module, exports) {
    // 20.1.2.10 Number.MIN_SAFE_INTEGER
    var $export = _dereq_(32);

    $export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
  }, { "32": 32 }], 175: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseFloat = _dereq_(81);
    // 20.1.2.12 Number.parseFloat(string)
    $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
  }, { "32": 32, "81": 81 }], 176: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseInt = _dereq_(82);
    // 20.1.2.13 Number.parseInt(string, radix)
    $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
  }, { "32": 32, "82": 82 }], 177: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toInteger = _dereq_(106),
        aNumberValue = _dereq_(4),
        repeat = _dereq_(101),
        $toFixed = 1..toFixed,
        floor = Math.floor,
        data = [0, 0, 0, 0, 0, 0],
        ERROR = 'Number.toFixed: incorrect invocation!',
        ZERO = '0';

    var multiply = function multiply(n, c) {
      var i = -1,
          c2 = c;
      while (++i < 6) {
        c2 += n * data[i];
        data[i] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };
    var divide = function divide(n) {
      var i = 6,
          c = 0;
      while (--i >= 0) {
        c += data[i];
        data[i] = floor(c / n);
        c = c % n * 1e7;
      }
    };
    var numToString = function numToString() {
      var i = 6,
          s = '';
      while (--i >= 0) {
        if (s !== '' || i === 0 || data[i] !== 0) {
          var t = String(data[i]);
          s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
        }
      }return s;
    };
    var pow = function pow(x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    };
    var log = function log(x) {
      var n = 0,
          x2 = x;
      while (x2 >= 4096) {
        n += 12;
        x2 /= 4096;
      }
      while (x2 >= 2) {
        n += 1;
        x2 /= 2;
      }return n;
    };

    $export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !_dereq_(34)(function () {
      // V8 ~ Android 4.3-
      $toFixed.call({});
    })), 'Number', {
      toFixed: function toFixed(fractionDigits) {
        var x = aNumberValue(this, ERROR),
            f = toInteger(fractionDigits),
            s = '',
            m = ZERO,
            e,
            z,
            j,
            k;
        if (f < 0 || f > 20) throw RangeError(ERROR);
        if (x != x) return 'NaN';
        if (x <= -1e21 || x >= 1e21) return String(x);
        if (x < 0) {
          s = '-';
          x = -x;
        }
        if (x > 1e-21) {
          e = log(x * pow(2, 69, 1)) - 69;
          z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
          z *= 0x10000000000000;
          e = 52 - e;
          if (e > 0) {
            multiply(0, z);
            j = f;
            while (j >= 7) {
              multiply(1e7, 0);
              j -= 7;
            }
            multiply(pow(10, j, 1), 0);
            j = e - 1;
            while (j >= 23) {
              divide(1 << 23);
              j -= 23;
            }
            divide(1 << j);
            multiply(1, 1);
            divide(2);
            m = numToString();
          } else {
            multiply(0, z);
            multiply(1 << -e, 0);
            m = numToString() + repeat.call(ZERO, f);
          }
        }
        if (f > 0) {
          k = m.length;
          m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
        } else {
          m = s + m;
        }return m;
      }
    });
  }, { "101": 101, "106": 106, "32": 32, "34": 34, "4": 4 }], 178: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $fails = _dereq_(34),
        aNumberValue = _dereq_(4),
        $toPrecision = 1..toPrecision;

    $export($export.P + $export.F * ($fails(function () {
      // IE7-
      return $toPrecision.call(1, undefined) !== '1';
    }) || !$fails(function () {
      // V8 ~ Android 4.3-
      $toPrecision.call({});
    })), 'Number', {
      toPrecision: function toPrecision(precision) {
        var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
        return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
      }
    });
  }, { "32": 32, "34": 34, "4": 4 }], 179: [function (_dereq_, module, exports) {
    // 19.1.3.1 Object.assign(target, source)
    var $export = _dereq_(32);

    $export($export.S + $export.F, 'Object', { assign: _dereq_(65) });
  }, { "32": 32, "65": 65 }], 180: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    $export($export.S, 'Object', { create: _dereq_(66) });
  }, { "32": 32, "66": 66 }], 181: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
    $export($export.S + $export.F * !_dereq_(28), 'Object', { defineProperties: _dereq_(68) });
  }, { "28": 28, "32": 32, "68": 68 }], 182: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    $export($export.S + $export.F * !_dereq_(28), 'Object', { defineProperty: _dereq_(67).f });
  }, { "28": 28, "32": 32, "67": 67 }], 183: [function (_dereq_, module, exports) {
    // 19.1.2.5 Object.freeze(O)
    var isObject = _dereq_(49),
        meta = _dereq_(62).onFreeze;

    _dereq_(78)('freeze', function ($freeze) {
      return function freeze(it) {
        return $freeze && isObject(it) ? $freeze(meta(it)) : it;
      };
    });
  }, { "49": 49, "62": 62, "78": 78 }], 184: [function (_dereq_, module, exports) {
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    var toIObject = _dereq_(107),
        $getOwnPropertyDescriptor = _dereq_(70).f;

    _dereq_(78)('getOwnPropertyDescriptor', function () {
      return function getOwnPropertyDescriptor(it, key) {
        return $getOwnPropertyDescriptor(toIObject(it), key);
      };
    });
  }, { "107": 107, "70": 70, "78": 78 }], 185: [function (_dereq_, module, exports) {
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    _dereq_(78)('getOwnPropertyNames', function () {
      return _dereq_(71).f;
    });
  }, { "71": 71, "78": 78 }], 186: [function (_dereq_, module, exports) {
    // 19.1.2.9 Object.getPrototypeOf(O)
    var toObject = _dereq_(109),
        $getPrototypeOf = _dereq_(74);

    _dereq_(78)('getPrototypeOf', function () {
      return function getPrototypeOf(it) {
        return $getPrototypeOf(toObject(it));
      };
    });
  }, { "109": 109, "74": 74, "78": 78 }], 187: [function (_dereq_, module, exports) {
    // 19.1.2.11 Object.isExtensible(O)
    var isObject = _dereq_(49);

    _dereq_(78)('isExtensible', function ($isExtensible) {
      return function isExtensible(it) {
        return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
      };
    });
  }, { "49": 49, "78": 78 }], 188: [function (_dereq_, module, exports) {
    // 19.1.2.12 Object.isFrozen(O)
    var isObject = _dereq_(49);

    _dereq_(78)('isFrozen', function ($isFrozen) {
      return function isFrozen(it) {
        return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
      };
    });
  }, { "49": 49, "78": 78 }], 189: [function (_dereq_, module, exports) {
    // 19.1.2.13 Object.isSealed(O)
    var isObject = _dereq_(49);

    _dereq_(78)('isSealed', function ($isSealed) {
      return function isSealed(it) {
        return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
      };
    });
  }, { "49": 49, "78": 78 }], 190: [function (_dereq_, module, exports) {
    // 19.1.3.10 Object.is(value1, value2)
    var $export = _dereq_(32);
    $export($export.S, 'Object', { is: _dereq_(89) });
  }, { "32": 32, "89": 89 }], 191: [function (_dereq_, module, exports) {
    // 19.1.2.14 Object.keys(O)
    var toObject = _dereq_(109),
        $keys = _dereq_(76);

    _dereq_(78)('keys', function () {
      return function keys(it) {
        return $keys(toObject(it));
      };
    });
  }, { "109": 109, "76": 76, "78": 78 }], 192: [function (_dereq_, module, exports) {
    // 19.1.2.15 Object.preventExtensions(O)
    var isObject = _dereq_(49),
        meta = _dereq_(62).onFreeze;

    _dereq_(78)('preventExtensions', function ($preventExtensions) {
      return function preventExtensions(it) {
        return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
      };
    });
  }, { "49": 49, "62": 62, "78": 78 }], 193: [function (_dereq_, module, exports) {
    // 19.1.2.17 Object.seal(O)
    var isObject = _dereq_(49),
        meta = _dereq_(62).onFreeze;

    _dereq_(78)('seal', function ($seal) {
      return function seal(it) {
        return $seal && isObject(it) ? $seal(meta(it)) : it;
      };
    });
  }, { "49": 49, "62": 62, "78": 78 }], 194: [function (_dereq_, module, exports) {
    // 19.1.3.19 Object.setPrototypeOf(O, proto)
    var $export = _dereq_(32);
    $export($export.S, 'Object', { setPrototypeOf: _dereq_(90).set });
  }, { "32": 32, "90": 90 }], 195: [function (_dereq_, module, exports) {
    'use strict';
    // 19.1.3.6 Object.prototype.toString()

    var classof = _dereq_(17),
        test = {};
    test[_dereq_(117)('toStringTag')] = 'z';
    if (test + '' != '[object z]') {
      _dereq_(87)(Object.prototype, 'toString', function toString() {
        return '[object ' + classof(this) + ']';
      }, true);
    }
  }, { "117": 117, "17": 17, "87": 87 }], 196: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseFloat = _dereq_(81);
    // 18.2.4 parseFloat(string)
    $export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
  }, { "32": 32, "81": 81 }], 197: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $parseInt = _dereq_(82);
    // 18.2.5 parseInt(string, radix)
    $export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
  }, { "32": 32, "82": 82 }], 198: [function (_dereq_, module, exports) {
    'use strict';

    var LIBRARY = _dereq_(58),
        global = _dereq_(38),
        ctx = _dereq_(25),
        classof = _dereq_(17),
        $export = _dereq_(32),
        isObject = _dereq_(49),
        aFunction = _dereq_(3),
        anInstance = _dereq_(6),
        forOf = _dereq_(37),
        speciesConstructor = _dereq_(95),
        task = _dereq_(104).set,
        microtask = _dereq_(64)(),
        PROMISE = 'Promise',
        TypeError = global.TypeError,
        process = global.process,
        $Promise = global[PROMISE],
        process = global.process,
        isNode = classof(process) == 'process',
        empty = function empty() {/* empty */},
        Internal,
        GenericPromiseCapability,
        Wrapper;

    var USE_NATIVE = !!function () {
      try {
        // correct subclassing with @@species support
        var promise = $Promise.resolve(1),
            FakePromise = (promise.constructor = {})[_dereq_(117)('species')] = function (exec) {
          exec(empty, empty);
        };
        // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
        return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
      } catch (e) {/* empty */}
    }();

    // helpers
    var sameConstructor = function sameConstructor(a, b) {
      // with library wrapper special case
      return a === b || a === $Promise && b === Wrapper;
    };
    var isThenable = function isThenable(it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var newPromiseCapability = function newPromiseCapability(C) {
      return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
    };
    var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve);
      this.reject = aFunction(reject);
    };
    var perform = function perform(exec) {
      try {
        exec();
      } catch (e) {
        return { error: e };
      }
    };
    var notify = function notify(promise, isReject) {
      if (promise._n) return;
      promise._n = true;
      var chain = promise._c;
      microtask(function () {
        var value = promise._v,
            ok = promise._s == 1,
            i = 0;
        var run = function run(reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              domain = reaction.domain,
              result,
              then;
          try {
            if (handler) {
              if (!ok) {
                if (promise._h == 2) onHandleUnhandled(promise);
                promise._h = 1;
              }
              if (handler === true) result = value;else {
                if (domain) domain.enter();
                result = handler(value);
                if (domain) domain.exit();
              }
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i) {
          run(chain[i++]);
        } // variable length - can't use forEach
        promise._c = [];
        promise._n = false;
        if (isReject && !promise._h) onUnhandled(promise);
      });
    };
    var onUnhandled = function onUnhandled(promise) {
      task.call(global, function () {
        var value = promise._v,
            abrupt,
            handler,
            console;
        if (isUnhandled(promise)) {
          abrupt = perform(function () {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (handler = global.onunhandledrejection) {
              handler({ promise: promise, reason: value });
            } else if ((console = global.console) && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          promise._h = isNode || isUnhandled(promise) ? 2 : 1;
        }promise._a = undefined;
        if (abrupt) throw abrupt.error;
      });
    };
    var isUnhandled = function isUnhandled(promise) {
      if (promise._h == 1) return false;
      var chain = promise._a || promise._c,
          i = 0,
          reaction;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
      }return true;
    };
    var onHandleUnhandled = function onHandleUnhandled(promise) {
      task.call(global, function () {
        var handler;
        if (isNode) {
          process.emit('rejectionHandled', promise);
        } else if (handler = global.onrejectionhandled) {
          handler({ promise: promise, reason: promise._v });
        }
      });
    };
    var $reject = function $reject(value) {
      var promise = this;
      if (promise._d) return;
      promise._d = true;
      promise = promise._w || promise; // unwrap
      promise._v = value;
      promise._s = 2;
      if (!promise._a) promise._a = promise._c.slice();
      notify(promise, true);
    };
    var $resolve = function $resolve(value) {
      var promise = this,
          then;
      if (promise._d) return;
      promise._d = true;
      promise = promise._w || promise; // unwrap
      try {
        if (promise === value) throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          microtask(function () {
            var wrapper = { _w: promise, _d: false }; // wrap
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          promise._v = value;
          promise._s = 1;
          notify(promise, false);
        }
      } catch (e) {
        $reject.call({ _w: promise, _d: false }, e); // wrap
      }
    };

    // constructor polyfill
    if (!USE_NATIVE) {
      // 25.4.3.1 Promise(executor)
      $Promise = function Promise(executor) {
        anInstance(this, $Promise, PROMISE, '_h');
        aFunction(executor);
        Internal.call(this);
        try {
          executor(ctx($resolve, this, 1), ctx($reject, this, 1));
        } catch (err) {
          $reject.call(this, err);
        }
      };
      Internal = function Promise(executor) {
        this._c = []; // <- awaiting reactions
        this._a = undefined; // <- checked in isUnhandled reactions
        this._s = 0; // <- state
        this._d = false; // <- done
        this._v = undefined; // <- value
        this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
        this._n = false; // <- notify
      };
      Internal.prototype = _dereq_(86)($Promise.prototype, {
        // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
        then: function then(onFulfilled, onRejected) {
          var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = isNode ? process.domain : undefined;
          this._c.push(reaction);
          if (this._a) this._a.push(reaction);
          if (this._s) notify(this, false);
          return reaction.promise;
        },
        // 25.4.5.1 Promise.prototype.catch(onRejected)
        'catch': function _catch(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      PromiseCapability = function PromiseCapability() {
        var promise = new Internal();
        this.promise = promise;
        this.resolve = ctx($resolve, promise, 1);
        this.reject = ctx($reject, promise, 1);
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
    _dereq_(92)($Promise, PROMISE);
    _dereq_(91)(PROMISE);
    Wrapper = _dereq_(23)[PROMISE];

    // statics
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
      // 25.4.4.5 Promise.reject(r)
      reject: function reject(r) {
        var capability = newPromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      }
    });
    $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
      // 25.4.4.6 Promise.resolve(x)
      resolve: function resolve(x) {
        // instanceof instead of internal slot check because we should fix it without replacement native Promise core
        if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
        var capability = newPromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      }
    });
    $export($export.S + $export.F * !(USE_NATIVE && _dereq_(54)(function (iter) {
      $Promise.all(iter)['catch'](empty);
    })), PROMISE, {
      // 25.4.4.1 Promise.all(iterable)
      all: function all(iterable) {
        var C = this,
            capability = newPromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject;
        var abrupt = perform(function () {
          var values = [],
              index = 0,
              remaining = 1;
          forOf(iterable, false, function (promise) {
            var $index = index++,
                alreadyCalled = false;
            values.push(undefined);
            remaining++;
            C.resolve(promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[$index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      },
      // 25.4.4.4 Promise.race(iterable)
      race: function race(iterable) {
        var C = this,
            capability = newPromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function () {
          forOf(iterable, false, function (promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      }
    });
  }, { "104": 104, "117": 117, "17": 17, "23": 23, "25": 25, "3": 3, "32": 32, "37": 37, "38": 38, "49": 49, "54": 54, "58": 58, "6": 6, "64": 64, "86": 86, "91": 91, "92": 92, "95": 95 }], 199: [function (_dereq_, module, exports) {
    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
    var $export = _dereq_(32),
        aFunction = _dereq_(3),
        anObject = _dereq_(7),
        rApply = (_dereq_(38).Reflect || {}).apply,
        fApply = Function.apply;
    // MS Edge argumentsList argument is optional
    $export($export.S + $export.F * !_dereq_(34)(function () {
      rApply(function () {});
    }), 'Reflect', {
      apply: function apply(target, thisArgument, argumentsList) {
        var T = aFunction(target),
            L = anObject(argumentsList);
        return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
      }
    });
  }, { "3": 3, "32": 32, "34": 34, "38": 38, "7": 7 }], 200: [function (_dereq_, module, exports) {
    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
    var $export = _dereq_(32),
        create = _dereq_(66),
        aFunction = _dereq_(3),
        anObject = _dereq_(7),
        isObject = _dereq_(49),
        fails = _dereq_(34),
        bind = _dereq_(16),
        rConstruct = (_dereq_(38).Reflect || {}).construct;

    // MS Edge supports only 2 arguments and argumentsList argument is optional
    // FF Nightly sets third argument as `new.target`, but does not create `this` from it
    var NEW_TARGET_BUG = fails(function () {
      function F() {}
      return !(rConstruct(function () {}, [], F) instanceof F);
    });
    var ARGS_BUG = !fails(function () {
      rConstruct(function () {});
    });

    $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
      construct: function construct(Target, args /*, newTarget*/) {
        aFunction(Target);
        anObject(args);
        var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
        if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
        if (Target == newTarget) {
          // w/o altered newTarget, optimization for 0-4 arguments
          switch (args.length) {
            case 0:
              return new Target();
            case 1:
              return new Target(args[0]);
            case 2:
              return new Target(args[0], args[1]);
            case 3:
              return new Target(args[0], args[1], args[2]);
            case 4:
              return new Target(args[0], args[1], args[2], args[3]);
          }
          // w/o altered newTarget, lot of arguments case
          var $args = [null];
          $args.push.apply($args, args);
          return new (bind.apply(Target, $args))();
        }
        // with altered newTarget, not support built-in constructors
        var proto = newTarget.prototype,
            instance = create(isObject(proto) ? proto : Object.prototype),
            result = Function.apply.call(Target, instance, args);
        return isObject(result) ? result : instance;
      }
    });
  }, { "16": 16, "3": 3, "32": 32, "34": 34, "38": 38, "49": 49, "66": 66, "7": 7 }], 201: [function (_dereq_, module, exports) {
    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
    var dP = _dereq_(67),
        $export = _dereq_(32),
        anObject = _dereq_(7),
        toPrimitive = _dereq_(110);

    // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
    $export($export.S + $export.F * _dereq_(34)(function () {
      Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
    }), 'Reflect', {
      defineProperty: function defineProperty(target, propertyKey, attributes) {
        anObject(target);
        propertyKey = toPrimitive(propertyKey, true);
        anObject(attributes);
        try {
          dP.f(target, propertyKey, attributes);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "110": 110, "32": 32, "34": 34, "67": 67, "7": 7 }], 202: [function (_dereq_, module, exports) {
    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
    var $export = _dereq_(32),
        gOPD = _dereq_(70).f,
        anObject = _dereq_(7);

    $export($export.S, 'Reflect', {
      deleteProperty: function deleteProperty(target, propertyKey) {
        var desc = gOPD(anObject(target), propertyKey);
        return desc && !desc.configurable ? false : delete target[propertyKey];
      }
    });
  }, { "32": 32, "7": 7, "70": 70 }], 203: [function (_dereq_, module, exports) {
    'use strict';
    // 26.1.5 Reflect.enumerate(target)

    var $export = _dereq_(32),
        anObject = _dereq_(7);
    var Enumerate = function Enumerate(iterated) {
      this._t = anObject(iterated); // target
      this._i = 0; // next index
      var keys = this._k = [] // keys
      ,
          key;
      for (key in iterated) {
        keys.push(key);
      }
    };
    _dereq_(52)(Enumerate, 'Object', function () {
      var that = this,
          keys = that._k,
          key;
      do {
        if (that._i >= keys.length) return { value: undefined, done: true };
      } while (!((key = keys[that._i++]) in that._t));
      return { value: key, done: false };
    });

    $export($export.S, 'Reflect', {
      enumerate: function enumerate(target) {
        return new Enumerate(target);
      }
    });
  }, { "32": 32, "52": 52, "7": 7 }], 204: [function (_dereq_, module, exports) {
    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
    var gOPD = _dereq_(70),
        $export = _dereq_(32),
        anObject = _dereq_(7);

    $export($export.S, 'Reflect', {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        return gOPD.f(anObject(target), propertyKey);
      }
    });
  }, { "32": 32, "7": 7, "70": 70 }], 205: [function (_dereq_, module, exports) {
    // 26.1.8 Reflect.getPrototypeOf(target)
    var $export = _dereq_(32),
        getProto = _dereq_(74),
        anObject = _dereq_(7);

    $export($export.S, 'Reflect', {
      getPrototypeOf: function getPrototypeOf(target) {
        return getProto(anObject(target));
      }
    });
  }, { "32": 32, "7": 7, "74": 74 }], 206: [function (_dereq_, module, exports) {
    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
    var gOPD = _dereq_(70),
        getPrototypeOf = _dereq_(74),
        has = _dereq_(39),
        $export = _dereq_(32),
        isObject = _dereq_(49),
        anObject = _dereq_(7);

    function get(target, propertyKey /*, receiver*/) {
      var receiver = arguments.length < 3 ? target : arguments[2],
          desc,
          proto;
      if (anObject(target) === receiver) return target[propertyKey];
      if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
      if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
    }

    $export($export.S, 'Reflect', { get: get });
  }, { "32": 32, "39": 39, "49": 49, "7": 7, "70": 70, "74": 74 }], 207: [function (_dereq_, module, exports) {
    // 26.1.9 Reflect.has(target, propertyKey)
    var $export = _dereq_(32);

    $export($export.S, 'Reflect', {
      has: function has(target, propertyKey) {
        return propertyKey in target;
      }
    });
  }, { "32": 32 }], 208: [function (_dereq_, module, exports) {
    // 26.1.10 Reflect.isExtensible(target)
    var $export = _dereq_(32),
        anObject = _dereq_(7),
        $isExtensible = Object.isExtensible;

    $export($export.S, 'Reflect', {
      isExtensible: function isExtensible(target) {
        anObject(target);
        return $isExtensible ? $isExtensible(target) : true;
      }
    });
  }, { "32": 32, "7": 7 }], 209: [function (_dereq_, module, exports) {
    // 26.1.11 Reflect.ownKeys(target)
    var $export = _dereq_(32);

    $export($export.S, 'Reflect', { ownKeys: _dereq_(80) });
  }, { "32": 32, "80": 80 }], 210: [function (_dereq_, module, exports) {
    // 26.1.12 Reflect.preventExtensions(target)
    var $export = _dereq_(32),
        anObject = _dereq_(7),
        $preventExtensions = Object.preventExtensions;

    $export($export.S, 'Reflect', {
      preventExtensions: function preventExtensions(target) {
        anObject(target);
        try {
          if ($preventExtensions) $preventExtensions(target);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "32": 32, "7": 7 }], 211: [function (_dereq_, module, exports) {
    // 26.1.14 Reflect.setPrototypeOf(target, proto)
    var $export = _dereq_(32),
        setProto = _dereq_(90);

    if (setProto) $export($export.S, 'Reflect', {
      setPrototypeOf: function setPrototypeOf(target, proto) {
        setProto.check(target, proto);
        try {
          setProto.set(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      }
    });
  }, { "32": 32, "90": 90 }], 212: [function (_dereq_, module, exports) {
    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
    var dP = _dereq_(67),
        gOPD = _dereq_(70),
        getPrototypeOf = _dereq_(74),
        has = _dereq_(39),
        $export = _dereq_(32),
        createDesc = _dereq_(85),
        anObject = _dereq_(7),
        isObject = _dereq_(49);

    function set(target, propertyKey, V /*, receiver*/) {
      var receiver = arguments.length < 4 ? target : arguments[3],
          ownDesc = gOPD.f(anObject(target), propertyKey),
          existingDescriptor,
          proto;
      if (!ownDesc) {
        if (isObject(proto = getPrototypeOf(target))) {
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = createDesc(0);
      }
      if (has(ownDesc, 'value')) {
        if (ownDesc.writable === false || !isObject(receiver)) return false;
        existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
        existingDescriptor.value = V;
        dP.f(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }

    $export($export.S, 'Reflect', { set: set });
  }, { "32": 32, "39": 39, "49": 49, "67": 67, "7": 7, "70": 70, "74": 74, "85": 85 }], 213: [function (_dereq_, module, exports) {
    var global = _dereq_(38),
        inheritIfRequired = _dereq_(43),
        dP = _dereq_(67).f,
        gOPN = _dereq_(72).f,
        isRegExp = _dereq_(50),
        $flags = _dereq_(36),
        $RegExp = global.RegExp,
        Base = $RegExp,
        proto = $RegExp.prototype,
        re1 = /a/g,
        re2 = /a/g
    // "new" creates a new object, old webkit buggy here
    ,
        CORRECT_NEW = new $RegExp(re1) !== re1;

    if (_dereq_(28) && (!CORRECT_NEW || _dereq_(34)(function () {
      re2[_dereq_(117)('match')] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
    }))) {
      $RegExp = function RegExp(p, f) {
        var tiRE = this instanceof $RegExp,
            piRE = isRegExp(p),
            fiU = f === undefined;
        return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
      };
      var proxy = function proxy(key) {
        key in $RegExp || dP($RegExp, key, {
          configurable: true,
          get: function get() {
            return Base[key];
          },
          set: function set(it) {
            Base[key] = it;
          }
        });
      };
      for (var keys = gOPN(Base), i = 0; keys.length > i;) {
        proxy(keys[i++]);
      }proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      _dereq_(87)(global, 'RegExp', $RegExp);
    }

    _dereq_(91)('RegExp');
  }, { "117": 117, "28": 28, "34": 34, "36": 36, "38": 38, "43": 43, "50": 50, "67": 67, "72": 72, "87": 87, "91": 91 }], 214: [function (_dereq_, module, exports) {
    // 21.2.5.3 get RegExp.prototype.flags()
    if (_dereq_(28) && /./g.flags != 'g') _dereq_(67).f(RegExp.prototype, 'flags', {
      configurable: true,
      get: _dereq_(36)
    });
  }, { "28": 28, "36": 36, "67": 67 }], 215: [function (_dereq_, module, exports) {
    // @@match logic
    _dereq_(35)('match', 1, function (defined, MATCH, $match) {
      // 21.1.3.11 String.prototype.match(regexp)
      return [function match(regexp) {
        'use strict';

        var O = defined(this),
            fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      }, $match];
    });
  }, { "35": 35 }], 216: [function (_dereq_, module, exports) {
    // @@replace logic
    _dereq_(35)('replace', 2, function (defined, REPLACE, $replace) {
      // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
      return [function replace(searchValue, replaceValue) {
        'use strict';

        var O = defined(this),
            fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
      }, $replace];
    });
  }, { "35": 35 }], 217: [function (_dereq_, module, exports) {
    // @@search logic
    _dereq_(35)('search', 1, function (defined, SEARCH, $search) {
      // 21.1.3.15 String.prototype.search(regexp)
      return [function search(regexp) {
        'use strict';

        var O = defined(this),
            fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      }, $search];
    });
  }, { "35": 35 }], 218: [function (_dereq_, module, exports) {
    // @@split logic
    _dereq_(35)('split', 2, function (defined, SPLIT, $split) {
      'use strict';

      var isRegExp = _dereq_(50),
          _split = $split,
          $push = [].push,
          $SPLIT = 'split',
          LENGTH = 'length',
          LAST_INDEX = 'lastIndex';
      if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
        var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
        // based on es5-shim implementation, need to rework it
        $split = function $split(separator, limit) {
          var string = String(this);
          if (separator === undefined && limit === 0) return [];
          // If `separator` is not a regex, use native split
          if (!isRegExp(separator)) return _split.call(string, separator, limit);
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var separator2, match, lastIndex, lastLength, i;
          // Doesn't need flags gy, but they don't hurt
          if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
          while (match = separatorCopy.exec(string)) {
            // `separatorCopy.lastIndex` is not reliable cross-browser
            lastIndex = match.index + match[0][LENGTH];
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
              if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
                for (i = 1; i < arguments[LENGTH] - 2; i++) {
                  if (arguments[i] === undefined) match[i] = undefined;
                }
              });
              if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
              lastLength = match[0][LENGTH];
              lastLastIndex = lastIndex;
              if (output[LENGTH] >= splitLimit) break;
            }
            if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
          }
          if (lastLastIndex === string[LENGTH]) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
        };
        // Chakra, V8
      } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
        $split = function $split(separator, limit) {
          return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
        };
      }
      // 21.1.3.17 String.prototype.split(separator, limit)
      return [function split(separator, limit) {
        var O = defined(this),
            fn = separator == undefined ? undefined : separator[SPLIT];
        return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
      }, $split];
    });
  }, { "35": 35, "50": 50 }], 219: [function (_dereq_, module, exports) {
    'use strict';

    _dereq_(214);
    var anObject = _dereq_(7),
        $flags = _dereq_(36),
        DESCRIPTORS = _dereq_(28),
        TO_STRING = 'toString',
        $toString = /./[TO_STRING];

    var define = function define(fn) {
      _dereq_(87)(RegExp.prototype, TO_STRING, fn, true);
    };

    // 21.2.5.14 RegExp.prototype.toString()
    if (_dereq_(34)(function () {
      return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
    })) {
      define(function toString() {
        var R = anObject(this);
        return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
      });
      // FF44- RegExp#toString has a wrong name
    } else if ($toString.name != TO_STRING) {
      define(function toString() {
        return $toString.call(this);
      });
    }
  }, { "214": 214, "28": 28, "34": 34, "36": 36, "7": 7, "87": 87 }], 220: [function (_dereq_, module, exports) {
    'use strict';

    var strong = _dereq_(19);

    // 23.2 Set Objects
    module.exports = _dereq_(22)('Set', function (get) {
      return function Set() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return strong.def(this, value = value === 0 ? 0 : value, value);
      }
    }, strong);
  }, { "19": 19, "22": 22 }], 221: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.2 String.prototype.anchor(name)

    _dereq_(99)('anchor', function (createHTML) {
      return function anchor(name) {
        return createHTML(this, 'a', 'name', name);
      };
    });
  }, { "99": 99 }], 222: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.3 String.prototype.big()

    _dereq_(99)('big', function (createHTML) {
      return function big() {
        return createHTML(this, 'big', '', '');
      };
    });
  }, { "99": 99 }], 223: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.4 String.prototype.blink()

    _dereq_(99)('blink', function (createHTML) {
      return function blink() {
        return createHTML(this, 'blink', '', '');
      };
    });
  }, { "99": 99 }], 224: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.5 String.prototype.bold()

    _dereq_(99)('bold', function (createHTML) {
      return function bold() {
        return createHTML(this, 'b', '', '');
      };
    });
  }, { "99": 99 }], 225: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $at = _dereq_(97)(false);
    $export($export.P, 'String', {
      // 21.1.3.3 String.prototype.codePointAt(pos)
      codePointAt: function codePointAt(pos) {
        return $at(this, pos);
      }
    });
  }, { "32": 32, "97": 97 }], 226: [function (_dereq_, module, exports) {
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    'use strict';

    var $export = _dereq_(32),
        toLength = _dereq_(108),
        context = _dereq_(98),
        ENDS_WITH = 'endsWith',
        $endsWith = ''[ENDS_WITH];

    $export($export.P + $export.F * _dereq_(33)(ENDS_WITH), 'String', {
      endsWith: function endsWith(searchString /*, endPosition = @length */) {
        var that = context(this, searchString, ENDS_WITH),
            endPosition = arguments.length > 1 ? arguments[1] : undefined,
            len = toLength(that.length),
            end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
            search = String(searchString);
        return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
      }
    });
  }, { "108": 108, "32": 32, "33": 33, "98": 98 }], 227: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.6 String.prototype.fixed()

    _dereq_(99)('fixed', function (createHTML) {
      return function fixed() {
        return createHTML(this, 'tt', '', '');
      };
    });
  }, { "99": 99 }], 228: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.7 String.prototype.fontcolor(color)

    _dereq_(99)('fontcolor', function (createHTML) {
      return function fontcolor(color) {
        return createHTML(this, 'font', 'color', color);
      };
    });
  }, { "99": 99 }], 229: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.8 String.prototype.fontsize(size)

    _dereq_(99)('fontsize', function (createHTML) {
      return function fontsize(size) {
        return createHTML(this, 'font', 'size', size);
      };
    });
  }, { "99": 99 }], 230: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        toIndex = _dereq_(105),
        fromCharCode = String.fromCharCode,
        $fromCodePoint = String.fromCodePoint;

    // length should be 1, old FF problem
    $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
      // 21.1.2.2 String.fromCodePoint(...codePoints)
      fromCodePoint: function fromCodePoint(x) {
        // eslint-disable-line no-unused-vars
        var res = [],
            aLen = arguments.length,
            i = 0,
            code;
        while (aLen > i) {
          code = +arguments[i++];
          if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
          res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
        }return res.join('');
      }
    });
  }, { "105": 105, "32": 32 }], 231: [function (_dereq_, module, exports) {
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    'use strict';

    var $export = _dereq_(32),
        context = _dereq_(98),
        INCLUDES = 'includes';

    $export($export.P + $export.F * _dereq_(33)(INCLUDES), 'String', {
      includes: function includes(searchString /*, position = 0 */) {
        return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
      }
    });
  }, { "32": 32, "33": 33, "98": 98 }], 232: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.9 String.prototype.italics()

    _dereq_(99)('italics', function (createHTML) {
      return function italics() {
        return createHTML(this, 'i', '', '');
      };
    });
  }, { "99": 99 }], 233: [function (_dereq_, module, exports) {
    'use strict';

    var $at = _dereq_(97)(true);

    // 21.1.3.27 String.prototype[@@iterator]()
    _dereq_(53)(String, 'String', function (iterated) {
      this._t = String(iterated); // target
      this._i = 0; // next index
      // 21.1.5.2.1 %StringIteratorPrototype%.next()
    }, function () {
      var O = this._t,
          index = this._i,
          point;
      if (index >= O.length) return { value: undefined, done: true };
      point = $at(O, index);
      this._i += point.length;
      return { value: point, done: false };
    });
  }, { "53": 53, "97": 97 }], 234: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.10 String.prototype.link(url)

    _dereq_(99)('link', function (createHTML) {
      return function link(url) {
        return createHTML(this, 'a', 'href', url);
      };
    });
  }, { "99": 99 }], 235: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        toIObject = _dereq_(107),
        toLength = _dereq_(108);

    $export($export.S, 'String', {
      // 21.1.2.4 String.raw(callSite, ...substitutions)
      raw: function raw(callSite) {
        var tpl = toIObject(callSite.raw),
            len = toLength(tpl.length),
            aLen = arguments.length,
            res = [],
            i = 0;
        while (len > i) {
          res.push(String(tpl[i++]));
          if (i < aLen) res.push(String(arguments[i]));
        }return res.join('');
      }
    });
  }, { "107": 107, "108": 108, "32": 32 }], 236: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);

    $export($export.P, 'String', {
      // 21.1.3.13 String.prototype.repeat(count)
      repeat: _dereq_(101)
    });
  }, { "101": 101, "32": 32 }], 237: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.11 String.prototype.small()

    _dereq_(99)('small', function (createHTML) {
      return function small() {
        return createHTML(this, 'small', '', '');
      };
    });
  }, { "99": 99 }], 238: [function (_dereq_, module, exports) {
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    'use strict';

    var $export = _dereq_(32),
        toLength = _dereq_(108),
        context = _dereq_(98),
        STARTS_WITH = 'startsWith',
        $startsWith = ''[STARTS_WITH];

    $export($export.P + $export.F * _dereq_(33)(STARTS_WITH), 'String', {
      startsWith: function startsWith(searchString /*, position = 0 */) {
        var that = context(this, searchString, STARTS_WITH),
            index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
            search = String(searchString);
        return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
      }
    });
  }, { "108": 108, "32": 32, "33": 33, "98": 98 }], 239: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.12 String.prototype.strike()

    _dereq_(99)('strike', function (createHTML) {
      return function strike() {
        return createHTML(this, 'strike', '', '');
      };
    });
  }, { "99": 99 }], 240: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.13 String.prototype.sub()

    _dereq_(99)('sub', function (createHTML) {
      return function sub() {
        return createHTML(this, 'sub', '', '');
      };
    });
  }, { "99": 99 }], 241: [function (_dereq_, module, exports) {
    'use strict';
    // B.2.3.14 String.prototype.sup()

    _dereq_(99)('sup', function (createHTML) {
      return function sup() {
        return createHTML(this, 'sup', '', '');
      };
    });
  }, { "99": 99 }], 242: [function (_dereq_, module, exports) {
    'use strict';
    // 21.1.3.25 String.prototype.trim()

    _dereq_(102)('trim', function ($trim) {
      return function trim() {
        return $trim(this, 3);
      };
    });
  }, { "102": 102 }], 243: [function (_dereq_, module, exports) {
    'use strict';
    // ECMAScript 6 symbols shim

    var global = _dereq_(38),
        has = _dereq_(39),
        DESCRIPTORS = _dereq_(28),
        $export = _dereq_(32),
        redefine = _dereq_(87),
        META = _dereq_(62).KEY,
        $fails = _dereq_(34),
        shared = _dereq_(94),
        setToStringTag = _dereq_(92),
        uid = _dereq_(114),
        wks = _dereq_(117),
        wksExt = _dereq_(116),
        wksDefine = _dereq_(115),
        keyOf = _dereq_(57),
        enumKeys = _dereq_(31),
        isArray = _dereq_(47),
        anObject = _dereq_(7),
        toIObject = _dereq_(107),
        toPrimitive = _dereq_(110),
        createDesc = _dereq_(85),
        _create = _dereq_(66),
        gOPNExt = _dereq_(71),
        $GOPD = _dereq_(70),
        $DP = _dereq_(67),
        $keys = _dereq_(76),
        gOPD = $GOPD.f,
        dP = $DP.f,
        gOPN = gOPNExt.f,
        $Symbol = global.Symbol,
        $JSON = global.JSON,
        _stringify = $JSON && $JSON.stringify,
        PROTOTYPE = 'prototype',
        HIDDEN = wks('_hidden'),
        TO_PRIMITIVE = wks('toPrimitive'),
        isEnum = {}.propertyIsEnumerable,
        SymbolRegistry = shared('symbol-registry'),
        AllSymbols = shared('symbols'),
        OPSymbols = shared('op-symbols'),
        ObjectProto = Object[PROTOTYPE],
        USE_NATIVE = typeof $Symbol == 'function',
        QObject = global.QObject;
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var setSymbolDesc = DESCRIPTORS && $fails(function () {
      return _create(dP({}, 'a', {
        get: function get() {
          return dP(this, 'a', { value: 7 }).a;
        }
      })).a != 7;
    }) ? function (it, key, D) {
      var protoDesc = gOPD(ObjectProto, key);
      if (protoDesc) delete ObjectProto[key];
      dP(it, key, D);
      if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;

    var wrap = function wrap(tag) {
      var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
      sym._k = tag;
      return sym;
    };

    var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
      return (typeof it === "undefined" ? "undefined" : _typeof(it)) == 'symbol';
    } : function (it) {
      return it instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(it, key, D) {
      if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
      anObject(it);
      key = toPrimitive(key, true);
      anObject(D);
      if (has(AllSymbols, key)) {
        if (!D.enumerable) {
          if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
          it[HIDDEN][key] = true;
        } else {
          if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
          D = _create(D, { enumerable: createDesc(0, false) });
        }return setSymbolDesc(it, key, D);
      }return dP(it, key, D);
    };
    var $defineProperties = function defineProperties(it, P) {
      anObject(it);
      var keys = enumKeys(P = toIObject(P)),
          i = 0,
          l = keys.length,
          key;
      while (l > i) {
        $defineProperty(it, key = keys[i++], P[key]);
      }return it;
    };
    var $create = function create(it, P) {
      return P === undefined ? _create(it) : $defineProperties(_create(it), P);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
      var E = isEnum.call(this, key = toPrimitive(key, true));
      if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
      return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
      it = toIObject(it);
      key = toPrimitive(key, true);
      if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
      var D = gOPD(it, key);
      if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
      return D;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
      var names = gOPN(toIObject(it)),
          result = [],
          i = 0,
          key;
      while (names.length > i) {
        if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
      }return result;
    };
    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
      var IS_OP = it === ObjectProto,
          names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
          result = [],
          i = 0,
          key;
      while (names.length > i) {
        if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
      }return result;
    };

    // 19.4.1.1 Symbol([description])
    if (!USE_NATIVE) {
      $Symbol = function _Symbol2() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
        var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
        var $set = function $set(value) {
          if (this === ObjectProto) $set.call(OPSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDesc(this, tag, createDesc(1, value));
        };
        if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
        return wrap(tag);
      };
      redefine($Symbol[PROTOTYPE], 'toString', function toString() {
        return this._k;
      });

      $GOPD.f = $getOwnPropertyDescriptor;
      $DP.f = $defineProperty;
      _dereq_(72).f = gOPNExt.f = $getOwnPropertyNames;
      _dereq_(77).f = $propertyIsEnumerable;
      _dereq_(73).f = $getOwnPropertySymbols;

      if (DESCRIPTORS && !_dereq_(58)) {
        redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
      }

      wksExt.f = function (name) {
        return wrap(wks(name));
      };
    }

    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

    for (var symbols =
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
      wks(symbols[i++]);
    }for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
      wksDefine(symbols[i++]);
    }$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
      // 19.4.2.1 Symbol.for(key)
      'for': function _for(key) {
        return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
      },
      // 19.4.2.5 Symbol.keyFor(sym)
      keyFor: function keyFor(key) {
        if (isSymbol(key)) return keyOf(SymbolRegistry, key);
        throw TypeError(key + ' is not a symbol!');
      },
      useSetter: function useSetter() {
        setter = true;
      },
      useSimple: function useSimple() {
        setter = false;
      }
    });

    $export($export.S + $export.F * !USE_NATIVE, 'Object', {
      // 19.1.2.2 Object.create(O [, Properties])
      create: $create,
      // 19.1.2.4 Object.defineProperty(O, P, Attributes)
      defineProperty: $defineProperty,
      // 19.1.2.3 Object.defineProperties(O, Properties)
      defineProperties: $defineProperties,
      // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
      // 19.1.2.7 Object.getOwnPropertyNames(O)
      getOwnPropertyNames: $getOwnPropertyNames,
      // 19.1.2.8 Object.getOwnPropertySymbols(O)
      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    // 24.3.2 JSON.stringify(value [, replacer [, space]])
    $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
      var S = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      // WebKit converts symbol values to JSON as null
      // V8 throws on boxed symbols
      return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
    })), 'JSON', {
      stringify: function stringify(it) {
        if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        var args = [it],
            i = 1,
            replacer,
            $replacer;
        while (arguments.length > i) {
          args.push(arguments[i++]);
        }replacer = args[1];
        if (typeof replacer == 'function') $replacer = replacer;
        if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
          if ($replacer) value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
      }
    });

    // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
    $Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_(40)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    // 19.4.3.5 Symbol.prototype[@@toStringTag]
    setToStringTag($Symbol, 'Symbol');
    // 20.2.1.9 Math[@@toStringTag]
    setToStringTag(Math, 'Math', true);
    // 24.3.3 JSON[@@toStringTag]
    setToStringTag(global.JSON, 'JSON', true);
  }, { "107": 107, "110": 110, "114": 114, "115": 115, "116": 116, "117": 117, "28": 28, "31": 31, "32": 32, "34": 34, "38": 38, "39": 39, "40": 40, "47": 47, "57": 57, "58": 58, "62": 62, "66": 66, "67": 67, "7": 7, "70": 70, "71": 71, "72": 72, "73": 73, "76": 76, "77": 77, "85": 85, "87": 87, "92": 92, "94": 94 }], 244: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        $typed = _dereq_(113),
        buffer = _dereq_(112),
        anObject = _dereq_(7),
        toIndex = _dereq_(105),
        toLength = _dereq_(108),
        isObject = _dereq_(49),
        ArrayBuffer = _dereq_(38).ArrayBuffer,
        speciesConstructor = _dereq_(95),
        $ArrayBuffer = buffer.ArrayBuffer,
        $DataView = buffer.DataView,
        $isView = $typed.ABV && ArrayBuffer.isView,
        $slice = $ArrayBuffer.prototype.slice,
        VIEW = $typed.VIEW,
        ARRAY_BUFFER = 'ArrayBuffer';

    $export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

    $export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
      // 24.1.3.1 ArrayBuffer.isView(arg)
      isView: function isView(it) {
        return $isView && $isView(it) || isObject(it) && VIEW in it;
      }
    });

    $export($export.P + $export.U + $export.F * _dereq_(34)(function () {
      return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
    }), ARRAY_BUFFER, {
      // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
      slice: function slice(start, end) {
        if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
        var len = anObject(this).byteLength,
            first = toIndex(start, len),
            final = toIndex(end === undefined ? len : end, len),
            result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
            viewS = new $DataView(this),
            viewT = new $DataView(result),
            index = 0;
        while (first < final) {
          viewT.setUint8(index++, viewS.getUint8(first++));
        }return result;
      }
    });

    _dereq_(91)(ARRAY_BUFFER);
  }, { "105": 105, "108": 108, "112": 112, "113": 113, "32": 32, "34": 34, "38": 38, "49": 49, "7": 7, "91": 91, "95": 95 }], 245: [function (_dereq_, module, exports) {
    var $export = _dereq_(32);
    $export($export.G + $export.W + $export.F * !_dereq_(113).ABV, {
      DataView: _dereq_(112).DataView
    });
  }, { "112": 112, "113": 113, "32": 32 }], 246: [function (_dereq_, module, exports) {
    _dereq_(111)('Float32', 4, function (init) {
      return function Float32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 247: [function (_dereq_, module, exports) {
    _dereq_(111)('Float64', 8, function (init) {
      return function Float64Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 248: [function (_dereq_, module, exports) {
    _dereq_(111)('Int16', 2, function (init) {
      return function Int16Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 249: [function (_dereq_, module, exports) {
    _dereq_(111)('Int32', 4, function (init) {
      return function Int32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 250: [function (_dereq_, module, exports) {
    _dereq_(111)('Int8', 1, function (init) {
      return function Int8Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 251: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint16', 2, function (init) {
      return function Uint16Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 252: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint32', 4, function (init) {
      return function Uint32Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 253: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint8', 1, function (init) {
      return function Uint8Array(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    });
  }, { "111": 111 }], 254: [function (_dereq_, module, exports) {
    _dereq_(111)('Uint8', 1, function (init) {
      return function Uint8ClampedArray(data, byteOffset, length) {
        return init(this, data, byteOffset, length);
      };
    }, true);
  }, { "111": 111 }], 255: [function (_dereq_, module, exports) {
    'use strict';

    var each = _dereq_(12)(0),
        redefine = _dereq_(87),
        meta = _dereq_(62),
        assign = _dereq_(65),
        weak = _dereq_(21),
        isObject = _dereq_(49),
        getWeak = meta.getWeak,
        isExtensible = Object.isExtensible,
        uncaughtFrozenStore = weak.ufstore,
        tmp = {},
        InternalMap;

    var wrapper = function wrapper(get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    var methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        if (isObject(key)) {
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(this).get(key);
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return weak.def(this, key, value);
      }
    };

    // 23.3 WeakMap Objects
    var $WeakMap = module.exports = _dereq_(22)('WeakMap', wrapper, methods, weak, true, true);

    // IE11 WeakMap frozen keys fix
    if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
      InternalMap = weak.getConstructor(wrapper);
      assign(InternalMap.prototype, methods);
      meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], function (key) {
        var proto = $WeakMap.prototype,
            method = proto[key];
        redefine(proto, key, function (a, b) {
          // store frozen objects on internal weakmap shim
          if (isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();
            var result = this._f[key](a, b);
            return key == 'set' ? this : result;
            // store all the rest on native weakmap
          }return method.call(this, a, b);
        });
      });
    }
  }, { "12": 12, "21": 21, "22": 22, "49": 49, "62": 62, "65": 65, "87": 87 }], 256: [function (_dereq_, module, exports) {
    'use strict';

    var weak = _dereq_(21);

    // 23.4 WeakSet Objects
    _dereq_(22)('WeakSet', function (get) {
      return function WeakSet() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    }, {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return weak.def(this, value, true);
      }
    }, weak, false, true);
  }, { "21": 21, "22": 22 }], 257: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/tc39/Array.prototype.includes

    var $export = _dereq_(32),
        $includes = _dereq_(11)(true);

    $export($export.P, 'Array', {
      includes: function includes(el /*, fromIndex = 0 */) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    _dereq_(5)('includes');
  }, { "11": 11, "32": 32, "5": 5 }], 258: [function (_dereq_, module, exports) {
    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
    var $export = _dereq_(32),
        microtask = _dereq_(64)(),
        process = _dereq_(38).process,
        isNode = _dereq_(18)(process) == 'process';

    $export($export.G, {
      asap: function asap(fn) {
        var domain = isNode && process.domain;
        microtask(domain ? domain.bind(fn) : fn);
      }
    });
  }, { "18": 18, "32": 32, "38": 38, "64": 64 }], 259: [function (_dereq_, module, exports) {
    // https://github.com/ljharb/proposal-is-error
    var $export = _dereq_(32),
        cof = _dereq_(18);

    $export($export.S, 'Error', {
      isError: function isError(it) {
        return cof(it) === 'Error';
      }
    });
  }, { "18": 18, "32": 32 }], 260: [function (_dereq_, module, exports) {
    // https://github.com/DavidBruant/Map-Set.prototype.toJSON
    var $export = _dereq_(32);

    $export($export.P + $export.R, 'Map', { toJSON: _dereq_(20)('Map') });
  }, { "20": 20, "32": 32 }], 261: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      iaddh: function iaddh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0,
            $x1 = x1 >>> 0,
            $y0 = y0 >>> 0;
        return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
      }
    });
  }, { "32": 32 }], 262: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      imulh: function imulh(u, v) {
        var UINT16 = 0xffff,
            $u = +u,
            $v = +v,
            u0 = $u & UINT16,
            v0 = $v & UINT16,
            u1 = $u >> 16,
            v1 = $v >> 16,
            t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
      }
    });
  }, { "32": 32 }], 263: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      isubh: function isubh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0,
            $x1 = x1 >>> 0,
            $y0 = y0 >>> 0;
        return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
      }
    });
  }, { "32": 32 }], 264: [function (_dereq_, module, exports) {
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    var $export = _dereq_(32);

    $export($export.S, 'Math', {
      umulh: function umulh(u, v) {
        var UINT16 = 0xffff,
            $u = +u,
            $v = +v,
            u0 = $u & UINT16,
            v0 = $v & UINT16,
            u1 = $u >>> 16,
            v1 = $v >>> 16,
            t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
      }
    });
  }, { "32": 32 }], 265: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        aFunction = _dereq_(3),
        $defineProperty = _dereq_(67);

    // B.2.2.2 Object.prototype.__defineGetter__(P, getter)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __defineGetter__: function __defineGetter__(P, getter) {
        $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
      }
    });
  }, { "109": 109, "28": 28, "3": 3, "32": 32, "67": 67, "69": 69 }], 266: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        aFunction = _dereq_(3),
        $defineProperty = _dereq_(67);

    // B.2.2.3 Object.prototype.__defineSetter__(P, setter)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __defineSetter__: function __defineSetter__(P, setter) {
        $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
      }
    });
  }, { "109": 109, "28": 28, "3": 3, "32": 32, "67": 67, "69": 69 }], 267: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-object-values-entries
    var $export = _dereq_(32),
        $entries = _dereq_(79)(true);

    $export($export.S, 'Object', {
      entries: function entries(it) {
        return $entries(it);
      }
    });
  }, { "32": 32, "79": 79 }], 268: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-object-getownpropertydescriptors
    var $export = _dereq_(32),
        ownKeys = _dereq_(80),
        toIObject = _dereq_(107),
        gOPD = _dereq_(70),
        createProperty = _dereq_(24);

    $export($export.S, 'Object', {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIObject(object),
            getDesc = gOPD.f,
            keys = ownKeys(O),
            result = {},
            i = 0,
            key;
        while (keys.length > i) {
          createProperty(result, key = keys[i++], getDesc(O, key));
        }return result;
      }
    });
  }, { "107": 107, "24": 24, "32": 32, "70": 70, "80": 80 }], 269: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        toPrimitive = _dereq_(110),
        getPrototypeOf = _dereq_(74),
        getOwnPropertyDescriptor = _dereq_(70).f;

    // B.2.2.4 Object.prototype.__lookupGetter__(P)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __lookupGetter__: function __lookupGetter__(P) {
        var O = toObject(this),
            K = toPrimitive(P, true),
            D;
        do {
          if (D = getOwnPropertyDescriptor(O, K)) return D.get;
        } while (O = getPrototypeOf(O));
      }
    });
  }, { "109": 109, "110": 110, "28": 28, "32": 32, "69": 69, "70": 70, "74": 74 }], 270: [function (_dereq_, module, exports) {
    'use strict';

    var $export = _dereq_(32),
        toObject = _dereq_(109),
        toPrimitive = _dereq_(110),
        getPrototypeOf = _dereq_(74),
        getOwnPropertyDescriptor = _dereq_(70).f;

    // B.2.2.5 Object.prototype.__lookupSetter__(P)
    _dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
      __lookupSetter__: function __lookupSetter__(P) {
        var O = toObject(this),
            K = toPrimitive(P, true),
            D;
        do {
          if (D = getOwnPropertyDescriptor(O, K)) return D.set;
        } while (O = getPrototypeOf(O));
      }
    });
  }, { "109": 109, "110": 110, "28": 28, "32": 32, "69": 69, "70": 70, "74": 74 }], 271: [function (_dereq_, module, exports) {
    // https://github.com/tc39/proposal-object-values-entries
    var $export = _dereq_(32),
        $values = _dereq_(79)(false);

    $export($export.S, 'Object', {
      values: function values(it) {
        return $values(it);
      }
    });
  }, { "32": 32, "79": 79 }], 272: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/zenparsing/es-observable

    var $export = _dereq_(32),
        global = _dereq_(38),
        core = _dereq_(23),
        microtask = _dereq_(64)(),
        OBSERVABLE = _dereq_(117)('observable'),
        aFunction = _dereq_(3),
        anObject = _dereq_(7),
        anInstance = _dereq_(6),
        redefineAll = _dereq_(86),
        hide = _dereq_(40),
        forOf = _dereq_(37),
        RETURN = forOf.RETURN;

    var getMethod = function getMethod(fn) {
      return fn == null ? undefined : aFunction(fn);
    };

    var cleanupSubscription = function cleanupSubscription(subscription) {
      var cleanup = subscription._c;
      if (cleanup) {
        subscription._c = undefined;
        cleanup();
      }
    };

    var subscriptionClosed = function subscriptionClosed(subscription) {
      return subscription._o === undefined;
    };

    var closeSubscription = function closeSubscription(subscription) {
      if (!subscriptionClosed(subscription)) {
        subscription._o = undefined;
        cleanupSubscription(subscription);
      }
    };

    var Subscription = function Subscription(observer, subscriber) {
      anObject(observer);
      this._c = undefined;
      this._o = observer;
      observer = new SubscriptionObserver(this);
      try {
        var cleanup = subscriber(observer),
            subscription = cleanup;
        if (cleanup != null) {
          if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
            subscription.unsubscribe();
          };else aFunction(cleanup);
          this._c = cleanup;
        }
      } catch (e) {
        observer.error(e);
        return;
      }if (subscriptionClosed(this)) cleanupSubscription(this);
    };

    Subscription.prototype = redefineAll({}, {
      unsubscribe: function unsubscribe() {
        closeSubscription(this);
      }
    });

    var SubscriptionObserver = function SubscriptionObserver(subscription) {
      this._s = subscription;
    };

    SubscriptionObserver.prototype = redefineAll({}, {
      next: function next(value) {
        var subscription = this._s;
        if (!subscriptionClosed(subscription)) {
          var observer = subscription._o;
          try {
            var m = getMethod(observer.next);
            if (m) return m.call(observer, value);
          } catch (e) {
            try {
              closeSubscription(subscription);
            } finally {
              throw e;
            }
          }
        }
      },
      error: function error(value) {
        var subscription = this._s;
        if (subscriptionClosed(subscription)) throw value;
        var observer = subscription._o;
        subscription._o = undefined;
        try {
          var m = getMethod(observer.error);
          if (!m) throw value;
          value = m.call(observer, value);
        } catch (e) {
          try {
            cleanupSubscription(subscription);
          } finally {
            throw e;
          }
        }cleanupSubscription(subscription);
        return value;
      },
      complete: function complete(value) {
        var subscription = this._s;
        if (!subscriptionClosed(subscription)) {
          var observer = subscription._o;
          subscription._o = undefined;
          try {
            var m = getMethod(observer.complete);
            value = m ? m.call(observer, value) : undefined;
          } catch (e) {
            try {
              cleanupSubscription(subscription);
            } finally {
              throw e;
            }
          }cleanupSubscription(subscription);
          return value;
        }
      }
    });

    var $Observable = function Observable(subscriber) {
      anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
    };

    redefineAll($Observable.prototype, {
      subscribe: function subscribe(observer) {
        return new Subscription(observer, this._f);
      },
      forEach: function forEach(fn) {
        var that = this;
        return new (core.Promise || global.Promise)(function (resolve, reject) {
          aFunction(fn);
          var subscription = that.subscribe({
            next: function next(value) {
              try {
                return fn(value);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      }
    });

    redefineAll($Observable, {
      from: function from(x) {
        var C = typeof this === 'function' ? this : $Observable;
        var method = getMethod(anObject(x)[OBSERVABLE]);
        if (method) {
          var observable = anObject(method.call(x));
          return observable.constructor === C ? observable : new C(function (observer) {
            return observable.subscribe(observer);
          });
        }
        return new C(function (observer) {
          var done = false;
          microtask(function () {
            if (!done) {
              try {
                if (forOf(x, false, function (it) {
                  observer.next(it);
                  if (done) return RETURN;
                }) === RETURN) return;
              } catch (e) {
                if (done) throw e;
                observer.error(e);
                return;
              }observer.complete();
            }
          });
          return function () {
            done = true;
          };
        });
      },
      of: function of() {
        for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
          items[i] = arguments[i++];
        }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
          var done = false;
          microtask(function () {
            if (!done) {
              for (var i = 0; i < items.length; ++i) {
                observer.next(items[i]);
                if (done) return;
              }observer.complete();
            }
          });
          return function () {
            done = true;
          };
        });
      }
    });

    hide($Observable.prototype, OBSERVABLE, function () {
      return this;
    });

    $export($export.G, { Observable: $Observable });

    _dereq_(91)('Observable');
  }, { "117": 117, "23": 23, "3": 3, "32": 32, "37": 37, "38": 38, "40": 40, "6": 6, "64": 64, "7": 7, "86": 86, "91": 91 }], 273: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        toMetaKey = metadata.key,
        ordinaryDefineOwnMetadata = metadata.set;

    metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
      } });
  }, { "63": 63, "7": 7 }], 274: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        toMetaKey = metadata.key,
        getOrCreateMetadataMap = metadata.map,
        store = metadata.store;

    metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
            metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
        if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
        if (metadataMap.size) return true;
        var targetMetadata = store.get(target);
        targetMetadata['delete'](targetKey);
        return !!targetMetadata.size || store['delete'](target);
      } });
  }, { "63": 63, "7": 7 }], 275: [function (_dereq_, module, exports) {
    var Set = _dereq_(220),
        from = _dereq_(10),
        metadata = _dereq_(63),
        anObject = _dereq_(7),
        getPrototypeOf = _dereq_(74),
        ordinaryOwnMetadataKeys = metadata.keys,
        toMetaKey = metadata.key;

    var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
      var oKeys = ordinaryOwnMetadataKeys(O, P),
          parent = getPrototypeOf(O);
      if (parent === null) return oKeys;
      var pKeys = ordinaryMetadataKeys(parent, P);
      return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
    };

    metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
        return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
      } });
  }, { "10": 10, "220": 220, "63": 63, "7": 7, "74": 74 }], 276: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        getPrototypeOf = _dereq_(74),
        ordinaryHasOwnMetadata = metadata.has,
        ordinaryGetOwnMetadata = metadata.get,
        toMetaKey = metadata.key;

    var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = getPrototypeOf(O);
      return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
    };

    metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7, "74": 74 }], 277: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        ordinaryOwnMetadataKeys = metadata.keys,
        toMetaKey = metadata.key;

    metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
        return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
      } });
  }, { "63": 63, "7": 7 }], 278: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        ordinaryGetOwnMetadata = metadata.get,
        toMetaKey = metadata.key;

    metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7 }], 279: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        getPrototypeOf = _dereq_(74),
        ordinaryHasOwnMetadata = metadata.has,
        toMetaKey = metadata.key;

    var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = getPrototypeOf(O);
      return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
    };

    metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7, "74": 74 }], 280: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        ordinaryHasOwnMetadata = metadata.has,
        toMetaKey = metadata.key;

    metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
        return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
      } });
  }, { "63": 63, "7": 7 }], 281: [function (_dereq_, module, exports) {
    var metadata = _dereq_(63),
        anObject = _dereq_(7),
        aFunction = _dereq_(3),
        toMetaKey = metadata.key,
        ordinaryDefineOwnMetadata = metadata.set;

    metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
        return function decorator(target, targetKey) {
          ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
        };
      } });
  }, { "3": 3, "63": 63, "7": 7 }], 282: [function (_dereq_, module, exports) {
    // https://github.com/DavidBruant/Map-Set.prototype.toJSON
    var $export = _dereq_(32);

    $export($export.P + $export.R, 'Set', { toJSON: _dereq_(20)('Set') });
  }, { "20": 20, "32": 32 }], 283: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/mathiasbynens/String.prototype.at

    var $export = _dereq_(32),
        $at = _dereq_(97)(true);

    $export($export.P, 'String', {
      at: function at(pos) {
        return $at(this, pos);
      }
    });
  }, { "32": 32, "97": 97 }], 284: [function (_dereq_, module, exports) {
    'use strict';
    // https://tc39.github.io/String.prototype.matchAll/

    var $export = _dereq_(32),
        defined = _dereq_(27),
        toLength = _dereq_(108),
        isRegExp = _dereq_(50),
        getFlags = _dereq_(36),
        RegExpProto = RegExp.prototype;

    var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
      this._r = regexp;
      this._s = string;
    };

    _dereq_(52)($RegExpStringIterator, 'RegExp String', function next() {
      var match = this._r.exec(this._s);
      return { value: match, done: match === null };
    });

    $export($export.P, 'String', {
      matchAll: function matchAll(regexp) {
        defined(this);
        if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
        var S = String(this),
            flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
            rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
        rx.lastIndex = toLength(regexp.lastIndex);
        return new $RegExpStringIterator(rx, S);
      }
    });
  }, { "108": 108, "27": 27, "32": 32, "36": 36, "50": 50, "52": 52 }], 285: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/tc39/proposal-string-pad-start-end

    var $export = _dereq_(32),
        $pad = _dereq_(100);

    $export($export.P, 'String', {
      padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
      }
    });
  }, { "100": 100, "32": 32 }], 286: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/tc39/proposal-string-pad-start-end

    var $export = _dereq_(32),
        $pad = _dereq_(100);

    $export($export.P, 'String', {
      padStart: function padStart(maxLength /*, fillString = ' ' */) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
      }
    });
  }, { "100": 100, "32": 32 }], 287: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

    _dereq_(102)('trimLeft', function ($trim) {
      return function trimLeft() {
        return $trim(this, 1);
      };
    }, 'trimStart');
  }, { "102": 102 }], 288: [function (_dereq_, module, exports) {
    'use strict';
    // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

    _dereq_(102)('trimRight', function ($trim) {
      return function trimRight() {
        return $trim(this, 2);
      };
    }, 'trimEnd');
  }, { "102": 102 }], 289: [function (_dereq_, module, exports) {
    _dereq_(115)('asyncIterator');
  }, { "115": 115 }], 290: [function (_dereq_, module, exports) {
    _dereq_(115)('observable');
  }, { "115": 115 }], 291: [function (_dereq_, module, exports) {
    // https://github.com/ljharb/proposal-global
    var $export = _dereq_(32);

    $export($export.S, 'System', { global: _dereq_(38) });
  }, { "32": 32, "38": 38 }], 292: [function (_dereq_, module, exports) {
    var $iterators = _dereq_(130),
        redefine = _dereq_(87),
        global = _dereq_(38),
        hide = _dereq_(40),
        Iterators = _dereq_(56),
        wks = _dereq_(117),
        ITERATOR = wks('iterator'),
        TO_STRING_TAG = wks('toStringTag'),
        ArrayValues = Iterators.Array;

    for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
      var NAME = collections[i],
          Collection = global[NAME],
          proto = Collection && Collection.prototype,
          key;
      if (proto) {
        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = ArrayValues;
        for (key in $iterators) {
          if (!proto[key]) redefine(proto, key, $iterators[key], true);
        }
      }
    }
  }, { "117": 117, "130": 130, "38": 38, "40": 40, "56": 56, "87": 87 }], 293: [function (_dereq_, module, exports) {
    var $export = _dereq_(32),
        $task = _dereq_(104);
    $export($export.G + $export.B, {
      setImmediate: $task.set,
      clearImmediate: $task.clear
    });
  }, { "104": 104, "32": 32 }], 294: [function (_dereq_, module, exports) {
    // ie9- setTimeout & setInterval additional parameters fix
    var global = _dereq_(38),
        $export = _dereq_(32),
        invoke = _dereq_(44),
        partial = _dereq_(83),
        navigator = global.navigator,
        MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
    var wrap = function wrap(set) {
      return MSIE ? function (fn, time /*, ...args */) {
        return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
      } : set;
    };
    $export($export.G + $export.B + $export.F * MSIE, {
      setTimeout: wrap(global.setTimeout),
      setInterval: wrap(global.setInterval)
    });
  }, { "32": 32, "38": 38, "44": 44, "83": 83 }], 295: [function (_dereq_, module, exports) {
    _dereq_(243);
    _dereq_(180);
    _dereq_(182);
    _dereq_(181);
    _dereq_(184);
    _dereq_(186);
    _dereq_(191);
    _dereq_(185);
    _dereq_(183);
    _dereq_(193);
    _dereq_(192);
    _dereq_(188);
    _dereq_(189);
    _dereq_(187);
    _dereq_(179);
    _dereq_(190);
    _dereq_(194);
    _dereq_(195);
    _dereq_(146);
    _dereq_(148);
    _dereq_(147);
    _dereq_(197);
    _dereq_(196);
    _dereq_(167);
    _dereq_(177);
    _dereq_(178);
    _dereq_(168);
    _dereq_(169);
    _dereq_(170);
    _dereq_(171);
    _dereq_(172);
    _dereq_(173);
    _dereq_(174);
    _dereq_(175);
    _dereq_(176);
    _dereq_(150);
    _dereq_(151);
    _dereq_(152);
    _dereq_(153);
    _dereq_(154);
    _dereq_(155);
    _dereq_(156);
    _dereq_(157);
    _dereq_(158);
    _dereq_(159);
    _dereq_(160);
    _dereq_(161);
    _dereq_(162);
    _dereq_(163);
    _dereq_(164);
    _dereq_(165);
    _dereq_(166);
    _dereq_(230);
    _dereq_(235);
    _dereq_(242);
    _dereq_(233);
    _dereq_(225);
    _dereq_(226);
    _dereq_(231);
    _dereq_(236);
    _dereq_(238);
    _dereq_(221);
    _dereq_(222);
    _dereq_(223);
    _dereq_(224);
    _dereq_(227);
    _dereq_(228);
    _dereq_(229);
    _dereq_(232);
    _dereq_(234);
    _dereq_(237);
    _dereq_(239);
    _dereq_(240);
    _dereq_(241);
    _dereq_(141);
    _dereq_(143);
    _dereq_(142);
    _dereq_(145);
    _dereq_(144);
    _dereq_(129);
    _dereq_(127);
    _dereq_(134);
    _dereq_(131);
    _dereq_(137);
    _dereq_(139);
    _dereq_(126);
    _dereq_(133);
    _dereq_(123);
    _dereq_(138);
    _dereq_(121);
    _dereq_(136);
    _dereq_(135);
    _dereq_(128);
    _dereq_(132);
    _dereq_(120);
    _dereq_(122);
    _dereq_(125);
    _dereq_(124);
    _dereq_(140);
    _dereq_(130);
    _dereq_(213);
    _dereq_(219);
    _dereq_(214);
    _dereq_(215);
    _dereq_(216);
    _dereq_(217);
    _dereq_(218);
    _dereq_(198);
    _dereq_(149);
    _dereq_(220);
    _dereq_(255);
    _dereq_(256);
    _dereq_(244);
    _dereq_(245);
    _dereq_(250);
    _dereq_(253);
    _dereq_(254);
    _dereq_(248);
    _dereq_(251);
    _dereq_(249);
    _dereq_(252);
    _dereq_(246);
    _dereq_(247);
    _dereq_(199);
    _dereq_(200);
    _dereq_(201);
    _dereq_(202);
    _dereq_(203);
    _dereq_(206);
    _dereq_(204);
    _dereq_(205);
    _dereq_(207);
    _dereq_(208);
    _dereq_(209);
    _dereq_(210);
    _dereq_(212);
    _dereq_(211);
    _dereq_(257);
    _dereq_(283);
    _dereq_(286);
    _dereq_(285);
    _dereq_(287);
    _dereq_(288);
    _dereq_(284);
    _dereq_(289);
    _dereq_(290);
    _dereq_(268);
    _dereq_(271);
    _dereq_(267);
    _dereq_(265);
    _dereq_(266);
    _dereq_(269);
    _dereq_(270);
    _dereq_(260);
    _dereq_(282);
    _dereq_(291);
    _dereq_(259);
    _dereq_(261);
    _dereq_(263);
    _dereq_(262);
    _dereq_(264);
    _dereq_(273);
    _dereq_(274);
    _dereq_(276);
    _dereq_(275);
    _dereq_(278);
    _dereq_(277);
    _dereq_(279);
    _dereq_(280);
    _dereq_(281);
    _dereq_(258);
    _dereq_(272);
    _dereq_(294);
    _dereq_(293);
    _dereq_(292);
    module.exports = _dereq_(23);
  }, { "120": 120, "121": 121, "122": 122, "123": 123, "124": 124, "125": 125, "126": 126, "127": 127, "128": 128, "129": 129, "130": 130, "131": 131, "132": 132, "133": 133, "134": 134, "135": 135, "136": 136, "137": 137, "138": 138, "139": 139, "140": 140, "141": 141, "142": 142, "143": 143, "144": 144, "145": 145, "146": 146, "147": 147, "148": 148, "149": 149, "150": 150, "151": 151, "152": 152, "153": 153, "154": 154, "155": 155, "156": 156, "157": 157, "158": 158, "159": 159, "160": 160, "161": 161, "162": 162, "163": 163, "164": 164, "165": 165, "166": 166, "167": 167, "168": 168, "169": 169, "170": 170, "171": 171, "172": 172, "173": 173, "174": 174, "175": 175, "176": 176, "177": 177, "178": 178, "179": 179, "180": 180, "181": 181, "182": 182, "183": 183, "184": 184, "185": 185, "186": 186, "187": 187, "188": 188, "189": 189, "190": 190, "191": 191, "192": 192, "193": 193, "194": 194, "195": 195, "196": 196, "197": 197, "198": 198, "199": 199, "200": 200, "201": 201, "202": 202, "203": 203, "204": 204, "205": 205, "206": 206, "207": 207, "208": 208, "209": 209, "210": 210, "211": 211, "212": 212, "213": 213, "214": 214, "215": 215, "216": 216, "217": 217, "218": 218, "219": 219, "220": 220, "221": 221, "222": 222, "223": 223, "224": 224, "225": 225, "226": 226, "227": 227, "228": 228, "229": 229, "23": 23, "230": 230, "231": 231, "232": 232, "233": 233, "234": 234, "235": 235, "236": 236, "237": 237, "238": 238, "239": 239, "240": 240, "241": 241, "242": 242, "243": 243, "244": 244, "245": 245, "246": 246, "247": 247, "248": 248, "249": 249, "250": 250, "251": 251, "252": 252, "253": 253, "254": 254, "255": 255, "256": 256, "257": 257, "258": 258, "259": 259, "260": 260, "261": 261, "262": 262, "263": 263, "264": 264, "265": 265, "266": 266, "267": 267, "268": 268, "269": 269, "270": 270, "271": 271, "272": 272, "273": 273, "274": 274, "275": 275, "276": 276, "277": 277, "278": 278, "279": 279, "280": 280, "281": 281, "282": 282, "283": 283, "284": 284, "285": 285, "286": 286, "287": 287, "288": 288, "289": 289, "290": 290, "291": 291, "292": 292, "293": 293, "294": 294 }], 296: [function (_dereq_, module, exports) {
    (function (global) {
      /**
       * Copyright (c) 2014, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
       * additional grant of patent rights can be found in the PATENTS file in
       * the same directory.
       */

      !function (global) {
        "use strict";

        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined; // More compressible than void 0.
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

        var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
        var runtime = global.regeneratorRuntime;
        if (runtime) {
          if (inModule) {
            // If regeneratorRuntime is defined globally and we're in a module,
            // make the exports object identical to regeneratorRuntime.
            module.exports = runtime;
          }
          // Don't bother evaluating the rest of this file if the runtime was
          // already defined globally.
          return;
        }

        // Define the runtime globally (as expected by generated code) as either
        // module.exports (if we're in a module) or a new, empty object.
        runtime = global.regeneratorRuntime = inModule ? module.exports : {};

        function wrap(innerFn, outerFn, self, tryLocsList) {
          // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);

          // The ._invoke method unifies the implementations of the .next,
          // .throw, and .return methods.
          generator._invoke = makeInvokeMethod(innerFn, self, context);

          return generator;
        }
        runtime.wrap = wrap;

        // Try/catch helper to minimize deoptimizations. Returns a completion
        // record like context.tryEntries[i].completion. This interface could
        // have been (and was previously) designed to take a closure to be
        // invoked without arguments, but in all the cases we care about we
        // already have an existing method we want to call, so there's no need
        // to create a new function object. We can even get away with assuming
        // the method takes exactly one argument, since that happens to be true
        // in every case, so we don't have to touch the arguments object. The
        // only additional allocation required is the completion record, which
        // has a stable shape and so hopefully should be cheap to allocate.
        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";

        // Returning this object from the innerFn has the same effect as
        // breaking out of the dispatch switch statement.
        var ContinueSentinel = {};

        // Dummy constructor functions that we use as the .constructor and
        // .constructor.prototype properties for functions that return Generator
        // objects. For full spec compliance, you may wish to configure your
        // minifier not to mangle the names of these two functions.
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}

        // This is a polyfill for %IteratorPrototype% for environments that
        // don't natively support it.
        var IteratorPrototype = {};
        IteratorPrototype[iteratorSymbol] = function () {
          return this;
        };

        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          // This environment has a native %IteratorPrototype%; use it instead
          // of the polyfill.
          IteratorPrototype = NativeIteratorPrototype;
        }

        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

        // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function (method) {
            prototype[method] = function (arg) {
              return this._invoke(method, arg);
            };
          });
        }

        runtime.isGeneratorFunction = function (genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };

        runtime.mark = function (genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            if (!(toStringTagSymbol in genFun)) {
              genFun[toStringTagSymbol] = "GeneratorFunction";
            }
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };

        // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `hasOwn.call(value, "__await")` to determine if the yielded value is
        // meant to be awaited.
        runtime.awrap = function (arg) {
          return { __await: arg };
        };

        function AsyncIterator(generator) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
                return Promise.resolve(value.__await).then(function (value) {
                  invoke("next", value, resolve, reject);
                }, function (err) {
                  invoke("throw", err, resolve, reject);
                });
              }

              return Promise.resolve(value).then(function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration. If the Promise is rejected, however, the
                // result for this iteration will be rejected with the same
                // reason. Note that rejections of yielded Promises are not
                // thrown back into the generator function, as is the case
                // when an awaited Promise is rejected. This difference in
                // behavior between yield and await is important, because it
                // allows the consumer to decide what to do with the yielded
                // rejection (swallow it and continue, manually .throw it back
                // into the generator, abandon iteration, whatever). With
                // await, by contrast, there is no opportunity to examine the
                // rejection reason outside the generator function, so the
                // only option is to throw it from the await expression, and
                // let the generator function handle the exception.
                result.value = unwrapped;
                resolve(result);
              }, reject);
            }
          }

          if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
            invoke = process.domain.bind(invoke);
          }

          var previousPromise;

          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new Promise(function (resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }

            return previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }

          // Define the unified helper method that is used to implement .next,
          // .throw, and .return (see defineIteratorMethods).
          this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);
        runtime.AsyncIterator = AsyncIterator;

        // Note that simple async functions are implemented on top of
        // AsyncIterator objects; they just return a Promise for the value of
        // the final result produced by the iterator.
        runtime.async = function (innerFn, outerFn, self, tryLocsList) {
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

          return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
        };

        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;

          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }

            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }

              // Be forgiving, per 25.3.3.3.3 of the spec:
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
              return doneResult();
            }

            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                  // A return or throw (when the delegate iterator has no throw
                  // method) always terminates the yield* loop.
                  context.delegate = null;

                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  var returnMethod = delegate.iterator["return"];
                  if (returnMethod) {
                    var record = tryCatch(returnMethod, delegate.iterator, arg);
                    if (record.type === "throw") {
                      // If the return method threw an exception, let that
                      // exception prevail over the original return or throw.
                      method = "throw";
                      arg = record.arg;
                      continue;
                    }
                  }

                  if (method === "return") {
                    // Continue with the outer return, now that the delegate
                    // iterator has been terminated.
                    continue;
                  }
                }

                var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

                if (record.type === "throw") {
                  context.delegate = null;

                  // Like returning generator.throw(uncaught), but without the
                  // overhead of an extra function call.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }

                // Delegate generator ran and handled its own exceptions so
                // regardless of what the method was, we continue as if it is
                // "next" with an undefined arg.
                method = "next";
                arg = undefined;

                var info = record.arg;
                if (info.done) {
                  context[delegate.resultName] = info.value;
                  context.next = delegate.nextLoc;
                } else {
                  state = GenStateSuspendedYield;
                  return info;
                }

                context.delegate = null;
              }

              if (method === "next") {
                // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = arg;
              } else if (method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw arg;
                }

                if (context.dispatchException(arg)) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  method = "next";
                  arg = undefined;
                }
              } else if (method === "return") {
                context.abrupt("return", arg);
              }

              state = GenStateExecuting;

              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                // If an exception is thrown from innerFn, we leave state ===
                // GenStateExecuting and loop back for another invocation.
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                var info = {
                  value: record.arg,
                  done: context.done
                };

                if (record.arg === ContinueSentinel) {
                  if (context.delegate && method === "next") {
                    // Deliberately forget the last sent value so that we don't
                    // accidentally pass it on to the delegate.
                    arg = undefined;
                  }
                } else {
                  return info;
                }
              } else if (record.type === "throw") {
                state = GenStateCompleted;
                // Dispatch the exception by looping back around to the
                // context.dispatchException(arg) call above.
                method = "throw";
                arg = record.arg;
              }
            }
          };
        }

        // Define Generator.prototype.{next,throw,return} in terms of the
        // unified ._invoke helper method.
        defineIteratorMethods(Gp);

        Gp[toStringTagSymbol] = "Generator";

        Gp.toString = function () {
          return "[object Generator]";
        };

        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };

          if (1 in locs) {
            entry.catchLoc = locs[1];
          }

          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }

          this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }

        function Context(tryLocsList) {
          // The root entry object (effectively a try statement without a catch
          // or a finally block) gives us a place to store values thrown from
          // locations where there is no enclosing try statement.
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }

        runtime.keys = function (object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();

          // Rather than returning an object with a next method, we keep
          // things simple and return the next function itself.
          return function next() {
            while (keys.length) {
              var key = keys.pop();
              if (key in object) {
                next.value = key;
                next.done = false;
                return next;
              }
            }

            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
          };
        };

        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }

            if (typeof iterable.next === "function") {
              return iterable;
            }

            if (!isNaN(iterable.length)) {
              var i = -1,
                  next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined;
                next.done = true;

                return next;
              };

              return next.next = next;
            }
          }

          // Return an iterator with no values.
          return { next: doneResult };
        }
        runtime.values = values;

        function doneResult() {
          return { value: undefined, done: true };
        }

        Context.prototype = {
          constructor: Context,

          reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;

            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
              for (var name in this) {
                // Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined;
                }
              }
            }
          },

          stop: function stop() {
            this.done = true;

            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }

            return this.rval;
          },

          dispatchException: function dispatchException(exception) {
            if (this.done) {
              throw exception;
            }

            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;
              return !!caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");

                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }
                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },

          abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }

            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              // Ignore the finally entry if control is not jumping to a
              // location outside the try/catch block.
              finallyEntry = null;
            }

            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
              this.next = finallyEntry.finallyLoc;
            } else {
              this.complete(record);
            }

            return ContinueSentinel;
          },

          complete: function complete(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }

            if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = record.arg;
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }
          },

          finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },

          "catch": function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }

            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
          },

          delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            };

            return ContinueSentinel;
          }
        };
      }(
      // Among the various tricks for obtaining a reference to the global
      // object, this seems to be the most reliable technique that does not
      // use indirect eval (which violates Content Security Policy).
      (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : this);
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {}] }, {}, [1]);

/******************************************
 *  _ _                                   *
 *  | |   (_(_)                           *
 *  | |    _ _ _ __ ___   _____  __       *
 *  | |   | | | '_ ` _ \ / _ \ \/ /       *
 *  | |___| | | | | | | |  __/>  <        *
 *  \_____|_|_|_| |_| |_|\___/_/\_\        *
 *                                        *
 * Build 182                              *
 * (C) 2016-2017 Liimex GmbH              *
 * All Rights Reserved                    *
 * https://www.liimex.com                 *
 ******************************************/

(function () {
  'use strict';

  angular.module('application', ['ui.router', 'ngAnimate', 'foundation', 'ngResource', 'foundation.dynamicRouting', 'foundation.dynamicRouting.animations', 'firebase', 'dynamicNumber', 'infinite-scroll', 'ngFileUpload', 'angularUUID2']).config(config).run(run);

  // App Constants
  var land_at = "overview_en";
  var no_auth_land_at = "login_en";
  var road_block = new Set();
  var backoffice_url;
  road_block.add('my_en');

  // Inject Providers
  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider', '$resourceProvider', 'dynamicConfig'];

  // Provider Configurations
  function config($urlProvider, $locationProvider, $stateProvider, $resourceProvider, dynamicConfig) {

    // App Init
    firebase.initializeApp(dynamicConfig.firebase_config);
    backoffice_url = dynamicConfig.backofficeUrl;

    // Start URL if not other Specified
    $urlProvider.otherwise('de/login');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
    $locationProvider.hashPrefix('!');
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }

  // Ensure Company and User Loaded
  function getInitialInformation(currentUser, success, err_call, userService, companyService, $rootScope, recommendationService, documentService) {
    console.log('..');
    userService.getUserInformation(currentUser, function (user) {
      console.log('...');
      $rootScope.user = user;
      // update the forceurl to it's preferred lang
      if ($rootScope.user && $rootScope.user.force_url) {
        /* if force_url already contains a lang suffix, remove it */
        $rootScope.user.force_url = $rootScope.user.force_url.split('_')[0];
        if ($rootScope.langPreference) {
          $rootScope.user.force_url += '_' + $rootScope.langPreference;
        } else {
          $rootScope.user.force_url += '_de';
        }
      }
      userService.getEmployment(currentUser, function (employment) {
        console.log('....');
        if (!employment) {
          err_call('error');
          return;
        }
        $rootScope.company_uid = employment.company;
        companyService.getCompanyFromModel($rootScope.company_uid, function (company) {
          console.log('.....');
          $rootScope.company = company;
          success();
          documentService.getAndStoreMandate($rootScope.company.mandate, function () {}, function () {});
          //recommendationService.getRecommendations(Object.keys(company.recommendations)[0], f=>{
          //   console.log('......');
          // }, error => {
          //   console.error(error);
          // });
        }, function (error) {
          console.error(error);
        });
      }, function (error) {
        console.error(error);
      });
    }, function (error) {
      err_call(error);
    });
  }

  // App run( -> )
  function run($rootScope, $state, authService, companyService, userService, $firebaseAuth, genService, recommendationService, documentService, backofficeService, $anchorScroll, $location, apiService, externalService) {

    $rootScope.backoffice_url = backoffice_url;

    FastClick.attach(document.body);

    // Getting Init Information
    //$rootScope.authenticating = false;
    // Make Services Available from RootScope
    $rootScope.authService = authService;
    $rootScope.genService = genService;

    /* Signout */
    $rootScope.Signout = function () {
      authService.logout(function () {
        $rootScope.genService.showDefaultSuccessMsg('You have successfully logged out');
      }, function (error) {
        $rootScope.genService.showDefaultErrorMsg('Could not log you out');
      });
    };

    $rootScope.langPreference = 'de';

    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-84062630-2', 'auto');

    // Watch for StateChanges to Complete
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

      // Location tracking for Google Analytics

      ga('send', 'pageview', $location.url());

      // Set Language Preference when Url changes
      $rootScope.langPreference = toState.name.split('_')[1];

      // Defining Lanuage Dependent Variables
      var language_vars = {};
      language_vars.de = {};
      language_vars.en = {};
      language_vars.de.land_at = 'overview_de';
      language_vars.de.no_auth_land_at = 'login_de';
      language_vars.de.road_block = 'my_de';
      language_vars.en.land_at = 'overview_en';
      language_vars.en.no_auth_land_at = 'login_en';
      language_vars.en.road_block = 'my_en';

      // Setting Lanuage Dependent Variables
      land_at = language_vars[$rootScope.langPreference].land_at;
      no_auth_land_at = language_vars[$rootScope.langPreference].no_auth_land_at;
      road_block.add(language_vars[$rootScope.langPreference].road_block);

      // update the forceurl to it's preferred lang
      if ($rootScope.user && $rootScope.user.force_url) {
        /* if force_url already contains a lang suffix, remove it */
        $rootScope.user.force_url = $rootScope.user.force_url.split('_')[0];
        if ($rootScope.langPreference) {
          $rootScope.user.force_url += '_' + $rootScope.langPreference;
        } else {
          $rootScope.user.force_url += '_de';
        }
      }

      // check to hide navigation
      if (toState.data.vars.hide_navigation) {
        $rootScope.hide_navigation = true;
      } else {
        $rootScope.hide_navigation = false;
      }

      if (toState.data.vars.hide_footer) {
        $rootScope.hide_footer = true;
      } else {
        $rootScope.hide_footer = false;
      }

      // On Logout, keep checking status of login
      $rootScope.authService.getCurrentUser(function (firebaseUser) {
        if (!firebaseUser) {
          $rootScope.currentUser = undefined;
        }
      });

      var loginRequired = toState.data.vars.loginRequired;
      $rootScope.currentState = toState.name;
      console.log('Current State:', toState.name);
      console.log('Current User:', $rootScope.currentUser);

      // Check for Force URL
      if (loginRequired && $rootScope.user && $rootScope.user && $rootScope.user.force_url !== toState.name && $state.href($rootScope.user.force_url)) {
        $state.go($rootScope.user.force_url);
      }

      if ($rootScope.user && !$rootScope.user.force_url && toState.data.vars.forceRequired && $rootScope.currentUser) {
        $state.go(land_at);
      }

      if (road_block.has(toState.name)) {
        $state.go(land_at);
      }

      if (toState.data.vars.logoutRequired && $rootScope.currentUser) {
        $state.go(land_at);
        return;
      }

      //user is authenticated but on login page, redirecct to overview.
      $firebaseAuth().$waitForSignIn().then(function (status) {
        if (status !== null && toState.data.vars.logoutRequired) {
          $state.go(land_at);
        }
      });

      // if(authService.isEmailVerified() === false && !$rootScope.user.force_url){
      //   $state.go('verify');
      // }

      if (loginRequired && typeof $rootScope.currentUser === 'undefined' || toState.data.vars.logoutRequired && $rootScope.currentUser) {
        $rootScope.authenticating = true;
        console.log('.');
        $firebaseAuth().$waitForSignIn().then(function (status) {
          console.log('Auth Resolved');
          if (!status) {
            $state.go(no_auth_land_at);
            $rootScope.authenticating = false;
          } else {
            $rootScope.currentUser = status.uid;
            getInitialInformation(status.uid, function () {
              $rootScope.authenticating = false;
              if ($rootScope.user.force_url && $rootScope.user.force_url !== toState.name && $state.href($rootScope.user.force_url)) {
                $state.go($rootScope.user.force_url);
              } else {
                $state.go(land_at);
                $state.reload();
              }
              console.log('Current User:', $rootScope.currentUser);
            }, function (error) {
              console.error(error);
              $state.go(no_auth_land_at);
              authService.logout(function () {}, function () {});
              $rootScope.authenticating = false;
            }, userService, companyService, $rootScope, recommendationService, documentService);
          }
        });
      }
      $anchorScroll();
    });

    // Make a green header bar above everything #563
    var url = window.location.href;
    $rootScope.developmentEnvironment = !/^https?:\/\/lmx3.liimex.com/.test(url);
  }
})();

/*  Responsiveness Stuff  */

$(window).load(function () {

  $('.outerlogoutright').click(function () {
    if ($('.navbar-logout-inner').css('display') == 'none') {
      $('.navbar-logout-inner').show();
      $('.logout-modal').removeClass('fadeOut');
      $('.logout-modal').addClass('ng-leave is-active ng-leave-active fadeIn');
    } else {
      $('.navbar-logout-inner').hide();
      $('.logout-modal').removeClass('ng-leave is-active ng-leave-active fadeIn');
      $('.logout-modal').addClass('fadeOut');
    }
  });

  $('.logout-modal').click(function () {
    $('.navbar-logout-inner').hide();
  });

  if ($(window).width() > 319 && $(window).width() < 768) {
    var dropdown_status = 0;
    $(".navbar-hamburger").click(function () {
      if (dropdown_status == 0) {
        $('.mobile-sidebar-nav').show();
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter', 'none');
        dropdown_status = 1;

        $('.mobile-sidebar-nav .sidebar-item').click(function () {
          $('.mobile-sidebar-nav').hide();
          $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter', 'drop-shadow(0px 0px 20px #b3ceff)');
          dropdown_status = 0;
        });
      } else {
        $('.mobile-sidebar-nav').css('display', 'none');
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter', 'drop-shadow(0px 0px 20px #b3ceff)');
        dropdown_status = 0;
      }
    });
  } else {}

  if ($(window).width() > 600 && !$(".login-card")[0]) {
    $('.navbar-hamburger-outer').css('cssText', 'padding-top: 0 !important;');
  }

  // if($(window).width()>600) {
  // } else {
  //   $('.innerlogoutright').css('cssText','padding-top: 1rem !important');
  //   $('i.logout-icon-right').css('cssText','height: auto !important');
  // }
});

$(window).on('resize', function () {

  var dropdown_status = 0;

  if ($(window).width() > 319 && $(window).width() < 768 && !$(".login-card")[0]) {
    $(".navbar-hamburger").click(function () {
      if (dropdown_status == 0) {
        $('.mobile-sidebar-nav').css('display', 'block');
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter', 'none');
        $(".fixed-details-right").css('border', 'none');
        dropdown_status = 1;
        $('.mobile-sidebar-nav .sidebar-item').click(function () {
          $('.mobile-sidebar-nav').hide();
          $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter', 'drop-shadow(0px 0px 20px #b3ceff)');
          dropdown_status = 0;
        });
      } else {
        $('.mobile-sidebar-nav').css('display', 'none');
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter', 'drop-shadow(0px 0px 20px #b3ceff)');
        dropdown_status = 0;
      }
    });
  }

  // if($(window).width()>600) {
  //   $('.innerlogoutright').css('cssText','padding-top: 0.15rem !important');
  // } else {
  //   $('.innerlogoutright').css('cssText','padding-top: 1rem !important');
  //   $('i.logout-icon-right').css('cssText','height: auto !important');
  // }
});

// Angular Module
angular.module('application').controller('ContactusController', ContactusController);

// Injections
ContactusController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'metaService', 'companyService', 'authService', 'recommendationService', 'redirectService', 'backofficeService'];

// Function
function ContactusController($rootScope, $scope, $stateParams, $state, $controller, metaService, companyService, authService, recommendationService, redirectService, backofficeService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));
  var start_hour = 8;
  var finish_hour = 17;
  var start_time = start_hour * 3600 - 7200;
  var finish_time = finish_hour * 3600 - 7200;

  $scope.is_past_working_hours = function () {
    var current_time = Math.floor(Date.now() / 1000) % (3600 * 24);
    if (current_time < start_time || current_time > finish_time) return true;
    return false;
  };
  if ($rootScope.user && $rootScope.user.force_url) {
    $scope.user.force_url = "pickindustry";
  }
}

// Angular Module
angular.module('application').controller('DashboardController', DashboardController);

// Injections
DashboardController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'authService', 'userService', 'FoundationApi', 'companyService', 'redirectService', 'backofficeService', '$window'];

// Function
function DashboardController($rootScope, $scope, $stateParams, $state, $controller, authService, userService, FoundationApi, companyService, redirectService, backofficeService, $window) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Signout */
  $scope.Signout = function () {
    authService.logout(function () {
      $rootScope.genService.showDefaultSuccessMsg('You have successfully logged out');
    }, function (error) {
      $rootScope.genService.showDefaultErrorMsg('Could not log you out');
    });
  };

  // Performing Requests to update models
}

// Angular Module
angular.module('application').controller('FooterController', FooterController);

// Injections
FooterController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'userService', 'backofficeService'];

// Controller
function FooterController($rootScope, $scope, $stateParams, $state, $controller, userService, backofficeService) {

  var _templateUrl = 'partials/en/footer.html';

  $scope.changeLang = function (lang) {
    $rootScope.langPreference = lang;
    /*crop the last tree chars of the state name*/
    var currentLangSuffix = $state.current.name.slice(-3);
    var currentUrlName = $state.current.name.slice(0, -3);
    var reRouteTo = $state.current.name;
    if (currentLangSuffix == '_de' || currentLangSuffix == '_en') {
      reRouteTo = currentUrlName + '_' + lang;
      if ($state.href(reRouteTo)) {
        saveLangPreferenceInDB(lang);
        $state.go(reRouteTo);
      }
    }
  };

  $scope.getTemplateUrl = function () {
    if ($rootScope.langPreference == 'de') {
      _templateUrl = 'partials/de/footer.html';
    } else {
      _templateUrl = 'partials/en/footer.html';
    }
    return _templateUrl;
  };

  function saveLangPreferenceInDB(lang) {
    if ($rootScope.currentUser && $rootScope.user) {
      var newUserData = {};
      angular.copy($rootScope.user, newUserData);
      newUserData.language_preference = lang;
      userService.updateUserInformation($rootScope.currentUser, $rootScope.user, newUserData);
    }
  }
}

// Angular Module
angular.module('application').controller('InstantController', InstantController);

// Injections
InstantController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

/* Variables */
var PAGE_SKIP = 1;
var START_INDEX = 0;
var RETRY_PAGE = 'retry';

/* Constructor */
function InstantController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {

  /* Scope Variables */
  $scope.show_prev = Number($stateParams.page) > START_INDEX;

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Log Error */
  function log_error(error) {
    backofficeService.logpost(error, 'user-unknown', 'instant', 'error', function (fn) {
      return fn;
    }, function (fn) {
      return fn;
    });
  }

  /* Child Loader */
  $scope.setChildLoader = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    $scope.child_loading = value;
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  /* Next Page */
  $scope.nextPage = function () {
    var next_page_number = Number($stateParams.page) + PAGE_SKIP;
    directToInstantPage($scope.data, $stateParams.process_id, next_page_number);
  };

  /* Previous Page */
  $scope.previousPage = function () {
    var prev_page_number = Number($stateParams.page) - PAGE_SKIP;
    directToInstantPage($scope.data, $stateParams.process_id, prev_page_number);
  };

  /* Get Parent Data */
  $scope.getParentData = function () {
    return $scope.data;
  };

  /* Direct To Instant Page */
  function directToInstantPage(data, process_id, page_number) {
    var stateparam_page = eval($stateParams.page);
    var next_page = data.instant_product_request;
    var forceredirect = page_number;
    $scope.retryObj = data;
    if (!data.instant_product_request) {
      $scope.page_type = RETRY_PAGE;
      return log_error();
    }
    if (next_page) {
      $scope.page_data = next_page;
      $scope.page_type = $scope.page_data.page_type;
      if ($scope.page_data.login_required) {
        $scope.isLoggedIn = Boolean(data.uid);
      }
      if (stateparam_page > eval(next_page.current_page)) {
        forceredirect = eval(next_page.current_page);
      }
      redirectService.changeStateWithLang('instant', {
        product_id: null,
        new: null,
        page: forceredirect,
        process_id: process_id
      });
    }
    return $scope.safeApply(function (fn) {
      return fn;
    });
  }

  /* Get Instant Process */
  function getInstantProcess(process_id, callback) {
    var page_number = $stateParams.page || 0;
    instantService.getInstantProcess(process_id, page_number, function (data) {
      $scope.data = data;
      callback($scope.data);
    }, function (error) {
      $scope.page_type = RETRY_PAGE;
      log_error(error);
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  }

  /* Post Instant Process */
  function postInstantProcess(callback) {
    instantService.postInstantProcess($stateParams.product_id, callback, function (error) {
      $rootScope.genService.showDefaultErrorMsg(error.status);
      $scope.page_type = RETRY_PAGE;
      log_error(error);
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  }

  /* New Instant Process */
  function newInstantProcess() {
    if ($stateParams.product_id) {
      postInstantProcess(function (data) {
        getInstantProcess(data.instant_product_request_id, function (process) {
          directToInstantPage(process, data.instant_product_request_id, START_INDEX);
        });
      });
    }
  }

  /* Existing Instant Process */
  function existingInstantProcess() {
    getInstantProcess($stateParams.process_id, function (process) {
      directToInstantPage(process, $stateParams.process_id, $stateParams.page || START_INDEX);
    });
  }

  /* Checking for Child or Parent */
  if ($stateParams.new === 'true' && $stateParams.product_id) {
    newInstantProcess();
  } else {
    existingInstantProcess();
  }
}

// Angular Module
angular.module('application').controller('MandateController', MandateController);

// Injections
MandateController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'companyService', '$window', 'mandateService', 'genService', 'documentService', 'redirectService', 'backofficeService'];

// Function
function MandateController($rootScope, $scope, $stateParams, $state, $controller, companyService, $window, mandateService, genService, documentService, redirectService, backofficeService) {
  angular.extend(this, $controller('DefaultController', {
    $scope: $scope,
    $stateParams: $stateParams,
    $state: $state
  }));

  var SCOPE_REFRESH_INTERVAL = 500;

  // Return if Not Company
  if (!$rootScope.company) {
    return;
  }

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Get My Mandate */
  $scope.getMyMandate = function () {
    if (!$rootScope.company.mandate) {
      return;
    }
    documentService.getAndStoreMandate($rootScope.company.mandate, function (result) {
      $scope.mandate = result.val();
      $scope.mandate_link = $scope.mandate.signed_document_url;
      $scope.safeApply(function (f) {
        return f;
      });
      if ($scope.mandate_link) {
        clearInterval($scope.refresher);
        redirectService.changeStateWithLang('mandatesigned');
        $rootScope.authenticating = false;
        $rootScope.loadMsg_en = null;
        $rootScope.loadMsg_de = null;
      }
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'mandate', 'error');
    });
  };

  /* Get My Address */
  $scope.GetMyAddresses = function () {
    $scope.addresses = [];
    $rootScope.local_load = true;
    for (var key in $rootScope.company.addresses) {
      if ($rootScope.company.addresses[key] !== true) {
        continue;
      }
      companyService.getAndStoreAddresses(key, function (result) {
        var address = result.val();
        if (address.main === true) {
          $scope.main_address = address;
          $scope.main_address_key = result.key;
        } else {
          $scope.addresses.push(address);
        }
        $rootScope.local_load = null;
        $scope.safeApply(function (fn) {
          return fn;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'mandate', 'error');
      });
    }
  };

  /* Done */
  $scope.Done = function () {
    $scope.sigExists = true;
    $rootScope.authenticating = true;
    $rootScope.loadMsg_en = 'Please wait while we process your mandate. This can take up to 15 seconds';
    $rootScope.loadMsg_de = 'Geben Sie uns ein paar Sekunden während wir Ihr Mandat verarbeiten';
    $state.reload();
    var blobToUpload = genService.dataURItoBlob($scope.dataurl);
    mandateService.signMandate(blobToUpload, $rootScope.company.mandate, $rootScope.currentUser, $rootScope.company_uid, function () {
      $rootScope.loadMsg_en = null;
      $rootScope.loadMsg_de = null;

      $scope.refresher = setInterval(function () {
        $scope.getMyMandate();
      }, SCOPE_REFRESH_INTERVAL);
    }, function (error) {
      $rootScope.authenticating = false;
      $rootScope.loadMsg_en = null;
      $rootScope.loadMsg_de = null;
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'mandate', 'error', function () {}, function () {});
    });
  };

  /* Download Mandate */
  $scope.DownloadMandate = function (file) {
    $rootScope.local_load = true;
    mandateService.downloadMandateWithFilename($rootScope.company_uid, $scope.mandate.signed_document_url, function (url_for_download) {
      $rootScope.local_load = null;
      $rootScope.genService.downloadWithLink(url_for_download);
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'mandate', 'error', function () {}, function () {});
    });
  };

  /* Call On Controller Load */
  $scope.sigExists = false;
  $scope.getMyMandate();
  $scope.GetMyAddresses();
  console.log('$rootScope', $rootScope.currentUser);
}

// Angular Module
angular.module('application').controller('OverviewController', OverviewController);

// Injections
OverviewController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'companyService', 'recommendationService', 'Upload', 'policyService', 'documentService', 'offerService', 'metaService', 'FoundationApi', 'redirectService', 'backofficeService', '$sce'];

// Function
function OverviewController($rootScope, $scope, $stateParams, $state, $controller, companyService, recommendationService, Upload, policyService, documentService, offerService, metaService, FoundationApi, redirectService, backofficeService, $sce) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Scope Variables */
  $scope.disableGetQuoteBtn = false;
  $scope.disableUploadBtn = false;
  $scope.files_to_upload = {};
  $scope.weighted_recommendedInsurance = {};
  $scope.weighted_recommendedInsurance.essential = [];
  $scope.weighted_recommendedInsurance.additional = [];
  var upper_quartile_score = 75;
  var middle_score = 50;
  var lower_quartile_score = 25;

  /* Insurance Card Icons */
  $scope.insurance_icons = {
    '-KbjclPv0LbnqBlC6tlv': 'public_liability.svg',
    '-Kbjy8O7cor_ocMejerh': 'public_liability.svg',
    '-Kbjy9R4dIDYb0zlwckc': 'interuption.svg',
    '-KbjyAMh5OoJO_WbxhVI': 'cyber.svg',
    '-KbjyWaNBfh7mkyJzplQ': 'd_o.svg',
    '-KbjybKLFl8sj0Sx5-sz': 'building.svg',
    '-Kbjz1OQ7D51UsZtedVG': 'contents.svg',
    '-Kbjz9_tHHQgQ0kn59_u': 'machine.svg',
    '-KbjzH0-OGml8Bv4GziN': 'product_liability.svg',
    '-KbjzTD4YzqsIahUO_uf': 'legal.svg',
    '-KbjzycPPJ0iZdbwI5jQ': 'transport.svg',
    '-Kbk-2hizMxWljDJA_ky': 'financial_liability.svg',
    '-Ke5TjQzVXs5hVW2oL9S': 'electronics.svg',
    '-Ke5Ttp3QBYWJZ87P7de': 'car.svg',
    '-Ke5Z1jJx8U6APka2E-a': 'contract.svg',
    '-Ke5ZnsQKtJ-JLoiKSYL': 'environmental.svg',
    '-Ke5dEzmLR0n0MpMXsb-': 'accident.svg',
    'other': 'shield.svg'
  };

  // Safety Check
  if (!$rootScope.company || !$rootScope.company.recommendations) {
    return;
  }

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Get Recommendations */
  $scope.GetRecommendations = function () {
    if (!$rootScope.company.recommendations) {
      return;
    }
    $rootScope.authenticating = true;
    recommendationService.getRecommendations(Object.keys($rootScope.company.recommendations)[0], function (recommendation) {
      $scope.num_outstanding = 0;
      $scope.recommendation = recommendation;
      $scope.interval && clearInterval($scope.interval);
      $rootScope.authenticating = null;
      setWeightsForRecommendedInsurance(recommendation);
      $scope.safeApply(function (e) {
        return e;
      });
    }, function (error) {
      console.error(error);
      $rootScope.authenticating = null;
      backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
    });
  };

  /* Set weights for recommended insurances */
  function setWeightsForRecommendedInsurance(recommendation) {
    if (!recommendation.recommended) {
      return;
    }

    $scope.demand = {};
    $scope.demand.essential = [];
    $scope.demand.additional = [];

    var recommended = recommendation.recommended;
    for (var key in recommended) {
      if (recommended[key].score >= upper_quartile_score) {
        $scope.demand.essential.push({ key: key, score: recommended[key].score, essential: true });
      }
    }

    for (var key in recommended) {
      if (recommended[key].score == middle_score) {
        $scope.demand.additional.push({ key: key, score: recommended[key].score });
      }
    }

    if ($scope.demand.additional.length + $scope.demand.essential.length <= 3) {
      for (var index in $scope.demand.additional) {
        var tmp_element = $scope.demand.additional[index];
        tmp_element.essential = true;
        $scope.demand.essential.push(tmp_element);
      }
      $scope.demand.additional = [];
    }

    for (var key in recommended) {
      if (recommended[key].score === lower_quartile_score) {
        $scope.demand.additional.push({ key: key, score: recommended[key].score });
      }
    }

    $scope.safeApply(function (fn) {
      return fn;
    });
  }

  /* Set Insurance Type */
  $scope.SelectInsuranceType = function (key) {
    $scope.SelectedInsurance = $scope.insurance_types[key];
    $scope.SelectedRecommendationKey = key;

    if ($rootScope.langPreference == 'de') {
      $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_de);
    } else {
      $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_en);
    }

    $scope.safeApply(function (f) {
      return f;
    });
  };

  /* Perform upload */
  $scope.PerformUpload = function (files) {
    if (Object.keys(files).length <= 0) {
      return;
    }
    $rootScope.local_load = true;
    $scope.disableUploadBtn = true;
    documentService.uploadPolicies(files, $rootScope.company_uid, function (file_urls) {
      documentService.createDocuments(file_urls, $rootScope.company_uid, function (newUpdateDocuments, document_list) {
        policyService.registerExistingPolicyFromRecommendation($rootScope.company_uid, $scope.SelectedRecommendationKey, Object.keys($rootScope.company.recommendations)[0], newUpdateDocuments, document_list, function (policy) {
          $scope.disableUploadBtn = false;
          $rootScope.local_load = null;
          $rootScope.genService.showDefaultSuccessMsg('File Uploaded');
          FoundationApi.publish('uploaded_success_modal', 'show');
          $scope.safeApply(function (f) {
            return f;
          });
        }, function (error) {
          $scope.disableUploadBtn = false;
          $rootScope.local_load = null;
          console.error(error);
          $rootScope.genService.showDefaultErrorMsg(error.code);
          backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
        });
      });
    }, function (error) {
      $scope.disableUploadBtn = false;
      $rootScope.local_load = null;
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
    });
  };

  /* Are All Essential Policies Gotten */
  $scope.HaveAllEssentialPolicies = function () {
    if (!$scope.demand || !$scope.demand.essential) {
      return;
    }

    for (var key in $scope.demand.essential) {
      if (!$scope.in_active_policies[$scope.demand.essential[key].key]) {
        return false;
      }
    }
    return true;
  };

  /* Are All Additional Policies Gotten */
  $scope.HaveAllAdditionalPolicies = function () {
    if (!$scope.demand || !$scope.demand.additional) {
      return;
    }

    for (var key in $scope.demand.additional) {
      if (!$scope.in_active_policies[$scope.demand.additional[key].key]) {
        return false;
      }
    }
    return true;
  };

  /* Get All Polies */
  $scope.GetMyPolicies = function () {
    $scope.not_disabled_policies = {};
    $scope.in_pending_policies = {};
    $scope.in_active_policies = {};
    $scope.num_active_policies = 0;
    $scope.num_pending_policies = 0;

    var pending_policies_subjects = {};
    var active_policies_subjects = {};
    for (var key in $rootScope.company.policies) {
      policyService.getAndStoreSinglePolicy(key, function (result) {
        var policy = result.val();
        if (policy.subject && policy.status === 'pending') {
          addPendingPolicies(policy);
          pending_policies_subjects[policy.subject] = true;
          $scope.num_pending_policies = Object.keys(pending_policies_subjects).length;
        }
        if (policy.subject && policy.status === 'active') {
          addActivePolicies(policy);
          active_policies_subjects[policy.subject] = true;
          $scope.num_active_policies = Object.keys(active_policies_subjects).length;
        }
        if (policy.status !== "deleted" && policy.status !== 'disabled') {
          addDisabledPlicies(policy, result.key);
        }
        $scope.safeApply(function (f) {
          return f;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
      });
    }
  };

  function addPendingPolicies(policy) {
    $scope.in_pending_policies[policy.subject] = true;
    if (policy.insurance_types) {
      for (var insuranceId in policy.insurance_types) {
        $scope.in_pending_policies[insuranceId] = true;
      }
    }
  }

  function addActivePolicies(policy) {
    $scope.in_active_policies[policy.subject] = true;
    if (policy.insurance_types) {
      for (var insuranceId in policy.insurance_types) {
        $scope.in_active_policies[insuranceId] = true;
      }
    }
  }

  function addDisabledPlicies(policy, key) {
    $scope.not_disabled_policies[policy.subject] = { 'key': key, 'policy': policy };
    if (policy.insurance_types) {
      for (var insuranceId in policy.insurance_types) {
        $scope.not_disabled_policies[insuranceId] = { 'key': key, 'policy': policy };
      }
    }
  }

  /* File Changed */
  $scope.FileChanged = function (file) {
    if (!file || Object.keys($scope.files_to_upload).length >= 5) {
      return;
    }
    $scope.files_to_upload[file.name] = file;
  };

  /* Remove From Uploads */
  $scope.RemoveFromUploads = function (key, files) {
    if (!$scope.files_to_upload[key]) {
      return;
    }
    delete $scope.files_to_upload[key];
    if (Object.keys($scope.files_to_upload).length === 0) {
      // Nothing Yet
    }
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  /* Get My Offers */
  $scope.GetMyOffers = function () {
    $scope.requested_offers = {};
    $scope.pushed_offers = {};
    $scope.accepted_offers = {};
    $scope.not_dismissed_offers = {};
    $scope.num_offers_collecting = 0;
    $scope.num_offers_pushed = 0;

    var offers_collecting_subject = {};
    var offers_pushed_subject = {};
    for (var key in $rootScope.company.offers) {
      offerService.getAndStoreSingleOffer(key, function (result) {
        if ($state.current.data.vars.name_no_lang !== 'overview') {
          return;
        }
        var offer = result.val();
        if (offer.status === 'accepted') {
          addAccepted_offers(offer, result.key);
        } else if (offer.status === 'requested') {
          addRequested_offers(offer, result.key);
          offers_collecting_subject[offer.subject] = true;
          $scope.num_offers_collecting = Object.keys(offers_collecting_subject).length;
        } else if (offer.status === 'pushed' && offer.comparisons) {
          addPushed_offers(offer, result.key);
          offers_pushed_subject[offer.subject] = true;
          $scope.num_offers_pushed = Object.keys(offers_pushed_subject).length;
        }
        // Inserting into not_dismissed
        if (offer.status !== 'dismissed' && offer.status !== 'deleted') {
          addNot_dismissed_offers(offer, key);
        }
        $scope.safeApply(function (f) {
          return f;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
      });
    }
  };

  function addAccepted_offers(offer, key) {
    $scope.accepted_offers[offer.subject] = { 'key': key, 'offer': offer };
    if (offer.comparisons) {
      for (var comparisonId in offer.comparisons) {
        var comparison = offer.comparisons[comparisonId];
        if (comparison.insurance_types) {
          for (var insuranceId in comparison.insurance_types) {
            $scope.accepted_offers[insuranceId] = { 'key': key, 'offer': offer };
          }
        }
      }
    }
  }

  function addRequested_offers(offer, key) {
    $scope.requested_offers[offer.subject] = { 'key': key, 'offer': offer };
    if (offer.comparisons) {
      for (var comparisonId in offer.comparisons) {
        var comparison = offer.comparisons[comparisonId];
        if (comparison.insurance_types) {
          for (var insuranceId in comparison.insurance_types) {
            $scope.requested_offers[insuranceId] = { 'key': key, 'offer': offer };
          }
        }
      }
    }
  }

  function addPushed_offers(offer, key) {
    $scope.pushed_offers[offer.subject] = { key: key, offer: offer };
    for (var comp_key in offer.comparisons) {
      for (var type_key in offer.comparisons[comp_key].insurance_types) {
        if (type_key !== offer.subject) {
          $scope.pushed_offers[type_key] = { key: key, offer: offer, additional: true };
          $scope.safeApply(function (fn) {
            return fn;
          });
        }
      }
    }
  }

  function addNot_dismissed_offers(offer, key) {
    $scope.not_dismissed_offers[offer.subject] = { 'key': key, 'offer': offer };
    if (offer.comparisons) {
      for (var comparisonId in offer.comparisons) {
        var comparison = offer.comparisons[comparisonId];
        if (comparison.insurance_types) {
          for (var insuranceId in comparison.insurance_types) {
            $scope.not_dismissed_offers[insuranceId] = { 'key': key, 'offer': offer };
          }
        }
      }
    }
  }

  /* Get Mandate */
  $scope.GetMyMandate = function () {
    if (!$rootScope.company.mandate) {
      return;
    }
    documentService.getAndStoreMandate($rootScope.company.mandate, function (result) {
      $scope.mandate = result.val();
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
    });
  };

  /* Get Insurance Types */
  $scope.GetInsuranceTypes = function () {
    metaService.getInsuranceTypes(function (types) {
      $scope.insurance_types = types;
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
    });
  };

  /* Get Quote */
  $scope.GetQuote = function (input_array) {
    var type_array = [];
    for (var index in input_array) {
      if ($scope.in_active_policies[input_array[index].key]) {
        continue;
      }
      type_array.push(input_array[index].key);
    }
    redirectService.changeStateWithLang('pickinsurance', { preselected: type_array });
  };

  function getSelectedRecommendation() {
    var SelectedInsurance = recommendationService.getModel().SelectedInsurance;
    var SelectedRecommendationKey = recommendationService.getModel().SelectedRecommendationKey;
    if ($scope.mandate && $scope.mandate.status === 'signed') {
      if (SelectedInsurance && SelectedRecommendationKey) {
        setTimeout(function () {
          if ($scope.insurance_types) {
            $scope.SelectInsuranceType(SelectedRecommendationKey);
            FoundationApi.publish('get_quote_modal', 'open');
            /* reset the model variables, so that the popup dosent open again */
            recommendationService.getModel().SelectedInsurance = undefined;
            recommendationService.getModel().SelectedRecommendationKey = undefined;
          }
        }, 500);
      }
    }
  }

  $scope.GetSubInsuranceType = function (item) {
    var sub_insurance_key = {};
    for (var offer_id in item.offer.comparisons) {
      var offer = item.offer.comparisons[offer_id];
      var comparison_insurance_type = offer.insurance_types;
      for (var insurance_key in comparison_insurance_type) {
        if (item.offer.subject !== insurance_key) {
          sub_insurance_key[insurance_key] = true;
        }
      }
    }
    if (Object.keys(sub_insurance_key).length === 0) {
      return false;
    }
    return sub_insurance_key;
  };

  /* Call On Controller Load */
  if (!$scope.recommendation || !$scope.recommendation.recommended) {
    $scope.GetRecommendations();
    $scope.interval = setInterval(function () {
      $scope.GetRecommendations();
    }, 500);
  }

  $scope.GetMyOffers();
  $scope.GetInsuranceTypes();
  $scope.GetMyPolicies();
  $scope.GetMyMandate();

  /* previously selected recommendation */
  getSelectedRecommendation();
}

// Angular Module
angular.module('application').controller('PickinsuranceController', PickinsuranceController);

// Injections
PickinsuranceController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'metaService', 'recommendationService', '$sce'];

// Function
function PickinsuranceController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, metaService, recommendationService, $sce) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Scope Variables */
  $scope.weighted_insurance_types = {};
  /* Insurance Card Icons */
  $scope.insurance_icons = {
    '-KbjclPv0LbnqBlC6tlv': 'public_liability.svg',
    '-Kbjy8O7cor_ocMejerh': 'public_liability.svg',
    '-Kbjy9R4dIDYb0zlwckc': 'interuption.svg',
    '-KbjyAMh5OoJO_WbxhVI': 'cyber.svg',
    '-KbjyWaNBfh7mkyJzplQ': 'd_o.svg',
    '-KbjybKLFl8sj0Sx5-sz': 'building.svg',
    '-Kbjz1OQ7D51UsZtedVG': 'contents.svg',
    '-Kbjz9_tHHQgQ0kn59_u': 'machine.svg',
    '-KbjzH0-OGml8Bv4GziN': 'product_liability.svg',
    '-KbjzTD4YzqsIahUO_uf': 'legal.svg',
    '-KbjzycPPJ0iZdbwI5jQ': 'transport.svg',
    '-Kbk-2hizMxWljDJA_ky': 'financial_liability.svg',
    '-Ke5TjQzVXs5hVW2oL9S': 'electronics.svg',
    '-Ke5Ttp3QBYWJZ87P7de': 'car.svg',
    '-Ke5Z1jJx8U6APka2E-a': 'contract.svg',
    '-Ke5ZnsQKtJ-JLoiKSYL': 'environmental.svg',
    '-Ke5dEzmLR0n0MpMXsb-': 'accident.svg',
    'other': 'shield.svg'
  };

  /* Local variables */
  var weighted_recommendedInsurance = {};

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Get Recommendations */
  function GetRecommendations() {
    if (!$rootScope.company || !$rootScope.company.recommendations) {
      return;
    };
    var index_of_recommended = 0;
    recommendationService.getRecommendations(Object.keys($rootScope.company.recommendations)[index_of_recommended], function (recommendation) {
      $scope.recommendation = recommendation.recommended;
      setWeightsForRecommendedInsurance();
      getAllInsuranceTypes();
    }, function (error) {
      console.error(error);
      $rootScope.authenticating = null;
      backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
    });
  }

  /* set weights for recommended insurances */
  function setWeightsForRecommendedInsurance() {
    var _weighted_recommended, _weighted_recommended2, _weighted_recommended3, _weighted_recommended4;

    weighted_recommendedInsurance.essential = [];
    weighted_recommendedInsurance.additional = [];
    var seventyfiveAboveScores = [],
        fiftyScores = [],
        twentyFiveScores = [],
        fiftyScoreslength = 0,
        seventyfiveAboveScoresLength = 0;
    for (var index in $scope.recommendation) {
      var score = $scope.recommendation[index].score;
      switch (score) {
        case 100:
        case 75:
          seventyfiveAboveScores.push(index);
          break;
        case 50:
          fiftyScores.push(index);
          break;
        case 25:
          twentyFiveScores.push(index);
          break;
        default:
          break;
      }
    }
    (_weighted_recommended = weighted_recommendedInsurance.essential).push.apply(_weighted_recommended, seventyfiveAboveScores);
    (_weighted_recommended2 = weighted_recommendedInsurance.additional).push.apply(_weighted_recommended2, twentyFiveScores);

    fiftyScoreslength = fiftyScores.length;
    seventyfiveAboveScoresLength = seventyfiveAboveScores.length;

    if (seventyfiveAboveScoresLength + fiftyScoreslength <= 3) (_weighted_recommended3 = weighted_recommendedInsurance.essential).push.apply(_weighted_recommended3, fiftyScores);else (_weighted_recommended4 = weighted_recommendedInsurance.additional).push.apply(_weighted_recommended4, fiftyScores);
  }

  /* Get Insurance Types */
  function getAllInsuranceTypes() {
    metaService.getEnabledInsuranceTypes(function (types) {
      $scope.insurance_types = types;
      $scope.weighted_insurance_types.essential = [];
      $scope.weighted_insurance_types.additional = [];
      $scope.weighted_insurance_types.others = [];
      for (var key in types) {
        if (weighted_recommendedInsurance.essential.indexOf(key) !== -1) $scope.weighted_insurance_types.essential.push({ key: key, type: types[key] });else if (weighted_recommendedInsurance.additional.indexOf(key) !== -1) $scope.weighted_insurance_types.additional.push({ key: key, type: types[key] });else $scope.weighted_insurance_types.others.push({ key: key, type: types[key] });
      }
      mapPreselectedInsuranceTypes();
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'overview', 'error', function () {}, function () {});
    });
  }

  /* Map Preselected Insurance Types */
  function mapPreselectedInsuranceTypes() {
    var preselected = void 0;

    if (typeof $stateParams.preselected === 'string') {
      preselected = new Set();
      preselected.add($stateParams.preselected);
    } else {
      preselected = new Set($stateParams.preselected);
    }
    for (var index in $scope.insurance_types) {
      if (preselected.has(index)) {
        $scope.insurance_types[index].selected = true;
      } else {
        $scope.insurance_types[index].selected = false;
      }
    }
  }

  /* Set Insurance Type */
  $scope.SelectInsuranceType = function (key) {
    $scope.SelectedInsurance = $scope.insurance_types[key];
    $scope.SelectedRecommendationKey = key;

    if ($rootScope.langPreference == 'de') {
      $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_de);
    } else {
      $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_en);
    }
  };

  $scope.cancelProcess = function () {
    var resetInsurance = setInterval(function () {
      window.location.reload();
      clearInterval(resetInsurance);
    }, 10);
    redirectService.changeStateWithLang('overview');
  };

  $scope.getQsForSelectedInsurances = function () {
    var selectedInsurances = [];
    for (var key in $scope.insurance_types) {
      if ($scope.insurance_types[key].selected) selectedInsurances.push(key);
    }
    if (selectedInsurances.length > 0) {
      redirectService.changeStateWithLang('process', { 'selectedInsurances': selectedInsurances, 'view': 'generalQuestions' });
    } else {
      $scope.showInsuranceTypeError = true;
    }
  };

  /* Initialize the Controller */
  GetRecommendations();
}

// Angular Module
angular.module('application').controller('ProcessController', ProcessController);

// Injections
ProcessController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'companyService', 'recommendationService', 'Upload', 'policyService', 'documentService', 'offerService', 'metaService', 'FoundationApi', 'redirectService', 'backofficeService', 'insurancequestionsService', '$anchorScroll', '$window'];

// Function
function ProcessController($rootScope, $scope, $stateParams, $state, $controller, companyService, recommendationService, Upload, policyService, documentService, offerService, metaService, FoundationApi, redirectService, backofficeService, insurancequestionsService, $anchorScroll, $window) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Scope Variables */
  $scope.disableGetQuoteBtn = false;
  $scope.disableUploadBtn = false;
  $scope.files_to_upload = {};

  $scope.generalInsuranceQuestions = [];
  $scope.specificInsuranceQuestions = [];
  $scope.confirmatoryInsuranceQuestions = [];
  $scope.insuranceTypesGroups = {};
  $scope.weighted_insurance_types = {};

  $scope.dates = {};
  $scope.dates.year = {};
  $scope.dates.month = {};
  $scope.dates.day = {};

  $scope.currentInsuranceTypesGroups_tracker = 0;

  $scope.productPretriggerQs = [];
  $scope.productTypesGroups = {};
  $scope.producQuestionsByInsuranceId = {};
  $scope.selectedInsurancesKeys = [];
  $scope.showspecificQuestionsErrorMessage = false;
  $scope.showGeneralQuestionsErrorMessage = false;
  $scope.showconfirmatoryQuestionsErrorMessage = false;

  /* Local variables */
  var allInsuranceQuestions = [];
  var selectedInsuranceQuestions = [];
  var selectedInsuranceTypes = [];
  var allInsuranceQuestionMappings = [];
  var selectedMappingObjs = [];
  var weighted_recommendedInsurance = {};

  var selectedInsurancesKeys = [];
  var selectedInsurancesObjs = [];

  var currentInsurance;

  /* Insurance Card Icons */
  $scope.insurance_icons = {
    '-KbjclPv0LbnqBlC6tlv': 'public_liability.svg',
    '-Kbjy8O7cor_ocMejerh': 'public_liability.svg',
    '-Kbjy9R4dIDYb0zlwckc': 'interuption.svg',
    '-KbjyAMh5OoJO_WbxhVI': 'cyber.svg',
    '-KbjyWaNBfh7mkyJzplQ': 'd_o.svg',
    '-KbjybKLFl8sj0Sx5-sz': 'building.svg',
    '-Kbjz1OQ7D51UsZtedVG': 'contents.svg',
    '-Kbjz9_tHHQgQ0kn59_u': 'machine.svg',
    '-KbjzH0-OGml8Bv4GziN': 'product_liability.svg',
    '-KbjzTD4YzqsIahUO_uf': 'legal.svg',
    '-KbjzycPPJ0iZdbwI5jQ': 'transport.svg',
    '-Kbk-2hizMxWljDJA_ky': 'financial_liability.svg',
    '-Ke5TjQzVXs5hVW2oL9S': 'electronics.svg',
    '-Ke5Ttp3QBYWJZ87P7de': 'car.svg',
    '-Ke5Z1jJx8U6APka2E-a': 'contract.svg',
    '-Ke5ZnsQKtJ-JLoiKSYL': 'environmental.svg',
    '-Ke5dEzmLR0n0MpMXsb-': 'accident.svg',
    'other': 'shield.svg'
  };

  /*Safety Check*/
  if (!$rootScope.company || !$rootScope.company.recommendations) {
    return;
  }

  /*****scope functions****/
  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /*handel change in views */
  $scope.changeViewTo = function (stateParam) {
    insurancequestionsService.setPreviousViewState($scope.currentView);
    redirectService.changeStateWithLang('process', stateParam);
  };

  $scope.gotoPickInsurance = function () {
    redirectService.changeStateWithLang('pickinsurance', { preselected: selectedInsurancesKeys });
  };

  /*function to update all insurance questions, based on the insrance types selected*/
  function getQsForSelectedInsurances(selectedInsuranceskeys, callback, err_call) {
    insurancequestionsService.getQsForSelectedInsurances(selectedInsuranceskeys, callback, err_call);
  }

  $scope.dateChange = function (questionObj) {
    var unixSecondsTime, previousSelectedYear, previousSelectedMonth, previousSelectedDate;
    if (questionObj.answer) {
      unixSecondsTime = new Date(questionObj.answer * 1000);
      previousSelectedYear = unixSecondsTime.getFullYear();
      previousSelectedMonth = unixSecondsTime.getMonth() + 1; // bcos js months are 0 indexed.
      previousSelectedDate = unixSecondsTime.getDate();
    }

    var uid = questionObj.key;
    var getMonth = $scope.dates.month[uid] ? $scope.dates.month[uid] : previousSelectedMonth;
    var getDay = $scope.dates.day[uid] ? $scope.dates.day[uid] : previousSelectedDate;
    var getYear = $scope.dates.year[uid] ? $scope.dates.year[uid] : previousSelectedYear;

    if (!isNaN(getMonth) && !isNaN(getDay) && !isNaN(getYear)) {
      var fullDate = getYear + '-' + getMonth + '-' + getDay;
      fullDate = fullDate.replace(/-/g, '/');
      var dateObject = new Date(fullDate);
      var unixDate = dateObject.getTime() / 1000;

      questionObj.answer = unixDate;
    }
  };

  $scope.getSubQuestions = function (mainQuestion) {
    var triggerMarchingSubQs = [];
    if (mainQuestion.subQuestions) triggerMarchingSubQs = mainQuestion.subQuestions.filter(function (subQ) {
      var _return = false;
      switch (subQ.trigger.condition) {
        case '>':
          if (mainQuestion.answer > subQ.trigger.on) _return = true;
          break;
        case '<':
          if (mainQuestion.answer < subQ.trigger.on) _return = true;
          break;
        case '<=':
          if (mainQuestion.answer <= subQ.trigger.on) _return = true;
          break;
        case '>=':
          if (mainQuestion.answer >= subQ.trigger.on) _return = true;
          break;
        case '!=':
          if (mainQuestion.answer != subQ.trigger.on) _return = true;
          break;
        case '==':
          if (mainQuestion.answer == subQ.trigger.on) _return = true;
          break;
      }
      return _return;
    });
    mainQuestion.triggerMarchingSubQs = triggerMarchingSubQs;
    return triggerMarchingSubQs;
    $scope.safeApply(function (e) {
      return e;
    });
  };

  $scope.getTriggerMarchingSubQs = function (mainQuestion) {
    return $scope.getSubQuestions(mainQuestion);
  };

  /*saves general questions with there answers*/
  $scope.saveGeneralQsAndAs = function (form) {
    if (!form.$valid) {
      $scope.showGeneralQuestionsErrorMessage = true;
      return;
    }
    saveQAndAs($scope.generalInsuranceQuestions, function () {
      $scope.changeViewTo({ view: 'specificQuestions', currentInsuranceTypesGroups_tracker: 0, previousBtnClick: false });
    }, function (error) {
      console.log("error while saving the general questions", error);
    });
  };

  $scope.saveProductQsAndAs = function (form) {
    if (!form.$valid) {
      return;
    }
    var productQs = [];
    for (var productType in $scope.productTypesGroups) {
      productQs = productQs.concat($scope.productTypesGroups[productType]);
    }
    saveQAndAs(productQs, function () {
      $scope.changeViewTo({ view: 'specificQuestions' });
    });
  };

  /*saves confirmatory question with there answers*/
  $scope.saveConfirmatoryQsAndAs = function (form) {
    if (!form.$valid) {
      $scope.showconfirmatoryQuestionsErrorMessage = true;
      return;
    }
    saveQAndAs($scope.confirmatoryInsuranceQuestions, function () {
      $scope.changeViewTo({ view: 'checkOut' });
    });
  };

  /*display the previous insurance type specificQuestions*/
  $scope.getPreviousInsuranceGroupSpecificQuestions = function () {

    if ($scope.showspecificQuestions) {
      $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: true });
    } else {

      $scope.currentInsuranceTypesGroups_tracker--;
      if ($scope.currentInsuranceTypesGroups_tracker < 0) {
        $scope.changeViewTo({ 'view': 'generalQuestions', 'currentInsuranceTypesGroups_tracker': 0 });
      } else {
        /* check if the user was eligible for a product in the previous page */
        var insuranceKey = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
        var isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[insuranceKey]);

        if (isshowSpecificQuestions) {
          $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: true, previousBtnClick: true });
        } else {
          $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: true });
        }
      }
    }
  };

  /* when previous button on confirmatory questions is clicked*/
  $scope.confirmQuestions_previousBtnClick = function () {
    /* check if the user was eligible for a product in the previous page */
    var insuranceKey = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
    var isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[insuranceKey]);

    if (isshowSpecificQuestions) {
      $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: true, previousBtnClick: true });
    } else {
      $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: true });
    }
  };

  $scope.goBack = function () {
    $window.history.back();
  };

  /*dispaly the next insurance type specificQuestions*/
  $scope.getNextInsuranceGroupSpecificQuestions = function (form) {
    if (!form.$valid) {
      $scope.showspecificQuestionsErrorMessage = true;
      return;
    }
    if (!$scope.showspecificQuestions) {
      saveQAndAs($scope.producQuestionsByInsuranceId[currentInsurance], function () {
        /* if the specific questions are disabled then check for the knockout for the product answers */
        var isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[currentInsurance]);
        /* if user is not elegiable for any products for the given insurane type then show the specific questions */
        if (isshowSpecificQuestions) {
          if (isSpecificQsEmpty(currentInsurance)) {
            $scope.currentInsuranceTypesGroups_tracker++;
            $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: false });
          } else {
            $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: true, previousBtnClick: false });
          }
        } else {
          $scope.currentInsuranceTypesGroups_tracker++;
          $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: false });
        }
      });
    } else {
      saveQAndAs($scope.insuranceTypesGroups[currentInsurance], function () {
        $scope.currentInsuranceTypesGroups_tracker++;
        $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: false });
      });
    }
  };

  /* Finalize Checkout */
  $scope.FinalizeCheckout = function () {
    selectedInsurancesKeys;
    offerService.requestMultipleOffers($scope.InsuranceTypesAndProductsDict, $rootScope.company_uid, function (f) {
      return f;
    }, function (err) {
      console.log("error while uploading offers", error);
      $rootScope.genService.showDefaultErrorMsg({ code: 'OFFER_ERROR_1' });
      backofficeService.logpost(error, $rootScope.currentUser, 'process', 'error', function () {}, function () {});
      console.log("error while uploading offers", error);
    });
  };

  /*****local functions******/

  function saveQAndAs(_insuranceQuestions, callback, err_call) {
    companyService.updateInsuraceAnswer($rootScope.company_uid, _insuranceQuestions, callback, err_call);
  }

  $scope.cancelProcess = function () {
    var resetInsurance = setInterval(function () {
      window.location.reload();
      clearInterval(resetInsurance);
    }, 10);
    redirectService.changeStateWithLang('overview');
  };

  $scope.specificQuestionsHeadings = function (getInsuranceType) {
    /* show default messages when displaying the product questions. or for specific questions displayed bcos the product questions were empty */
    if (!$scope.showspecificQuestions || isProductQsEmpty(currentInsurance)) {

      if ($scope.currentInsuranceTypesGroups_tracker == 0 && $scope.currentInsuranceTypesGroups_tracker != selectedInsurancesKeys.length - 1 && $scope.currentInsuranceTypesGroups_tracker != selectedInsurancesKeys.length - 2) {
        if ($rootScope.langPreference == 'de') {
          return "Juhu. Jetzt geht's erst richtig los. Wir starten mit den Fragen für die " + $scope.insurance_types[getInsuranceType].name_de + '.';
        } else {
          return "Great! Let's get started with the " + $scope.insurance_types[getInsuranceType].name_en + " questions.";
        }
      }

      if ($scope.currentInsuranceTypesGroups_tracker == selectedInsurancesKeys.length - 2) {
        if ($rootScope.langPreference == 'de') {
          return "Geschafft! Machen wir weiter mit der " + $scope.insurance_types[getInsuranceType].name_de + '.';
        } else {
          return "Done! Let's continue with the questions for the " + $scope.insurance_types[getInsuranceType].name_en + '.';
        }
      }

      if ($scope.currentInsuranceTypesGroups_tracker == selectedInsurancesKeys.length - 1) {
        if ($rootScope.langPreference == 'de') {
          return "Durchhalten! Es geht weiter mit der " + $scope.insurance_types[getInsuranceType].name_de + '.';
        } else {
          return "Almost complete! Let's finish with the questions for " + $scope.insurance_types[getInsuranceType].name_en + '.';
        }
      }

      if ($rootScope.langPreference == 'de') {
        return "Wir probieren übrigens alles, um Versicherer davon zu überzeugen die Fragebögen zu kürzen! Nun aber erstmal die " + $scope.insurance_types[getInsuranceType].name_de + '.';
      } else if ($rootScope.langPreference == 'en') {
        return "Let's get on with the questions for the " + $scope.insurance_types[getInsuranceType].name_en + '.';
      }
    }

    /* else it means the product questions are non empty and ur on specific questions (ur are knockedout) */
    else {
        if ($rootScope.langPreference == 'de') {
          return "Leider brauchen wir in Ihrem Fall einige weitere Informationen zur " + $scope.insurance_types[getInsuranceType].name_de + '.';
        } else {
          return "Unfortunately, in your case, we need some more information for the " + $scope.insurance_types[getInsuranceType].name_en + ".";
        }
      }
  };

  $scope.unixSecondsToDate = function (unixValue) {
    var unixSecondsTime = new Date(unixValue * 1000);
    var year = unixSecondsTime.getFullYear();
    var month = unixSecondsTime.getMonth();
    var date = unixSecondsTime.getDate();

    if ($rootScope.langPreference == 'en') {
      switch (month) {
        case 0:
          month = 'January';
          break;
        case 1:
          month = 'February';
          break;
        case 2:
          month = 'March';
          break;
        case 3:
          month = 'April';
          break;
        case 4:
          month = 'May';
          break;
        case 5:
          month = 'June';
          break;
        case 6:
          month = 'July';
          break;
        case 7:
          month = 'August';
          break;
        case 8:
          month = 'September';
          break;
        case 9:
          month = 'October';
          break;
        case 10:
          month = 'November';
          break;
        case 11:
          month = 'December';
          break;
      }
    } else if ($rootScope.langPreference == 'de') {
      switch (month) {
        case 0:
          month = 'Januar';
          break;
        case 1:
          month = 'Februar';
          break;
        case 2:
          month = 'Marz';
          break;
        case 3:
          month = 'April';
          break;
        case 4:
          month = 'Mai';
          break;
        case 5:
          month = 'Juni';
          break;
        case 6:
          month = 'Juli';
          break;
        case 7:
          month = 'August';
          break;
        case 8:
          month = 'September';
          break;
        case 9:
          month = 'Oktober';
          break;
        case 10:
          month = 'November';
          break;
        case 11:
          month = 'Dezember';
          break;
      }
    }

    if (unixValue > 0) {
      $scope.unixToDate = {};
      $scope.unixToDate.year = year;
      $scope.unixToDate.month = month;
      $scope.unixToDate.date = date;

      return $scope.unixToDate;
    }
  };

  $scope.getProductsForInsuranceType = function (insuranceType) {
    return $scope.producQuestionsByInsuranceId[insuranceType];
  };

  function addSelectedInsuranceToSpecificQsAndProductQs() {
    var specificQskeys = Object.keys($scope.insuranceTypesGroups);
    var productQsKeys = Object.keys($scope.producQuestionsByInsuranceId);

    if (specificQskeys.length < selectedInsurancesKeys.length) {
      selectedInsurancesKeys.forEach(function (selectInsurType) {
        var isSpecificQsPresent = specificQskeys.find(function (_specificQskey) {
          return _specificQskey == selectInsurType;
        });
        if (!isSpecificQsPresent) {
          $scope.insuranceTypesGroups[selectInsurType] = [];
        }
      });
    }
    if (productQsKeys.length < selectedInsurancesKeys.length) {
      selectedInsurancesKeys.forEach(function (selectInsurType) {
        var isProductQsPresent = productQsKeys.find(function (_productQsKey) {
          return _productQsKey == selectInsurType;
        });
        if (!isProductQsPresent) {
          $scope.producQuestionsByInsuranceId[selectInsurType] = [];
        }
      });
    }
  }

  /* return true of false based on if there are any specific or product questions */
  function isSpecificAndProductionQsEmpty(selectedInsurance) {
    if ($scope.insuranceTypesGroups[selectedInsurance].length == 0 && $scope.producQuestionsByInsuranceId[selectedInsurance].length == 0) return true;else return false;
  }

  function isSpecificQsEmpty(selectedInsurance) {
    if ($scope.insuranceTypesGroups[selectedInsurance].length == 0) {
      return true;
    } else {
      return false;
    }
  }
  function isProductQsEmpty(selectedInsurance) {
    if ($scope.producQuestionsByInsuranceId[selectedInsurance].length == 0) {
      return true;
    } else {
      return false;
    }
  }

  /* get questions for the current view, from the model stored in the service. and redirect to different view if needed */
  function getQuestionsForCurrentViewAndCheckForRedirect(currentView) {
    metaService.getInsuranceTypes(function (types) {
      return $scope.insurance_types = types;
    });
    insurancequestionsService.getProductPretriggerQs(function (productPretriggerQs) {
      $scope.productPretriggerQs = productPretriggerQs;
    });
    var previousViewState = insurancequestionsService.getPreviousViewState();
    switch (currentView) {
      case 'generalQuestions':
        insurancequestionsService.getGeneralQuestions(function (generalInsuranceQuestions) {
          $scope.generalInsuranceQuestions = generalInsuranceQuestions;
        });
        break;
      case 'specificQuestions':
        insurancequestionsService.getSpecificQuestions(function (specificQuestionsObj) {
          $scope.insuranceTypesGroups = specificQuestionsObj.insuranceTypesGroups;
          $scope.producQuestionsByInsuranceId = specificQuestionsObj.producQuestionsByInsuranceId;
          $scope.currentInsuranceTypesGroups_tracker = Number($stateParams.currentInsuranceTypesGroups_tracker);
          $scope.previousBtnClick = $stateParams.previousBtnClick == 'true';
          $scope.showspecificQuestions = $stateParams.showspecificQuestions == 'true';
          currentInsurance = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
          addSelectedInsuranceToSpecificQsAndProductQs();
          if ($scope.currentInsuranceTypesGroups_tracker >= selectedInsurancesKeys.length) {
            $scope.currentInsuranceTypesGroups_tracker = selectedInsurancesKeys.length - 1;
            $scope.changeViewTo({ 'view': 'confirmatoryQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker });
            return;
          } else if ($scope.currentInsuranceTypesGroups_tracker < 0) {
            $scope.changeViewTo({ 'view': 'generalQuestions', 'currentInsuranceTypesGroups_tracker': 0 });
            return;
          }
          /* get the direction from which*/
          if ($scope.previousBtnClick) {
            if ($scope.showspecificQuestions) {
              if (isSpecificQsEmpty(currentInsurance)) {
                $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: true });
              }
            } else if (isProductQsEmpty(currentInsurance)) {
              $scope.currentInsuranceTypesGroups_tracker--;
              if ($scope.currentInsuranceTypesGroups_tracker < 0) {
                $scope.changeViewTo({ 'view': 'generalQuestions', 'currentInsuranceTypesGroups_tracker': 0 });
                return;
              }
              /* check if the user is eligible for a product in the previous page */
              var insuranceKey = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
              var isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[insuranceKey]);

              if (isshowSpecificQuestions) {
                $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: true, previousBtnClick: true });
              } else {
                $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: true });
              }
            }
          } else {
            if (!$scope.showspecificQuestions) {
              if (isProductQsEmpty(currentInsurance)) {
                $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: true, previousBtnClick: false });
              }
            } else if (isSpecificQsEmpty(currentInsurance)) {
              $scope.currentInsuranceTypesGroups_tracker++;
              $scope.changeViewTo({ 'view': 'specificQuestions', 'currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker, showspecificQuestions: false, previousBtnClick: false });
            }
          }
        });

        break;
      case 'confirmatoryQuestions':
        insurancequestionsService.getSpecificQuestions(function (specificQuestionsObj) {
          $scope.insuranceTypesGroups = specificQuestionsObj.insuranceTypesGroups;
          $scope.producQuestionsByInsuranceId = specificQuestionsObj.producQuestionsByInsuranceId;
          $scope.currentInsuranceTypesGroups_tracker = Number($stateParams.currentInsuranceTypesGroups_tracker);
          $scope.previousBtnClick = $stateParams.previousBtnClick == 'true';
          $scope.showspecificQuestions = $stateParams.showspecificQuestions == 'true';
          currentInsurance = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
          addSelectedInsuranceToSpecificQsAndProductQs();
        });
        insurancequestionsService.getConfirmatoryQuestions(function (confirmatoryInsuranceQuestions) {
          $scope.confirmatoryInsuranceQuestions = confirmatoryInsuranceQuestions;
        });
        break;
      case 'checkOut':
        insurancequestionsService.getSpecificQuestions(function (specificQuestionsObj) {
          var producQuestionsByInsuranceId = specificQuestionsObj.producQuestionsByInsuranceId;
          insurancequestionsService.getProductsPassingKnockoutTriggers(producQuestionsByInsuranceId, function (eligibleproducts) {
            insurancequestionsService.getInsuranceTypesAndProductsDict(eligibleproducts, selectedInsurancesKeys, function (InsuranceTypesAndProductsDict) {
              $scope.InsuranceTypesAndProductsDict = InsuranceTypesAndProductsDict;
            });
          });
        });

        break;
    }
    $scope.safeApply(function (e) {
      return e;
    });
  }

  /* get the state params, parse em and set the ui accordingly */
  function parseStateParams() {
    $scope.currentView = $stateParams.view;
    if ($stateParams.selectedInsurances) {
      /* only one insurance is selected add it to an array */
      if (typeof $stateParams.selectedInsurances === 'string') {
        selectedInsurancesKeys.push($stateParams.selectedInsurances);
      } else {
        selectedInsurancesKeys = $stateParams.selectedInsurances;
      }
      $scope.selectedInsurancesKeys = selectedInsurancesKeys;
      getQsForSelectedInsurances(selectedInsurancesKeys, function () {
        return getQuestionsForCurrentViewAndCheckForRedirect($scope.currentView);
      }, function (error) {
        return console.log("error while getting insurance question", error);
      });
    }
  }

  /* Initialize the Controller */
  parseStateParams();
}

// Angular Module
angular.module('application').controller('AccountController', AccountController);

// Injections
AccountController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'companyService', 'userService', 'metaService', 'FoundationApi', 'authService', 'redirectService', 'mandateService', 'documentService', 'backofficeService', 'fileService'];

// Function
function AccountController($rootScope, $scope, $stateParams, $state, $controller, companyService, userService, metaService, FoundationApi, authService, redirectService, mandateService, documentService, backofficeService, fileService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  var industry_levels = [];
  var industry_codes;
  $scope.show_me = true;
  $scope.show_other = false;
  $scope.is_active = [];
  $scope.is_active['company'] = true;

  if (!$rootScope.company) {
    return;
  }

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Get My Address */
  $scope.GetMyAddresses = function () {
    $scope.addresses = [];
    $rootScope.local_load = true;
    for (var key in $rootScope.company.addresses) {
      if ($rootScope.company.addresses[key] !== true) {
        continue;
      }
      companyService.getAndStoreAddresses(key, function (result) {
        var address = result.val();
        if (address.main === true) {
          $scope.main_address = address;
          $scope.main_address_key = result.key;
        } else {
          $scope.addresses.push(address);
        }
        $rootScope.local_load = null;
        $scope.safeApply(function (fn) {
          return fn;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'account', 'error', function () {}, function () {});
      });
    }
  };

  /* Get My Industries */
  $scope.GetMyIndustries = function () {
    $scope.industry_codes = [];
    getIndustryCodesWithCategory();
    metaService.getIndustryCodes(function (codes) {
      industry_codes = [];
      for (var key in codes) {
        industry_codes.push(codes[key]);
      }
      for (var i = 0; i < industry_levels.length; i++) {
        $scope.industry_codes[i] = [];
        for (var j = 0; j < industry_levels[i].length; j++) {
          var code = industry_levels[i][j];
          var industryCode = industry_codes.find(function (industry) {
            return industry.code == code;
          });
          $scope.industry_codes[i].push(industryCode);
          $scope.safeApply(function (fn) {
            return fn;
          });
        }
      }
    }, function (error) {
      console.error(error);
    });
  };

  function getIndustryCodesWithCategory() {
    if (!$rootScope.company) {
      return;
    }
    for (var i in $rootScope.company.industry_codes) {
      var code = $rootScope.company.industry_codes[i];
      industry_levels[i] = [];
      var split = code.split('.');
      var next = "";
      for (var number in split) {
        next += next === "" ? split[number] : '.' + split[number];
        industry_levels[Number(i)][Number(number)] = next;
      }
    }
  }

  /* Get My Activities */
  $scope.GetMyActivities = function () {
    $scope.activities = [];
    $scope.activity_in_group = {};
    for (var key in $rootScope.company.activities) {
      companyService.getAndStoreMyActivities($rootScope.company.activities[key], function (activity) {
        if (!activity.val()) {
          return;
        }
        var activity = activity.val();
        $scope.activities.push(activity);
        $scope.activity_in_group[activity.group] = true;
        $scope.safeApply(function (fn) {
          return fn;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'account', 'error', function () {}, function () {});
      });
    }
  };

  /* Get Groups */
  $scope.GetGroups = function () {
    metaService.getGroups(function (groups) {
      $scope.groups = {};
      for (var key in groups) {
        if (groups[key].disabled) {
          continue;
        }
        $scope.groups[groups[key].group] = groups[key];
      }
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'account', 'error', function () {}, function () {});
    });
  };

  /*Get User account*/
  $scope.GetUserAccount = function () {
    $scope.user_account = {};
    angular.copy($rootScope.user, $scope.user_account);
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  /* Save Company */
  $scope.SaveCompany = function (form) {
    if (!form.$valid) {
      return;
    }
    companyService.updateCompanyInformation($rootScope.company_uid, { name: $rootScope.company.name, phone: $rootScope.company.phone, url: $rootScope.company.url }, function () {
      $rootScope.genService.showDefaultSuccessMsg('Saved');
      $state.reload();
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'account (save company)', 'error', function () {}, function () {});
    });
  };

  /* Save Address */
  $scope.SaveAddress = function (form) {
    if (!form.$valid) {
      return;
    }
    companyService.updateAddress($scope.main_address_key, { street: $scope.main_address.street, zip: $scope.main_address.zip, city: $scope.main_address.city, country: $scope.main_address.country }, function () {
      $rootScope.genService.showDefaultSuccessMsg('Saved');
      $state.reload();
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'account', 'error', function () {}, function () {});
    });
  };

  $scope.SaveUserData = function (form) {
    if (!form.$valid) {
      return;
    }
    userService.updateUserInformation($rootScope.currentUser, $rootScope.user, $scope.user_account, function () {
      $rootScope.genService.showDefaultSuccessMsg('Saved');
      $state.reload();
    }, function () {
      FoundationApi.publish('reauth_modal', 'show');
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'account', 'error', function () {}, function () {});
    });
  };

  $scope.Reauthenticate = function (passwd) {
    authService.login({ email: $rootScope.user.email, password: passwd }, function () {
      $rootScope.genService.showDefaultSuccessMsg("Successfully confirmed password");
      $scope.SaveUserData();
    }, function () {
      /* on error callback*/
      $rootScope.genService.showDefaultErrorMsg("Authentication failed");
      $state.reload();
    });
  };

  /* Download Mandate */
  $scope.DownloadMandate = function () {
    var url_for_download = 'mandates/' + $rootScope.company_uid + '/' + $scope.mandate.signed_document_url;
    var rename_to = ($rootScope.langPreference === 'en' ? 'Liimex ' + $scope.user_account.first_name + ' ' + $scope.user_account.last_name + ' Broker Mandate' : 'Liimex ' + $scope.user_account.first_name + ' ' + $scope.user_account.last_name + ' Maklermandat') + '.pdf';
    fileService.downloadWithName(url_for_download, rename_to);
  };

  /* Get My Mandate */
  $scope.GetMyMandate = function () {
    if (!$rootScope.company.mandate) {
      return;
    }
    documentService.getAndStoreMandate($rootScope.company.mandate, function (result) {
      $scope.mandate = result.val();
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'account', 'error', function () {}, function () {});
    });
  };

  $scope.editFinancials = function () {
    $rootScope.user.force_url = 'pickfinancials';
    redirectService.changeStateWithLang('pickfinancials', { isEdit: true });
  };

  $scope.editActivity = function () {
    $rootScope.user.force_url = 'pickactivity';
    redirectService.changeStateWithLang('pickactivity', { isEdit: true });
  };

  $scope.editIndustry = function () {
    $rootScope.user.force_url = 'pickindustry';
    redirectService.changeStateWithLang('pickindustry', { isEdit: true });
  };

  $scope.ResetPassword = function () {
    authService.resetPassword({ email: $scope.user_account.email }, function () {
      $rootScope.genService.showTopSuccessNotification('We have sent you an email with instructions');
    }, function () {
      $rootScope.genService.showDefaultErrorMsg('SWW');
      backofficeService.logpost('Could not reset password', $scope.currentUser, 'account', 'error', function () {}, function () {});
    });
  };

  $scope.GetOtherUsers = function () {
    $scope.other_user = {};

    var _loop = function _loop(user) {
      if (user != $scope.currentUser) {
        userService.getSingleUser(user, function (getUser) {
          $scope.other_user[user] = getUser;
          console.log($scope.other_user);
        }, function (error) {
          console.log(error);
        }, true);
      }
    };

    for (var user in $rootScope.company.users) {
      _loop(user);
    }
  };

  $scope.showUser = function (user_type, user_id) {
    $scope.otherUserObj = $scope.other_user[user_id];
    if (user_type === 'me') {
      $scope.show_me = true;
      $scope.show_other = false;
    } else {
      $scope.show_me = false;
      $scope.show_other = true;
    }
  };

  $scope.AccountSection = function (section) {
    if (section) {
      $scope.is_active = [];
      $scope.is_active[section] = true;
    }
  };

  /* On Load */
  $scope.GetOtherUsers();

  /* Get My Addresses */
  $scope.GetMyAddresses();
  $scope.GetMyIndustries();
  $scope.GetMyActivities();
  $scope.GetGroups();
  $scope.GetMyMandate();

  /*Get User account*/
  $scope.GetUserAccount();
}

// Angular Module
angular.module('application').controller('OfferController', OfferController);

// Injections
OfferController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'offerService', 'companyService', 'metaService', 'redirectService', 'backofficeService', 'documentService', '$sce', 'genService', 'langService', 'fileService'];

// Function
function OfferController($rootScope, $scope, $stateParams, $state, $controller, offerService, companyService, metaService, redirectService, backofficeService, documentService, $sce, genService, langService, fileService) {

  angular.extend(this, $controller('DefaultController', {
    $scope: $scope,
    $stateParams: $stateParams,
    $state: $state }));

  /*
  IMPORTANT !! IMPORTANT !! IMPORTANT !! IMPORTANT !! IMPORTANT !! IMPORTANT
  IF YOU ARE COMPARING WITH CURRENT POLICY, set offer_is_replacement = true
  */

  // Safety check
  if (!$rootScope.company) {
    return;
  } else if ($rootScope.company && !$rootScope.company.offers) {
    redirectService.changeStateWithLang('overview');
    return;
  }

  // Scope Variables
  $scope.custom_fields = {};
  $scope.offer_v2_specific = [];
  $scope.langService = langService;
  // $scope.deductableValue = {};
  $scope.show_highlights = true;

  /*TODO: remove hardcoding of setting show_details to always true*/
  $scope.show_details = true;
  $scope.accept_offer_modal_accept_message = $scope.accept_offer_modal_accept_message || false;

  var DISPLAY_VERSION_2 = 2;

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Transform into Html */
  $scope.transformToHtml = function (html) {
    return $sce.trustAsHtml(html);
  };

  /* Get Pushed Offer */
  $scope.GetSingleOffer = function () {
    offerService.getAndStoreSingleOffer($stateParams.offer_id, function (result) {
      var offer = result.val();
      if (offer.status === 'pushed' && offer.comparisons) {
        $scope.offer = offer;
        $scope.num_comparisons = Object.keys(offer.comparisons).length;
        $scope.GetPolicySpecificCriteria();
        $scope.GetIndustrySpecificCriteria();
      } else if (!$scope.accept_offer_modal_accept_message) {
        redirectService.changeStateWithLang('overview');
      }
      // Check if the Offer is of Version 2
      if (offer.display_version === DISPLAY_VERSION_2) {
        $scope.offer_v2 = offer;
        $scope.BuildAdditionalArray($scope.offer_v2);
        var offer_v2 = $scope.offer_v2;
        $scope.Additional_function();
        for (var comparisonId in offer_v2.comparisons) {
          var comparisonInsuranceData = offer_v2.comparisons[comparisonId].insurance_types;
          for (var comparisonInsuranceId in comparisonInsuranceData) {
            if (comparisonInsuranceId === offer_v2.subject) {
              $scope.comparisonInsuranceId = comparisonInsuranceId;
              $scope.offer_v2_general = comparisonInsuranceData;
            } else {
              for (var specific_id in comparisonInsuranceData[comparisonInsuranceId].specific) {
                if (comparisonInsuranceData[comparisonInsuranceId].specific[specific_id].included === true) {
                  $scope.offer_v2_specific = specific_id;
                }
              }
            }
          }
        }
      }
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      console.error(error);
      redirectService.changeStateWithLang('overview');
    });
  };

  function composeDefaultDocumentName(carrier_name) {
    return $rootScope.langPreference === 'en' ? 'Liimex Offer ' + carrier_name : 'Liimex Angebot ' + carrier_name;
  }

  /* Prepare Downloads */
  /* Documents:list */
  $scope.PrepareDownloads = function (offer) {
    var documents = offer.documents;

    var carrier_name = $scope.carriers[offer.basic.carrier].name;
    $scope.documentsOffer = offer;
    $scope.loading_documents = true;
    $scope.documents = {};
    $scope.blank_documents = documents;
    var downloaded = 0;

    var _loop2 = function _loop2(index) {
      var new_index = index;
      documentService.getDocument(documents[index].route, documents[index].key, function (document) {
        downloaded++;
        $scope.loading_documents = downloaded == documents.length ? null : true;
        if (!document.alias && carrier_name) {
          document.alias = composeDefaultDocumentName(carrier_name);
        }
        $scope.documents[new_index] = document;
        $scope.safeApply(function (f) {
          return f;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'comparison (preparing downloads)', 'error', function () {}, function () {});
        downloaded++;
        $scope.loading_documents = downloaded == documents.length ? null : true;
        $scope.safeApply(function (f) {
          return f;
        });
      });
    };

    for (var index in documents) {
      _loop2(index);
    }
  };

  /* Download Document */
  $scope.DownloadDocument = function (document, old) {
    if (!document || !document.file) {
      return;
    }
    var url_for_download = (old ? "policies" : "documents") + '/' + $rootScope.company_uid + '/' + document.file;
    var rename_to = document.alias ? document.alias + '.pdf' : document.file;
    fileService.downloadWithName(url_for_download, rename_to);
  };

  /* Get Policy Specific Criteria */
  $scope.GetPolicySpecificCriteria = function () {
    metaService.getPolicySpecificCriteriaFromSubjectTrigger($scope.offer.subject, function (policy_specific_criteria) {
      for (var key in policy_specific_criteria) {
        if (policy_specific_criteria[key].disabled) {
          continue;
        }
        for (var field_key in policy_specific_criteria[key].fields) {
          if (policy_specific_criteria[key].fields[field_key].disabled) {
            continue;
          }
          $scope.custom_fields[field_key] = policy_specific_criteria[key].fields[field_key];
        }
      }
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  /* Get Industry Specific Criteria */
  $scope.GetIndustrySpecificCriteria = function () {
    metaService.getIndustrySpecificCriteriaFromPolicyTrigger($scope.offer.subject, function (industry_criteria) {
      for (var key in industry_criteria) {
        if (industry_criteria[key].disabled) {
          continue;
        }
        for (var field in industry_criteria[key].fields) {
          if (industry_criteria[key].fields[field].disabled) {
            continue;
          }
          $scope.custom_fields[field] = industry_criteria[key].fields[field];
        }
      }
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  /* Get Insurance Types */
  $scope.GetInsuranceTypes = function () {
    metaService.getInsuranceTypes(function (types) {
      $scope.insurance_types = types;
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  /* Get Carriers */
  $scope.GetCarriers = function () {
    $rootScope.local_load = true;
    $scope.carriers = {};
    metaService.getCarriers(function (carriers) {
      $scope.carriers = carriers;
      $rootScope.local_load = null;
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  /* Select Offer */
  $scope.SelectOffer = function (offer, key) {
    $scope.accept_offer_modal_accept_message = false;
    $scope.selected_offer = offer;
    $scope.selected_offer_key = key;
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  /* Dismiss Offer */
  $scope.DismissOffer = function () {
    offerService.changeStatus($stateParams.offer_id, 'dismissed', function () {
      redirectService.changeStateWithLang('overview');
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  /* Accept Offer */
  $scope.AcceptOffer = function () {
    $scope.accept_offer_modal_accept_message = true;
    offerService.appectOffer($stateParams.offer_id, $scope.selected_offer, $scope.selected_offer_key, $scope.offer.subject, function () {
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  /* Download Policy */
  $scope.Download = function (file) {
    $rootScope.local_load = true;
    offerService.downloadFile(file, $rootScope.company_uid, function (url_for_download) {
      $rootScope.local_load = null;
      $rootScope.genService.downloadWithLink(url_for_download);
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'offer', 'error', function () {}, function () {});
    });
  };

  $scope.HidePopup = function () {
    angular.element('#popup')[0].classList.remove('tether-enabled');
  };

  /* Build Additional Array */
  $scope.BuildAdditionalArray = function (offer) {
    $scope.additional_insurance_modules_list = [];
    $scope.additional_insurance_modules_dict = {};
    for (var comparison_key in offer.comparisons) {
      if (!offer.comparisons[comparison_key]) {
        continue;
      }
      for (var insurance_type in offer.comparisons[comparison_key].insurance_types) {
        if (!offer.comparisons[comparison_key].insurance_types[insurance_type] || insurance_type === offer.subject) {
          continue;
        }
        $scope.additional_insurance_modules_dict[insurance_type] = true;
      }
    }
    for (var key in $scope.additional_insurance_modules_dict) {
      $scope.additional_insurance_modules_list.push({ key: key });
    }
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  $scope.GetSpecificComparisonCriteriaName = function () {
    metaService.getComparisonCriteriaForPolicy(function (specificComparisonData) {
      $scope.specificComparisonData = specificComparisonData;
      $scope.safeApply(function (f) {
        return f;
      });
    });
  };

  $scope.IsShowDetails = function () {
    if ($scope.show_details === true) {
      $scope.show_details = false;
    } else {
      $scope.show_details = true;
    }
    $scope.safeApply(function (f) {
      return f;
    });
  };

  $scope.RedirectToNewTab = function (url_id) {
    var url_to_go = $state.href(url_id);
    window.open(url_to_go, '_blank');
  };

  $scope.InsuranceDescriptionBind = function (insurance_description) {
    return $sce.trustAsHtml(insurance_description);
  };

  $scope.Additional_function = function () {
    for (var comparison_id in $scope.offer_v2.comparisons) {
      var comparison_obj = $scope.offer_v2.comparisons[comparison_id];
      for (var insurance_id in $scope.offer_v2.comparisons) {
        if (insurance_id !== comparison_id) {
          var comparison_insurance_object = $scope.offer_v2.comparisons[insurance_id];
          for (var insurance_key in comparison_obj.insurance_types) {
            var insurance_obj = comparison_obj.insurance_types[insurance_key];
            for (var specific_id in insurance_obj.specific) {
              if (!comparison_insurance_object.insurance_types[insurance_key] || !comparison_insurance_object.insurance_types[insurance_key].specific || !comparison_insurance_object.insurance_types[insurance_key].specific[specific_id]) {
                if (!comparison_insurance_object.insurance_types[insurance_key]) {
                  comparison_insurance_object.insurance_types[insurance_key] = {};
                }
                if (!comparison_insurance_object.insurance_types[insurance_key]["specific"]) {
                  comparison_insurance_object.insurance_types[insurance_key]["specific"] = {};
                }
                comparison_insurance_object.insurance_types[insurance_key].specific[specific_id] = { included: false };
              }
            }
          }
        }
      }
    }
    $scope.SortSpecificCriteriasForSubject($scope.offer_v2.comparisons);
  };

  $scope.IsDisplay = function (additional_key) {
    var show_additional_module = false;
    for (var comparison_id in $scope.offer_v2.comparisons) {
      var comparison_obj = $scope.offer_v2.comparisons[comparison_id];
      var insurance_obj = comparison_obj.insurance_types[additional_key];
      if (insurance_obj && insurance_obj.specific) {
        for (var specific_id in insurance_obj.specific) {
          if (insurance_obj.specific[specific_id].included) {
            show_additional_module = true;
            break;
          }
        }
        if (show_additional_module) break;
      }
    }
    return show_additional_module;
  };

  $scope.SortSpecificCriteriasForSubject = function (comparison_obj) {
    $scope.sorted_general_specific_criteria = {};
    for (var comparison_id in comparison_obj) {
      $scope.sorted_general_specific_criteria[comparison_id] = [];
      var comparison_item = comparison_obj[comparison_id];
      if (comparison_item.insurance_types && comparison_item.insurance_types[$scope.offer_v2.subject] && comparison_item.insurance_types[$scope.offer_v2.subject].specific) {
        for (var specific_id in comparison_item.insurance_types[$scope.offer_v2.subject].specific) {
          $scope.sorted_general_specific_criteria[comparison_id].push({ key: specific_id, value: comparison_item.insurance_types[$scope.offer_v2.subject].specific[specific_id] });
        }
      }
    }
    $scope.safeApply(function (f) {
      return f;
    });
  };

  $scope.IsDisplayComparisonCriteria = function (specific_key, insurance_key) {
    var display_comparison = false;
    for (var comparison_key in $scope.offer_v2.comparisons) {
      var comparison_obj = $scope.offer_v2.comparisons[comparison_key];
      var insurance_obj = comparison_obj.insurance_types[insurance_key];
      if (!insurance_obj) {
        continue;
      }
      var specific_obj = insurance_obj.specific[specific_key];
      if (specific_obj.included) {
        display_comparison = true;
        break;
      }
    }
    $scope.safeApply(function (f) {
      return f;
    });
    return display_comparison;
  };

  $scope.IsHighlight = function () {
    var _return = false;
    for (var comparison_id in $scope.offer.comparisons) {
      for (var specific_id in $scope.offer.comparisons[comparison_id].insurance_types[$scope.offer.subject].specific) {
        if ($scope.offer.comparisons[comparison_id].insurance_types[$scope.offer.subject].specific[specific_id].included === true) {
          _return = true;
          break;
        }
      }
    }
    return _return;
  };

  /* On Controller Load */
  $scope.GetSingleOffer();
  $scope.GetInsuranceTypes();
  $scope.GetCarriers();
  $scope.GetSpecificComparisonCriteriaName();
}

// Angular Module
angular.module('application').controller('ClaimController', ClaimController);

// Injections
ClaimController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'claimService', 'redirectService', 'backofficeService'];

// Function
function ClaimController($rootScope, $scope, $stateParams, $state, $controller, claimService, redirectService, backofficeService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));
}

// Angular Module
angular.module('application').controller('InstantProductAdditionalController', InstantProductAdditionalController);

// Injections
InstantProductAdditionalController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

// Function
function InstantProductAdditionalController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Scope Variables */
  $scope.show_next = $scope.page_data.chosen_premium ? true : false;

  /* Save Additional Product */
  $scope.SaveProduct = function (comparison_type, product_value, next_page) {
    // for the displaying of 'next' or 'skip button'
    if (product_value) {
      $scope.show_next = true;
    } else {
      $scope.show_next = false;
    }
    $scope.page_data.chosen_additional = comparison_type;
    var addons = {
      "chosen_additional": comparison_type,
      "chosen_premium": product_value
    };
    instantService.updateInstantProcess($stateParams.page, $stateParams.process_id, addons, function (additionals) {
      if (next_page) {
        $scope.nextPage();
      }
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      log_error(error);
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  };

  $scope.goBack = function () {
    $scope.previousPage();
  };

  // $scope.SkipToNextPage = function(){
  // 	$scope.nextPage();
  // }

  /* On Controller Load */
}

// Angular Module
angular.module('application').controller('InstantProductCheckoutController', InstantProductCheckoutController);

// Injections
InstantProductCheckoutController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

// Function
function InstantProductCheckoutController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Scope Variables */
  var today = new Date();
  $scope.date_today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  $scope.checkout = {};
  $scope.disable_fields = {};
  $scope.plantype = "";
  var checkoutPageNumber = void 0;
  $scope.isMandateSigned = false;

  /* Get All the Data of instant product request */
  function initCheckoutPage() {
    $scope.data_set = $scope.page_data.pages;
    for (var pageNumber in $scope.data_set) {
      if ($scope.data_set[pageNumber].checkout) {
        checkoutPageNumber = pageNumber;
        $scope.checkout = $scope.data_set[pageNumber].checkout;
        $scope.checkout_page = $scope.data_set[pageNumber];
        $scope.user = $scope.checkout.user;
        break;
      }
    }
    $scope.plantype = $scope.checkout.chosen_package ? $scope.checkout.chosen_package : 'yearly';
    $scope.mandate = $scope.checkout.mandate ? true : false;
    $scope.disable_fields = angular.copy($scope.checkout);
    GetComparisons();
    GetAdditionals();
    $scope.CalculatePremium();
    $scope.safeApply(function (fn) {
      return fn;
    });
  }

  /* Get Comparison Data */
  function GetComparisons() {
    for (var page_id in $scope.data_set) {
      if ($scope.data_set[page_id].comparisons) {
        $scope.chosen_comparison = $scope.data_set[page_id].comparisons[$scope.data_set[page_id].chosen_deductible][$scope.data_set[page_id].chosen_comparison];
      }
    }
  }

  /* Get Additional comparison Data */
  function GetAdditionals() {
    for (var page_id in $scope.data_set) {
      if ($scope.data_set[page_id].additionals) {
        $scope.chosen_additional = $scope.data_set[page_id];
      }
    }
  }

  /* Calculate the net premium */
  $scope.CalculatePremium = function () {
    if ($scope.chosen_comparison) {
      if ($scope.plantype === 'yearly') {
        $scope.premium_comparison = $scope.chosen_comparison.premium_monthly * 12;
      } else {
        $scope.premium_comparison = $scope.chosen_comparison.premium_monthly;
      }
    }
    if ($scope.chosen_additional.chosen_additional >= 0) {
      if ($scope.plantype === 'yearly') {
        $scope.premium_additional = $scope.chosen_additional.chosen_premium * 12;
      } else {
        $scope.premium_additional = $scope.chosen_additional.chosen_premium;
      }
    }
    $scope.GetTotalNetSum();
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  $scope.GetTotalNetSum = function () {
    /* Add values for tax and discount */
    if ($scope.plantype === 'yearly') {
      $scope.total_net_premium = $scope.chosen_comparison.premium_monthly * 12 + ($scope.chosen_additional.chosen_premium || 0) * 12;
      $scope.tax_calculated = $scope.total_net_premium * $scope.checkout.tax_percent / 100;
      $scope.discount_value = $scope.total_net_premium * $scope.checkout.yearly_discount / 100;
      $scope.total_payable = $scope.total_net_premium + $scope.tax_calculated - $scope.discount_value;
    } else {
      $scope.total_net_premium = $scope.chosen_comparison.premium_monthly + ($scope.chosen_additional.chosen_premium || 0);
      $scope.tax_calculated = $scope.total_net_premium * $scope.checkout.tax_percent / 100;
      $scope.discount_value = null;
      $scope.total_payable = $scope.total_net_premium + $scope.tax_calculated - $scope.discount_value;
    }
  };

  $scope.SaveCheckoutData = function () {
    if (!$scope.checkout.sepa || !$scope.checkout.company) {
      return;
    }
    var checkout_obj = {
      "chosen_package": $scope.plantype,
      "company": {
        "name": $scope.checkout.company.name,
        "type": $scope.checkout.company.type,
        "phone": $scope.checkout.company.phone
      },
      "address": {
        "street": $scope.checkout.address.street,
        "zip": $scope.checkout.address.zip,
        "city": $scope.checkout.address.city
      },
      "sepa": {
        "account_holder": $scope.checkout.sepa.account_holder,
        "bic": $scope.checkout.sepa.bic,
        "iban": $scope.checkout.sepa.iban
      },
      "mandate": {
        "signature": $scope.dataurl
      },
      "yearly_discount": $scope.checkout.yearly_discount,
      "tax_percent": $scope.checkout.tax_percent,
      "validity_years": $scope.checkout.validity_years
    };
    instantService.saveCheckout($stateParams.page, $stateParams.process_id, checkout_obj, function (checkout) {
      console.log(checkout);
      //$state.go('instantproductthankyou_en');
      $scope.nextPage();
    }, function (error) {
      log_error(error);
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  };

  $scope.RemoveAdditional = function () {
    var additional_page_number = void 0;
    for (var pageNumber in $scope.data_set) {
      if ($scope.data_set[pageNumber].additionals) {
        additional_page_number = pageNumber;
      }
    }
    var addons = {
      "chosen_additional": null,
      "chosen_premium": null
    };
    instantService.updateInstantProcess(additional_page_number, $stateParams.process_id, addons, function (additionals) {
      $scope.safeApply(function (fn) {
        return fn;
      });
      $state.reload();
    }, function (error) {
      log_error(error);
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  };

  $scope.goBack = function () {
    $scope.previousPage();
  };

  $scope.AcceptMandate = function () {
    $scope.mandate = true;
  };

  $scope.AcceptSepaMandate = function () {
    $scope.sepa = true;
  };

  $scope.AcceptTermsAndConditions = function () {
    $scope.termsAndConditions = true;
  };

  /* On Controller Load */
  initCheckoutPage();
}

// Angular Module
angular.module('application').controller('InstantProductSelectController', InstantProductSelectController);

// Injections
InstantProductSelectController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', '$sce', 'instantService'];

// Function
function InstantProductSelectController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, $sce, instantService) {
  angular.extend(this, $controller('DefaultController', {
    $scope: $scope,
    $stateParams: $stateParams,
    $state: $state
  }));

  /** Scope Variables **/
  $scope.deductible = $scope.page_data.chosen_deductible ? $scope.page_data.chosen_deductible : 500;

  /**
   * Get Comparisons
   */
  $scope.GetComparisons = function () {
    $scope.comparisons = $scope.page_data.comparisons;
    console.log($scope.comparisons);
  };

  $scope.GetComparisonPlan = function (val) {
    if (val) {
      $scope.comparisonPlan = $scope.page_data.comparisons[val];
      //console.log(val,$scope.comparisonPlan);
    }
  };

  $scope.goBack = function () {
    $scope.previousPage();
  };

  /* Save Product */
  $scope.SaveComparison = function (comparison_type, deductible, nextPage) {
    $scope.setChildLoader(true);
    $scope.page_data.chosen_comparison = comparison_type;
    $scope.page_data.chosen_deductible = eval(deductible);
    instantService.updateInstantProcess($stateParams.page, $stateParams.process_id, $scope.page_data, function () {
      $scope.setChildLoader(false);
      if (nextPage) {
        $scope.nextPage();
      }
    }, function (error) {
      $rootScope.genService.showDefaultErrorMsg(error.status);
    });
  };

  /* Transform into Html */
  $scope.transformToHtml = function (html) {
    if (html) {
      $scope.transformed_html = $sce.trustAsHtml(html);
      return true;
    } else {
      return false;
    }
  };

  /* On Controller Load */
  $scope.GetComparisons();
}

// Angular Module
angular.module('application').controller('IPQController', IPQController);

// Injections
IPQController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'backofficeService', 'instantService'];

// Function
function IPQController($rootScope, $scope, $stateParams, $state, $controller, backofficeService, instantService) {

  /* Get Questions */
  function getQuestions() {
    if ($scope.page_data) {
      $scope.questions = $scope.page_data.questions;
      $scope.display_questions = $rootScope.genService.dictToArray($scope.questions);
      $scope.safeApply(function (fn) {
        return fn;
      });
    }
  }

  /* Submit Answers */
  $scope.submitAnswers = function () {
    $scope.setChildLoader(true);
    instantService.updateInstantProcess($stateParams.page, $stateParams.process_id, $scope.page_data, function () {
      $scope.setChildLoader(false);
      $scope.nextPage();
    }, function (error) {
      $rootScope.genService.showDefaultErrorMsg(error.status);
    });
  };

  /* Go Back */
  $scope.goBack = function () {
    $scope.previousPage();
  };

  /* On Controller Load */
  getQuestions();
}

// Angular Module
angular.module('application').controller('RetryController', RetryController);

// Injections
RetryController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService'];

// Function
function RetryController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService) {

  /* Back */
  $scope.goBack = function () {
    // window.history.back();
    if (!$scope.retryObj.instant_product_request && $scope.retryObj.current_page >= 0) {
      redirectService.changeStateWithLang('instant', {
        product_id: null,
        new: null,
        page: $scope.retryObj.current_page,
        process_id: $stateParams.process_id
      });
    }
  };
}

// Angular Module
angular.module('application').controller('InstantProductUserController', InstantProductUserController);

// Injections
InstantProductUserController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'authService', 'instantService'];

// Function
function InstantProductUserController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, authService, instantService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope,
    $stateParams: $stateParams,
    $state: $state }));

  /* Scope Variables */
  $scope.signin = {};
  $scope.user = {};

  $scope.SaveUser = function () {
    var user_data = {
      "email": $scope.user.email,
      "first_name": $scope.user.first_name,
      "last_name": $scope.user.last_name,
      "phone": $scope.user.phone
    };
    instantService.saveUser('signup', $stateParams.process_id, user_data, $stateParams.page, function () {
      return $state.reload();
    }, function (error) {
      $rootScope.genService.showDefaultErrorMsg(error);
      log_error(error);
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  };

  /** Login Function **/
  $scope.Login = function (form) {
    var params = $scope.signin;
    if (!form.$valid) {
      return;
    }
    backofficeService.emailcheckpost($scope.signin.email, function () {
      authService.login(params, function () {
        instantService.saveUser('login', $stateParams.process_id, { "email": $scope.signin.email }, $stateParams.page, function () {
          $scope.signin.password = null;
          $state.reload();
        }, function (error) {
          log_error(error);
          $scope.safeApply(function (fn) {
            return fn;
          });
        });
      }, function (error) {
        $scope.signin.password = null;
        $rootScope.genService.showDefaultErrorMsg(error.code);
        console.error(error);
        backofficeService.logpost(error, $scope.signin.email, 'login', 'error', function () {}, function () {});
      });
    }, function (error) {
      console.error(error);
      backofficeService.logpost(error, $scope.signin.email, 'login', 'error', function () {}, function () {});
    });
  };

  $scope.goBack = function () {
    $scope.previousPage();
  };

  /* On Controller Load */
}

// Angular Module
angular.module('application').controller('ThankyouController', ThankyouController);

// Injections
ThankyouController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

// Function
function ThankyouController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {

  /* Scope Varialbes */

  /* Get All the Data of instant product request */
  function GetAllData() {
    var page_count = void 0;
    for (var page in $scope.page_data.pages) {
      page_count = page;
    }
    if (page_count == $scope.page_data.current_page) {
      ProcessCompleted();
    }
    $scope.safeApply(function (fn) {
      return fn;
    });
  }

  /* Status for process complete */
  function ProcessCompleted() {
    instantService.processComplete($stateParams.process_id, function (process_completed) {
      console.log(process_completed);
    }, function (error) {
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  }

  /* On Controller Load */
  GetAllData();
}

// Angular Module
angular.module('application').controller('PolicyController', PolicyController);

// Injections
PolicyController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'metaService', 'policyService', 'redirectService', 'offerService', 'documentService', 'FoundationApi', 'langService', 'fileService', 'backofficeService'];

// Function
function PolicyController($rootScope, $scope, $stateParams, $state, $controller, metaService, policyService, redirectService, offerService, documentService, FoundationApi, langService, fileService, backofficeService) {
  angular.extend(this, $controller('DefaultController', {
    $scope: $scope,
    $stateParams: $stateParams,
    $state: $state
  }));

  if (!$rootScope.company) {
    return;
  }

  /* Scope Variables */
  $scope.new_offer = {};
  $scope.comparisonDataAdditional = {};
  $scope.langService = langService;

  /*TODO: remove hardcoding of setting show_details to always true*/
  $scope.show_details = true;
  var DISPLAY_VERSION_2 = 2;

  var not_dismissed_policies = {};

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Get All Policy Criteria */
  $scope.GetMyPolicies = function () {
    $scope.policies = [];
    not_dismissed_policies = {};
    $scope.total_premium = 0;
    for (var key in $rootScope.company.policies) {
      policyService.getAndStoreSinglePolicy(key, function (result) {
        var policy = result.val();
        policy.status = policy.status || "pending";
        if (policy.status !== 'deleted' && policy.status !== 'disabled' && policy.status !== 'pending') {
          $scope.policies.push({ key: result.key, policy: policy });
          not_dismissed_policies[policy.subject] = { key: result.key, policy: policy };
          $scope.show_total = true;
          if (policy.premium || policy.basic.premium) {
            if (policy.basic) {
              $scope.total_premium += policy.basic.premium * (1 + policy.basic.insurance_tax * 0.01);
            } else {
              $scope.total_premium += policy.premium;
            }
          }
        }
        $scope.safeApply(function (fn) {
          return fn;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
      });
    }
  };

  /* Remove Policy */
  $scope.RemovePolicy = function (uid) {
    policyService.delete_policy($rootScope.company_uid, uid, function () {
      $rootScope.genService.showDefaultSuccessMsg('Removed');
      $state.reload();
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /* Get Insurance Types */
  $scope.GetInsuranceTypes = function () {
    $scope.insurance_types = {};
    metaService.getInsuranceTypes(function (insurance_types) {
      $scope.insurance_types = insurance_types;
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function (fn) {
        return fn;
      }, function (fn) {
        return fn;
      });
    });
  };

  /* Get Carriers */
  $scope.GetCarriers = function () {
    $scope.carriers = {};
    metaService.getCarriers(function (carriers) {
      $scope.carriers = carriers;
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /* Download Policy */
  $scope.Download = function (file) {
    $scope.DownloadDocument(file, true);
  };

  /* Download Document */
  $scope.DownloadDocument = function (document, old) {
    if (!document || !document.file) {
      return;
    }

    var url_for_download = (old ? "policies" : "documents") + '/' + $rootScope.company_uid + '/' + document.file;
    var rename_to = document.alias ? document.alias + '.pdf' : document.file;
    fileService.downloadWithName(url_for_download, rename_to);
  };

  function composeDefaultDocumentName(policy) {
    return $rootScope.langPreference === 'en' ? 'Liimex Policy ' + policy.basic.policy_number : 'Liimex Police ' + policy.basic.policy_number;
  }

  /* Prepare Downloads */
  /* Documents:list */
  $scope.PrepareDownloads = function (policy) {
    var documents = policy.documents;

    $scope.documentsPolicy = policy;
    $scope.loading_documents = true;
    $scope.documents = {};
    $scope.blank_documents = documents;
    var downloaded = 0;

    var _loop3 = function _loop3(index) {
      var new_index = index;
      documentService.getDocument(documents[index].route, documents[index].key, function (document) {
        downloaded++;
        if (!document.alias && policy.basic.policy_number) {
          document.alias = composeDefaultDocumentName(policy);
        }
        $scope.loading_documents = downloaded == documents.length ? null : true;
        $scope.documents[new_index] = document;
        $scope.safeApply(function (f) {
          return f;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
        downloaded++;
        $scope.loading_documents = downloaded == documents.length ? null : true;
        $scope.safeApply(function (f) {
          return f;
        });
      });
    };

    for (var index in documents) {
      _loop3(index);
    }
  };

  /* Perform upload */
  $scope.PerformUpload = function (file) {
    if (!file) {
      return;
    }
    $rootScope.local_load = true;
    policyService.uploadPolicy(file, $rootScope.company_uid, function (file_url) {
      policyService.registerExistingPolicy($rootScope.company_uid, file_url, function (policy) {
        $rootScope.local_load = null;
        $rootScope.genService.showDefaultSuccessMsg('File Uploaded');
        $scope.safeApply(function (f) {
          return f;
        });
      }, function (error) {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /* Select Policy */
  $scope.SelectPolicy = function (key, policy) {
    $scope.selected_policy_key = key;
    $scope.selected_policy = policy;
  };

  /* Cancel Policy */
  $scope.CancelPolicy = function (key) {
    policyService.delete_policy($rootScope.company_uid, key, function () {
      $rootScope.genService.showDefaultSuccessMsg('Deleted');
      $state.reload();
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /* Get Policy Specific Criteria */
  $scope.GetPolicySpecificCriteria = function () {
    metaService.getPolicySpecificCriteria(function (policy_specific_criteria) {
      $scope.custom_fields = {};
      $scope.policy_specific_criteria = policy_specific_criteria;
      for (var key in policy_specific_criteria) {
        if (policy_specific_criteria[key].disabled === true) {
          continue;
        }
        for (var field in policy_specific_criteria[key].fields) {
          if (policy_specific_criteria[key].fields[field].disabled === true) {
            continue;
          }
          $scope.custom_fields[field] = policy_specific_criteria[key].fields[field];
        }
      }
      $scope.safeApply(function (f) {
        return f;
      });
      $scope.GetIndustrySpecificCriteria();
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /* Get Mandate */
  $scope.GetMyMandate = function () {
    if (!$rootScope.company.mandate) {
      return;
    }
    documentService.getAndStoreMandate($rootScope.company.mandate, function (result) {
      $scope.mandate = result.val();
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /* Get Quote From Dropdown */
  $scope.GetQuoteFromDropdown = function () {
    if ($scope.new_offer.subject) {
      // If($scope.mandate.status === 'signed'){
      $rootScope.local_load = true;
      $scope.disableGetQuoteBtn = true;
      offerService.requestOfferWithInsuranceType($rootScope.company_uid, $scope.new_offer.subject, function () {
        $rootScope.local_load = null;
        $scope.disableGetQuoteBtn = false;
        $scope.new_offer.subject = null;
        $scope.safeApply(function (f) {
          return f;
        });
        $rootScope.genService.showDefaultSuccessMsg('Collecting Offer');
        FoundationApi.publish('offer_success_modal', 'show');
      }, function (error) {
        console.error(error);
        $rootScope.local_load = null;
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
        $scope.disableGetQuoteBtn = false;
      });
      // } else {
      //   FoundationApi.publish('sign_reminder_modal','show');
      // }
    }
  };

  /* Get Industry Specific Criteria */
  $scope.GetIndustrySpecificCriteria = function () {
    metaService.getIndustryCriteria(function (industry_criteria) {
      $scope.industry_criteria = industry_criteria;
      for (var key in industry_criteria) {
        if (industry_criteria[key].disabled === true) {
          continue;
        }
        for (var field in industry_criteria[key].fields) {
          if (industry_criteria[key].fields[field].disabled === true) {
            continue;
          }
          $scope.custom_fields[field] = industry_criteria[key].fields[field];
        }
      }
      $scope.safeApply(function (f) {
        return f;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', function () {}, function () {});
    });
  };

  /**
   * Get The specific Criteria for all Policies
   */
  $scope.GetSpecificDataForPolicy = function () {
    metaService.getComparisonCriteriaForPolicy(function (comparisonData) {
      $scope.comparisonData = comparisonData;
      $rootScope.local_load = null;
      $scope.safeApply(function (fn) {
        return fn;
      });
    });
  };

  /**
   * Checks if a module is included
   */
  $scope.IsAdditionalModule = function (insurance_object) {
    var isValidInsuranceType = false;
    if (insurance_object.general) {
      isValidInsuranceType = true;
    }
    return isValidInsuranceType;
  };

  /**
   * Checks if a module has specific criteria
   */
  $scope.IsAdditionalModuleCriteria = function (insurance_object) {
    var isAdditionalCriteria = false;
    for (var specificId in insurance_object.specific) {
      var specificobj = insurance_object.specific[specificId];
      if (specificobj.included) {
        isAdditionalCriteria = true;
        break;
      }
    }
    return isAdditionalCriteria;
  };

  /**
   * Checks if an Additional Module is included
   */
  $scope.IsDisplayMore = function (policy_obj) {
    var isDisplayAdditionalModule = false;
    for (var insurance_key in policy_obj.insurance_types) {
      if (insurance_key !== policy_obj.subject) {
        var insurance_object = policy_obj.insurance_types[insurance_key];
        if ($scope.IsAdditionalModule(insurance_object)) {
          isDisplayAdditionalModule = true;
          break;
        }
      }
    }
    return isDisplayAdditionalModule;
  };

  /**
   * Check If there are any specific Criteria
   */
  $scope.IsDisplayHighlights = function (highlight_obj) {
    var isDisplayHighlight = false;
    if (highlight_obj !== undefined) {
      for (var specificId in highlight_obj) {
        var specificobj = highlight_obj[specificId];
        if (specificobj.included) {
          isDisplayHighlight = true;
          break;
        }
      }
    }
    return isDisplayHighlight;
  };

  /* On Controller Load */
  $scope.GetMyPolicies();
  $scope.GetCarriers();
  $scope.GetInsuranceTypes();
  $scope.GetPolicySpecificCriteria();
  $scope.GetMyMandate();
  $scope.GetSpecificDataForPolicy();
}

// Angular Module
angular.module('application').controller('ActivityController', ActivityController);

// Injections
ActivityController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'metaService', 'companyService', 'authService', 'recommendationService', 'redirectService', 'backofficeService'];

// Function
function ActivityController($rootScope, $scope, $stateParams, $state, $controller, metaService, companyService, authService, recommendationService, redirectService, backofficeService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Safety Check */
  if (!$rootScope.company_uid) {
    return;
  }

  /* Safe Apply */
  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  // Scope Variables
  $scope.current_question_group = 1;
  $scope.picked_activities = new Set();
  $scope.disableFinishBtn = false;
  var isEditMode = $stateParams.isEdit;

  if (isEditMode) {
    // clear forceurl
    $rootScope.user.force_url = '';
  }

  /* Get My Activities */
  $scope.GetActivityQuestions = function () {
    $scope.questions_to_display = [];
    metaService.getActivityQuestions(function (questions) {
      $scope.activities = questions;
      companyService.getCompanyFromModel($rootScope.company_uid, function (company) {
        $scope.industry_codes = company.industry_codes;
        var num_set = new Set();
        question_loop: for (var key in questions) {
          var question = questions[key];
          if (question.disabled === true) {
            continue;
          };
          if (question.exclude_codes) {
            var exclusion_set = new Set(question.exclude_codes);
            for (var index in company.industry_codes) {
              var codestring = company.industry_codes[index];
              var codes = codestring.split('.');
              var codeStringBuilder = codes[0];
              for (var i = 1; i <= codes.length; i++) {
                if (exclusion_set.has(codeStringBuilder)) {
                  continue question_loop;
                }
                codeStringBuilder = codeStringBuilder + '.' + codes[i];
              }
            }
          }
          // Check if group is disabled before pushing would be better
          $scope.questions_to_display.push({ key: key, activity: question });
          num_set.add(question.group);
        }
        $scope.num_questions = $scope.maxsize;
        for (var i = 1; i <= 5; i++) {
          if (!num_set.has(i)) {
            $scope.num_questions -= 1;
          }
        }
        $scope.safeApply(function (fn) {
          return fn;
        });
      }, function (error) {
        console.error(error);
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'activity', 'error', function () {}, function () {});
    });
  };

  /* Get Groups */
  $scope.GetGroups = function () {
    metaService.getGroups(function (groups) {
      $scope.groups = {};
      for (var key in groups) {
        if (groups[key].disabled === true) {
          continue;
        }
        $scope.groups[groups[key].group] = groups[key];
      }
      $scope.maxsize = Object.keys($scope.groups).length;
      $scope.num_questions = $scope.maxsize;
      $scope.safeApply(function (fn) {
        return fn;
      });
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'activity', 'error', function () {}, function () {});
    });
  };

  /* Pick */
  $scope.Pick = function (key) {
    $scope.picked_activities.has(key) === true ? $scope.picked_activities.delete(key) : $scope.picked_activities.add(key);
  };

  /* Back */
  $scope.Back = function () {
    if ($scope.current_question_group == 1) {
      if (isEditMode) {
        redirectService.changeStateWithLang('account');
      } else {
        $rootScope.user.force_url = 'pickindustry';
        if ($stateParams.previousEditPage == "pickindustry") {
          redirectService.changeStateWithLang('pickindustry', { isEdit: true });
        } else {
          redirectService.changeStateWithLang('pickindustry');
        }
        return;
      }
    }
    for (var i = $scope.current_question_group; i > 0; i--) {
      if (i === $scope.current_question_group) {
        continue;
      }
      for (var key in $scope.questions_to_display) {
        if ($scope.questions_to_display[key].activity.group === $scope.groups[i].group) {
          $scope.current_question_group = i;
          return;
        }
      }
    }
  };

  /* Next */
  $scope.Next = function () {
    for (var i = $scope.current_question_group; i <= Object.keys($scope.groups).length; i++) {
      if (i === $scope.current_question_group) {
        continue;
      }
      for (var key in $scope.questions_to_display) {
        if ($scope.questions_to_display[key].activity.group === $scope.groups[i].group) {
          $scope.current_question_group = i;
          return;
        }
      }
    }
  };

  /* Finish */
  $scope.Finish = function () {
    $scope.disableFinishBtn = true;
    var insurance_array = [];
    var activity_array = [];

    $scope.picked_activities.forEach(function (key) {
      activity_array.push(key);
      insurance_array.push($scope.activities[key].insurance_type);
    });
    insurance_array = insurance_array.filter(function (insurence_id) {
      return insurence_id;
    });
    try {
      recommendationService.attachRecommendation($rootScope.company_uid, $rootScope.currentUser, insurance_array, activity_array, $scope.industry_codes, null, function () {
        $rootScope.user.force_url = '';
        if (isEditMode) {
          redirectService.changeStateWithLang('account');
        } else {
          redirectService.changeStateWithLang('overview');
        }
      }, function () {
        $scope.disableFinishBtn = false;
      });
    } catch (e) {
      $scope.disableFinishBtn = false;
      console.error(e);
      backofficeService.logpost(e, $scope.currentUser, 'activity', 'error', function () {}, function () {});
    }
  };

  /* Get the previously selected activity questions and add then to pick_activities set */
  function GetSelectedActivityQuestion() {
    if ($rootScope.company && $rootScope.company.activities) $scope.picked_activities = new Set($rootScope.company.activities);
  }

  /* Call these functions on controller load */
  $scope.GetGroups();
  $scope.GetActivityQuestions();
  GetSelectedActivityQuestion();
}

// Angular Module
angular.module('application').controller('FinancialsController', FinancialsController);

// Injections
FinancialsController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', '$resource', 'companyService', 'redirectService', 'backofficeService'];

// Controller

function FinancialsController($rootScope, $scope, $stateParams, $state, $controller, $resource, companyService, redirectService, backofficeService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  // Variables
  $scope.financials = {};

  var isEditMode = $stateParams.isEdit;

  // Company UID
  if (!$rootScope.company_uid) {
    return;
  } else {
    companyService.getCompanyFromModel($rootScope.company_uid, function (company) {
      angular.copy(company.financials, $scope.financials);
    });
  }

  if (isEditMode) {
    // clear forceurl
    $rootScope.user.force_url = '';
  }

  /* Submit Financials */
  $scope.SubmitFinancials = function (form) {
    var forceurl_pickActivity = null;
    if (!isEditMode) forceurl_pickActivity = 'pickactivity';

    companyService.updateFinancials($rootScope.company_uid, $rootScope.currentUser, { turnover: $scope.financials.turnover }, forceurl_pickActivity, function () {
      // goto account page if this page is opened in edit mode (bypass forceurl).
      if (isEditMode) {
        redirectService.changeStateWithLang('account');
      } else {
        $rootScope.user.force_url = forceurl_pickActivity;
        redirectService.changeStateWithLang(forceurl_pickActivity);
      }
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.message);
    });
  };

  /*previous button click*/
  $scope.Back = function () {
    // goto account page if this page is opened in edit mode (bypass forceurl).
    if (isEditMode) {
      redirectService.changeStateWithLang('account');
    } else {
      $rootScope.user.force_url = 'pickindustry';
      redirectService.changeStateWithLang('pickindustry');
    }
  };
}

// Angular Module
angular.module('application').controller('IndustryController', IndustryController);

// Injections
IndustryController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', '$resource', 'metaService', 'companyService', 'redirectService', 'backofficeService', 'industryService'];

// Controller
function IndustryController($rootScope, $scope, $stateParams, $state, $controller, $resource, metaService, companyService, redirectService, backofficeService, industryService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  $scope.searches = {};
  $scope.categories = {};
  $scope.is_valid = {};
  $scope.cat_limit = 1;
  $scope.chosen = {};
  $scope.searchResults = [];
  $scope.picked_levels = {};
  $scope.picked_levels[1] = {};
  $scope.picked_levels[2] = {};
  $scope.picked_levels[3] = {};
  $scope.industry_set = new Set();
  $scope.isEditMode = $stateParams.isEdit;
  $scope.showIndustrySelectorPage = false;
  var forceurl_pickFinancials = null;
  var forceurl_pickActivity = null;
  var fuse_en, fuse_de, fuse;
  var industryCodesLeafnodes = [];
  var childNode = "";

  $scope.safeApply = function (fn) {
    if (!this.$root) {
      return;
    }
    var phase = this.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  if ($scope.isEditMode) {
    // clear forceurl, when you land to this page in edit mode.
    if ($rootScope.user && $rootScope.user.force_url) $rootScope.user.force_url = '';
  }

  /* Get Industries */
  $scope.GetIndustries = function () {
    if (!$rootScope.currentUser) {
      return;
    }
    // $rootScope.authenticating = true;
    metaService.getIndustryCodes(function (codes) {
      $scope.industries = [];
      $scope.top_levels = {};
      $scope.second_levels = {};

      for (var key in codes) {
        if (codes[key].level == 1) $scope.top_levels[codes[key].code] = codes[key];else if (codes[key].level == 2) $scope.second_levels[codes[key].code] = codes[key];
      }

      for (var key in codes) {
        $scope.industry_set.add(codes[key].code);
        var parentIndustryCode = String(codes[key].code).split('.')[0];
        var secondParentIndustryCode;
        if (String(codes[key].code).split('.')[1]) secondParentIndustryCode = parentIndustryCode + '.' + String(codes[key].code).split('.')[1];

        $scope.industries.push({ key: key, code: codes[key], parent: $scope.top_levels[parentIndustryCode], secondParent: $scope.second_levels[secondParentIndustryCode] });
      }
      setUpSearchableIndustryCodes();
      $scope.GetSelectedIndustries();
      $scope.safeApply(function (f) {
        return f;
      });
      // $rootScope.authenticating = null;
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'industry', 'error', function () {}, function () {});

      // $rootScope.authenticating = null;
    });
  };

  /* Pick */
  $scope.Pick = function (industry, i, code) {
    if ($rootScope.langPreference === 'en') {
      $scope.searches[i] = industry.name_en;
    } else {
      $scope.searches[i] = industry.name_de;
    }
    $scope.categories[i] = code;
    document.CheckCategories();
    $scope.searchResults = [];
  };

  /* Remove Cat*/
  $scope.RemoveCat = function () {
    $scope.cat_limit = $scope.cat_limit - 1;
  };

  /* Refresh Model */
  $scope.RefreshModel = function (cat_num, models) {
    for (var i in models) {
      if ($scope.picked_levels[cat_num][models[i]]) {
        $scope.picked_levels[cat_num][models[i]] = null;
      }
    }
    validatedDuplicatePickedIndustries(cat_num);
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  function resetPickedLeavels() {
    $scope.picked_levels = {};
    $scope.picked_levels[1] = {};
    $scope.picked_levels[2] = {};
    $scope.picked_levels[3] = {};
  }

  /* check if the selected industrie is already previously selected */
  function validatedDuplicatePickedIndustries(cat_num) {
    var currentPickedSubCatagory = 1;
    for (var catagory in $scope.picked_levels[cat_num]) {
      if ($scope.picked_levels[cat_num][catagory]) {
        currentPickedSubCatagory = catagory;
      }
    }

    /* if there are no more leaf nodes left, check if this code is already picked */
    if (!$scope.industry_set.has($scope.picked_levels[cat_num][currentPickedSubCatagory].concat('.1'))) {
      var currentSelectedIndustrycode = $scope.picked_levels[cat_num][currentPickedSubCatagory];
      for (var level in $scope.picked_levels) {
        if (level == cat_num) continue;
        var picked_level = $scope.picked_levels[level];
        for (var _catagory in picked_level) {
          if (picked_level[_catagory]) {
            if (!$scope.industry_set.has($scope.picked_levels[level][_catagory].concat('.1'))) {
              /* if dupicate codes exist */
              if ($scope.picked_levels[level][_catagory] == currentSelectedIndustrycode) {
                if ($rootScope.langPreference == "en") {
                  $rootScope.genService.showDefaultErrorMsg('en/duplicate-industry-codes-selected');
                } else {
                  $rootScope.genService.showDefaultErrorMsg('de/duplicate-industry-codes-selected');
                }
                /* remove the last picked_level that is duplicated */
                if (level > cat_num) {
                  $scope.picked_levels[level] = null;
                } else {
                  $scope.picked_levels[cat_num] = null;
                }
              }
            }
          }
        }
      }
    }
  }

  /* Submit Categories */
  document.CheckCategories = function () {
    for (var i = 1; i <= $scope.cat_limit; i++) {

      if (!$scope.categories[i] || !$scope.searches[i]) {
        $scope.is_valid[i] = false;
        return false;
      }
      if ($rootScope.langPreference === 'en') {
        if ($scope.categories[i].code.name_en !== $scope.searches[i]) {
          $scope.is_valid[i] = false;
          return false;
        }
      } else {
        if ($scope.categories[i].code.name_de !== $scope.searches[i]) {
          $scope.is_valid[i] = false;
          return false;
        }
      }
      $scope.is_valid[i] = true;
      $scope.chosen[i] = $scope.categories[i].code.code;
    }
    return true;
  };

  function isPickedIndustryCodesValid() {
    for (var i = 1; i <= $scope.cat_limit; i++) {
      if (!$scope.picked_levels[i][1]) {
        $scope.is_valid[i] = false;
        return false;
      }
      $scope.is_valid[i] = true;
    }
    return true;
  }

  $scope.changeSearchText = function (searchString) {
    if (searchString && searchString.length > 0) {
      var searchResults = [];
      if ($rootScope.langPreference == 'en') searchResults = fuse_en.search(searchString);else searchResults = fuse_de.search(searchString);

      /* remove previously selected industries from the search results */

      var _loop4 = function _loop4(cat_num) {
        var selectedCode = $scope.categories[cat_num].code.code;
        var indexOfSelectedCode = searchResults.findIndex(function (industryObj) {
          return industryObj.code.code == selectedCode;
        });
        if (indexOfSelectedCode > -1) {
          searchResults.splice(indexOfSelectedCode, 1);
        }
      };

      for (var cat_num in $scope.categories) {
        _loop4(cat_num);
      }
      $scope.searchResults = searchResults;
    }
  };

  $scope.CleanLevels = function () {
    for (var level in $scope.picked_levels) {
      if (level > $scope.cat_limit) {
        $scope.picked_levels[level] = {};
      }
    }
  };

  /* Submit Categories */
  $scope.SubmitCategories = function (form) {
    console.log('HEN');
    if ($scope.showIndustrySelectorPage) {
      if (!$scope.picked_levels[1][1] || !isPickedIndustryCodesValid()) return;
    } else {
      if (!$scope.chosen[1] || !document.CheckCategories()) return;
    }
    $scope.CleanLevels();

    var industry_codes = [];

    /*get industry codes from the search results*/

    if (!$scope.showIndustrySelectorPage) for (var i = 1; i <= $scope.cat_limit; i++) {
      industry_codes[i - 1] = $scope.chosen[i];
    } else {
      outer_loop: for (var level in $scope.picked_levels) {
        if (!$scope.picked_levels[level][1]) {
          continue outer_loop;
        }
        for (var cat = 4; cat > 0; cat--) {
          if ($scope.picked_levels[level][cat]) {
            industry_codes.push($scope.picked_levels[level][cat]);
            continue outer_loop;
          }
        }
      }
    }
    /* remove duplicate code in the array, only for dev purpose , the ui should not allow this to happen */
    industry_codes = industry_codes.filter(function (code, index, arr) {
      return arr.indexOf(code) === index;
    });

    if (!$scope.isEditMode) {
      forceurl_pickActivity = "pickactivity";
    }

    companyService.updateIndustryCodesInSignup($rootScope.company_uid, $rootScope.currentUser, industry_codes, forceurl_pickActivity, function () {
      $rootScope.user.force_url = 'pickactivity';
      $rootScope.genService.showDefaultSuccessMsg('Industry Codes Added');
      if ($scope.isEditMode) {
        redirectService.changeStateWithLang('pickactivity', { "previousEditPage": 'pickindustry' });
      } else {
        redirectService.changeStateWithLang('pickactivity');
      }
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'industry', 'error', function () {}, function () {});
    });
  };

  /* Get Activity Questions for cache */
  $scope.GetActivities = function () {
    metaService.getActivityQuestions(function (q) {
      return q;
    }, function (error) {
      console.error(error);
    });
  };

  /*Get industries if it's already previously selected*/
  $scope.GetSelectedIndustries = function (callback) {
    $scope.searches = {};
    $scope.cat_limit = 1;
    companyService.getCompanyFromModel($rootScope.company_uid, function (company) {
      if (company.industry_codes) {
        $scope.cat_limit = company.industry_codes.length;
        for (var i = 1; i <= $scope.cat_limit; i++) {
          var industry = getIndustryObjForIndustryCode(company.industry_codes[i - 1]);
          $scope.chosen[i] = industry.code.code;
          if (industry) {
            if ($rootScope.langPreference === 'en') {
              $scope.searches[i] = industry.code.name_en;
            } else {
              $scope.searches[i] = industry.code.name_de;
            }
            $scope.categories[i] = industry;
          }
        }
      }
      if (callback) callback();
    });
  };

  $scope.RebuildIndustries = function (industryCodesList) {
    if (!$rootScope.company) {
      return;
    }
    for (var i in industryCodesList) {
      var code = industryCodesList[i];
      var split = code.split('.');
      var next = "";
      for (var number in split) {
        next += next === "" ? split[number] : '.' + split[number];
        $scope.picked_levels[Number(i)][Number(number)] = next;
      }
    }
  };

  $scope.selectCurrentCompanyIndustryCodes = function () {
    if (!$rootScope.company) {
      return;
    }
    resetPickedLeavels();
    var industryCodesList = $rootScope.company.industry_codes;
    for (var i in industryCodesList) {
      var code = industryCodesList[i];
      var split = code.split('.');
      var next = "";
      for (var number in split) {
        next += next === "" ? split[number] : '.' + split[number];
        $scope.picked_levels[Number(i) + 1][Number(number) + 1] = next;
      }
    }
    $scope.safeApply(function (fn) {
      return fn;
    });
  };

  $scope.Back = function () {
    redirectService.changeStateWithLang('account');
  };

  $scope.toogleShowIndustrySelector = function (isShowIndustrySelectorPage) {
    $scope.showIndustrySelectorPage = isShowIndustrySelectorPage;
    $scope.GetSelectedIndustries(function () {
      $scope.selectCurrentCompanyIndustryCodes();
    });
  };
  $scope.openContactus = function () {
    $rootScope.user.force_url = 'contactus';

    redirectService.changeStateWithLang("contactus");
    companyService.updateCompanyInformation($rootScope.company_uid, { 'could_not_find_industry': true }, function () {}, function (f) {
      return f;
    });
  };

  function setUpSearchableIndustryCodes() {
    industryCodesLeafnodes = [];
    industryCodesLeafnodes = industryService.getIndustryCodesLeafNodes($scope.industries);
    fuse_en = new Fuse(industryCodesLeafnodes, { keys: ['code.name_en', 'code.synonyms_en'] });
    fuse_de = new Fuse(industryCodesLeafnodes, { keys: ['code.name_de', 'code.synonyms_de'] });
  }

  function getIndustryObjForIndustryCode(code) {
    return $scope.industries.find(function (industry) {
      return industry.code.code == code;
    });
  }

  function getParentIndustryObj(industryCode) {}

  /* Controller Load */
  $scope.GetIndustries();
  $scope.GetActivities();
  $scope.selectCurrentCompanyIndustryCodes();
  //$scope.RebuildIndustries($rootScope.company.industry_codes);
}

// Angular Module
angular.module('application').controller('LoginController', LoginController);

// Injections
LoginController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', '$resource', 'authService', 'FoundationApi', 'companyService', 'userService', 'backofficeService', 'redirectService'];

// Controller
function LoginController($rootScope, $scope, $stateParams, $state, $controller, $resource, authService, FoundationApi, companyService, userService, backofficeService, redirectService) {
  angular.extend(this, $controller('DefaultController', { $scope: $scope,
    $stateParams: $stateParams,
    $state: $state }));

  $scope.login = {};
  $scope.forgot = {};
  $scope.disableNxtBtn = false;
  $scope.countries = [{ code: 'DE', name: 'Deutschland' }];
  $scope.signup = {};
  $scope.signup.address = {};
  $scope.signup.address.country = 'Deutschland';

  /** Login Function **/
  $scope.Login = function (form) {
    var params = $scope.login;
    if (!form.$valid) {
      return;
    }
    backofficeService.emailcheckpost($scope.login.email, function () {
      authService.login(params, function (user) {
        redirectService.changeStateWithLang('overview');
        $scope.login.password = null;
      }, function (error) {
        $scope.login.password = null;
        $rootScope.genService.showDefaultErrorMsg(error.code);
        console.error(error);
        backofficeService.logpost(error, $scope.login.email, 'login', 'error', function () {}, function () {});
      });
    }, function (error) {
      console.error(error);
      backofficeService.logpost(error, $scope.login.email, 'login', 'error', function () {}, function () {});
    });
  };

  /* Reset Password */
  $scope.ResetPassword = function (form) {
    if (!form.$valid) {
      return;
    }
    authService.resetPassword($scope.forgot, function () {
      $rootScope.genService.showTopSuccessNotification('We have sent you an email with instructions');
    }, function () {
      $rootScope.genService.showTopSuccessNotification('We have sent you an email with instructions');
    });
  };

  /****************************/
  /*          Signup          */
  /****************************/

  // Signup Model
  $scope.signup = {
    user: {},
    company: {},
    address: {
      country: 'Deutschland'
    }
  };

  $scope.countries = [{ code: 'DE', name: 'Deutschland' }];

  // Check Set
  var checkset = new Set();

  // Signup Function
  $scope.Signup = function (form) {
    if (!form.$valid) {
      return;
    }
    updateLanguagePreference();
    var params = $scope.signup;
    $scope.disableNxtBtn = true;
    $rootScope.authenticating = true;
    backofficeService.emailcheckpost($scope.signup.user.email, function () {
      authService.createUser(params.user, function (firebase_user) {
        userService.createUserAndCompany(firebase_user, params.user, params.company, params.address, function () {
          $scope.disableNxtBtn = false;
          $rootScope.authenticating = null;
          //AuthService.sendEmailVerification(f=>f, f=>f); this is commented out since we changed to custom verification emails
          $rootScope.genService.showDefaultSuccessMsg('Welcome!');
          redirectService.changeStateWithLang('verify');
        }, function (error) {
          console.log('Revoking user creation');
          authService.deleteUser(function (f) {
            return f;
          }, function (f) {
            return f;
          });
          $rootScope.genService.showDefaultErrorMsg(error.code);
          backofficeService.logpost(error, $scope.signup.user.email, 'signup', 'error', function () {}, function () {});
          $scope.disableNxtBtn = false;
          $rootScope.authenticating = null;
        });
      }, function (error) {
        backofficeService.logpost(error, $scope.signup.user.email, 'signup', 'error', function () {}, function () {});
        $rootScope.genService.showDefaultErrorMsg(error.code);
        console.error(error);
        $scope.disableNxtBtn = false;
        $rootScope.authenticating = null;
      });
    }, function (error) {
      console.error(error);
      backofficeService.logpost(error, $scope.signup.user.email, 'signup', 'error', function () {}, function () {});
      $scope.disableNxtBtn = false;
      $rootScope.authenticating = null;
    });
  };

  /* Country */
  // $scope.countries = backofficeService.getcountries(data=>{
  //   $scope.countries = [{code:'DE', name:'Deutschland'}];
  //   $scope.signup.address.country = 'Deutschland';
  // }, error => {
  //   Console.error(error);
  //   BackofficeService.logpost(error, $scope.signup.user.email, 'fetch countries', 'error',()=>{},()=>{});
  // });


  function updateLanguagePreference() {
    if ($rootScope.langPreference) {
      $scope.signup.user.language_preference = $rootScope.langPreference;
    }
  }
}

// Angular Module
angular.module('application').controller('VerifyController', VerifyController);

// Injections
VerifyController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'authService', 'userService', 'redirectService', 'backofficeService', '$window'];

// Function
function VerifyController($rootScope, $scope, $stateParams, $state, $controller, authService, userService, redirectService, backofficeService, $window) {

  angular.extend(this, $controller('DefaultController', { $scope: $scope, $stateParams: $stateParams, $state: $state }));

  /* Resend Verification Email */
  $scope.ResendVerificationEmail = function () {
    if ($rootScope.local_load === true) {
      return;
    }
    $rootScope.local_load = true;
    userService.sendVerificationEmail($rootScope.currentUser, function () {
      $rootScope.genService.showDefaultSuccessMsg('Sent');
      $rootScope.local_load = null;
    }, function (error) {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error, $scope.currentUser, 'verify', 'error', function () {}, function () {});
    });
  };

  $scope.recheck = function () {
    $window.location.reload();
  };

  $scope.CheckIfVerified = function () {
    if (!$rootScope.currentUser) {
      return;
    }
    if (authService.isEmailVerified() === true) {
      userService.update($rootScope.currentUser, { force_url: 'pickindustry' }, function (f) {
        $state.reload();
      });
    }
  };

  $scope.Reload = function () {
    $state.reload();
  };

  /* Check If Verified */
  $scope.CheckIfVerified();
}

angular.module('application').constant('dynamicConfig', {

  /* Firebase Configuration */
  firebase_config: {
    //start-replace-by-prestart//
    apiKey: "AIzaSyDsndvxeuQeO77vZXVI1ac1vZyvX_4gcNs",
    authDomain: "liimex-development.firebaseapp.com",
    databaseURL: "https://liimex-development.firebaseio.com",
    storageBucket: "liimex-development.appspot.com",
    messagingSenderId: "933217935420"
    //end-replace-by-prestart//
  },

  /* Backoffice Service Url*/
  //start-replace-by-prestart//
  backofficeUrl: 'http://localhost:2500'
  // backofficeUrl : 'https://f939d8-06df-49d3-84bd-064190.herokuapp.com'
  //end-replace-by-prestart//

});

/*
* This Directive is called using format-date
* and is used to format the date types from Strings into Date Objects
*/
angular.module('application').directive("formatDate", function () {
  return {
    require: 'ngModel',
    link: function link(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function (modelValue) {
        if (modelValue) {
          return new Date(modelValue);
        } else {
          return null;
        }
      });
    }
  };
});

/*
* This Directive is converts text fields into date pickers
*/
angular.module('application').directive("datepicker", function ($rootScope) {
  return {
    scope: {
      ngModel: '='
    },
    link: function link(scope, elem, attr) {
      var _toObj = eval(scope.ngModel);
      var model_date = new Date(_toObj);
      var model_day = model_date.getDate();
      var model_month = model_date.getMonth() + 1;
      var index_year = attr.maxYear - model_date.getFullYear() + 1;
      var model_year = model_date.getFullYear();

      var INDEX_0 = 0,
          INDEX_1 = 1,
          INDEX_2 = 2;
      var params = attr.minYear && attr.maxYear ? {
        minYear: attr.minYear,
        maxYear: attr.maxYear,
        format: 'x'
      } : {};
      var picker = elem.combodate(params);
      var blank_year = $rootScope.langPreference === 'en' ? 'YYYY' : 'JJJJ';
      if (model_year && model_month && model_day) {
        picker.context.nextElementSibling.children[INDEX_0][INDEX_0].outerHTML = '<option value="" label="DD"  disabled></option>';
        picker.context.nextElementSibling.children[INDEX_1][INDEX_0].outerHTML = '<option value="" label="MM"  disabled></option>';
        picker.context.nextElementSibling.children[INDEX_2][INDEX_0].outerHTML = '<option value="" label="' + blank_year + '" disabled></option>';
        var index_map = [{ start: INDEX_0, check: model_day }, { start: INDEX_1, check: model_month }, { start: INDEX_2, check: index_year }];
        for (var key in index_map) {
          index_map[key].start;
          index_map[key].check;
          for (var index = INDEX_0; index < picker.context.nextElementSibling.children[index_map[key].start].length; index++) {
            if (index === index_map[key].check) {
              var end_option = picker.context.nextElementSibling.children[index_map[key].start][index].outerHTML.slice(7);
              var start_option = picker.context.nextElementSibling.children[index_map[key].start][index].outerHTML.slice(0, 7);
              picker.context.nextElementSibling.children[index_map[key].start][index].outerHTML = start_option.concat(' selected', end_option);
            }
          }
        }
      } else {
        picker.context.nextElementSibling.children[INDEX_0][INDEX_0].outerHTML = '<option value="" label="DD" selected disabled></option>';
        picker.context.nextElementSibling.children[INDEX_1][INDEX_0].outerHTML = '<option value="" label="MM" selected disabled></option>';
        picker.context.nextElementSibling.children[INDEX_2][INDEX_0].outerHTML = '<option value="" label="' + blank_year + '" selected disabled></option>';
      }
      return picker;
    }
  };
});

angular.module("application").directive("footerCustom", ['$rootScope', function ($rootScope) {
  var _templateUrl = 'partials/en/footer.html';
  if ($rootScope.langPreference == 'de') _templateUrl = 'partials/de/footer.html';
  return {
    restrict: 'EA',
    template: '<div ng-include="getTemplateUrl()"></div>',
    scope: true,
    transclude: false,
    controller: 'FooterController'
  };
}]);
/*
* This Directive returns the correct HTML for different Question UI Types
*/
angular.module('application').directive("question", ['$compile', '$http', '$templateCache', '$templateRequest', '$sce', 'uuid2', function ($compile, $http, $templateCache, $templateRequest, $sce, uuid2) {

  /* Get HTML Template */
  function getTemplate(contentType, language) {
    var baseUrl = '/partials/' + language + '/minis/questiontypes/',
        templateMap = {
      number: 'number.html',
      date: 'date.html',
      text: 'text.html',
      form: 'form.html',
      radio: 'radio.html',
      select: 'select.html',
      upload: 'upload.html'
    };
    var templateUrl = baseUrl + (templateMap[contentType] || 'notype.html');
    var templateLoader = $sce.getTrustedResourceUrl(templateUrl);
    return templateLoader;
  }

  // /* Validate */
  // function validate(ui_type, form, model, field_id){
  //   switch(ui_type){
  //     case 'form':
  //     console.log('form', model);
  //     form.$setValidity(field_id, (model !== undefined && model !== null))
  //     break;
  //     default:
  //     break;
  //   }
  // }

  /* Linker */
  function linker(scope, element, attrs, formCtrl) {
    scope.form = formCtrl;
    var templateLoader = getTemplate(scope.data.ui_type, scope.lang || 'en');
    $templateRequest(templateLoader).then(function (html) {
      var view = $compile(html)(scope);
      element.append(view);
    }, function (error) {
      console.error(error);
    });
  }

  return {
    restrict: 'E',
    require: ['^form'],
    replace: false,
    scope: {
      data: '=',
      key: '=',
      ngModel: '='
    },
    link: linker
  };
}]);

/*
* This Directive is called using format-date
* and is used to format the date types from Strings into Date Objects
*/

angular.module('application').directive("signaturePad", ['$interval', '$timeout', '$window', function ($interval, $timeout, $window) {

  var signaturePad,
      element,
      EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';

  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="signature" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
    scope: {
      accept: '=?',
      clear: '=?',
      dataurl: '=',
      height: '@',
      width: '@',
      notifyDrawing: '&onDrawing'
    },
    controller: ['$scope', function ($scope) {
      $scope.accept = function () {
        $scope.$parent.$parent.$parent.$parent.dataurl = $scope.dataurl;
        return {
          isEmpty: $scope.dataurl === EMPTY_IMAGE,
          dataUrl: $scope.dataurl
        };
      };

      $scope.onMouseup = function () {
        $scope.updateModel();

        // Notify that drawing has ended
        $scope.notifyDrawing({ drawing: false });
      };

      $scope.updateModel = function () {

        /*
         Defer handling mouseup event until $scope.signaturePad handles
         first the same event
         */
        $timeout().then(function () {
          $scope.dataurl = $scope.signaturePad.isEmpty() ? EMPTY_IMAGE : $scope.signaturePad.toDataURL("image/jpeg", 100);
        });
      };

      $scope.clear = function () {
        $scope.signaturePad.clear();
        $scope.dataurl = EMPTY_IMAGE;
      };

      $scope.$watch("dataurl", function (dataUrl) {
        if (!dataUrl || $scope.signaturePad.toDataURL("image/jpeg", 100) === dataUrl) {
          return;
        }

        $scope.setDataUrl(dataUrl);
        console.log('data url changed from watch');
        $scope.bangra += "ok";
      });
    }],
    link: function link(scope, element, attrs) {
      var canvas = element.find('canvas')[0];
      var parent = canvas.parentElement;
      var scale = 0;
      var ctx = canvas.getContext('2d');

      var width = parseInt(scope.width, 10);
      var height = parseInt(scope.height, 10);

      canvas.width = width;
      canvas.height = height;

      scope.signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255,255,255,1)'
      });

      scope.setDataUrl = function (dataUrl) {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);

        scope.signaturePad.clear();
        scope.signaturePad.fromDataURL(dataUrl);

        $timeout().then(function () {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(1 / scale, 1 / scale);
        });
      };

      var calculateScale = function calculateScale() {
        var scaleWidth = Math.min(parent.clientWidth / width, 1);
        var scaleHeight = Math.min(parent.clientHeight / height, 1);

        var newScale = Math.min(scaleWidth, scaleHeight);

        if (newScale === scale) {
          return;
        }

        var newWidth = width * newScale;
        var newHeight = height * newScale;
        canvas.style.height = Math.round(newHeight) + "px";
        canvas.style.width = Math.round(newWidth) + "px";

        scale = newScale;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / scale, 1 / scale);
      };

      var resizeIH = $interval(calculateScale, 200);
      scope.$on('$destroy', function () {
        $interval.cancel(resizeIH);
        resizeIH = null;
      });

      angular.element($window).bind('resize', calculateScale);
      scope.$on('$destroy', function () {
        angular.element($window).unbind('resize', calculateScale);
      });

      calculateScale();

      element.on('touchstart', onTouchstart);
      element.on('touchend', onTouchend);

      function onTouchstart() {
        scope.$apply(function () {
          // Notify that drawing has started
          scope.notifyDrawing({ drawing: true });
        });
      }

      function onTouchend() {
        scope.$apply(function () {
          // UpdateModel
          scope.updateModel();

          // Notify that drawing has ended
          scope.notifyDrawing({ drawing: false });
        });
      }
    }
  };
}]);
angular.module('ngSignaturePad', ['application']);

angular.module('application').filter('sortcodes', function () {
  return function (collection, input) {
    var output = [];

    angular.forEach(collection, function (item) {
      if (item.code.level == input.key) {
        if (input.parent && input.parent.split('.').length === 1) {
          if (input.parent === item.code.code.split('.')[0]) {
            output.push(item);
          }
        } else if (input.parent && input.parent.split('.').length === 2) {
          if (input.parent.split('.')[0] === item.code.code.split('.')[0] && input.parent.split('.')[1] === item.code.code.split('.')[1]) {
            output.push(item);
          }
        } else if (input.parent && input.parent.split('.').length === 3) {
          if (input.parent.split('.')[0] === item.code.code.split('.')[0] && input.parent.split('.')[1] === item.code.code.split('.')[1] && input.parent.split('.')[2] === item.code.code.split('.')[2]) {
            output.push(item);
          }
        } else {
          output.push(item);
        }
      }
    });
    return output;
  };
});

/*
* This Directive handles File Uploads
*/
angular.module('application').directive("fileUpload", ['$compile', '$http', '$templateCache', '$templateRequest', '$sce', '$stateParams', '$rootScope', 'backofficeService', 'fileService', function ($compile, $http, $templateCache, $templateRequest, $sce, $stateParams, $rootScope, backofficeService, fileService) {

  /* Constants */
  var UPLOAD_ERROR = 'upload_error';
  var SENDLOG_ID = 'uploader';
  var INSTANT_DIRECTORY = 'product_documents';

  /* Linker */
  function linker(scope, element, attrs) {

    /* Scope Variables */
    scope.files_to_upload = {};
    scope.showUploader = false;
    scope.isUploadDone = false;

    /* Safe Apply */
    scope.safeApply = function (fn) {
      if (!this.$root) {
        return;
      }
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && typeof fn === 'function') {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    /* Upload Files */
    scope.uploadFiles = function (file, process_id, callback, err_call) {
      fileService.uploadFileWithCustomEndpoint([INSTANT_DIRECTORY, process_id], "", file, function (result) {
        scope.ngModel = INSTANT_DIRECTORY.concat('/', process_id, '/', result);
        scope.showUploader = false;
        scope.isUploadDone = true;
        return callback(result);
      }, function () {
        err_call({ code: UPLOAD_ERROR });
        return null;
      });
    };

    /* Perform Upload */
    scope.performUpload = function (files) {
      scope.uploadFiles(files, $stateParams.process_id, function (file_url) {
        scope.safeApply(function (fn) {
          return fn;
        });
      }, function (error) {
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, SENDLOG_ID, 'error', function () {}, function () {});
      });
    };

    /* File Change preview */
    scope.FileChanged = function (file) {
      scope.isChanged = true;
      scope.showUploader = true;
      scope.performUpload(file);
    };
  }

  return {
    restrict: 'AEC',
    scope: false,
    link: linker,
    replace: false
  };
}]);

angular.module('application').filter('days', function ($rootScope) {
  return function (input) {
    var to_return = '-';
    var _lang = $rootScope.langPreference === 'en' ? ' days' : ' tage';
    if (input) {
      to_return = input + _lang;
    }
    return to_return;
  };
});

angular.module('application').filter('deductible', ['$filter', function ($filter) {
  return function () {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var to_return = void 0;
    if (input.deductible_percent_max || input.deductible_absolute_max) {
      if (input.deductible_is_percent && input.deductible_max_is_percent) {
        to_return = $filter('percent')(input.deductible_percent) + ' (Max: ' + $filter('percent')(input.deductible_percent_max) + ')';
      } else if (input.deductible_is_percent && !input.deductible_max_is_percent) {
        to_return = $filter('percent')(input.deductible_percent) + ' (Max: ' + $filter('euro')(input.deductible_absolute_max) + ')';
      } else if (!input.deductible_is_percent && input.deductible_max_is_percent) {
        to_return = $filter('euro')(input.deductible_absolute) + ' (Max: ' + $filter('percent')(input.deductible_percent_max) + ')';
      } else {
        to_return = $filter('euro')(input.deductible_absolute) + ' (Max: ' + $filter('euro')(input.deductible_absolute_max) + ')';
      }
    } else {
      if (input.deductible_percent && input.deductible_is_percent) {
        to_return = $filter('percent')(input.deductible_percent);
      } else if (input.deductible_absolute && !input.deductible_is_percent) {
        to_return = $filter('euro')(input.deductible_absolute);
      }
    }
    to_return = to_return || '-';
    //to_return = to_return == 'undefined' || '-';
    return to_return;
  };
}]);

angular.module('application').filter('euro', ['$rootScope', function ($rootScope) {
  return function () {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var is_unlimited = arguments[1];

    var _return_unlimited = $rootScope.langPreference === 'en' ? 'Unlimited' : 'Unbegrenzt';
    if (is_unlimited === true) {
      return _return_unlimited;
    }
    input = Number(input).toFixed(2);
    var split_input = input.toString().split('.');
    var whole = split_input[0];
    var decimal = split_input[1] || '00';
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var to_return = whole + ',' + decimal;
    if (input == 0) {
      return '-';
    }
    return '€' + to_return;
  };
}]);

angular.module('application').filter('maximisation', function () {
  return function (input) {
    var to_return = '-';
    if (input) {
      to_return = input + 'x';
    }
    return to_return;
  };
});

angular.module('application').filter('percent', function () {
  return function (input) {
    var to_return = '-';
    if (input) {
      to_return = input + '%';
    }
    return to_return;
  };
});

angular.module('application').filter('questionTrigger', function () {
  return function (input) {
    var to_return = true;
    if (input.answer === "true" || !input.answer && input.value !== input.answer) {
      input.answer = null;
      to_return = false;
    }
    if (input.condition !== null && input.value !== null && input.answer !== null && input.condition !== undefined && input.value !== undefined && input.answer !== undefined) {
      switch (input.condition) {
        case '==':
          to_return = input.value === input.answer;
          break;
        case '<':
          to_return = input.value < input.answer;
          break;
        case '>':
          to_return = input.value > input.answer;
          break;
        case '>=':
          to_return = input.value >= input.answer;
          break;
        case '<=':
          to_return = input.value <= input.answer;
          break;
        case '!=':
          to_return = input.value >= input.answer;
          break;
        default:
          to_return = false;
          break;
      }
    }
    return to_return;
  };
});

angular.module('application').filter('uuid', ['uuid2', function (uuid2) {
  return function () {
    return uuid2.newuuid();
  };
}]);

(function () {

  'use strict';

  angular.module('application').service('apiService', apiService);

  apiService.$inject = ['$rootScope', '$resource', 'endpointService'];

  /* Service Function */
  function apiService($rootScope, $resource, endpointService) {

    // /* Instant Purchase Process */
    // const InstantPurchaseProcess = $resource(endpointService.INSTANT_PURSHACE_PROCESS, {
    //   process_id : false
    // }, {
    //   new : {method: 'POST'},
    //   get : {method: 'GET'}
    // });

    /* Get Instant Product Questions */
    var InstantPurchaseQuestions = $resource(endpointService.INSTANT_PURCHASE_QUESTIONS);

    /* Save Instant Product Answers */
    var InstantPurchaseAnswers = $resource(endpointService.INSTANT_PURCHASE_ANSWERS);

    /* Get Instant Product Comparison */
    var InstantPurchaseComparisons = $resource(endpointService.INSTANT_PURCHASE_COMPARISON);

    /* Save Instant Product Comparison */
    var InstantPurchaseComparisonAnswers = $resource(endpointService.INSTANT_PURCHASE_COMPARISON);

    /* Get Additional Instant Product Comparison */
    var InstantPurchaseAdditionalComparisons = $resource(endpointService.INSTANT_PURCHASE_ADDITIONALS);

    /* Save Additional Instant Product Comparison */
    var InstantPurchaseAdditionalComparisonAnswers = $resource(endpointService.INSTANT_PURCHASE_ADDITIONALS);

    /* Save User */
    var InstantPurchaseUser = $resource(endpointService.INSTANT_PURCHASE_USER);

    /* Get User */
    var InstantPurchaseUserInfo = $resource(endpointService.INSTANT_PURCHASE_USER);

    /* Get the whole Instant Product object */
    var InstantPurchaseRequest = $resource(endpointService.INSTANT_PURCHASE_REQUEST, null, {
      get: { method: 'GET', cancellable: true },
      save: { method: 'POST', cancellable: true },
      update: { method: 'PUT', cancellable: true }
    });

    /* Save the document */
    var InstantPurchaseUpload = $resource(endpointService.INSTANT_PURCHASE_DOCUMENTS);

    /* Mandate */
    var Mandate = $resource(endpointService.MANDATE, {
      company_id: false
    }, {
      sign: { method: 'POST' }
    });

    // /* Company */
    var Company = $resource(endpointService.COMPANY);

    /* Checkout */
    var InstantPurchaseCheckout = $resource(endpointService.INSTANT_PURCHASE_CHECKOUT);

    /* Process Complete */
    var InstantPurchaseProcessComplete = $resource(endpointService.INSTANT_PURCHASE_PROCESS_COMPLETE);

    /* Return Stuff */
    return {
      InstantPurchaseQuestions: InstantPurchaseQuestions,
      InstantPurchaseAnswers: InstantPurchaseAnswers,
      InstantPurchaseComparisons: InstantPurchaseComparisons,
      InstantPurchaseComparisonAnswers: InstantPurchaseComparisonAnswers,
      InstantPurchaseAdditionalComparisons: InstantPurchaseAdditionalComparisons,
      InstantPurchaseAdditionalComparisonAnswers: InstantPurchaseAdditionalComparisonAnswers,
      InstantPurchaseUser: InstantPurchaseUser,
      InstantPurchaseUserInfo: InstantPurchaseUserInfo,
      InstantPurchaseRequest: InstantPurchaseRequest,
      InstantPurchaseUpload: InstantPurchaseUpload,
      Company: Company,
      Mandate: Mandate,
      InstantPurchaseCheckout: InstantPurchaseCheckout,
      InstantPurchaseProcessComplete: InstantPurchaseProcessComplete
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', '$state'];

  function authService($rootScope, $firebaseAuth, $state) {

    /* On Auth State Changed */
    $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        console.log("Authentication Approved");
      } else {
        console.log("Authentication Denied");
        if ($firebaseAuth.currentUser) {
          $state.reload();
        }
      }
    });

    /* Login */
    function login(credentials, success, err_call) {
      $firebaseAuth().$signInWithEmailAndPassword(credentials.email, credentials.password).then(function (firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        success(firebaseUser);
      }).catch(function (error) {
        err_call(error);
        console.error("Authentication failed:", error);
      });
    }

    /* Change Email */
    function changeEmail(user_obj, new_email, callback, err_call) {
      user_obj.updateEmail(new_email).then(function () {
        callback();
      }, function (error) {
        console.error('Email Change Failed', error);
        err_call(error);
      });
    }

    /* Logout */
    function logout(success, err_call) {
      $firebaseAuth().$signOut().then(function () {
        $rootScope = null;
        $state.reload();
        success();
      }, function (error) {
        err_call(error);
        console.log("Error: ", error);
      });
    }

    /* Send Email Verification */
    function sendEmailVerification(callback, err_call) {
      $firebaseAuth().$getAuth().sendEmailVerification().then(callback, err_call);
    }

    function isEmailVerified() {
      if ($firebaseAuth().$getAuth()) {
        return $firebaseAuth().$getAuth().emailVerified;
      }
      return null;
    }

    /* Create User */
    function createUser(params, success, err_call) {
      $firebaseAuth().$createUserWithEmailAndPassword(params.email, params.password).then(function (firebaseUser) {
        console.log("AuthUser: " + firebaseUser.uid + " created successfully!");
        success(firebaseUser);
      }).catch(function (error) {
        err_call(error);
        console.error("Error: ", error);
      });
    }

    /* Reset Password */
    function resetPassword(user_data, success, err_call) {
      $firebaseAuth().$sendPasswordResetEmail(user_data.email).then(function () {
        console.log('password reset requested');
        success();
      }, function (error) {
        console.log('cant reset password', error);
        err_call();
      });
      $state.reload();
    }

    /* Get User */
    function getCurrentUser(callback) {
      var firebaseUser = $firebaseAuth().$getAuth();
      if (firebaseUser) {
        callback(firebaseUser);
      } else {
        callback(null);
      }
    }

    /* Delte User */
    function deleteUser(success, err_call) {
      getCurrentUser(function (authObj) {
        authObj.delete().then(function () {
          success();
        }, function (error) {
          err_call(error);
        });
      });
    }

    /* Return Stuff */
    return {
      getCurrentUser: getCurrentUser,
      createUser: createUser,
      resetPassword: resetPassword,
      login: login,
      logout: logout,
      changeEmail: changeEmail,
      deleteUser: deleteUser,
      sendEmailVerification: sendEmailVerification,
      isEmailVerified: isEmailVerified
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('backofficeService', backofficeService);

  backofficeService.$inject = ['$rootScope', 'requestService'];

  function backofficeService($rootScope, requestService) {

    /* Endpoints */
    var API_LOG = '/api/log';
    var API_EMAIL = '/api/email/';
    var API_COUNTRIES = '/api/countries';
    var API_MANDATE = '/api/company/:company_uid/mandate';
    var API_INIT_MANDATE = '/api/company/:company_uid/mandate/init';

    /* Get Office Logs */
    function logpost(logs_object, user, program, level, callback, err_call) {
      var params = {
        logs_object: logs_object,
        user: user,
        program: program,
        level: level,
        source: 'platform'
      };
      requestService.postLiimexResourceWithParams($rootScope.backoffice_url + API_LOG, params, callback, err_call);
    }

    /* Email Check Post */
    function emailcheckpost(email, callback, err_call) {
      var params = { email: email };
      requestService.postLiimexResourceWithParams($rootScope.backoffice_url + API_EMAIL, params, callback, err_call);
    }

    /* Get Countries */
    function getcountries(callback, err_call) {
      requestService.getResource($rootScope.backoffice_url + API_COUNTRIES, {}, callback, err_call);
    }

    function postMandate(mandate_data, callback, err_call) {
      var request_url = $rootScope.backoffice_url + API_MANDATE.replace(':company_uid', mandate_data.company_uid);
      requestService.postLiimexResourceWithParams(request_url, mandate_data, callback, err_call);
    }

    function initMandate(company_uid, callback, err_call) {
      var request_url = $rootScope.backoffice_url + API_INIT_MANDATE.replace(':company_uid', company_uid);
      requestService.postLiimexResourceWithParams(request_url, {}, callback, err_call);
    }

    /* Return Stuff */
    return {
      logpost: logpost,
      emailcheckpost: emailcheckpost,
      getcountries: getcountries,
      postMandate: postMandate,
      initMandate: initMandate
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('claimService', claimService);

  claimService.$inject = ['$rootScope', 'firebase', '$firebaseObject'];

  /* Get Specific Endpoint */
  /* Needed to reset endpoint between users sign in/out */
  function getSpecificEndpoint(company_uid) {
    return firebase.database().ref().child('claims/' + company_uid);
  }

  function claimService($rootScope, firebase, $firebaseObject) {

    /* Get Claims */
    function getClaims(company_uid, callback, err) {
      var claimsRef = getSpecificEndpoint(company_uid);
      claimsRef.once('value').then(function (snapshot) {
        var claims = snapshot.val();
        callback(claims);
      }, function (error) {
        err(error);
      });
    }

    /* Make New Claim */
    function makeNewClaim(claim, success, err) {
      var claimsRef = getSpecificEndpoint($rootScope.user.company);
      claim.timestamp = $rootScope.genService.getTimestamp();
      claim.status = 'pending';
      var claimRef = claimsRef.push(claim).then(function () {
        success();
        activityService.logActivity({
          activity: 'You made a claim',
          next: 'Waiting for review',
          timestamp: $rootScope.genService.getTimestamp()
        });
      }, function (error) {
        err();
      });
    }

    /* Return Stuff */
    return {
      makeNewClaim: makeNewClaim,
      getClaims: getClaims
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('companyService', companyService);

  companyService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService'];

  /* Endpoints */
  var company_prefix = 'companies';
  var address_prefix = 'addresses';
  var industry_suffix = 'industry_codes';
  var activity_suffix = 'activities';
  var users_prefix = 'users';
  var force_suffix = 'force_url';
  var meta_prefix = 'meta';
  var financials_suffix = 'financials';
  var insurance_questionnaire_suffix = 'insurance_questionnaire';

  var company_model = {};
  var address_model = {};
  var industry_codes_model = {};
  var activity_model = {};

  function companyService($rootScope, firebase, $firebaseObject, requestService) {

    /* Get Company Info */
    function getCompanyInformation(company_uid, callback, err_call) {
      requestService.getDataOnce([company_prefix, company_uid], callback, err_call);
    }

    /* Get Company Address */
    function getCompanyAddress(company_uid, callback, err_call) {
      requestService.getDataOnce([address_prefix, company_uid], callback, err_call);
    }

    /* Update Company Information */
    function updateCompanyInformation(company_uid, params, callback, err_call) {
      requestService.updateData([company_prefix, company_uid], params, callback, err_call);
    }

    /* Update Address */
    function updateAddress(address_uid, params, callback, err_call) {
      requestService.updateData([address_prefix, address_uid], params, callback, err_call);
    }

    /* Update Industry Codes */
    function updateIndustryCodesInSignup(company_uid, user_uid, industry_codes, forceurl_pickFinancials, callback, err_call) {
      requestService.deepWrite([{
        route: [company_prefix, company_uid],
        uid: industry_suffix,
        data: industry_codes }, {
        route: [users_prefix, user_uid],
        uid: force_suffix,
        data: forceurl_pickFinancials }], false, callback, err_call);
    }

    /* Update Financials */
    function updateFinancials(company_uid, user_uid, financials, forceurl_pickActivity, callback, err_call) {
      requestService.deepWrite([{
        route: [company_prefix, company_uid],
        uid: financials_suffix,
        data: financials }, {
        route: [users_prefix, user_uid],
        uid: force_suffix,
        data: forceurl_pickActivity }], false, callback, err_call);
    }

    /* Update insurance questions and answers; for the given array, save answers of  main questions and it's triggermatching sub questions */
    function updateInsuraceAnswer(company_uid, insuranceQuestions, callback, err_call) {
      var newUpdate = {};
      insuranceQuestions.forEach(function (mainQuestion) {
        if (mainQuestion.key && mainQuestion.answer !== undefined) {
          var answerObj = { 'answer': mainQuestion.answer };
          var path = company_prefix + '/' + company_uid + '/' + insurance_questionnaire_suffix + '/' + mainQuestion.key + '/';
          newUpdate[path] = answerObj;
        }
        if (mainQuestion.triggerMarchingSubQs) {
          mainQuestion.triggerMarchingSubQs.forEach(function (subQuestion) {
            if (subQuestion.key && subQuestion.answer !== undefined) {
              var _answerObj = { 'answer': subQuestion.answer };
              var _path = company_prefix + '/' + company_uid + '/' + insurance_questionnaire_suffix + '/' + subQuestion.key + '/';
              newUpdate[_path] = _answerObj;
            }
          });
        }
      });
      requestService.multiPathUpdate(newUpdate, callback, err_call);
    }

    /* On Child Value Changed */
    function getCompanyFromModel(company_uid, callback, err_call) {
      if (company_model.company && company_uid === company_model.key) {
        console.log('Returnng company');
        callback(company_model.company);
        return;
      }
      requestService.on_child_value([company_prefix, company_uid], function (company) {
        console.log('Company Model Updated!');
        company_model.key = company.key;
        company_model.company = company.val();
        callback(company_model.company);
      }, function (error) {
        err_call(error);
      });
    }

    /* Get Addresses */
    function getAndStoreAddresses(key, callback, err_call) {
      if ($rootScope.company.addresses[key] === true && address_model[key]) {
        console.log('Returning address model');
        callback(address_model[key]);
        return;
      }
      requestService.on_child_value([address_prefix, key], function (address) {
        console.log('Updating address');
        address_model[key] = address;
        callback(address_model[key]);
      }, function (error) {
        err_call(error);
      });
    }

    /* Get Industry Codes */
    function getAndStoreIndustryCodes(key, callback, err_call) {
      if (industry_codes_model[key]) {
        console.log('Returning industry model');
        callback(industry_codes_model[key]);
        return;
      }
      requestService.on_child_value_order_by([meta_prefix, industry_suffix], 'code', key, function (industry_code) {
        console.log('Updating Industry');
        industry_codes_model[key] = industry_code;
        callback(industry_codes_model[key]);
      }, function (error) {
        err_call(error);
      });
    }

    /* Get Activities */
    function getAndStoreMyActivities(key, callback, err_call) {
      if (activity_model[key]) {
        console.log('Returning Activity');
        callback(activity_model[key]);
        return;
      }
      requestService.on_child_value([meta_prefix, activity_suffix, key], function (activity) {
        console.log('Updating Activity');
        activity_model[key] = activity;
        callback(activity_model[key]);
      }, function (error) {
        err_call(error);
      });
    }

    /* Return Stuff */
    return {
      getCompanyInformation: getCompanyInformation,
      getCompanyAddress: getCompanyAddress,
      updateCompanyInformation: updateCompanyInformation,
      updateAddress: updateAddress,
      updateIndustryCodesInSignup: updateIndustryCodesInSignup,
      getCompanyFromModel: getCompanyFromModel,
      getAndStoreAddresses: getAndStoreAddresses,
      getAndStoreIndustryCodes: getAndStoreIndustryCodes,
      getAndStoreMyActivities: getAndStoreMyActivities,
      updateFinancials: updateFinancials,
      updateInsuraceAnswer: updateInsuraceAnswer
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('documentService', documentService);

  documentService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService', 'fileService'];

  /* Endpoints */
  var document_prefix = 'documents';
  var mandate_suffix = 'mandates';
  var policy_suffix = 'policies';

  /* Model */
  var model = {};

  /* Service Function */
  function documentService($rootScope, firebase, $firebaseObject, requestService, fileService) {

    /* Upload Files */
    function uploadPolicies(files, company_uid, callback, err_call) {
      var count = 0;
      var file_urls = [];
      for (var key in files) {
        fileService.uploadFileWithCustomEndpoint([document_prefix, company_uid], "", files[key], function (file) {
          count++;
          file_urls.push(file);
          if (count === Object.keys(files).length) {
            callback(file_urls);
            return;
          }
        }, function () {
          err_call({ code: "", message: "" });
          return;
        });
      }
    }

    /* Download Document */
    function downloadPolicy(file_url, company_uid, callback, err_call) {
      fileService.downloadFileWithCustomEndpoint([document_prefix, company_uid], file_url, callback, err_call);
    }

    /* Create Document */
    function createDocuments(url_list, company_uid, callback, err_call) {
      var document_keys = [];
      for (var elem in url_list) {
        document_keys.push({ name: elem, route: [document_prefix, policy_suffix] });
      }
      requestService.getMultipleKeys(document_keys, function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        for (var elem in keys) {
          newUpdate[keys[elem].route + keys[elem].key] = {
            file: url_list[elem], created_at: now, updated_at: now, company: company_uid
          };
        }
        callback(newUpdate, keys);
      });
    }

    /* Get Document */
    function getDocument(route, key, callback, err_call) {
      requestService.getDataOnce((route + key).split('/'), callback, err_call);
    }

    /* Get and Store Mandate */
    function getAndStoreMandate(key, callback, err_call) {
      if (model[key]) {
        console.log('Returning mandate');
        callback(model[key]);
        return;
      }
      requestService.on_child_value([document_prefix, mandate_suffix, key], function (document) {
        console.log('Updating mandate');
        model[key] = document;
        callback(model[key]);
      }, function (error) {
        err_call(error);
      });
    }

    /* Return Stuff */
    return {
      getAndStoreMandate: getAndStoreMandate,
      uploadPolicies: uploadPolicies,
      createDocuments: createDocuments,
      getDocument: getDocument,
      downloadPolicy: downloadPolicy
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('endpointService', endpointService);

  endpointService.$inject = ['$rootScope', 'dynamicConfig'];

  /* Consts */
  var api_prefix = '/api';

  /* Service Function */
  function endpointService($rootScope, dynamicConfig) {

    /* New Endpoint */
    String.prototype.makeEndpoint = function () {
      return dynamicConfig.backofficeUrl.concat(api_prefix, this);
    };

    /* Instant Purchase Process */
    var INSTANT_PURSHACE_PROCESS = '/instant_purchase/process/:process_id'.makeEndpoint();
    var INSTANT_PURCHASE_QUESTIONS = '/instant_purchase/questions'.makeEndpoint();
    var INSTANT_PURCHASE_ANSWERS = '/instant_purchase/answers'.makeEndpoint();
    var INSTANT_PURCHASE_PRODUCTS = '/instant_purchase/products'.makeEndpoint();
    var INSTANT_PURCHASE_COMPARISON = '/instant_purchase/comparison'.makeEndpoint();
    var INSTANT_PURCHASE_ADDITIONALS = '/instant_purchase/additionals'.makeEndpoint();
    var INSTANT_PURCHASE_USER = '/instant_purchase/user_information'.makeEndpoint();
    var INSTANT_PURCHASE_INFORMATION = '/instant_purchase/insurance_information'.makeEndpoint();
    var INSTANT_PURCHASE_DOCUMENTS = '/instant_purchase/documents'.makeEndpoint();
    var INSTANT_PURCHASE_CHECKOUT = '/instant_purchase/checkout'.makeEndpoint();
    var INSTANT_PURCHASE_STATUS = '/instant_purchase/status'.makeEndpoint();
    var INSTANT_PURCHASE_REQUEST = '/instant_purchase/instant_product_request'.makeEndpoint();
    var INSTANT_PURCHASE_PROCESS_COMPLETE = '/instant_purchase/process_complete'.makeEndpoint();

    /* Company */
    var COMPANY = '/company/:company_id'.makeEndpoint();

    /* Mandate */
    var MANDATE = '/company/:company_id/mandate'.makeEndpoint();

    /* Return Stuff */
    return {
      INSTANT_PURSHACE_PROCESS: INSTANT_PURSHACE_PROCESS,
      INSTANT_PURCHASE_QUESTIONS: INSTANT_PURCHASE_QUESTIONS,
      INSTANT_PURCHASE_ANSWERS: INSTANT_PURCHASE_ANSWERS,
      INSTANT_PURCHASE_PRODUCTS: INSTANT_PURCHASE_PRODUCTS,
      INSTANT_PURCHASE_COMPARISON: INSTANT_PURCHASE_COMPARISON,
      INSTANT_PURCHASE_ADDITIONALS: INSTANT_PURCHASE_ADDITIONALS,
      INSTANT_PURCHASE_USER: INSTANT_PURCHASE_USER,
      INSTANT_PURCHASE_INFORMATION: INSTANT_PURCHASE_INFORMATION,
      INSTANT_PURCHASE_DOCUMENTS: INSTANT_PURCHASE_DOCUMENTS,
      INSTANT_PURCHASE_CHECKOUT: INSTANT_PURCHASE_CHECKOUT,
      INSTANT_PURCHASE_STATUS: INSTANT_PURCHASE_STATUS,
      INSTANT_PURCHASE_REQUEST: INSTANT_PURCHASE_REQUEST,
      COMPANY: COMPANY,
      MANDATE: MANDATE,
      INSTANT_PURCHASE_PROCESS_COMPLETE: INSTANT_PURCHASE_PROCESS_COMPLETE
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('externalService', externalService);

  externalService.$inject = ['companyService', 'metaService', '$rootScope', '$window', 'uuid2'];

  function externalService(companyService, metaService, $rootScope, $window, uuid2) {

    /**
     * Init FreshChat
     */
    function initFreshChat() {
      if (!($rootScope.user && $rootScope.company && document)) return;

      // document.write('<script type="text/javascript" src="https://wchat.freshchat.com/js/widget.js" async>// ProductionAnalyticsCodeHere</script>');
      // $window.fcSettings = {
      //   token: "32875de7-d02c-4787-9f7f-0680de683c95",
      //   host: "https://wchat.freshchat.com",
      //   externalId: "uuid2.newuuid()",
      //   firstName: "$rootScope.user.first_name",
      //   lastName: "$rootScope.user.last_name",
      //   email: "$rootScope.user.email",
      //   phone: "$rootScope.company.phone",
      //   phoneCountryCode: "+49"
      // }
    }

    /* Return Stuff */
    return {
      initFreshChat: initFreshChat
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('fileService', fileService);

  fileService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'uuid2'];

  // Parse File Name
  function parseFileName(userId, blob, uuid2) {
    var extension = blob.type.split('/')[1];
    return uuid2.newuuid() + '.' + extension;
  }

  /* Get Dynamic Endpoint */
  /* Needed to reset endpoint between users sign in/out */
  function getEndpoint(routeList) {
    var route = "";
    for (var i in routeList) {
      route = route.concat(routeList[i], '/');
    }
    console.log('Requested Storage Route:', route);
    return firebase.storage().ref().child(route);
  }

  function fileService($rootScope, firebase, $firebaseObject, uuid2) {

    // Policies Reference
    var policiesRef = firebase.storage().ref().child('policies/');

    /* Download A Policy */
    function downloadSinglePolicy(file_url, callback) {
      var policyRef = policiesRef.child(file_url);
      policyRef.getDownloadURL().then(function (url) {
        callback(url);
      }, function (error) {});
    }

    /* Upload file */
    function uploadFile(company_uid, fileItem, callback, err) {
      var file_url = parseFileName(company_uid, fileItem, uuid2);
      var newPolicyRef = policiesRef.child(file_url);
      newPolicyRef.put(fileItem).then(function (snapshot) {
        callback(file_url);
      }, function (error) {
        err(error);
      });
    }

    /* Upload File With Custom Endpoint */
    function uploadFileWithCustomEndpoint(route, file_id, fileItem, callback, err_call) {
      var file_url = parseFileName(file_id, fileItem, uuid2);
      var storageRef = getEndpoint(route).child(file_url);
      storageRef.put(fileItem).then(function (snapshot) {
        callback(file_url);
      }, function (error) {
        err_call(error);
      });
    }

    /* Upload File With Custom Endpoint and custom name */
    function uploadFileWithCustomEndpointCustomName(route, fileItem, custom_name, callback, err_call) {
      // Var file_url = parseFileName(file_id, fileItem);
      var directory = route[0] + "/" + route[1] + "/" + custom_name;
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(directory);
      fileRef.put(fileItem).then(function (snapshot) {
        callback(custom_name);
      }, function (error) {
        err_call(error);
      });
    }

    /* Download File With Custom Endpoint */
    function downloadFileWithCustomEndpoint(route, file_url, callback, err_call) {
      var storageRef = getEndpoint(route).child(file_url);
      storageRef.getDownloadURL().then(function (url) {
        callback(url);
      }, function (error) {
        err_call(error);
      });
    }

    function downloadWithName(from, rename_to) {
      var rename_to_urlencoded = encodeURIComponent(rename_to);
      window.location.assign($rootScope.backoffice_url + "/api/download?from=" + from + "&as=" + rename_to_urlencoded);
    }

    /* Return Stuff */
    return {
      uploadFile: uploadFile,
      downloadWithName: downloadWithName,
      downloadSinglePolicy: downloadSinglePolicy,
      uploadFileWithCustomEndpoint: uploadFileWithCustomEndpoint,
      downloadFileWithCustomEndpoint: downloadFileWithCustomEndpoint,
      uploadFileWithCustomEndpointCustomName: uploadFileWithCustomEndpointCustomName
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('genService', genService);

  genService.$inject = ['$rootScope', 'FoundationApi'];

  function genService($rootScope, FoundationApi) {

    var notificationDic = {
      'auth/app-deleted': "Something went wrong, please contact us (1)",
      'auth/app-not-authorized': "Something went wrong, please contact us (2)",
      'auth/argument-error': "Error while logging in. Please contact us",
      'auth/email-already-in-use': "Email Already In Use",
      'auth/invalid-api-key': "Invalid api key",
      'auth/invalid-email': "Invalid Email",
      'auth/invalid-user-token': "Please sign in again",
      'auth/network-request-failed': "Network request failed, please check your internet connection",
      'auth/operation-not-allowed': "Operation not allowed",
      'auth/requires-recent-login': "Please sign in again",
      'auth/too-many-requests': "Too many requests",
      'auth/weak-password': "Passwords must be at least 6 characters",
      'auth/unauthorized-domain': "App domain is not authorized",
      'auth/user-disabled': "Your account has been disabled by an administrator",
      'auth/user-token-expired': "Credential has expired",
      'auth/web-storage-unsupported': "Your browser does not support web storage",
      'auth/wrong-password': "Invalid Email or Password",
      'auth/user-not-found': "User not found",
      'PERMISSION_DENIED': "permission denied",
      'SWW': "Something went wrong. Please contact us or try again (3)",
      '500': "Something went wrong. Please contact us or try again (Status: 500)",
      '-1': "Request Timed Out",
      'upload_error': "Could not upload file, please try again. (Status: 400)",
      'en/duplicate-industry-codes-selected': "Industry code already selected",
      'de/duplicate-industry-codes-selected': "Diese Branche wurde bereits ausgewählt"

    };

    var number_dict = {};
    number_dict.en = {};
    number_dict.de = {};
    number_dict.en[1] = 'First';
    number_dict.en[2] = 'Second';
    number_dict.en[3] = 'Third';
    number_dict.en[4] = 'Fourth';
    number_dict.en[5] = 'Fifth';
    number_dict.en[6] = 'Sixth';

    number_dict.de[1] = 'Erste';
    number_dict.de[2] = 'Zweite';
    number_dict.de[3] = 'Dritte';
    number_dict.de[4] = 'Vierte';
    number_dict.de[5] = 'Fünfte';
    number_dict.de[6] = 'Sechste';

    /*******************************/
    /**      Screen Messages      **/
    /*******************************/

    /* Show Success Message */
    function showDefaultSuccessMsg(msg) {
      // FoundationApi.publish('success-notification', {
      //     content: '   ' + msg,
      //     color:"success",
      //     autoclose:3000
      // });
      $rootScope.local_load = null;
      try {
        //$rootScope.$apply();
      } catch (e) {
        console.log('Apply Caught!');
      }
    }

    /* Show Error Message */
    function showDefaultErrorMsg(id) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

      /*TODO: actually fix it in firebase*/
      if (id == "PERMISSION_DENIED") return;
      var msg = notificationDic[id];
      if (msg == undefined) {
        msg = id;
      }
      FoundationApi.publish('top-notification', {
        content: '   ' + msg,
        color: "success",
        autoclose: time
      });
      $rootScope.local_load = null;
      try {
        //$rootScope.$apply();
      } catch (e) {
        console.log('Apply Caught!');
      }
    }

    /* Show Top Error Message */
    function showTopErrorMessage(msg) {
      FoundationApi.publish('top-notification', {
        content: '   ' + msg,
        color: "success",
        autoclose: 3000
      });
    }

    /* Show Top Success Message */
    function showTopSuccessNotification(msg) {
      console.log('YO');
      FoundationApi.publish('top-success-notification', {
        content: '   ' + msg,
        color: "success",
        autoclose: 3000
      });
    }

    /*******************************/
    /**       DATA Objects        **/
    /*******************************/

    /* Data URI to Blob */
    function dataURItoBlob(dataURI) {
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      } else {
        byteString = unescape(dataURI.split(',')[1]);
      }
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    }

    /*******************************/
    /**      DOM (custom inputs)  **/
    /*******************************/

    /* Save Dates From HTML to model */
    function saveDOMValueToVariable(model, value_bind_array) {
      for (var key in value_bind_array) {
        model[value_bind_array[key]] = document.getElementById(value_bind_array[key]).value;
      }
    }

    /*******************************/
    /**           Numbers         **/
    /*******************************/

    /* Get Number With Thousand Seperator */
    function getSepThousands(number) {
      if (number === undefined) {
        return;
      }

      var decimal = number.toString().split('.')[1];
      decimal = decimal ? decimal : '00';
      decimal = decimal.charAt(1) ? decimal : decimal + '0';
      decimal = decimal.split("").reverse().join("");
      number = number.toString().split('.')[0];
      var string = number.toString().split("").reverse().join("");
      var new_string = "";
      for (var i = 0; i < string.length; i++) {
        new_string += (i + 1) % 3 === 0 && i < string.length - 1 ? string[i] + '.' : string[i];
      }
      new_string = decimal + ',' + new_string;
      return new_string.split("").reverse().join("");
    }

    /*get the deductable type based on the suffix added (% for percent)*/
    function getDeductableType(str) {
      str = str.toString();
      if (str) {
        var suffix = str.toString().slice(-1);
        if (suffix == "%") {
          return str;
        } else {
          var thousandSepStr = getSepThousands(str);
          return '€' + thousandSepStr;
        }
      }
    }

    /* Capitalize */
    function capitalize(string) {
      if (string === undefined) return;

      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /* Generate Company IDs */
    function generateCompanyId(company, address) {
      var lower_code = company.name[0] + address.street[0] + address.country[0];
      if (lower_code) {
        var upper_code = lower_code.toUpperCase();
      } else {
        var upper_code = lower_code;
      }
      var date = new Date(),
          milistamp = date.getTime().toString().slice(-4),
          random_num = Math.floor(Math.random() * 9999);
      random_num = '0'.repeat(4 - random_num.toString().length).concat(random_num);
      var final_code = upper_code + '-' + random_num + '-' + milistamp;
      return final_code;
    }

    /*******************************/
    /**       Convinience         **/
    /*******************************/

    /* JS Download */
    function downloadWithLink(url_for_download) {
      var a = document.createElement('a');
      a.href = url_for_download;
      a.download = 'document_name';
      a.target = '_self';
      a.click();
    }

    /* Set Confirm Action */
    function setConfirmAction(action) {
      if (action) {
        $rootScope.confirm_action = action;
      } else {
        console.log('No Confirm Action!');
      }
    }

    /* Execute Confirm Action */
    function executeConfirmAction() {
      if ($rootScope.confirm_action) {
        $rootScope.confirm_action();
      } else {
        console.log('No Confirm Action!');
      }
    }

    /*******************************/
    /**         Formatting        **/
    /*******************************/

    // Generate Variable Name
    function generateVariableName(str) {
      return str.replace(/ /g, "_").toLowerCase();
    }

    /*******************************/
    /**           Time           **/
    /*******************************/

    /* Get Timestamp */
    function getTimestamp() {
      var date = new Date();
      return date.toString();
    }

    /* Get Timestamp Mili */
    function getTimestampMili() {
      var date = new Date();
      return date.getTime().toString();
    }

    /* Prettify String */
    function prettify(input) {
      var no_score = input.replace('_', ' ');
      return capitalize(no_score);
    }

    /* Num To Word Certain */
    function numToWordC(num) {
      return number_dict[$rootScope.langPreference][num];
    }

    /* Prettify Bool */
    function prettyBool(bool) {
      if ($rootScope.langPreference === "en") {
        return bool === true ? 'Yes' : 'No';
      } else {
        return bool === true ? 'Ja' : 'Nein';
      }
    }

    /*returns js date obj for utc adte string*/
    function getDateObj(dateStr) {
      return new Date(dateStr);
    }

    /**/
    function dictToArray(dictionary) {
      var to_return = [];
      for (var key in dictionary) {
        to_return.push({
          key: key,
          item: dictionary[key]
        });
      }
      return to_return;
    }

    /* Return Stuff */
    return {
      getSepThousands: getSepThousands,
      capitalize: capitalize,
      getTimestamp: getTimestamp,
      getTimestampMili: getTimestampMili,
      generateCompanyId: generateCompanyId,
      showDefaultSuccessMsg: showDefaultSuccessMsg,
      showDefaultErrorMsg: showDefaultErrorMsg,
      prettify: prettify,
      saveDOMValueToVariable: saveDOMValueToVariable,
      generateVariableName: generateVariableName,
      downloadWithLink: downloadWithLink,
      setConfirmAction: setConfirmAction,
      executeConfirmAction: executeConfirmAction,
      prettyBool: prettyBool,
      numToWordC: numToWordC,
      dataURItoBlob: dataURItoBlob,
      getDateObj: getDateObj,
      getDeductableType: getDeductableType,
      showTopSuccessNotification: showTopSuccessNotification,
      dictToArray: dictToArray
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('industryService', industryService);

  industryService.$inject = ['$rootScope', 'metaService'];

  function industryService($rootScope, metaService) {

    var indusCodesArr = [];

    function getIndustryCodesLeafNodes(industriesList) {
      var industryCodesLeafnodes = [];
      var childNode = "";
      industriesList.forEach(function (industry) {
        childNode = industry.code.code + ".1";
        childNode = industriesList.find(function (industryItem) {
          return industryItem.code.code == childNode;
        });
        if (!childNode) {
          industryCodesLeafnodes.push(industry);
        }
      });
      return industryCodesLeafnodes;
    }

    /* Get Single industry code per industry code id without the call back */
    var getSingleIndustryCode = function getSingleIndustryCode(industryCode_id) {
      return indusCodesArr[industryCode_id];
    };

    function getAllIndustryCodesWithParentsForCompany() {
      var object_with_all_codes = {};
      var industry_keys = $rootScope.company.industry_codes;
      for (var index in industry_keys) {
        var split_code = industry_keys[index].split('.');
        var tmp_code = '';
        for (var inner_index in split_code) {
          if (split_code.hasOwnProperty(inner_index)) {
            tmp_code = inner_index == 0 ? tmp_code + split_code[inner_index] : tmp_code + '.' + split_code[inner_index];
            object_with_all_codes[tmp_code] = true;
          }
        }
      }
      return object_with_all_codes;
    }

    /* self executing function */
    (function () {
      metaService.getIndustryCodes(function (industrycodes) {
        for (var key in industrycodes) {
          indusCodesArr[key] = industrycodes[key].code;
        }
      });
    })();

    /* Return Stuff */
    return {
      getIndustryCodesLeafNodes: getIndustryCodesLeafNodes,
      getSingleIndustryCode: getSingleIndustryCode,
      getAllIndustryCodesWithParentsForCompany: getAllIndustryCodesWithParentsForCompany
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('insurancequestionsService', insurancequestionsService);

  insurancequestionsService.$inject = ['companyService', 'metaService', '$rootScope', 'industryService'];
  function insurancequestionsService(companyService, metaService, $rootScope, industryService) {

    var insuranceTypesGroups_tracker = [];
    var currentInsuranceTypesGroups_tracker = 0;
    var generalInsuranceQuestions = [];
    var confirmatoryInsuranceQuestions = [];
    var insuranceTypesGroups = {};
    var selectedInsuranceQuestions = [];
    var selectedProducts = [];
    var selectedInsuranceTypes = [];

    var selectedMappingObjs = [];
    var selectedInsurance_Products = [];
    var allInsuranceQuestionMappings = [];
    var allProductsQuestionMappings = [];

    var allInsuranceQuestions = [];
    var allProductsQuestions = [];

    var previousView = 'generalQuestions';

    var insurance_types = {};

    var allIndustryCode = {};

    var ProductPretriggerQuestions = [];
    var productsPassingKnockoutTriggers = [];

    function saveInsuranceQuestions(_insuranceQuestions) {
      _insuranceQuestions.forEach(function (_mainQuestion) {
        if (_mainQuestion.key && _mainQuestion.answer) {
          var answerObj = { 'answer': _mainQuestion.answer };
          companyService.updateInsuraceAnswer($rootScope.company_uid, _mainQuestion.key, answerObj);
        }
        if (_mainQuestion.triggerMarchingSubQs) {
          _mainQuestion.triggerMarchingSubQs.forEach(function (_subQuestion) {
            if (_subQuestion.key && _subQuestion.answer) {
              var answerObj = { 'answer': _subQuestion.answer };
              companyService.updateInsuraceAnswer($rootScope.company_uid, _subQuestion.key, answerObj);
            }
          });
        }
      });
    }

    /* get Insurance objs */
    function getInsuranceObjs(selectedInsurancesKeys, callback, err_call) {
      selectedInsuranceTypes = [];
      metaService.getInsuranceTypes(function (insurTypes) {
        var _loop5 = function _loop5(key) {
          var isSelectedInsurance = selectedInsurancesKeys.find(function (selectedInsurance) {
            return selectedInsurance == key;
          });
          if (isSelectedInsurance) {
            selectedInsuranceTypes.push({ key: key, selectedInsuranceType: insurTypes[key] });
          }
        };

        for (var key in insurTypes) {
          _loop5(key);
        }
        if (callback) callback(selectedInsuranceTypes);
      }, err_call);
    }

    function getQsForSelectedInsurances(selectedInsurancesKeys, callback, err_call) {
      selectedInsuranceQuestions = [];
      selectedInsuranceTypes = [];
      selectedMappingObjs;
      insurance_types = insurance_types;
      getInsuranceObjs(selectedInsurancesKeys, function (selectedInsurancesObjs) {
        getAllMappingObjs(selectedInsurancesKeys, function () {
          selectedInsuranceTypes.forEach(function (selectedInsuranceType) {
            var _selectedMappingObj = allInsuranceQuestionMappings.find(function (mappingsObj) {
              return mappingsObj.insuranceType == selectedInsuranceType.key;
            });
            if (_selectedMappingObj) selectedMappingObjs.push(_selectedMappingObj);
          });
          selectedMappingObjs.forEach(function (selectedMObj) {
            for (var qKey in selectedMObj.mappings) {
              var mainQuestion = getInsuranceQsByQId(qKey);
              if (mainQuestion) {
                mainQuestion.subQuestions = [];
                mainQuestion.insurance_type = selectedMObj.insuranceType;
                mainQuestion.order = selectedMObj.mappings[qKey].order;
                if (selectedMObj.mappings[qKey].children) {
                  for (var childQKey in selectedMObj.mappings[qKey].children) {
                    var childQuestion = getInsuranceQsByQId(childQKey);
                    if (childQuestion) {
                      childQuestion.trigger = selectedMObj.mappings[qKey].children[childQKey].trigger;
                      mainQuestion.subQuestions.push(childQuestion);
                    }
                  }
                }
                selectedInsuranceQuestions.push(mainQuestion);
              }
            }
          });
          /*remove duplicate question objs*/
          selectedInsuranceQuestions = [].concat(_toConsumableArray(new Set(selectedInsuranceQuestions)));

          assignExistingAnswersForQuesions(selectedInsuranceQuestions);
          divideQuestionTypes(selectedInsuranceQuestions);
          if (callback) callback();
        }, err_call);
      }, err_call);
    }

    function divideQuestionTypes(selectedInsuranceQuestions) {
      generalInsuranceQuestions = [];
      insuranceTypesGroups = {};
      insuranceTypesGroups_tracker = [];
      confirmatoryInsuranceQuestions = [];

      selectedInsuranceQuestions.forEach(function (insuranceQuestion) {
        if (insuranceQuestion.insurance_type == 'general') generalInsuranceQuestions.push(insuranceQuestion);else if (insuranceQuestion.insurance_type == 'confirmatory') confirmatoryInsuranceQuestions.push(insuranceQuestion);else {
          if (!insuranceTypesGroups[insuranceQuestion.insurance_type]) {
            insuranceTypesGroups[insuranceQuestion.insurance_type] = [];
            insuranceTypesGroups_tracker.push(insuranceQuestion.insurance_type);
          }
          insuranceTypesGroups[insuranceQuestion.insurance_type].push(insuranceQuestion);
        }
      });
      pushConfirmatoryQsToEnd(insuranceTypesGroups);
    }

    function getGeneralQuestions(callback, err_call) {
      if (callback) callback(generalInsuranceQuestions);
    }

    function getSpecificQuestions(callback, err_call) {
      getGeneralQuestions(function (generalInsuranceQuestions) {
        getProductPretriggerQs(function (productPretriggerQuestions) {
          getProductQuestions(generalInsuranceQuestions, productPretriggerQuestions, function (producQuestionsByInsuranceId) {
            insuranceTypesGroups = filterSpecificQuestionsPresentInProductQuestions(insuranceTypesGroups, producQuestionsByInsuranceId);
            if (callback) callback({ 'insuranceTypesGroups': insuranceTypesGroups, 'insuranceTypesGroups_tracker': insuranceTypesGroups_tracker, 'currentInsuranceTypesGroups_tracker': currentInsuranceTypesGroups_tracker, 'producQuestionsByInsuranceId': producQuestionsByInsuranceId });
          });
        });
      });
    }

    function getConfirmatoryQuestions(callback, err_call) {
      if (callback) callback(confirmatoryInsuranceQuestions);
    }

    /* returns the insurance question object for the given question ids*/
    function getInsuranceQsByQId(qkey) {
      return allInsuranceQuestions.find(function (insuranceQuestion) {
        return insuranceQuestion.key == qkey;
      });
    }

    var getPreviousViewState = function getPreviousViewState() {
      return previousView;
    };

    function setPreviousViewState(_previousView) {
      previousView = _previousView;
    }

    function assignExistingAnswersForQuesions(questionsArr) {
      questionsArr.forEach(function (question) {
        if ($rootScope.company.insurance_questionnaire && $rootScope.company.insurance_questionnaire[question.key]) question.answer = $rootScope.company.insurance_questionnaire[question.key].answer;
        if (question.subQuestions) question.subQuestions.forEach(function (subQ) {
          if ($rootScope.company.insurance_questionnaire && $rootScope.company.insurance_questionnaire[subQ.key]) {
            subQ.answer = $rootScope.company.insurance_questionnaire[subQ.key].answer;
            if (!question.triggerMarchingSubQs) question.triggerMarchingSubQs = [];
            question.triggerMarchingSubQs.push(subQ);
          }
        });
        if (question.triggerMarchingSubQs) question.triggerMarchingSubQs = [].concat(_toConsumableArray(new Set(question.triggerMarchingSubQs)));
      });
    }

    /* reset the trigger matiching subquestions */
    function refreshTriggerMatchingSubQuestions(questionsArr) {
      questionsArr.forEach(function (mainQuestion) {
        var triggerMarchingSubQs = [];
        if (mainQuestion.subQuestions) triggerMarchingSubQs = mainQuestion.subQuestions.filter(function (subQ) {
          var _return = false;
          switch (subQ.trigger.condition) {
            case '>':
              if (mainQuestion.answer > subQ.trigger.on) _return = true;
              break;
            case '<':
              if (mainQuestion.answer < subQ.trigger.on) _return = true;
              break;
            case '<=':
              if (mainQuestion.answer <= subQ.trigger.on) _return = true;
              break;
            case '>=':
              if (mainQuestion.answer >= subQ.trigger.on) _return = true;
              break;
            case '!=':
              if (mainQuestion.answer != subQ.trigger.on) _return = true;
              break;
            case '==':
              if (mainQuestion.answer == subQ.trigger.on) _return = true;
              break;
          }
          return _return;
        });
        mainQuestion.triggerMarchingSubQs = triggerMarchingSubQs;
      });
      return questionsArr;
    }

    function getTriggerMarchingSubQs(mainQuestion) {
      var triggerMarchingSubQs = [];
      if (mainQuestion.subQuestions) triggerMarchingSubQs = mainQuestion.subQuestions.filter(function (subQ) {
        var _return = false;
        switch (subQ.trigger.condition) {
          case '>':
            if (mainQuestion.answer > subQ.trigger.on) _return = true;
            break;
          case '<':
            if (mainQuestion.answer < subQ.trigger.on) _return = true;
            break;
          case '<=':
            if (mainQuestion.answer <= subQ.trigger.on) _return = true;
            break;
          case '>=':
            if (mainQuestion.answer >= subQ.trigger.on) _return = true;
            break;
          case '!=':
            if (mainQuestion.answer != subQ.trigger.on) _return = true;
            break;
          case '==':
            if (mainQuestion.answer == subQ.trigger.on) _return = true;
            break;
        }
        return _return;
      });
      mainQuestion.triggerMarchingSubQs = triggerMarchingSubQs;
      $scope.safeApply(function (e) {
        return e;
      });
    }

    function pushConfirmatoryQsToEnd(insuranceTypesGroups) {
      if (insuranceTypesGroups.confirmatory) {
        insuranceTypesGroups.confirmatory.order = 0;
      }
    }

    function getAllMappingObjs(selectedInsurancesKeys, callback, err_call) {
      metaService.getInsuranceQuestionMappings(function (_allInsuranceQuestionMappings) {
        selectedMappingObjs = [];
        for (var index in _allInsuranceQuestionMappings.insurance_types) {
          var mappingsObj = _allInsuranceQuestionMappings.insurance_types[index].questions;
          allInsuranceQuestionMappings.push({ insuranceType: index, mappings: mappingsObj });
        }
        for (var _index in _allInsuranceQuestionMappings.products) {
          var _mappingsObj = _allInsuranceQuestionMappings.products[_index].questions;
          allProductsQuestionMappings.push({ productType: _index, mappings: _mappingsObj });
        }

        /*add all the general question to the selected mappings list*/
        selectedMappingObjs.push(allInsuranceQuestionMappings.find(function (mappingsObj) {
          return mappingsObj.insuranceType == 'general';
        }));
        selectedMappingObjs.push(allInsuranceQuestionMappings.find(function (mappingsObj) {
          return mappingsObj.insuranceType == 'confirmatory';
        }));
        /* filter the products mapping objs according to the insurance types selected.*/
        getProductsForSelectedInsurances(selectedInsurancesKeys, function () {
          getProductsForIndustryCodes(function () {
            if (callback) callback();
          });
        }, err_call);
      });
    }

    var getInsuranceNameById = function getInsuranceNameById(insuranceKey) {
      return insurance_types[insuranceKey] ? insurance_types[insuranceKey].name_en : insuranceKey;
    };

    function setCurrentInsuranceTypesGroups_tracker(_CurrentInsuranceTypesGroups_tracker) {
      currentInsuranceTypesGroups_tracker = _CurrentInsuranceTypesGroups_tracker;
    }

    function getCurrentInsuranceTypesGroups_tracker() {
      return currentInsuranceTypesGroups_tracker;
    }

    /* get the products objs for the insurance types selected */
    function getProductsForSelectedInsurances(selectedInsurancesKeys, callback, err_call) {
      selectedInsurance_Products = [];

      selectedInsurancesKeys.forEach(function (insurancesKey) {
        var _selectedInsurance_Pr;

        var _selectedInsurance_products = allProductsQuestions.filter(function (productObj) {
          return productObj.product.insurance_type == insurancesKey;
        });
        (_selectedInsurance_Pr = selectedInsurance_Products).push.apply(_selectedInsurance_Pr, _toConsumableArray(_selectedInsurance_products));
      });
      selectedInsurance_Products = [].concat(_toConsumableArray(new Set(selectedInsurance_Products)));
      if (callback) callback();
    }

    /* get the products for the industrycodes */
    function getProductsForIndustryCodes(callback, err_call) {
      ProductPretriggerQuestions = [];
      selectedInsurance_Products.forEach(function (productObj) {
        var isExcludeIndustryCodes = productObj.product.pre_triggers.industry.exclude_all;
        var productPretriggerIndustryCodes = getProductPreTriggerIndustryCodes(productObj.product);
        var allIndustryCodesWithParentsForCompany = industryService.getAllIndustryCodesWithParentsForCompany();
        for (var industryCode in allIndustryCodesWithParentsForCompany) {
          /* if exclude all is set to true then, include all the industry codes matching my industry code. */
          if (isExcludeIndustryCodes) {
            if (productPretriggerIndustryCodes.indexOf(industryCode) > -1) {
              ProductPretriggerQuestions.push(productObj);
              break;
            }
          } else {
            if (productPretriggerIndustryCodes.indexOf(industryCode) == -1) {
              ProductPretriggerQuestions.push(productObj);
            } else {
              /*  if u find any one of user's industry code matching the product's pretrigger industry codes then remove it */
              ProductPretriggerQuestions = ProductPretriggerQuestions.filter(function (productPreTriggerQ) {
                return productPreTriggerQ.productType != productObj.productType;
              });
              break;
            }
          }
        }
      });
      ProductPretriggerQuestions = [].concat(_toConsumableArray(new Set(ProductPretriggerQuestions)));
      if (callback) callback();
    }

    /* returns the products objects which match the industry codes */
    function getProductPretriggerQs(callback, err_call) {
      if (callback) {
        callback(ProductPretriggerQuestions);
      }
    }

    function getProductPreTriggerIndustryCodes(productObj) {
      var productIndustryCodes = [];
      if (productObj && productObj.pre_triggers && productObj.pre_triggers.industry && productObj.pre_triggers.industry.industry_codes) {
        for (var industryCode_id in productObj.pre_triggers.industry.industry_codes) {
          var industryCode = allIndustryCode[industryCode_id].code;
          if (industryCode) productIndustryCodes.push(industryCode);
        }
      }
      return productIndustryCodes;
    }

    function getPretriggerMatchingProducts(generalQuestions, productPretriggerQs, callback, err_call) {
      var pretriggerMatchingProducts = [];
      generalQuestions = refreshTriggerMatchingSubQuestions(generalQuestions);
      productPretriggerQs.forEach(function (productQ) {
        if (productQ.product.pre_triggers) {
          if (productQ.product.pre_triggers.questions) {
            for (var questionId in productQ.product.pre_triggers.questions) {
              /* find the answer provided for the question id in the general questions and it's subquestions */
              var generalquestionObj = getQuestionForQuestionId(questionId, generalQuestions);
              /* if question is not found in the genral question (bcos the subquestion was not triggered)  then include the product */
              if (generalquestionObj == undefined) {
                pretriggerMatchingProducts.push(productQ);
                //break;
              } else {
                var productPretriggerQ = productQ.product.pre_triggers.questions[questionId];
                if (isProductPreTriggerMatch(generalquestionObj, productPretriggerQ)) {
                  pretriggerMatchingProducts.push(productQ);
                } else {
                  pretriggerMatchingProducts = pretriggerMatchingProducts.filter(function (productObj) {
                    return productObj.productType != productQ.productType;
                  });
                  break;
                }
              }
            }
          } else {
            /* if there are nor questions then the products are added */
            pretriggerMatchingProducts.push(productQ);
          }
        }
      });
      if (callback) {
        callback(pretriggerMatchingProducts);
      }
    }

    function getProductQuestions(generalQuestions, productPretriggerQs, callback, err_call) {
      var productQuestions = [];
      var productQuestionsGroups = {};
      getPretriggerMatchingProducts(generalQuestions, productPretriggerQs, function (pretriggerMatchingProducts) {
        var productIds = pretriggerMatchingProducts.map(function (product) {
          return product.productType;
        });
        getProductMappingsForProductIds(productIds, function (ProductMappingsData) {
          var productMappingObjs = ProductMappingsData.productMappingObjs;
          /* if the products does not have product mapping obj, then add it to products matching the knockout trigger, by default. */
          productsPassingKnockoutTriggers = ProductMappingsData.productsWithOutProductMappings;
          productMappingObjs.forEach(function (productMObj) {
            for (var qKey in productMObj.mappings) {
              var mainQuestion = getInsuranceQsByQId(qKey);
              if (mainQuestion) {
                mainQuestion.subQuestions = [];
                mainQuestion.product_type = productMObj.productType;
                mainQuestion.insurance_type = allProductsQuestions.find(function (product) {
                  return productMObj.productType == product.productType;
                }).product.insurance_type;
                mainQuestion.order = productMObj.mappings[qKey].order;
                mainQuestion.knockout_trigger = productMObj.mappings[qKey].knockout_trigger;
                if (productMObj.mappings[qKey].children) {
                  for (var childQKey in productMObj.mappings[qKey].children) {
                    var childQuestion = getInsuranceQsByQId(childQKey);
                    if (childQuestion) {
                      childQuestion.trigger = productMObj.mappings[qKey].children[childQKey].trigger;
                      childQuestion.knockout_trigger = productMObj.mappings[qKey].children[childQKey].knockout_trigger;
                      childQuestion.product_type = productMObj.productType;
                      childQuestion.insurance_type = allProductsQuestions.find(function (product) {
                        return productMObj.productType == product.productType;
                      }).product.insurance_type;
                      mainQuestion.subQuestions.push(childQuestion);
                    }
                  }
                }
                productQuestions.push(mainQuestion);
              }
            }
          });
          /*remove duplicate question objs*/
          productQuestions = [].concat(_toConsumableArray(new Set(productQuestions)));
          assignExistingAnswersForQuesions(productQuestions);
          productQuestionsGroups = groupProducQuestionsByInsuranceId(productQuestions);
          if (callback) {
            callback(productQuestionsGroups);
          }
        }, err_call);
      }, err_call);
    }

    /* group the product questions to there productids */
    function groupProducQuestionsByProductId(productQuestions) {
      var productTypesGroups = {};
      productQuestions.forEach(function (productQ) {
        if (!productTypesGroups[productQ.product_type]) {
          productTypesGroups[productQ.product_type] = [];
        }
        productTypesGroups[productQ.product_type].push(productQ);
      });
      return productTypesGroups;
    }

    /* group the product questions to there productids */
    function groupProducQuestionsByInsuranceId(productQuestions) {
      var insuranceTypesGroups = {};
      productQuestions.forEach(function (productQ) {
        if (!insuranceTypesGroups[productQ.insurance_type]) {
          insuranceTypesGroups[productQ.insurance_type] = [];
        }
        insuranceTypesGroups[productQ.insurance_type].push(productQ);
      });
      return insuranceTypesGroups;
    }

    function getProductMappingsForProductIds(productIds, callback, err_call) {
      var productMappingObjs = [];
      var productsWithOutProductMappings = [];
      productIds.forEach(function (productid) {
        var _productMappingObj = allProductsQuestionMappings.find(function (productMapping) {
          return productMapping.productType == productid;
        });
        if (_productMappingObj) {
          productMappingObjs.push(_productMappingObj);
        } else {
          productsWithOutProductMappings.push(productid);
        }
      });
      if (callback) {
        callback({ "productMappingObjs": productMappingObjs, "productsWithOutProductMappings": productsWithOutProductMappings });
      }
    }

    function getQuestionForQuestionId(questionId, questionsArr) {
      /* find for the answer in main questions*/
      var returnQuestionObj = void 0;
      questionsArr.forEach(function (mainQuestion) {
        if (mainQuestion.key == questionId) {
          returnQuestionObj = mainQuestion;
        } else {
          /* try finding for the Qid in the answered subquestions */
          if (mainQuestion.triggerMarchingSubQs) mainQuestion.triggerMarchingSubQs.forEach(function (subQ) {
            if (subQ.key == questionId) {
              returnQuestionObj = subQ;
            }
          });
        }
      });
      return returnQuestionObj;
    }

    function isProductPreTriggerMatch(generalquestionObj, productPretriggerQ) {
      var PretriggerCondition = productPretriggerQ.trigger.condition;
      var pretriggerValueOn = productPretriggerQ.trigger.on;
      var answer = generalquestionObj.answer;
      var _return = false;
      switch (PretriggerCondition) {
        case '>':
          if (answer > pretriggerValueOn) _return = true;
          break;
        case '<':
          if (answer < pretriggerValueOn) _return = true;
          break;
        case '<=':
          if (answer <= pretriggerValueOn) _return = true;
          break;
        case '>=':
          if (answer >= pretriggerValueOn) _return = true;
          break;
        case '!=':
          if (answer != pretriggerValueOn) _return = true;
          break;
        case '==':
          if (answer == pretriggerValueOn) _return = true;
          break;
        case '<>':
          if (answer <= productPretriggerQ.trigger.max && answer >= productPretriggerQ.trigger.min) _return = true;
          break;
        case 'no_threshold':
          _return = true;
          break;
      }
      return _return;
    }

    function isProductKnockoutTriggerMatch(productQ) {
      /* if knockout trigger is not mentioned for a question, then consider the question to match the knockout trigger */
      if (productQ.knockout_trigger == undefined) {
        return true;
      }
      var knockoutTriggerCondition = productQ.knockout_trigger.condition;
      var knockoutTriggerValueOn = productQ.knockout_trigger.on;
      var answer = productQ.answer;
      var _return = false;
      switch (knockoutTriggerCondition) {
        case '>':
          if (answer > knockoutTriggerValueOn) _return = true;
          break;
        case '<':
          if (answer < knockoutTriggerValueOn) _return = true;
          break;
        case '<=':
          if (answer <= knockoutTriggerValueOn) _return = true;
          break;
        case '>=':
          if (answer >= knockoutTriggerValueOn) _return = true;
          break;
        case '!=':
          if (answer != knockoutTriggerValueOn) _return = true;
          break;
        case '==':
          if (answer == knockoutTriggerValueOn) _return = true;
          break;
        case '<>':
          if (answer <= productQ.knockout_trigger.max && answer >= productQ.knockout_trigger.min) _return = true;
          break;
        case 'no_threshold':
          _return = true;
          break;
      }
      return _return;
    }

    /* updates the list of products which pass the knockout triggers */
    function updateTriggerMatchingProducts(productTypesGroups, callback, err_call) {
      var _loop6 = function _loop6(productId) {
        var productQs = productTypesGroups[productId];
        /* include the trigger matching subquestions */
        productTypesGroups[productId].forEach(function (productQobj) {
          if (productQobj.triggerMarchingSubQs) {
            productQs = productQs.concat(productQobj.triggerMarchingSubQs);
          }
        });

        var isEligiableForProduct = true;
        for (var index in productQs) {
          if (!isProductKnockoutTriggerMatch(productQs[index])) {
            isEligiableForProduct = false;
            break;
          }
        }
        if (isEligiableForProduct) {
          productsPassingKnockoutTriggers.push(productId);
        }
      };

      for (var productId in productTypesGroups) {
        _loop6(productId);
      }
      //removeSpecificQsForTriggerMatchingProducts(productsPassingKnockoutTriggers);
      if (callback) callback(productsPassingKnockoutTriggers);
    }

    /* retuns true if elegiable for one product in the given product questions */
    function showInsuranceSpecificQuestions(productQuestionsForInsuranceType, callback, err_call) {

      var productQs = productQuestionsForInsuranceType;
      /* include the trigger matching subquestions */
      productQuestionsForInsuranceType.forEach(function (productQobj) {
        if (productQobj.triggerMarchingSubQs) {
          productQs = productQs.concat(productQobj.triggerMarchingSubQs);
        }
      });

      /* get all the productids present in the above questions(for one insurance type)*/
      var productIdsPerInsuranceType = productQs.map(function (productQ) {
        return productQ.product_type;
      });
      // keep the productids unique
      productIdsPerInsuranceType = [].concat(_toConsumableArray(new Set(productIdsPerInsuranceType)));
      for (var index in productIdsPerInsuranceType) {
        var productQuestionsPerProductId = productQs.filter(function (productQ) {
          return productQ.product_type == productIdsPerInsuranceType[index];
        });
        var _isEligiableForProduct = true;
        for (var _index2 in productQuestionsPerProductId) {
          if (!isProductKnockoutTriggerMatch(productQs[_index2])) {
            _isEligiableForProduct = false;
            break;
          }
        }
        if (_isEligiableForProduct) {
          productsPassingKnockoutTriggers.push(productIdsPerInsuranceType[index]);
        }
      }
      if (productsPassingKnockoutTriggers.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    /* here we pop out the insurance specific questions, based on the trigger matching products */
    function removeSpecificQsForTriggerMatchingProducts(productsPassingKnockoutTriggers) {
      productsPassingKnockoutTriggers.forEach(function (productId) {
        var productObj = allProductsQuestions.find(function (product) {
          return product.productType == productId;
        });
        var insurance_type = productObj.product.insurance_type;
        if (insuranceTypesGroups[insurance_type]) {
          delete insuranceTypesGroups[insurance_type];
          var index = insuranceTypesGroups_tracker.indexOf(insurance_type);
          insuranceTypesGroups_tracker.splice(index, 1);
        }
      });
    }

    function getInsuranceTypesAndProductsDict(eligibleproducts, insurancesKeys, callback, err_call) {
      var productIdArr = eligibleproducts;
      var productObjArr = [];
      var insuranceTypesAndProductsDict = {};
      productIdArr.forEach(function (productId) {
        productObjArr.push(allProductsQuestions.find(function (product) {
          return product.productType == productId;
        }));
      });
      insurancesKeys.forEach(function (insuranceKey) {
        insuranceTypesAndProductsDict[insuranceKey] = {};
        var productsMatchInsuranceTypes = productObjArr.filter(function (product) {
          return product.product.insurance_type == insuranceKey;
        });
        if (productsMatchInsuranceTypes) {
          var productsMatchInsuranceTypes_keys = {};
          productsMatchInsuranceTypes.forEach(function (product) {
            productsMatchInsuranceTypes_keys[product.productType] = true;
          });
          insuranceTypesAndProductsDict[insuranceKey] = productsMatchInsuranceTypes_keys;
        }
      });
      if (callback) callback(insuranceTypesAndProductsDict);
    }

    function getProductsPassingKnockoutTriggers(producQuestionsByInsuranceId, callback, err_call) {
      /* conver the products questions that are grouped by insuranceids, to grouping them by product ids */
      var productQuestionsArr = [];
      var producQuestionsByProductId = {};
      for (var insuranceId in producQuestionsByInsuranceId) {
        productQuestionsArr = productQuestionsArr.concat(producQuestionsByInsuranceId[insuranceId]);
      }
      productQuestionsArr = refreshTriggerMatchingSubQuestions(productQuestionsArr);
      producQuestionsByProductId = groupProducQuestionsByProductId(productQuestionsArr);
      updateTriggerMatchingProducts(producQuestionsByProductId, callback, err_call);
    }

    /* removes the questions from specific questions that are already asked in the product questions */
    function filterSpecificQuestionsPresentInProductQuestions(specificQuestionsByInsuranceId, producQuestionsByInsuranceId) {
      var _loop7 = function _loop7(insuranceId) {
        var specificQuestions = specificQuestionsByInsuranceId[insuranceId];
        var productQuestions = producQuestionsByInsuranceId[insuranceId];
        productQuestions.forEach(function (productQuestion) {
          if (specificQuestions) {
            var specificQuestionIndex = specificQuestions.findIndex(function (specificQ) {
              return specificQ.key == productQuestion.key;
            });
            if (specificQuestionIndex > -1) {
              specificQuestions.splice(specificQuestionIndex, 1);
            }
          }
        });
      };

      for (var insuranceId in producQuestionsByInsuranceId) {
        _loop7(insuranceId);
      }
      return specificQuestionsByInsuranceId;
    }

    /* Self executing function*/
    (function () {
      metaService.getInsuranceQuestions(function (_allInsuranceQuestions) {
        for (var index in _allInsuranceQuestions) {
          /* uncomment below line when, insurance questions disable feature is required */
          //if(!_allInsuranceQuestions[index].disabled)
          allInsuranceQuestions.push({ key: index, insuranceQuestionObj: _allInsuranceQuestions[index] });
        }
      });

      metaService.getInsuranceQuestionMappings(function (_allInsuranceQuestionMappings) {
        for (var index in _allInsuranceQuestionMappings.insurance_types) {
          var mappingsObj = _allInsuranceQuestionMappings.insurance_types[index].questions;
          allInsuranceQuestionMappings.push({ insuranceType: index, mappings: mappingsObj });
        }
        /*add all the general question to the selected mappings list*/
        selectedMappingObjs.push(allInsuranceQuestionMappings.find(function (mappingsObj) {
          return mappingsObj.insuranceType == 'general';
        }));
        selectedMappingObjs.push(allInsuranceQuestionMappings.find(function (mappingsObj) {
          return mappingsObj.insuranceType == 'confirmatory';
        }));
      });

      metaService.getInsuranceTypes(function (types) {
        insurance_types = types;
      });

      metaService.getInsuranceProducts(function (_allProduct) {
        for (var index in _allProduct) {
          if (_allProduct[index].disabled) continue;
          allProductsQuestions.push({ productType: index, product: _allProduct[index] });
        }
      });

      metaService.getIndustryCodes(function (_allIndustryCode) {
        allIndustryCode = _allIndustryCode;
      });
    })();

    /* Return Stuff */
    return {
      saveInsuranceQuestions: saveInsuranceQuestions,
      getQsForSelectedInsurances: getQsForSelectedInsurances,
      getGeneralQuestions: getGeneralQuestions,
      getSpecificQuestions: getSpecificQuestions,
      getConfirmatoryQuestions: getConfirmatoryQuestions,
      getPreviousViewState: getPreviousViewState,
      setPreviousViewState: setPreviousViewState,
      getInsuranceNameById: getInsuranceNameById,
      getCurrentInsuranceTypesGroups_tracker: getCurrentInsuranceTypesGroups_tracker,
      setCurrentInsuranceTypesGroups_tracker: setCurrentInsuranceTypesGroups_tracker,
      getProductPretriggerQs: getProductPretriggerQs,
      getProductQuestions: getProductQuestions,
      getInsuranceTypesAndProductsDict: getInsuranceTypesAndProductsDict,
      showInsuranceSpecificQuestions: showInsuranceSpecificQuestions,
      getProductsPassingKnockoutTriggers: getProductsPassingKnockoutTriggers
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('langService', langService);

  langService.$inject = ['$rootScope', 'FoundationApi'];

  function langService($rootScope, FoundationApi) {

    var inline_help = {};
    inline_help.sum_insured = {};
    inline_help.deductable = {};
    inline_help.premium = {};
    inline_help.maximisation = {};
    inline_help.sublimit = {};
    inline_help.personal_damage = {};
    inline_help.property_damage = {};
    inline_help.financial_loss = {};
    inline_help.start_date = {};
    inline_help.next_renewal_date = {};

    inline_help.sum_insured.en = "The maximum amount the insurer will cover in case of a damage.";
    inline_help.deductable.en = "Amount to be borne by the policyholder in the event of a claim.";
    inline_help.premium.en = "Required annual fee including insurance tax.";
    inline_help.maximisation.en = "Number of claims covered per year that reach the full sum insured.";
    inline_help.sublimit.en = "The maximum amount the insurer will pay out in this specific case.";
    inline_help.personal_damage.en = "Damage in the form of an injury, health damage or death of a person.";
    inline_help.property_damage.en = "Property damage describes the damage or destruction of things such as vehicles, streets, buildings, things and other inanimate objects.";
    inline_help.financial_loss.en = "Damages in the form of a financial loss to a person.";
    inline_help.start_date.en = "Beginning of the insurance period specified in the insurance contract.";
    inline_help.next_renewal_date.en = "The renewal date is the date on which an existing insurance contract has to be renewed.";

    inline_help.sum_insured.de = "Der maximale Betrag, der im Schadensfall ausgezahlt wird.";
    inline_help.deductable.de = "Betrag, den der Versicherungsnehmer im Versicherungsfall selbst zu tragen hat.";
    inline_help.premium.de = "Jährlich zu leistende Beitragszahlung inklusive Versicherungssteuer.";
    inline_help.maximisation.de = "Die Maximierung gibt an, für wie viele Schadensfälle die volle Versicherungssumme, innerhalb eines Jahres, zur Verfügung steht.";
    inline_help.sublimit.de = "Obergrenze für spezifizierte Schadensfälle, die von der vereinbarten Deckungssumme abweicht. Man könnte das Sublimit auch als Deckungssumme für klar definierte Teilrisiken bezeichnen.";
    inline_help.personal_damage.de = "Schaden an einer Person in Form einer Verletzung, Gesundheitsschädigung oder des Todes.";
    inline_help.property_damage.de = "Ein Sachschaden ensteht bei der Beschädigung, Vernichtung oder Zerstörung von Sachen, wie z.B. Fahrzeugen, Straßen, Gebäuden, Gegenstände und sonstigen Dingen unbelebter Natur.";
    inline_help.financial_loss.de = "Schaden am Vermögen einer Person. Ein Vermögensschaden lässt sich in unechten und echten Vermögensschaden einteilen je nachdem ob der Vermögensschaden in Abhängigkeit zu einem Personen- / Sachschaden entstanden ist oder unabhängig angefallen ist.";
    inline_help.start_date.de = "Anfang der Laufzeit eines Versicherungsvertrags.";
    inline_help.next_renewal_date.de = "Datum an dem der bestehende Versicherungsvertrag erneuert bzw. verlängert werden muss.";

    /* Return Stuff */
    return {
      inline_help: inline_help
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('mandateService', mandateService);

  mandateService.$inject = ['requestService', 'fileService', 'backofficeService'];

  /* Prefix */
  var prefix = 'mandates';
  var document_prefix = 'documents';

  var STATUS_SIGNED = 'signed';

  /* Service Function */
  function mandateService(requestService, fileService, backofficeService) {

    /* Get Mandates For Company */
    function getMandatesForCompany(company_uid, callback, err_call) {
      requestService.getDataOnce([prefix, company_uid], function (mandates) {
        callback(mandates);
      }, function (error) {
        err_call(error);
      });
    }

    /* Get Single Mandate */
    function getSingleMandate(company_uid, mandate_uid, callback, err_call) {
      requestService.getDataOnce([prefix, company_uid, mandate_uid], function (mandate) {
        callback(mandate);
      }, function (error) {
        err_call(error);
      });
    }

    /* Get All Mandates */
    function getAllMandates(callback, err_call) {
      requestService.getDataOnce([prefix], function (mandates) {
        callback(mandates);
      }, function (error) {
        err_call(error);
      });
    }

    /* Download Mandate with filename */
    function downloadMandateWithFilename(company_uid, file_name, callback, err_call) {
      fileService.downloadFileWithCustomEndpoint([prefix, company_uid], file_name, callback, err_call);
    }

    /* Register Mandate */
    function registerMandate(company_uid, file_url, callback, err_call) {
      var data = {
        file: file_url
      };
      requestService.pushData([prefix, company_uid], data, function (response) {
        callback(response.key);
      }, function (error) {
        err_call(error);
      });
    }

    /* Upload Signature */
    function uploadSignature(fileItem, company_uid, callback, err_call) {
      fileService.uploadFileWithCustomEndpoint([prefix, company_uid], "", fileItem, callback, err_call);
    }

    /* Attach Signature*/
    function attach_signature(mandate_uid, signature_url, callback, err_call) {
      requestService.updateData([document_prefix, prefix, mandate_uid], {
        signature_url: signature_url,
        status: 'signing_requested'
      }, callback, err_call, false, true);
    }

    function checkMandate(mandate_uid, company_uid, callback, err_call) {
      if (mandate_uid) {
        return callback(mandate_uid);
      }
      backofficeService.initMandate(company_uid, function (res) {
        return callback(res.mandate_uid);
      }, err_call);
    }

    function signMandate(signature_blob, mandate_uid, user_uid, company_uid, callback, err_call) {
      checkMandate(mandate_uid, company_uid, function (correct_mandate_uid) {
        uploadSignature(signature_blob, company_uid, function (signature_filename) {
          fileService.downloadFileWithCustomEndpoint([prefix, company_uid], signature_filename, function (signature_path) {
            var mandate_data = {
              signature_path: signature_path,
              company_uid: company_uid,
              user_uid: user_uid
            };
            backofficeService.postMandate(mandate_data, function (res) {
              requestService.updateData([document_prefix, prefix, correct_mandate_uid], {
                signature_url: signature_filename,
                signed_document_url: res.data,
                status: STATUS_SIGNED
              }, callback, err_call);
            }, err_call);
          }, err_call);
        }, err_call);
      }, err_call);
    }

    /* Return Stuff */
    return {
      getMandatesForCompany: getMandatesForCompany,
      getSingleMandate: getSingleMandate,
      registerMandate: registerMandate,
      getAllMandates: getAllMandates,
      uploadSignature: uploadSignature,
      attach_signature: attach_signature,
      downloadMandateWithFilename: downloadMandateWithFilename,
      signMandate: signMandate
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('metaService', metaService);

  metaService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService', 'fileService'];

  // Routes
  var prefix = 'meta';
  var mandate_suffix = 'mandate';
  var policies_suffix = 'policy_criteria';
  var industry_suffix = 'industry_criteria';
  var custom_field_suffix = 'fields';
  var products_suffix = 'products';
  var carrier_suffix = 'carriers';
  var insurance_suffix = 'insurance_types';
  var codes_suffix = 'industry_codes';
  var activity_questions_suffix = 'activities';
  var activity_group_suffix = 'activity_groups';
  var insurance_questionnaire_suffix = 'insurance_questionnaire';
  var insurance_question_mapping_suffix = 'insurance_question_mapping';
  var comparison_criteria_suffix = 'comparison_criteria';
  /* Models */
  var model = {};

  function metaService($rootScope, firebase, $firebaseObject, requestService, fileService) {

    /*********************************************/
    /**                 Mandate                 **/
    /*********************************************/

    /* Add Mandate */
    function addMandate(file_url, callback, err_call) {
      var data = {
        file: file_url,
        status: 'inactive'
      };
      requestService.pushData([prefix, mandate_suffix], data, callback, err_call);
    }

    /* Get Mandates */
    function getMandates(callback, err_call) {
      requestService.getDataOnce([prefix, mandate_suffix], callback, err_call);
    }

    /* Get Single Mandate */
    function getSingleMandate(mandate_uid, callback, err_call) {
      requestService.getDataOnce([prefix, mandate_suffix, mandate_uid], callback, err_call);
    }

    /* Upload Mandate */
    function uploadMandate(fileItem, callback, err_call) {
      fileService.uploadFileWithCustomEndpoint([prefix, mandate_suffix], "", fileItem, callback, err_call);
    }

    /* Download Mandate */
    function downloadMandate(file_url, callback, err_call) {
      fileService.downloadFileWithCustomEndpoint([prefix, mandate_suffix], file_url, callback, err_call);
    }

    /* Mark Mandate Active */
    function activateMandate(mandate_uid, callback, err_call) {
      var data = {
        status: 'active'
      };
      requestService.updateData([prefix, mandate_suffix, mandate_uid], data, callback, err_call);
    }

    /* Mark Mandate Inactive */
    function deactivateMandate(mandate_uid, callback, err_call) {
      var data = {
        status: 'inactive'
      };
      requestService.updateData([prefix, mandate_suffix, mandate_uid], data, callback, err_call);
    }

    /*********************************************/
    /**             Policy Criteria             **/
    /*********************************************/

    /* Add Policy Criteria */
    function addPolicyCriteria(callback, err_call) {
      requestService.pushData([prefix, policies_suffix], {}, callback, err_call);
    }

    /* Add Custom Field To Policy Criteria */
    function addCustomField(policy_uid, callback, err_call) {
      requestService.pushData([prefix, policies_suffix, policy_uid, custom_field_suffix], {}, callback, err_call);
    }

    /* Save Policy Criteria */
    function savePolicyCriteria(policy_uid, data, callback, err_call) {
      requestService.updateData([prefix, policies_suffix, policy_uid], data, callback, err_call);
    }

    /* Disable Custom Field */
    function disableCustomField(policy_uid, field_uid, callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.updateData([prefix, policies_suffix, policy_uid, custom_field_suffix, field_uid], data, callback, err_call);
    }

    /* Enable Custom Field */
    function enableCustomField(policy_uid, field_uid, callback, err_call) {
      var data = {
        disabled: false
      };
      requestService.updateData([prefix, policies_suffix, policy_uid, custom_field_suffix, field_uid], data, callback, err_call);
    }

    /* Delete Policy Criteria */
    function deletePolicyCriteria(policy_uid, data, callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.updateData([prefix, policies_suffix, policy_uid], data, callback, err_call);
    }

    /* Enable Policy Criteria */
    function enablePolicyCriteria(policy_uid, data, callback, err_call) {
      var data = {
        disabled: false
      };
      requestService.updateData([prefix, policies_suffix, policy_uid], data, callback, err_call);
    }

    /* Get Policy Criteriaa */
    function getPolicyCriteria(callback, err_call) {
      requestService.getDataOnce([prefix, policies_suffix], callback, err_call);
    }

    /* Get Single Policy Criteria */
    function getSinglePolicyCriteria(policy_uid, callback, err_call) {
      requestService.getDataOnce([prefix, policies_suffix, policy_uid], callback, err_call);
    }

    /* Get Policy Specific Criteria From Subject Trigger */
    function getPolicySpecificCriteriaFromSubjectTrigger(subject_trigger, callback, err_call) {
      requestService.getDataOnceEqualTo([prefix, policies_suffix], 'trigger', subject_trigger, callback, err_call);
    }

    /* Get Policy Specific Criteria */
    function getPolicySpecificCriteria(callback, err_call) {
      if (model.policy_criteria) {
        console.log('Returning Policy Criteria');
        callback(model.policy_criteria);
        return;
      }
      requestService.getDataOnce([prefix, policies_suffix], function (result) {
        model.policy_criteria = result;
        callback(result);
      }, err_call);
    }

    /*********************************************/
    /**               Industry Criterias        **/
    /*********************************************/

    /* Add Industry Criteria */
    function addIndustryCriteria(callback, err_call) {
      requestService.pushData([prefix, industry_suffix], {}, callback, err_call);
    }

    /* Get Industry Criteriaa */
    function getIndustryCriteria(callback, err_call) {
      if (model.industry_criteria) {
        console.log('Returning Industry Criteria');
        callback(model.industry_criteria);
        return;
      }
      requestService.getDataOnce([prefix, industry_suffix], function (result) {
        model.industry_criteria = result;
        callback(result);
      }, err_call);
    }

    /* Get Single Industry Criteria */
    function getSingleIndustryCriteria(criteria_uid, callback, err_call) {
      requestService.getDataOnce([prefix, industry_suffix, criteria_uid], callback, err_call);
    }

    /* Save Industry Criteria */
    function saveIndustryCriteria(criteria_uid, data, callback, err_call) {
      requestService.updateData([prefix, industry_suffix, criteria_uid], data, callback, err_call);
    }

    /* Add Custom Field To Industry Criteria */
    function addInudstryCustomField(criteria_uid, callback, err_call) {
      requestService.pushData([prefix, industry_suffix, criteria_uid, custom_field_suffix], {}, callback, err_call);
    }

    /* Disable Custom Field */
    function disableIndustryCustomField(criteria_uid, field_uid, callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.updateData([prefix, industry_suffix, criteria_uid, custom_field_suffix, field_uid], data, callback, err_call);
    }

    /* Enable Custom Field */
    function enableIndustryCustomField(criteria_uid, field_uid, callback, err_call) {
      var data = {
        disabled: false
      };
      requestService.updateData([prefix, industry_suffix, criteria_uid, custom_field_suffix, field_uid], data, callback, err_call);
    }

    /* Delete Industry Criteria */
    function disableIndustryCriteria(criteria_uid, data, callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.updateData([prefix, industry_suffix, criteria_uid], data, callback, err_call);
    }

    /* Enable Industry Criteria */
    function enableIndustryCriteria(criteria_uid, data, callback, err_call) {
      var data = {
        disabled: false
      };
      requestService.updateData([prefix, industry_suffix, criteria_uid], data, callback, err_call);
    }

    /* Get Industry Specific Criteria From Subject Trigger */
    function getIndustrySpecificCriteriaFromPolicyTrigger(policy_trigger, callback, err_call) {
      requestService.getDataOnceEqualTo([prefix, industry_suffix], 'policy_trigger', policy_trigger, callback, err_call);
    }

    /*********************************************/
    /**               Product Types             **/
    /*********************************************/

    /* Add Insurance Product */
    function addInsuranceProduct(callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.pushData([prefix, products_suffix], data, callback, err_call);
    }

    /* Get Insurance Products */
    function getInsuranceProducts(callback, err_call) {
      requestService.getDataOnce([prefix, products_suffix], callback, err_call);
    }

    /* Get Single Product */
    function getSingleProduct(product_uid, callback, err_call) {
      requestService.getDataOnce([prefix, products_suffix, product_uid], callback, err_call);
    }

    /* Disable Product */
    function disableProduct(product_uid, callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.updateData([prefix, products_suffix, product_uid], data, callback, err_call);
    }

    /* Enable Product */
    function enableProduct(product_uid, callback, err_call) {
      var data = {
        disabled: false
      };
      requestService.updateData([prefix, products_suffix, product_uid], data, callback, err_call);
    }

    /* Save Product */
    function saveProduct(product_uid, data, callback, err_call) {
      requestService.updateData([prefix, products_suffix, product_uid], data, callback, err_call);
    }

    /* get products for the given insurance type */
    function getProductForInsuranceType(insurance_type, callback, err_call) {
      requestService.getDataOnceEqualTo([prefix, products_suffix], 'insurance_type', insurance_type, callback, err_call);
    }

    /* get products mapping for the given product id */
    function getSingleProductMapping(product_id, callback, err_call) {
      requestService.getDataOnce([prefix, insurance_question_mapping_suffix, products_suffix, product_id], callback, err_call);
    }

    /* get products mappings */

    function getProductMappings(callback, err_call) {
      requestService.getDataOnce([prefix, insurance_question_mapping_suffix, products_suffix], callback, err_call);
    }

    /*********************************************/
    /**               Carriers                  **/
    /*********************************************/

    /* Get Carriers */
    function getCarriers(callback, err_call) {
      if (model.carriers) {
        callback(model.carriers);
        return;
      }
      requestService.getDataOnce([prefix, carrier_suffix], function (result) {
        model.carriers = result;
        callback(model.carriers);
      }, err_call);
    }

    /* Download Carrier Photo */
    function downloadCarrier(file_url, callback, err_call) {
      fileService.downloadFileWithCustomEndpoint([prefix, carrier_suffix], file_url, callback, err_call);
    }

    /*********************************************/
    /**             Insurance Types             **/
    /*********************************************/

    /* Get Insurance Types */
    function getInsuranceTypes(callback, err_call) {
      if (model.insurance_types) {
        console.log('Returning Insurance Types');
        callback(model.insurance_types);
        return;
      }
      requestService.getDataOnce([prefix, insurance_suffix], function (result) {
        console.log('Updating Insurance Types');
        model.insurance_types = result;
        callback(model.insurance_types);
      }, err_call);
    }

    /* Get only enabled Insurance Type */
    function getEnabledInsuranceTypes(callback, err_call) {
      if (model.insurance_types) {
        console.log('Returning Insurance Types');
        callback(model.insurance_types);
        return;
      }
      requestService.getDataOnceEqualTo([prefix, insurance_suffix], 'disabled', false, function (result) {
        console.log('Updating Insurance Types');
        model.insurance_types = result;
        callback(model.insurance_types);
      }, err_call);
    }

    //requestService.getDataOnceEqualTo([prefix, products_suffix], 'insurance_type', insurance_type, callback, err_call);

    /*********************************************/
    /**             Industry Codes             **/
    /*********************************************/

    /* Add Industry Code */
    function addIndustryCode(callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.pushData([prefix, codes_suffix], data, callback, err_call);
    }

    /* Get Industry Codes */
    function getIndustryCodes(callback, err_call) {
      if (model.industryCodes) {
        callback(model.industryCodes);
      } else {
        requestService.getDataOnce([prefix, codes_suffix], function (industryCodes) {
          model.industryCodes = industryCodes;
          callback(industryCodes);
        }, err_call);
      }
    }

    /* Get Single Insurance Type */
    function getSingleIndustryCode(code_uid, callback, err_call) {
      requestService.getDataOnce([prefix, codes_suffix, code_uid], callback, err_call);
    }

    /* Disable Industry Code */
    function disableIndustryCode(code_uid, callback, err_call) {
      var data = {
        disabled: true
      };
      requestService.updateData([prefix, codes_suffix, code_uid], data, callback, err_call);
    }

    /* Enable Industry Code */
    function enableIndustryCode(code_uid, callback, err_call) {
      var data = {
        disabled: false
      };
      requestService.updateData([prefix, codes_suffix, code_uid], data, callback, err_call);
    }

    /* Save Industry Code */
    function saveIndustryCode(code_uid, data, callback, err_call) {
      requestService.updateData([prefix, codes_suffix, code_uid], data, callback, err_call);
    }

    /* Get Policy Specific Criteria From Subject Trigger */
    function getCodeDataFromCode(code, callback, err_call) {
      requestService.getDataOnceEqualTo([prefix, codes_suffix], 'code', code, callback, err_call);
    }

    /*********************************************/
    /**           Activity Questions            **/
    /*********************************************/

    /* Activity Questions */
    function getActivityQuestions(callback, err_call) {
      if (model.activities) {
        callback(model.activities);
        return;
      }
      requestService.getDataOnce([prefix, activity_questions_suffix], function (activities) {
        model.activities = activities;
        callback(activities);
      }, err_call);
    }

    /* Activity Groups */
    function getGroups(callback, err_call) {
      if (model.groups) {
        callback(model.groups);
      }
      requestService.getDataOnce([prefix, activity_group_suffix], function (groups) {
        model.groups = groups;
        callback(model.groups);
      }, err_call);
    }

    /*********************************************/
    /**             Insurance Questions             **/
    /*********************************************/

    /* Get Insurance Questions */
    function getInsuranceQuestions(callback, err_call) {
      if (model.insurance_questions) {
        callback(model.insurance_questions);
        return;
      }
      requestService.getDataOnce([prefix, insurance_questionnaire_suffix], function (result) {
        console.log('Updating Insurance Questions');
        model.insurance_questions = result;
        callback(model.insurance_questions);
      }, err_call);
    }

    function getInsuranceQuestionMappings(callback, err_call) {
      if (model.insurance_questions) {
        callback(model.insurance_question_mappings);
        return;
      }
      requestService.getDataOnce([prefix, insurance_question_mapping_suffix], function (result) {
        console.log('Updating Insurance Question mappings');
        model.insurance_question_mappings = result;
        callback(model.insurance_question_mappings);
      }, err_call);
    }

    /*********************************************/
    /**   Comparison criteria for policy view   **/
    /*********************************************/

    /* Get comparison criteria for policy page */
    function getComparisonCriteriaForPolicy(callback, err_call) {
      if (!model.comparison_criteria) {
        requestService.getDataOnce([prefix, comparison_criteria_suffix], function (result) {
          model.comparison_criteria = result;
          callback(result);
        }, err_call);
      } else {
        callback(model.comparison_criteria);
      }
    }

    function getComparisonCriteriaForPolicyAdditional(comparison_uid, callback, err_call) {
      requestService.getDataOnce([prefix, comparison_criteria_suffix, comparison_uid], callback, err_call);
    }

    /* Return Stuff */
    return {
      getMandates: getMandates,
      addMandate: addMandate,
      uploadMandate: uploadMandate,
      getSingleMandate: getSingleMandate,
      downloadMandate: downloadMandate,
      activateMandate: activateMandate,
      deactivateMandate: deactivateMandate,
      addPolicyCriteria: addPolicyCriteria,
      savePolicyCriteria: savePolicyCriteria,
      getPolicyCriteria: getPolicyCriteria,
      getSinglePolicyCriteria: getSinglePolicyCriteria,
      addCustomField: addCustomField,
      disableCustomField: disableCustomField,
      deletePolicyCriteria: deletePolicyCriteria,
      addInsuranceProduct: addInsuranceProduct,
      getInsuranceProducts: getInsuranceProducts,
      getCarriers: getCarriers,
      downloadCarrier: downloadCarrier,
      getInsuranceTypes: getInsuranceTypes,
      getEnabledInsuranceTypes: getEnabledInsuranceTypes,
      getSingleProduct: getSingleProduct,
      disableProduct: disableProduct,
      enableProduct: enableProduct,
      saveProduct: saveProduct,
      addIndustryCode: addIndustryCode,
      getIndustryCodes: getIndustryCodes,
      getSingleIndustryCode: getSingleIndustryCode,
      disableIndustryCode: disableIndustryCode,
      enableIndustryCode: enableIndustryCode,
      saveIndustryCode: saveIndustryCode,
      enablePolicyCriteria: enablePolicyCriteria,
      getPolicySpecificCriteriaFromSubjectTrigger: getPolicySpecificCriteriaFromSubjectTrigger,
      getIndustrySpecificCriteriaFromPolicyTrigger: getIndustrySpecificCriteriaFromPolicyTrigger,
      enableCustomField: enableCustomField,
      addIndustryCriteria: addIndustryCriteria,
      getIndustryCriteria: getIndustryCriteria,
      getSingleIndustryCriteria: getSingleIndustryCriteria,
      saveIndustryCriteria: saveIndustryCriteria,
      addInudstryCustomField: addInudstryCustomField,
      disableIndustryCustomField: disableIndustryCustomField,
      enableIndustryCustomField: enableIndustryCustomField,
      disableIndustryCriteria: disableIndustryCriteria,
      enableIndustryCriteria: enableIndustryCriteria,
      getCodeDataFromCode: getCodeDataFromCode,
      getActivityQuestions: getActivityQuestions,
      getGroups: getGroups,
      getPolicySpecificCriteria: getPolicySpecificCriteria,
      getInsuranceQuestions: getInsuranceQuestions,
      getInsuranceQuestionMappings: getInsuranceQuestionMappings,
      getProductForInsuranceType: getProductForInsuranceType,
      getSingleProductMapping: getSingleProductMapping,
      getComparisonCriteriaForPolicy: getComparisonCriteriaForPolicy,
      getComparisonCriteriaForPolicyAdditional: getComparisonCriteriaForPolicyAdditional
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('offerService', offerService);

  offerService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService', 'fileService'];

  /* Endpoints */
  var prefix = 'offers';
  var policy_prefix = 'policies';
  var company_prefix = 'companies';

  /* Model */
  var model = {};

  /* Offer Service */
  function offerService($rootScope, firebase, $firebaseObject, requestService, fileService) {

    /* Get Single Offer */
    function getSingleOffer(offer_uid, callback, err_call) {
      requestService.getDataOnce([prefix, offer_uid], callback, err_call);
    }

    /* Change Status of Offer */
    function changeStatus(offer_uid, status, callback, err_call) {
      requestService.updateData([prefix, offer_uid], { status: status }, callback, err_call);
    }

    /* Download File */
    function downloadFile(file_url, company_uid, callback, err_call) {
      fileService.downloadFileWithCustomEndpoint([prefix, company_uid], file_url, callback, err_call);
    }

    /* Appect Offer */
    function appectOffer(offer_uid, offer, comparison_uid, subject, callback, err_call) {
      requestService.getMultipleKeys([{
        name: 'offer', route: [prefix, offer_uid]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        newUpdate[keys['offer'].route + '/status'] = 'accepted';
        newUpdate[keys['offer'].route + '/notified'] = false;
        newUpdate[keys['offer'].route + '/updated_at'] = now;
        newUpdate[keys['offer'].route + '/chosen_comparison'] = comparison_uid;
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Request Offer With Insurance Type */
    function requestOfferWithInsuranceType(company_uid, subject, callback, err_call) {
      requestService.getMultipleKeys([{
        name: 'company', route: [company_prefix, company_uid, prefix]
      }, {
        name: 'offer', route: [prefix]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        newUpdate[keys['company'].route + keys['offer'].key] = true;
        newUpdate[keys['offer'].route + keys['offer'].key] = {
          company: company_uid, status: 'requested', subject: subject, created_at: now, updated_at: now, notified: false
        };
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Get and Store Sigle Offer */
    function getAndStoreSingleOffer(key, callback, err_call) {
      if ($rootScope.company.offers[key] === true && model[key]) {
        console.log('Returning offer model');
        callback(model[key]);
        return;
      } else if ($rootScope.company.offers[key] !== true) {
        err_call('PERMISSION_DENIED');
        return;
      }
      requestService.on_child_value([prefix, key], function (offer) {
        console.log('Updating offer');
        model[key] = offer;
        callback(model[key]);
      }, function (error) {
        err_call(error);
      });
    }

    /* Request Multiple Offers At Once */
    function requestMultipleOffers(insuranceTypesAndProductsDict, company_uid, callback, err_call) {
      var keyArray = [];
      insuranceTypesAndProductsDict;
      for (var insuranceTypeKey in insuranceTypesAndProductsDict) {
        keyArray.push({
          name: insuranceTypeKey + 'offer',
          route: [prefix]
        });
      }

      requestService.getMultipleKeys(keyArray, function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        for (var _insuranceTypeKey in insuranceTypesAndProductsDict) {
          newUpdate[company_prefix + '/' + company_uid + '/' + prefix + '/' + keys[_insuranceTypeKey + 'offer'].key] = true;
          newUpdate[keys[_insuranceTypeKey + 'offer'].route + keys[_insuranceTypeKey + 'offer'].key] = {
            company: company_uid,
            status: 'requested',
            display_version: 2,
            insurance_report_generated: false,
            subject: _insuranceTypeKey,
            created_at: now,
            updated_at: now,
            notified: false,
            products: insuranceTypesAndProductsDict[_insuranceTypeKey]
          };
        }
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Return Stuff */
    return {
      downloadFile: downloadFile,
      getSingleOffer: getSingleOffer,
      changeStatus: changeStatus,
      appectOffer: appectOffer,
      getAndStoreSingleOffer: getAndStoreSingleOffer,
      requestOfferWithInsuranceType: requestOfferWithInsuranceType,
      requestMultipleOffers: requestMultipleOffers
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('policyService', policyService);

  policyService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService', 'fileService'];

  /* Endpoints */
  var prefix = 'policies';
  var recommendations_prefix = 'recommendations';
  var recommended_suffix = 'recommended';
  var company_prefix = 'companies';
  var offer_prefix = 'offers';
  var mandates_prefix = 'mandates';

  /* Model */
  var model = {};

  function policyService($rootScope, firebase, $firebaseObject, requestService, fileService) {

    /* Register Existing Policy From Recommendation */
    function registerExistingPolicyFromRecommendation(company_uid) {
      var recommend_uid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var recommendation_uid = arguments[2];
      var newUpdateDocuments = arguments[3];
      var document_list = arguments[4];
      var callback = arguments[5];
      var err_call = arguments[6];


      var document_map = {};
      for (var key in document_list) {
        document_map[document_list[key].key] = document_list[key];
      }
      requestService.getMultipleKeys([{
        name: 'company', route: [company_prefix, company_uid, prefix]
      }, {
        name: 'policy', route: [prefix]
      }, {
        name: 'recommendation', route: [recommendations_prefix, recommendation_uid, recommended_suffix, recommend_uid]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        newUpdate[keys['company'].route + keys['policy'].key] = true;
        newUpdate[keys['policy'].route + keys['policy'].key] = {
          company: company_uid, status: 'pending', subject: recommend_uid, created_at: now, updated_at: now, documents: document_map, display_version: 2
        };
        newUpdate[keys['recommendation'].route + 'uploaded'] = true;
        newUpdate[keys['recommendation'].route + 'policy'] = keys['policy'].key;
        Object.assign(newUpdate, newUpdateDocuments);
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    //TODO: this function is not called anywhere, decide weather we need it.
    /* Register Existing Policy */
    function registerExistingPolicy(company_uid, file_url, callback, err_call) {
      requestService.getMultipleKeys([{
        name: 'company', route: [company_prefix, company_uid, prefix]
      }, {
        name: 'policy', route: [prefix]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();;
        newUpdate[keys['company'].route + keys['policy'].key] = true;
        newUpdate[keys['policy'].route + keys['policy'].key] = {
          file: file_url, company: company_uid, status: 'pending', created_at: now, updated_at: now, display_version: 2
        };
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Get and Store Sigle Policy */
    function getAndStoreSinglePolicy(key, callback, err_call) {
      if ($rootScope.company.policies[key] === false) {
        return;
      }
      if ($rootScope.company.policies[key] === true && model[key]) {
        console.log('Returning policy model');
        callback(model[key]);
        return;
      }
      requestService.on_child_value([prefix, key], function (policy) {
        console.log('Updating policy');
        model[key] = policy;
        callback(model[key]);
      }, function (error) {
        err_call(error);
      });
    }

    /* Get Pending Policies */
    function getPoliciesWithFilter(sort_param, sort_value, callback, err_call) {
      requestService.getDataOnceEqualTo([prefix], sort_param, sort_value, callback, err_call);
    }

    //TODO: this function is not called anywhere, decide weather we need it.
    /* Save Policy */
    function savePolicy(policy_uid, data, callback, err_call) {
      requestService.updateData([prefix, policy_uid], data, callback, err_call);
    }

    /* Change Policy Status */
    function change_policy_status(policy_uid, status, callback, err_call) {
      requestService.updateData([prefix, policy_uid], { status: status }, callback, err_call);
    }

    /* Delete Policy */
    function delete_policy(company_uid, policy_uid, callback, err_call) {
      requestService.getMultipleKeys([{
        name: 'company', route: [company_prefix, company_uid, prefix, policy_uid]
      }, {
        name: 'policy', route: [prefix, policy_uid]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();;
        newUpdate[keys['company'].route] = false;
        newUpdate[keys['policy'].route + 'status'] = 'deleted';
        newUpdate[keys['policy'].route + 'updated_at'] = now;
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Upload Policy */
    function uploadPolicy(fileItem, company_uid, callback, err_call) {
      fileService.uploadFileWithCustomEndpoint([prefix, company_uid], "", fileItem, callback, err_call);
    }

    /* Download Policy */
    function downloadPolicy(file_url, company_uid, callback, err_call) {
      fileService.downloadFileWithCustomEndpoint([prefix, company_uid], file_url, callback, err_call);
    }

    /* Return Stuff */
    return {
      savePolicy: savePolicy,
      uploadPolicy: uploadPolicy,
      downloadPolicy: downloadPolicy,
      getPoliciesWithFilter: getPoliciesWithFilter,
      registerExistingPolicyFromRecommendation: registerExistingPolicyFromRecommendation,
      getAndStoreSinglePolicy: getAndStoreSinglePolicy,
      registerExistingPolicy: registerExistingPolicy,
      change_policy_status: change_policy_status,
      delete_policy: delete_policy
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('recommendationService', recommendationService);

  recommendationService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService'];

  /* Endpoints */
  var prefix = 'recommendations';
  var activity_suffix = 'activities';
  var company_prefix = 'companies';
  var user_prefix = 'users';

  /* Models */
  var model = {};

  /* Main Service */
  function recommendationService($rootScope, firebase, $firebaseObject, requestService) {

    /* Save */
    function updateRecommendation() {}

    /* Attach Recommendation */
    function attachRecommendation(company_uid, user_uid, insurance_keys, activity_keys, industry_codes, force_url, callback, err_call) {
      var recommendation_data = { company: company_uid, activities: activity_keys, industry_codes: industry_codes, processed: false };
      requestService.attachAndUpdate([{ route: [prefix], data: recommendation_data, attach_for: true, attach_on: "company", under: prefix, overwrite_existing: true }, { route: [company_prefix, company_uid], data: {}, attach_to: true, name: "company" }, { route: [company_prefix, company_uid, activity_suffix], data: activity_keys, no_new_key: true }, { route: [user_prefix, user_uid, 'force_url'], data: force_url, no_new_key: true }], callback, err_call);
    }

    /* Get Recommendations */
    function getRecommendations(recommendation_uid, callback, err_call) {
      if (model && model.key === recommendation_uid && model.key !== null) {
        callback(model.recommendation);
        return;
      }
      requestService.on_child_value([prefix, recommendation_uid], function (recommendation) {
        model.recommendation = recommendation.val();
        model.key = recommendation.key;
        callback(model.recommendation);
      }, function (error) {
        err_call(error);
      });
    }

    function getModel() {
      return model;
    }

    /* Return Stuff */
    return {
      getRecommendations: getRecommendations,
      updateRecommendation: updateRecommendation,
      attachRecommendation: attachRecommendation,
      getModel: getModel
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('redirectService', redirectService);

  redirectService.$inject = ['$rootScope', '$state'];

  /* User Service */
  function redirectService($rootScope, $state) {

    /* Change State with Language */
    function changeStateWithLang(state, stateParam) {
      if ($rootScope && $rootScope.langPreference) {
        $state.go(state + '_' + $rootScope.langPreference, stateParam);
      } else {
        $state.go(state + '_de', stateParam);
      }
      // console.log('GOING TO;',state);
      // $state.go(state,stateParam);
    }

    /* Return Stuff */
    return {
      changeStateWithLang: changeStateWithLang
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('requestService', requestService);

  requestService.$inject = ['$resource', '$rootScope', 'firebase', '$firebaseObject', 'authService'];

  /* Get Dynamic Endpoint */
  /* Needed to reset endpoint between users sign in/out */
  function getEndpoint(routeList, route_only) {
    var route = "";
    for (var i in routeList) {
      route = route.concat(routeList[i], '/');
    }
    console.log('Requested Route:', route);
    if (route_only === true) {
      return { route: route };
    } else {
      return { ref: firebase.database().ref().child(route),
        route: route };
    }
  }

  /* Service Function */
  function requestService($resource, $rootScope, firebase, $firebaseObject, authService) {

    /* Hold Data Tempeorarily */
    var temp_hold_data = null;

    /* Add Timestamps */
    function addTimestamps(data) {
      data.created_at = firebase.database.ServerValue.TIMESTAMP;
      data.updated_at = firebase.database.ServerValue.TIMESTAMP;
      return data;
    }

    /* Get Time */
    function getTimestamp() {
      return firebase.database.ServerValue.TIMESTAMP;
    }

    /* Update Timestamps */
    function updateTimestamps(data) {
      data.updated_at = firebase.database.ServerValue.TIMESTAMP;
      return data;
    }

    /* Push Data */
    function pushData(route, data, callback, err_call) {
      data = addTimestamps(data);
      var dataRef = getEndpoint(route).ref;
      dataRef.push(data).then(function (response) {
        if (callback) {
          callback(response);
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Update Data */
    function updateData(route, data, callback, err_call) {
      var remove_time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var add_timestamp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      if (!remove_time) {
        data = updateTimestamps(data);
      }
      if (add_timestamp) {
        data.timestamp = firebase.database.ServerValue.TIMESTAMP;
      }
      var dataRef = getEndpoint(route).ref;
      dataRef.update(data).then(function () {
        if (callback) {
          callback();
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Deep Write */
    function deepWrite(route_list, first_push, callback, err_call) {
      var newUpdate = {};
      var master;

      // Iterate non slaves
      for (var key in route_list) {
        var item = route_list[key];
        if (item.slave === true) {
          continue;
        }
        var endpoint = getEndpoint(item.route);
        var dataRef = endpoint.ref.push();
        var dataKey = dataRef.key;
        endpoint.route += item.uid || dataKey;
        master = item.master === true ? dataKey : master;
        item.data = first_push === true ? addTimestamps(item.data) : item.data;
        newUpdate[endpoint.route] = item.data;
      }

      // Iterate slaves
      for (var key in route_list) {
        var item = route_list[key];
        if (item.slave !== true) {
          continue;
        }
        var endpoint = getEndpoint(item.route);
        var dataRef = endpoint.ref.push();
        var dataKey = dataRef.key;
        endpoint.route += item.uid || dataKey;
        item.data[item.master_name] = master;
        item.data = first_push === true ? addTimestamps(item.data) : item.data;
        newUpdate[endpoint.route] = item.data;
      }

      // Do a deep-path update
      firebase.database().ref().update(newUpdate).then(function () {
        if (callback) {
          callback();
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Attach and Update */
    function attachAndUpdate(route_list, callback, err_call) {
      var newUpdate = {};
      var attach_for = {};
      var attach_to = {};

      for (var key in route_list) {
        var item = route_list[key];
        var endpoint = getEndpoint(item.route);
        var dataRef = endpoint.ref.push();
        var dataKey = dataRef.key;
        if (item.attach_to === true || item.no_new_key) {
          dataKey = '';
        }
        endpoint.route += dataKey;
        newUpdate[endpoint.route] = item.data;
        if (item.attach_to) {
          attach_to[endpoint.route] = item;
        }
        if (item.attach_for) {
          attach_for[endpoint.route] = { item: item,
            dataKey: dataKey };
        }
      }

      for (var to_key in attach_to) {
        for (var for_key in attach_for) {
          if (attach_to[to_key].name === attach_for[for_key].item.attach_on) {
            delete newUpdate[to_key];
            if (attach_for[for_key].item.overwrite_existing) {
              var new_key = to_key + attach_for[for_key].item.under;
              newUpdate[new_key] = {};
              newUpdate[new_key][attach_for[for_key].dataKey] = true;
            } else {
              var new_key = to_key + attach_for[for_key].item.under + '/' + attach_for[for_key].dataKey;
              newUpdate[new_key] = true;
            }
          }
        }
      }

      // Do a deep-path update
      firebase.database().ref().update(newUpdate).then(function () {
        if (callback) {
          callback();
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    // Get Multiple Keys
    function getMultipleKeys(route_list, callback) {
      var key_list = {};
      for (var key in route_list) {
        var endpoint = getEndpoint(route_list[key].route);
        var dataRef = endpoint.ref.push();
        var dataKey = dataRef.key;
        key_list[route_list[key].name] = {};
        key_list[route_list[key].name].route = endpoint.route;
        key_list[route_list[key].name].key = dataKey;
      }
      callback(key_list);
    }

    // Multu Path update
    function multiPathUpdate(newUpdate, callback, err_call) {
      firebase.database().ref().update(newUpdate).then(function () {
        if (callback) {
          callback();
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Set Data */
    // Requires manual UID
    function setData(route, data, callback, err_call, remove_time) {
      if (!remove_time) {
        data = addTimestamps(data);
      }
      var dataRef = getEndpoint(route).ref;
      dataRef.set(data).then(function () {
        if (callback) {
          callback();
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Delete Data */
    function deleteData(route, callback, err_call) {
      var dataRef = getEndpoint(route).ref;
      dataRef.remove().then(function () {
        if (callback) {
          callback();
        }
      }, function (error) {
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Get Data Once */
    function getDataOnce(route, callback, err_call) {
      var dataRef = getEndpoint(route).ref;
      dataRef.once('value').then(function (snapshot) {
        var data = snapshot.val();
        if (callback) {
          callback(data);
        }
      }, function (error) {
        console.error(error);
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* Get Data Once And Cache */
    function getDataOnceAndCache(route, callback, err_call) {
      var dataRef = getEndpoint(route).ref;
      if (temp_hold_data !== null && temp_hold_data !== undefined) {
        callback(temp_hold_data);
      } else {
        dataRef.once('value').then(function (snapshot) {
          var data = snapshot.val();
          temp_hold_data = data;
          if (callback) {
            callback(data);
          }
        }, function (error) {
          console.error(error);
          if (err_call) {
            err_call(error);
          }
        });
      }
    }

    /* Get Data Once With Filter */
    function getDataOnceEqualTo(route, sort_param, sort_value, callback, err_call) {
      var dataRef = getEndpoint(route).ref;
      if (sort_value == undefined) {
        return;
      }
      dataRef.orderByChild(sort_param).equalTo(sort_value).once('value').then(function (snapshot) {
        var data = snapshot.val();
        if (callback) {
          callback(data);
        }
      }, function (error) {
        console.error(error);
        if (err_call) {
          err_call(error);
        }
      });
    }

    /* On Child Value Changed */
    function on_child_value(route, callback, err_call) {
      var ref = getEndpoint(route).ref;
      ref.on("value", function (snapshot, prevChildKey) {
        callback(snapshot);
      }, err_call);
    }

    /* On Child Value Changed With Params */
    function on_child_value_order_by(route, sort_param, sort_value, callback, err_call) {
      var ref = getEndpoint(route).ref;
      ref.orderByChild(sort_param).equalTo(sort_value).on("value", function (snapshot, prevChildKey) {
        callback(snapshot);
      }, err_call);
    }

    /* Get Liimex API Request With Params */
    function getLiimexResourceWithParams(endpoint, params, callback, err_call) {
      var new_resource = $resource(endpoint);
      var resource_call = new_resource.get(params, function (response) {
        var data = response.data;
        callback(data);
      }, function (error) {
        if (err_call) {
          err_call();
        }
        console.error('Server Error', error);
      });
    }

    /* Get request no params */
    function getResource(url, params, callback, err_call) {
      var new_resource = $resource(url);
      var resource_call = new_resource.query(params, function (response) {
        callback(response);
      }, function (error) {
        if (err_call) {
          err_call();
        }
        console.log('Server Error', error);
      });
    }

    /* Post to  Liimex API Request With Params */
    function postLiimexResourceWithParams(endpoint, params, callback, err_call) {
      var new_resource = $resource(endpoint);
      new_resource.save(params, function (response) {
        if (typeof callback === 'function') {
          callback(response);
        }
      }, function (error) {
        if (typeof err_call === 'function') {
          err_call();
        }
        console.error('Server Error', error);
      });
    }

    /* Return Stuff */
    return {
      pushData: pushData,
      updateData: updateData,
      deepWrite: deepWrite,
      getDataOnce: getDataOnce,
      deleteData: deleteData,
      setData: setData,
      getDataOnceEqualTo: getDataOnceEqualTo,
      getDataOnceAndCache: getDataOnceAndCache,
      on_child_value: on_child_value,
      on_child_value_order_by: on_child_value_order_by,
      attachAndUpdate: attachAndUpdate,
      getLiimexResourceWithParams: getLiimexResourceWithParams,
      postLiimexResourceWithParams: postLiimexResourceWithParams,
      getMultipleKeys: getMultipleKeys,
      multiPathUpdate: multiPathUpdate,
      getTimestamp: getTimestamp,
      getResource: getResource
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('userService', userService);

  userService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'authService', 'requestService', 'backofficeService'];

  /* Endpoints */
  var prefix = 'users';
  var company_prefix = 'companies';
  var address_prefix = 'addresses';
  var employment_prefix = 'employments';

  /* Models */
  var model = {};

  /* User Service */
  function userService($rootScope, firebase, $firebaseObject, authService, requestService, backofficeService) {

    function createAndLinkMandate(company_uid, callback, err_call) {
      backofficeService.initMandate(company_uid, callback, err_call);
    }

    /* Create User */
    function createUserAndCompany(firebase_user, user_params, company_params, address_params, callback, err_call) {
      user_params.password = null;
      user_params.force_url = "verify";
      company_params.users = {};
      company_params.users[firebase_user.uid] = true;
      company_params.liimex_id = $rootScope.genService.generateCompanyId(company_params, address_params);
      requestService.getMultipleKeys([{
        name: 'user',
        route: [prefix]
      }, {
        name: 'company',
        route: [company_prefix]
      }, {
        name: 'address',
        route: [address_prefix]
      }, {
        name: 'employment',
        route: [employment_prefix]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        user_params.created_at = now;
        user_params.updated_at = now;
        user_params.welcome_email_sent = false;
        user_params.verification_email_sent = false;
        address_params.company = keys.company.key;
        address_params.main = true;
        company_params.addresses = {};
        company_params.created_at = now;
        company_params.updated_at = now;
        company_params.addresses[keys.address.key] = true;
        newUpdate[keys.user.route + firebase_user.uid] = user_params;
        newUpdate[keys.address.route + keys.address.key] = address_params;
        newUpdate[keys.company.route + keys.company.key] = company_params;
        newUpdate[keys.employment.route + firebase_user.uid] = {
          company: keys.company.key,
          created_at: now,
          updated_at: now
        };
        // Console.log(newUpdate);
        requestService.multiPathUpdate(newUpdate, function () {
          createAndLinkMandate(keys.company.key, callback, err_call);
        }, err_call);
      });
    }

    /* Create User */
    function createUserAndCompanyWithoutForceUrl(firebase_user, user_params, company_params, address_params, callback, err_call) {
      user_params.password = null;
      company_params.users = {};
      company_params.users[firebase_user.uid] = true;
      company_params.liimex_id = $rootScope.genService.generateCompanyId(company_params, address_params);
      requestService.getMultipleKeys([{
        name: 'user',
        route: [prefix]
      }, {
        name: 'company',
        route: [company_prefix]
      }, {
        name: 'address',
        route: [address_prefix]
      }, {
        name: 'employment',
        route: [employment_prefix]
      }], function (keys) {
        var newUpdate = {},
            now = requestService.getTimestamp();
        user_params.created_at = now;
        user_params.updated_at = now;
        user_params.welcome_email_sent = false;
        user_params.verification_email_sent = false;
        address_params.company = keys.company.key;
        address_params.main = true;
        company_params.addresses = {};
        company_params.created_at = now;
        company_params.updated_at = now;
        company_params.addresses[keys.address.key] = true;
        newUpdate[keys.user.route + firebase_user.uid] = user_params;
        newUpdate[keys.address.route + keys.address.key] = address_params;
        newUpdate[keys.company.route + keys.company.key] = company_params;
        newUpdate[keys.employment.route + firebase_user.uid] = {
          company: keys.company.key,
          created_at: now,
          updated_at: now
        };
        // Console.log(newUpdate);
        requestService.multiPathUpdate(newUpdate, function () {
          createAndLinkMandate(keys.company.key, callback, err_call);
        }, err_call);
      });
    }

    /* Get User Information */
    function getUserInformation(user_id, callback, err_call, fromLocalStorage) {
      if (fromLocalStorage) {
        if (model.user && model.user.email === $rootScope.user.email && model.user_key === $rootScope.currentUser && model.user_key !== null) {
          console.log('Returning User');
          callback(model.user);
          return;
        }
      }
      requestService.on_child_value([prefix, user_id], function (user) {
        console.log('User updated');
        model.user = user.val();
        model.user_key = user.key;
        callback(model.user);
      }, function (error) {
        err_call({ message: "Cant sign in" });
        $rootScope.genService.showDefaultErrorMsg(error.code);
      });
    }

    // Update User Information
    function updateUserInformation(user_id, prev_parmas, params, callback, reauth, err_call) {
      if (params.force_url) {

        /* If force_url already contains a lang suffix, remove it */
        params.force_url = params.force_url.split('_')[0];
      }
      if (prev_parmas.email !== params.email) {
        console.log('Detected: New Email');
        authService.getCurrentUser(function (userObj) {
          authService.changeEmail(userObj, params.email, function () {
            requestService.updateData([prefix, user_id], params, callback, err_call);
          }, function (error) {
            if (error.code === 'auth/requires-recent-login') {
              // REPLACE WITH: Reauth Code
              reauth();
            } else {
              err_call(error);
            }
          });
        });
      } else {
        requestService.updateData([prefix, user_id], params, callback, err_call);
      }
    }

    /* Get Employment */
    function getEmployment(user_id, callback, err_call) {
      requestService.getDataOnce([employment_prefix, user_id], callback, err_call);
    }

    /* Update */
    function update(user_uid, data, callback, err_call) {
      requestService.updateData([prefix, user_uid], data, callback, err_call);
    }

    /* Send New Verification Email */
    function sendVerificationEmail(user_uid, callback, err_call) {
      requestService.updateData([prefix, user_uid], { verification_email_sent: false }, callback, err_call, true);
    }

    /*Return single user info*/
    function getSingleUser(userid, callback, err_call) {
      requestService.getDataOnce([prefix, userid], callback, err_call);
    }

    /* Return Stuff */
    return {
      createUserAndCompany: createUserAndCompany,
      createUserAndCompanyWithoutForceUrl: createUserAndCompanyWithoutForceUrl,
      getUserInformation: getUserInformation,
      updateUserInformation: updateUserInformation,
      getEmployment: getEmployment,
      update: update,
      sendVerificationEmail: sendVerificationEmail,
      getSingleUser: getSingleUser
    };
  }
})();

(function () {

  'use strict';

  angular.module('application').service('instantService', instantService);

  instantService.$inject = ['$rootScope', 'apiService'];

  /* Service Function */
  function instantService($rootScope, apiService) {

    var InstantProcess = null;
    var InstantPurchaseRequest = null;
    var InstantProcessResult = {};

    /* Get Instant Process */
    function getInstantProcess(process_id, page_number, callback, err_call) {
      if (InstantProcess) {
        InstantProcess.$cancelRequest();
      }
      InstantProcess = apiService.InstantPurchaseRequest.get({
        instant_product_request_id: process_id,
        page_number: page_number
      }, function (data) {
        InstantProcessResult.process_id = process_id;
        InstantProcessResult.data = data;
        callback(data);
      }, err_call);
    }

    /* Post New Instant Process */
    function postInstantProcess(product_id, callback, err_call) {
      InstantPurchaseRequest = new apiService.InstantPurchaseRequest();
      InstantPurchaseRequest.product_id = product_id;
      InstantPurchaseRequest.$save(callback, err_call);
    }

    /* Update Current Instant Process */
    function updateInstantProcess(page_number, instant_product_request_id, page_data, callback, err_call) {
      InstantPurchaseRequest = new apiService.InstantPurchaseRequest();
      InstantPurchaseRequest.page_data = page_data;
      InstantPurchaseRequest.$update({ page_number: page_number,
        instant_product_request_id: instant_product_request_id }, callback, err_call);
    }

    /* Save User */
    function saveUser(type, process_id, data, page_number, callback, err_call) {
      var InstantPurchaseUser = new apiService.InstantPurchaseUser({ "type": type,
        "instant_product_request_id": process_id,
        "user": data,
        "page_number": page_number });
      InstantPurchaseUser.$save(function (signup) {
        callback(signup);
      }, function (error) {
        err_call(error.data.error);
      });
    }

    function saveCheckout(page_number, instant_product_request_id, page_data, callback, err_call) {
      var InstantPurchaseCheckout = new apiService.InstantPurchaseCheckout({ "instant_product_request_id": instant_product_request_id,
        "checkout": page_data,
        "page_number": page_number });
      InstantPurchaseCheckout.$save(function (checkout) {
        callback(checkout);
      }, function (error) {
        err_call(error.data.error);
      });
    }

    function processComplete(instant_product_request_id, callback, err_call) {
      var InstantPurchaseProcessComplete = new apiService.InstantPurchaseProcessComplete({ "instant_product_request_id": instant_product_request_id, "process_status": "completed" });
      InstantPurchaseProcessComplete.$save(function (process_complete) {
        callback(process_complete);
      }, function (error) {
        err_call(error.data.error);
      });
    }

    /* Return Stuff */
    return {
      getInstantProcess: getInstantProcess,
      postInstantProcess: postInstantProcess,
      updateInstantProcess: updateInstantProcess,
      saveUser: saveUser,
      saveCheckout: saveCheckout,
      processComplete: processComplete
    };
  }
})();