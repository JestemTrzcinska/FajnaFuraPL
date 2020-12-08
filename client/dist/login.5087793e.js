// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"login.js":[function(require,module,exports) {
var objUsers = [{
  // Object @ 0 index
  email: "konrad@fura.pl",
  password: "12345678"
}, {
  // Object @ 1 index
  email: "jakub@fura.pl",
  password: "12345678"
}, {
  // Object @ 2 index
  email: "maciej@fura.pl",
  password: "12345678"
}, {
  // Object @ 3 index
  email: "patrycja@fura.pl",
  password: "12345678"
}, {
  // Object @ 4 index
  email: "mateusz@fura.pl",
  password: "12345678"
}];

var init = function init() {
  document.getElementById('register_submit').addEventListener('click', register_send);
  document.getElementById('login_submit').addEventListener('click', login_send);
};

var register_send = function register_send(ev) {
  //Czyszczenie poprzednich błędów
  document.getElementById('name').classList.remove('error');
  document.getElementById('name').parentElement.classList.remove('error-msg2');
  document.getElementById('surname').classList.remove('error');
  document.getElementById('surname').parentElement.classList.remove('error-msg2');
  document.getElementById('register_email').classList.remove('error');
  document.getElementById('register_email').parentElement.classList.remove('error-msg2');
  document.getElementById('phone').classList.remove('error');
  document.getElementById('phone').parentElement.classList.remove('error-msg2');
  document.getElementById('register_password').classList.remove('error');
  document.getElementById('register_password').parentElement.classList.remove('error-msg2');
  document.getElementById('register_password2').classList.remove('error');
  document.getElementById('register_password2').parentElement.classList.remove('error-msg2');
  document.getElementById('rodo').classList.remove('error');
  document.getElementById('rodo').parentElement.classList.remove('error-msg2'); //Potwierdzenie opuszczenia strony

  window.onbeforeunload = function (e) {
    var message = "Strona prosi o potwierdzenie decyzji jej opuszczenia",
        e = e || window.event;

    if (e) {
      e.returnValue = message;
    }

    return message;
  };

  var fails = register_validate();

  if (fails.length === 0) {
    document.getElementById('form_register').submit();
  } else {
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function (obj) {
      var field = document.getElementById(obj.input);
      field.classList.add('error');
      field.parentElement.classList.add('error-msg2');
      field.parentElement.setAttribute('data-errormsg', obj.msg);
    });
  }
};

var login_send = function login_send(ev) {
  //Czyszczenie poprzednich błędów
  document.getElementById('login_email').classList.remove('error');
  document.getElementById('login_email').parentElement.classList.remove('error-msg2');
  document.getElementById('login_password').classList.remove('error');
  document.getElementById('login_password').parentElement.classList.remove('error-msg2');
  var fails = login_validate();

  if (fails.length === 0) {
    document.getElementById('form_login').submit();
  } else {
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function (obj) {
      var field = document.getElementById(obj.input);
      field.classList.add('error');
      field.parentElement.classList.add('error-msg2');
      field.parentElement.setAttribute('data-errormsg', obj.msg);
    });
  }
};

var register_validate = function register_validate(ev) {
  var failures = [];
  var name = document.getElementById('name');
  var surname = document.getElementById('surname');
  var email = document.getElementById('register_email');
  var phone = document.getElementById('phone');
  var password = document.getElementById('register_password');
  var password2 = document.getElementById('register_password2');
  var rodo = document.getElementById('rodo');

  if (name.value === "") {
    failures.push({
      input: 'name',
      msg: 'Pole wymagane!'
    });
  } else if (!name.value.match(/[a-z]/i)) {
    failures.push({
      input: 'name',
      msg: 'Nieprawidłowe dane!'
    });
  }

  if (surname.value === "") {
    failures.push({
      input: 'surname',
      msg: 'Pole wymagane!'
    });
  } else if (!surname.value.match(/[a-z]/i)) {
    failures.push({
      input: 'surname',
      msg: 'Nieprawidłowe dane!'
    });
  }

  if (email.value === "") {
    failures.push({
      input: 'register_email',
      msg: 'Pole wymagane!'
    });
  } else if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
    failures.push({
      input: 'register_email',
      msg: 'Nieprawidłowe dane!'
    });
  } else {
    for (var i = 0; i < objUsers.length; i++) {
      if (email.value == objUsers[i].email) {
        failures.push({
          input: 'register_email',
          msg: 'Email zajęty!'
        });
      }
    }
  }

  if (phone.value === "") {
    failures.push({
      input: 'phone',
      msg: 'Pole wymagane!'
    });
  }

  if (password.value.length < 6) {
    failures.push({
      input: 'register_password',
      msg: 'Hasło za krótkie!'
    });
  }

  if (password2.value.length < 6) {
    failures.push({
      input: 'register_password2',
      msg: 'Hasło za krótkie!'
    });
  }

  if (password.value != password2.value) {
    failures.push({
      input: 'register_password2',
      msg: 'Hasła są różne!'
    });
  }

  if (!rodo.checked) {
    failures.push({
      input: 'rodo',
      msg: 'Pole wymagane!'
    });
  }

  return failures;
};

var login_validate = function login_validate(ev) {
  var failures = [];
  var email = document.getElementById('login_email');
  var password = document.getElementById('login_password');

  if (email.value === "") {
    failures.push({
      input: 'login_email',
      msg: 'Pole wymagane!'
    });
  } else if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
    failures.push({
      input: 'login_email',
      msg: 'Nieprawidłowe dane!'
    });
  }

  if (password.value === "") {
    failures.push({
      input: 'login_password',
      msg: 'Pole wymagane!'
    });
  }

  if (failures.length != 0) {
    return failures;
  }

  var success = 0;

  for (var i = 0; i < objUsers.length; i++) {
    if (email.value == objUsers[i].email && password.value == objUsers[i].password) {
      alert(email.value + " zalogowany/zalogowana");
      success = 1;
    }
  }

  if (!success) {
    alert("Złe dane logowania!");
    failures.push({
      input: 'login_email',
      msg: 'Błędne dane!'
    });
    failures.push({
      input: 'login_password',
      msg: 'Błędne dane!'
    });
  }

  return failures;
};

var rodo_show = function rodo_show(ev) {
  document.getElementById('rodo_div').style.visibility = "visible";
};

var rodo_hide = function rodo_hide(ev) {
  document.getElementById('rodo_div').style.visibility = "hidden";
};

var rodo_check = function rodo_check(ev) {
  rodo_hide();
  document.getElementById('rodo').checked = true;
};

document.addEventListener('DOMContentLoaded', init);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57219" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","login.js"], null)
//# sourceMappingURL=/login.5087793e.js.map