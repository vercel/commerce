// Based on
// https://github.com/vercel/next.js/blob/canary/packages/next/taskfile-swc.js

// taskr babel plugin with Babel 7 support
// https://github.com/lukeed/taskr/pull/305

const path = require('path')
const transform = require('@swc/core').transform

module.exports = function (task) {
  task.plugin(
    'swc',
    {},
    function* (
      file,
      { server = true, stripExtension, dev, outDir = 'dist', baseUrl = '' } = {}
    ) {
      // Don't compile .d.ts
      if (file.base.endsWith('.d.ts')) return

      const swcClientOptions = {
        module: {
          type: 'es6',
          ignoreDynamic: true,
        },
        jsc: {
          loose: true,
          target: 'es2016',
          parser: {
            syntax: 'typescript',
            dynamicImport: true,
            tsx: file.base.endsWith('.tsx'),
          },
          transform: {
            react: {
              runtime: 'automatic',
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              development: false,
              useBuiltins: true,
            },
          },
        },
      }
      const swcServerOptions = {
        module: {
          type: 'es6',
          ignoreDynamic: true,
        },
        env: {
          targets: {
            node: '14.0.0',
          },
        },
        jsc: {
          loose: true,
          parser: {
            syntax: 'typescript',
            dynamicImport: true,
            tsx: file.base.endsWith('.tsx'),
          },
          transform: {
            react: {
              runtime: 'automatic',
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              development: false,
              useBuiltins: true,
            },
          },
        },
      }

      const swcOptions = server ? swcServerOptions : swcClientOptions
      const filePath = path.join(file.dir, file.base)
      const options = {
        filename: filePath,
        sourceMaps: false,
        ...swcOptions,
      }

      if (options.sourceMaps && !options.sourceFileName) {
        // Using `outDir` and `baseUrl` build a relative path from `outDir` to
        // the `baseUrl` path for source maps
        const basePath = path.join(__dirname, baseUrl)
        const relativeFilePath = path.relative(basePath, filePath)
        const fullFilePath = path.join(__dirname, filePath)
        const distFilePath = path.dirname(
          path.join(__dirname, outDir, relativeFilePath)
        )

        options.sourceFileName = path.relative(distFilePath, fullFilePath)
      }

      const output = yield transform(file.data.toString('utf-8'), options)
      const ext = path.extname(file.base)

      // Replace `.ts|.tsx` with `.js` in files with an extension
      if (ext) {
        const extRegex = new RegExp(ext.replace('.', '\\.') + '$', 'i')
        // Remove the extension if stripExtension is enabled or replace it with `.js`
        file.base = file.base.replace(extRegex, stripExtension ? '' : '.js')
      }

      if (output.map) {
        const map = `${file.base}.map`

        output.code += Buffer.from(`\n//# sourceMappingURL=${map}`)

        // add sourcemap to `files` array
        this._.files.push({
          base: map,
          dir: file.dir,
          data: Buffer.from(output.map),
        })
      }

      file.data = Buffer.from(output.code)
    }
  )
}
