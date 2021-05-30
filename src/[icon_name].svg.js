import { join } from 'path';
import { promisify } from 'util';
import { get_ as svg_get_ } from '@ctx-core/svg';
const resolve = promisify(require('resolve'));
export const get_ = ((opts = {}) => {
    const { fn } = opts;
    return svg_get_({
        fn,
        resolve: opts.resolve
            || (name__icon => resolve(join('@ctx-core/fontawesome/ui', `FA-${name__icon}.html`)))
    });
});
export const get = get_();
//# sourceMappingURL=%5Bicon_name%5D.svg.js.map