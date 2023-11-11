import { svg_get_ } from '@ctx-core/svg-ui-svelte'
import { join } from 'path'
import resolve from 'resolve'
import { promisify } from 'util'
const resolve_async = promisify(resolve)
/** @type {import('@ctx-core/svg-ui-svelte').get__T} */
export const get_ = (opts = {})=>{
	const { fn } = opts
	return svg_get_({
		fn,
		resolve: opts.resolve || ((icon_name)=>resolve_async(join('@ctx-core/fontawesome/ui', `FA-${icon_name}.html`)))
	})
}
export const get = get_()
