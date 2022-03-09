export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}
