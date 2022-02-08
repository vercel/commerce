export async function build(task, opts) {
  await task
    .source('src/**/*.+(ts|tsx|js)')
    .swc({ dev: opts.dev, outDir: 'dist', baseUrl: 'src' })
    .target('dist')
    .source('src/**/*.+(json|cjs)')
    .target('dist')
  task.$.log('Compiled src files')
}

export async function release(task) {
  await task.clear('dist').start('build')
}

export default async function dev(task) {
  const opts = { dev: true }
  await task.clear('dist')
  await task.start('build', opts)
}
