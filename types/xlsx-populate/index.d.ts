declare module 'xlsx-populate' {
  export function fromFileAsync(path: string): Promise<Workbook>

  export interface Workbook {
    outputAsync(): string | Uint8Array | ArrayBuffer | Blob
    properties(properties: CoreProperties): Workbook
    properties(): CoreProperties
  }

  export interface CoreProperties {
    _node: {
      name: string
      attributes: CorePropertyAttribute
      children: Array<{
        name: string
        attributes: CorePropertyAttribute
        children: string[]
      }>
    }
  }

  export interface CorePropertyAttribute {
    [key: string]: string
  }
}
