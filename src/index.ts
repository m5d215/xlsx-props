import { writeFile } from 'fs'
import xlsx from 'xlsx-populate'
import { promisify } from 'util'

const usage = `Usage:
    xlsx-props ls <source-path>
    xlsx-props rm <source-path> <destination-path>
`

async function ls(source: string): Promise<void> {
  const workbook = await xlsx.fromFileAsync(source)

  const properties = workbook.properties()
  console.log(JSON.stringify(properties._node.children, null, 2))
}

async function rm(source: string, destination: string): Promise<void> {
  const workbook = await xlsx.fromFileAsync(source)

  const properties = workbook.properties()
  properties._node.children = []
  workbook.properties(properties)

  const content = await workbook.outputAsync()
  promisify(writeFile)(destination, content)
}

async function main(args: string[]): Promise<'success' | 'usage'> {
  const [action, source, destination, ...rest] = args as (string | undefined)[]
  if (rest.length !== 0) {
    return 'usage'
  }

  switch (action) {
    case 'ls':
      if (source === undefined || destination !== undefined) {
        return 'usage'
      } else {
        ls(source)
        return 'success'
      }

    case 'rm':
      if (source === undefined || destination === undefined) {
        return 'usage'
      } else {
        rm(source, destination)
        return 'success'
      }

    default:
      return 'usage'
  }
}

main(process.argv.slice(2)).then(result => {
  switch (result) {
    case 'success':
      process.exitCode = 0
      break

    case 'usage':
      console.error(usage)
      process.exitCode = 1
      break
  }
})
