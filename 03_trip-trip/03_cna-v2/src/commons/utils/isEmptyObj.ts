export const isEmptyObj = (obj: Record<string, unknown> | null | undefined): boolean => {
  if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).length === 0
  }

  return false
}
