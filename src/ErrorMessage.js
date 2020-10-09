export function errorMessage (response, message) {
  if (!hasError(response)) {
    alert(message)
  }
}

export function hasError (response) {
  if (response.hasOwnProperty('error')) {
    alert(response.message)
    return true
  }
  return false
}
