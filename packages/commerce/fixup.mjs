import { readFile, writeFile } from 'fs/promises'

const packageJson = await readFile('package.json', 'utf8')

writeFile('dist/package.json', packageJson, 'utf8')
