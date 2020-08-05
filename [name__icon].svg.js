"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports._get = void 0;
const _name__icon__svg_1 = require("@ctx-core/svg/[name__icon].svg");
const path_1 = require("path");
const util_1 = require("util");
const resolve = util_1.promisify(require('resolve'));
function _get(opts = {}) {
    const { fn } = opts;
    return _name__icon__svg_1._get({
        fn,
        resolve: opts.resolve
            || (name__icon => resolve(path_1.join('@ctx-core/fontawesome/ui', `FA-${name__icon}.html`)))
    });
}
exports._get = _get;
exports.get = _get();
