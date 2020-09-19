import {
	_get as _svg_get, _get_opts_type, _get_type, get_type
} from '@ctx-core/svg/[icon_name].svg'
import { join } from 'path'
import { promisify } from 'util'
const resolve = promisify(require('resolve'))
export const _get = ((opts:_get_opts_type = {})=>{
	const { fn } = opts
	return _svg_get({
		fn,
		resolve:
			opts.resolve
			|| (
				name__icon=>
					resolve(join('@ctx-core/fontawesome/ui', `FA-${name__icon}.html`)))
	})
}) as _get_type
export const get = _get() as get_type
