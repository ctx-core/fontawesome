import { join } from 'path'
import { promisify } from 'util'
import {
	get_ as svg_get_, get_opts__T, get__T, get_T
} from '@ctx-core/svg'
const resolve = promisify(require('resolve'))
export const get_ = ((opts:get_opts__T = {})=>{
	const { fn } = opts
	return svg_get_({
		fn,
		resolve:
			opts.resolve
			|| (
				name__icon=>
					resolve(join('@ctx-core/fontawesome/ui', `FA-${name__icon}.html`)))
	})
}) as get__T
export const get = get_() as get_T
