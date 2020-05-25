#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { basename, dirname, join, resolve } = require('path')
const { _h__param } = require('@ctx-core/cli-args')
const { DomHandler, Parser } = require('htmlparser2')
const { getInnerHTML } = require('domutils')
const { promisify } = require('util')
const { assign, keys } = require('@ctx-core/object')
const { map, sort } = require('@ctx-core/array')
const globby = require('globby')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const output_dir__default = resolve(join(__dirname, '/../'))
main()
async function main() {
	const { dir, output_dir } = _opts()
	const a1__path__svg = await globby(`${dir}/svgs/*/*.svg`)
	const h1__html__h0__name__component = {}
	await assign__h1__html__h0__name__component()
	await write__files()
	async function assign__h1__html__h0__name__component() {
		const a1__promise = map(a1__path__svg, async path__svg => {
			const name__icon = basename(path__svg, '.svg')
			const style = basename(dirname(path__svg)).replace('brands', 'brand')
			const name__component = `FA-${name__icon}-${style}`
			let html
			const handler = new DomHandler((error, dom) => {
				if (error) {
					throw error
				} else {
					const { attribs } = dom[0]
					const { viewbox } = attribs
					const [width, height] = viewbox.split(/ +/g).slice(2)
					assign(attribs, { width, height })
					html = `
<Icon bind:node viewBox="${viewbox}" width="${width}" height="${height}" {...$$props}>${getInnerHTML(dom[0])}</Icon>
					`.trim()
				}
			})
			const parser = new Parser(handler)
			const html__file = await readFile(path__svg)
			parser.write(html__file)
			parser.end()
			h1__html__h0__name__component[name__component] = html
		})
		await Promise.all(a1__promise)
	}
	async function write__files() {
		const a1__name__Icon = sort(keys(h1__html__h0__name__component))
		await Promise.all(map(a1__name__Icon, name__Icon => {
			writeFile(`${output_dir}/ui/${name__Icon}.svelte`, `
<script>
import Icon from '@ctx-core/fontawesome/ui/Icon.svelte'
export let node = null
</script>
${h1__html__h0__name__component[name__Icon]}
			`.trim())
		}))
	}
}
function _opts() {
	const { dir, output_dir, help } =
		_h__param(process.argv.slice(2), {
			dir: '-d, --dir',
			output_dir: '-o, --output-dir',
			help: '-h, --help',
		})
	if (help) {
		console.info(_help_msg())
		process.exit(0)
	}
	const opts_error_a1 = _opts_error_a1({ dir, output_dir })
	if (opts_error_a1) {
		throw opts_error_a1.join('\n')
	}
	return {
		dir,
		output_dir: output_dir || output_dir__default,
	}
}
function _help_msg() {
	return `
Usage: refresh-font-awesome.js -d <dir> -o <output-dir>

Options:

-h, --help        This help message
-d, --dir         Directory containing fontawesome files 
-o, --output-dir  Directory to output generated components to
		`.trim()
}
function _opts_error_a1({ dir, output_dir }) {
	const a1__error = []
	if (!dir) {
		a1__error.push('missing --dir <fontawesome-dir>')
	}
	if (!output_dir) {
		a1__error.push('missing --output-dir <library-dir>')
	}
	return a1__error.length && a1__error
}
