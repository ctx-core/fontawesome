import { join } from 'path'
import { promisify } from 'util'
import {
	_get as _svg_get, _get_opts_T, _get_T, get_T
} from '@ctx-core/svg'
const resolve = promisify(require('resolve'))
export const _get = ((opts:_get_opts_T = {})=>{
	const { fn } = opts
	return _svg_get({
		fn,
		resolve:
			opts.resolve
			|| (
				name__icon=>
					resolve(join('@ctx-core/fontawesome/ui', `FA-${name__icon}.html`)))
	})
}) as _get_T
export const get = _get() as get_T
