
export default function (path) {
  return /^(\/admin)+(\/)?(.*)$/.test(path)
}
