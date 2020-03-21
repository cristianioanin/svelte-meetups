export function isRequired(val) {
  if (typeof val === 'string') {
    return val.trim().length !== 0;
  }

  return true;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
