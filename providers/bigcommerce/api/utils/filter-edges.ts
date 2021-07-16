export default function filterEdges<T>(
  edges: (T | null | undefined)[] | null | undefined
) {
  return edges?.filter((edge): edge is T => !!edge) ?? []
}
