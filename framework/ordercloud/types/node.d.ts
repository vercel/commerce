export interface CustomNodeJsGlobal extends NodeJS.Global {
  token: string | null | undefined
}
