const goServer = "https://doats.ml:8080";
// const global = require("./global.js");

window.onload = () => {
    document.getElementById("popupModalButtonSend").addEventListener("click", sendData);
    document.getElementById("popupModalButtonGet").addEventListener("click", getData);
    document.getElementById("popupModalButtonDelete").addEventListener("click", deleteData);
    // document.getElementById("switchFloating").addEventListener("click", switchFloating);

    document.getElementById("withdrawMoney").addEventListener("click", withdrawMoney);
    
    fetch(`${goServer}/info/get`, {
        method: 'POST',
        body: JSON.stringify({ "id": cookie.get("tg_user") })
    })
        .then(res => res.json())
        .then(res => {
            if (res.money) {
                document.getElementById("nickname").innerHTML = res.nickname;
                document.getElementById("money").innerHTML = `${res.money} GT`;
            } else {
                // document.getElementById("nickname").innerHTML = `<p class="loginLink">Войти</p>`;
                // document.getElementsByClassName("loginLink")[0].addEventListener("click", () => { window.open("http://goloads-site.herokuapp.com") });
            }
        });
}

function withdrawMoney() {
    fetch(`${goServer}/info/withdraw`, {
        method: 'POST',
        body: JSON.stringify({
            "nickname": document.getElementById("nickname").innerHTML,
            "money": parseInt(document.getElementById("money").innerHTML)
        })
    })
        .then(res => res.json())
        .then(res => log(JSON.stringify(res)));
}

function log(what) {
    let rr = document.createElement("p");
    rr.innerHTML = what;
    rr.className = "logs";
    document.body.appendChild(rr);
    setTimeout(() => { rr.remove() }, 5000);
}

function idGen(len) {
    let text = "";
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function switchFloating() {
    if (global.showFloating) {
        global.showFloating = false;
        document.getElementById("switchFloating").innerHTML = "выкл";
    } else {
        global.showFloating = true;
        document.getElementById("switchFloating").innerHTML = "вкл";
    }
}

function getData() {
    fetch(goServer, { method: 'GET' })
        .then(res => res.json())
        .then(res => log(JSON.stringify(res)))
}

function sendData() {
    let newBannerData = {
        "id": idGen(20),
        "image": document.getElementById("newBannerImage").value,
        "url": document.getElementById("newBannerUrl").value,
        "domains": document.getElementById("newBannerDomains").value.split(" ")
    };

    if ([newBannerData.image, newBannerData.url, newBannerData.domains].includes("")) return;

    fetch(`${goServer}/add`, {
        method: 'POST',
        body: JSON.stringify(newBannerData)
    })
        .then(res => res.json())
        .then(res => log(res.body));

    document.getElementById("newBannerImage").value = "";
    document.getElementById("newBannerUrl").value = "";
    document.getElementById("newBannerDomains").value = "";
}

function deleteData() {
    let oldid = document.getElementById("oldBannerId").value;
    if (oldid.length !== 20) return;

    fetch(`${goServer}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ "id": oldid })
    })
        .then(res => res.json())
        .then(res => log(res.body));

    document.getElementById("oldBannerId").value = "";
}

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.cookie = factory());
}(this, function () {
    'use strict';

    // Copyright (c) Florian Hartmann, https://github.com/florian https://github.com/florian/cookie.js

    var cookie = function () {
        return cookie.get.apply(cookie, arguments);
    };

    var utils = cookie.utils = {

        // Is the given value an array? Use ES5 Array.isArray if it's available.
        isArray: Array.isArray || function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },

        // Is the given value a plain object / an object whose constructor is `Object`?
        isPlainObject: function (value) {
            return !!value && Object.prototype.toString.call(value) === '[object Object]';
        },

        // Convert an array-like object to an array – for example `arguments`.
        toArray: function (value) {
            return Array.prototype.slice.call(value);
        },

        // Get the keys of an object. Use ES5 Object.keys if it's available.
        getKeys: Object.keys || function (obj) {
            var keys = [],
                key = '';
            for (key in obj) {
                if (obj.hasOwnProperty(key)) keys.push(key);
            }
            return keys;
        },

        // Unlike JavaScript's built-in escape functions, this method
        // only escapes characters that are not allowed in cookies.
        encode: function (value) {
            return String(value).replace(/[,;"\\=\s%]/g, function (character) {
                return encodeURIComponent(character);
            });
        },

        decode: function (value) {
            return decodeURIComponent(value);
        },

        // Return fallback if the value is not defined, otherwise return value.
        retrieve: function (value, fallback) {
            return value == null ? fallback : value;
        }

    };

    cookie.defaults = {};

    cookie.expiresMultiplier = 60 * 60 * 24;

    cookie.set = function (key, value, options) {
        if (utils.isPlainObject(key)) {
            // `key` contains an object with keys and values for cookies, `value` contains the options object.

            for (var k in key) {
                if (key.hasOwnProperty(k)) this.set(k, key[k], value);
            }
        } else {
            options = utils.isPlainObject(options) ? options : { expires: options };

            // Empty string for session cookies.
            var expires = options.expires !== undefined ? options.expires : (this.defaults.expires || ''),
                expiresType = typeof (expires);

            if (expiresType === 'string' && expires !== '') expires = new Date(expires);
            else if (expiresType === 'number') expires = new Date(+new Date + 1000 * this.expiresMultiplier * expires); // This is needed because IE does not support the `max-age` cookie attribute.

            if (expires !== '' && 'toUTCString' in expires) expires = ';expires=' + expires.toUTCString();

            var path = options.path || this.defaults.path;
            path = path ? ';path=' + path : '';

            var domain = options.domain || this.defaults.domain;
            domain = domain ? ';domain=' + domain : '';

            var secure = options.secure || this.defaults.secure ? ';secure' : '';
            if (options.secure === false) secure = '';

            var sameSite = options.sameSite || this.defaults.sameSite;
            sameSite = sameSite ? ';SameSite=' + sameSite : '';
            if (options.sameSite === null) sameSite = '';

            document.cookie = utils.encode(key) + '=' + utils.encode(value) + expires + path + domain + secure + sameSite;
        }

        return this; // Return the `cookie` object to make chaining possible.
    };

    cookie.setDefault = function (key, value, options) {
        if (utils.isPlainObject(key)) {
            for (var k in key) {
                if (this.get(k) === undefined) this.set(k, key[k], value);
            }
            return cookie;
        } else {
            if (this.get(key) === undefined) return this.set.apply(this, arguments);
        }
    },

        cookie.remove = function (keys) {
            keys = utils.isArray(keys) ? keys : utils.toArray(arguments);

            for (var i = 0, l = keys.length; i < l; i++) {
                this.set(keys[i], '', -1);
            }

            return this; // Return the `cookie` object to make chaining possible.
        };

    cookie.removeSpecific = function (keys, options) {
        if (!options) return this.remove(keys);

        keys = utils.isArray(keys) ? keys : [keys];
        options.expires = -1;

        for (var i = 0, l = keys.length; i < l; i++) {
            this.set(keys[i], '', options);
        }

        return this; // Return the `cookie` object to make chaining possible.
    };

    cookie.empty = function () {
        return this.remove(utils.getKeys(this.all()));
    };

    cookie.get = function (keys, fallback) {
        var cookies = this.all();

        if (utils.isArray(keys)) {
            var result = {};

            for (var i = 0, l = keys.length; i < l; i++) {
                var value = keys[i];
                result[value] = utils.retrieve(cookies[value], fallback);
            }

            return result;

        } else return utils.retrieve(cookies[keys], fallback);
    };

    cookie.all = function () {
        if (document.cookie === '') return {};

        var cookies = document.cookie.split('; '),
            result = {};

        for (var i = 0, l = cookies.length; i < l; i++) {
            var item = cookies[i].split('=');
            var key = utils.decode(item.shift());
            var value = utils.decode(item.join('='));
            result[key] = value;
        }

        return result;
    };

    cookie.enabled = function () {
        if (navigator.cookieEnabled) return true;

        var ret = cookie.set('_', '_').get('_') === '_';
        cookie.remove('_');
        return ret;
    };

    return cookie;

}));