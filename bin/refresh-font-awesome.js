#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { basename, dirname, join, resolve } = require('path')
const { _param_h } = require('@ctx-core/cli-args')
const { DomHandler, Parser } = require('htmlparser2')
const { getInnerHTML } = require('domutils')
const { promisify } = require('util')
const { assign, keys } = require('@ctx-core/object')
const { map, sort } = require('@ctx-core/array')
const globby = require('globby')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const default_output_dir = resolve(join(__dirname, '/../'))
main().then()
async function main() {
	const { dir, output_dir } = _opts()
	const svg_path_a1 = await globby(`${dir}/svgs/*/*.svg`)
	const component_name_h_html = {}
	await assign_component_name_h0_html_h1()
	await write_files()
	async function assign_component_name_h0_html_h1() {
		const promise_a1 = map(svg_path_a1, async svg_path => {
			const icon_name = basename(svg_path, '.svg')
			const style = basename(dirname(svg_path)).replace('brands', 'brand')
			const component_name = `FA-${icon_name}-${style}`
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
			const file_html = await readFile(svg_path)
			parser.write(file_html)
			parser.end()
			component_name_h_html[component_name] = html
		})
		await Promise.all(promise_a1)
	}
	async function write_files() {
		const Icon_name_a1 = sort(keys(component_name_h_html))
		await Promise.all(map(Icon_name_a1, Icon_name => {
			writeFile(`${output_dir}/ui/${Icon_name}.svelte`, `
<script>
import Icon from '@ctx-core/fontawesome/ui/Icon.svelte'
export let node = null
</script>
${component_name_h_html[Icon_name]}
			`.trim())
		}))
	}
}
function _opts() {
	const { dir, output_dir, help } =
		_param_h(process.argv.slice(2), {
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
		output_dir: output_dir || default_output_dir,
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
	const error_a1 = []
	if (!dir) {
		error_a1.push('missing --dir <fontawesome-dir>')
	}
	if (!output_dir) {
		error_a1.push('missing --output-dir <library-dir>')
	}
	return error_a1.length && error_a1
}
