export function hasNumber(value: string) {
  return /[0-9]/.test(value)
}

export function hasSpecialChar(value: string) {
  return /[!?@#$&^*_\-=+]/.test(value)
}

export function hasLowercaseChar(value: string) {
  return /[a-z]/.test(value)
}

export function hasUppercaseChar(value: string) {
  return /[A-Z]/.test(value)
}
