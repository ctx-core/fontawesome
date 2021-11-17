import { join } from 'path'
import resolve from 'resolve'
import { promisify } from 'util'
const resolve_async = promisify(resolve)
import { svg_get_, get_opts__T, get__T, get_T, svg_get__resolve_T } from '@ctx-core/svg'
export const get_ = ((opts:get_opts__T = {})=>{
	const { fn } = opts
	return svg_get_({
		fn,
		resolve:
			(opts.resolve as svg_get__resolve_T)
			|| (
				(icon_name:string)=>
					resolve_async(join('@ctx-core/fontawesome/ui', `FA-${icon_name}.html`))
			)
	})
}) as get__T
export const get = get_() as get_T
