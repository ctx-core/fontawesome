import { join } from 'path';
import { promisify } from 'util';
import { _get as _svg_get } from '@ctx-core/svg';
const resolve = promisify(require('resolve'));
export const _get = ((opts = {}) => {
    const { fn } = opts;
    return _svg_get({
        fn,
        resolve: opts.resolve
            || (name__icon => resolve(join('@ctx-core/fontawesome/ui', `FA-${name__icon}.html`)))
    });
});
export const get = _get();
//# sourceMappingURL=%5Bicon_name%5D.svg.js.map