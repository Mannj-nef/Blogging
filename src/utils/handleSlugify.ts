export const slugiFy = (value: string) => {
  return value.toLowerCase().trim().replaceAll(' ', '-')
}
