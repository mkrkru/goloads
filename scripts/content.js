const current = window.location;
const goServer = "https://doats.ml:8080";
const tguser = 447509790;

window.onload = () => {
    if (current.host.includes("192") || current.host.includes("magazik") || current.host.includes("goloads-site")) return;

    fetch(goServer, { method: 'GET' })
        .then(res => res.json())
        .then(res => choose(res));

    // for (let i = 0; i < images.length; i++) images[i].src = `http://placekitten.com/${images[i].width}/${images[i].height}`;
}

function createDoc(size, res) {
    let n = document.createElement("div");
    n.innerHTML = `<a href="http://${res.url}" target="_blank"><img src="${res.image}" style="${size}"></a>`;

    n.addEventListener("click", () => {
        fetch(`${goServer}/clicked`, {
            method: 'POST',
            body: JSON.stringify({
                "banner_id": res.id,
                "user_id": tguser
            })
        })
    });

    return n;
};

function choose(res) {
    // yandex
    // stackoverflow
    // vk
    // youtube
    // github

    if (current.hostname.includes("yandex")) {

        if (current.pathname.includes("search")) {
            let newdoc = createDoc("height: 80px; width: 500px;", res);
            newdoc.className = "addableBannerYandexSearch";
            document.getElementsByClassName("main__center")[0].before(newdoc);
        } else {
            let newdoc = createDoc("height: 110px; width: 900px;", res);
            newdoc.className = "addableBannerYandex";
            document.getElementsByClassName("container__search")[0].after(newdoc);
        }

    } else if (current.hostname.includes("stackoverflow")) {

        let newdoc = createDoc("height: 80px; width: 700px;", res);
        newdoc.className = "addableBannerStack";
        document.getElementsByClassName("js-report-ad-button-container")[0].after(newdoc);

    } else if (current.hostname.includes("vk")) {

        // document.getElementsByClassName("ads_ad_box").forEach(x => x.remove());

        let newdoc = createDoc("height: 165px; width: 145px;", res);
        newdoc.className = "addableBannerVk";
        document.getElementsByClassName("side_bar_nav")[0].after(newdoc);

        document.getElementById("ads_left").remove();

    } else if (current.host.includes("youtube")) {

        if (current.pathname.includes("watch")) {
            let newdoc = createDoc("height: 94px; width: 374px;", res);
            // newdoc.className = "addableBannerYtWatch";
            document.getElementsByClassName("ytd-item-section-renderer")[0].before(newdoc);
        } else {
            let newdoc = createDoc("width: 1504px; height: 120px;", res);
            newdoc.className = "addableBannerYt";
            document.getElementsByClassName("ytd-rich-grid-renderer")[0].before(newdoc);
        }

    } else if (current.host.includes("github")) {

        let newdoc = createDoc("width: 720px; height: 80px;", res);
        document.getElementsByClassName("news")[0].before(newdoc);

    } else {
        // if (!global.showFloating) return;
        // let newdoc = createDoc("height: 80px; width: 500px", res);
        // newdoc.className = "addableBannerFloat";
        // document.body.appendChild(newdoc);
    };

    fetch(`${goServer}/watched`, {
        method: 'POST',
        body: JSON.stringify({
            "banner_id": res.id,
            "user_id": tguser
        })
    });
};

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