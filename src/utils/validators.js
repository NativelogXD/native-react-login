export function isEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase());
}

export function minLength(value, length) {
  return typeof value === 'string' && value.length >= length;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email) errors.email = 'El email es requerido';
  else if (!isEmail(email)) errors.email = 'Email inválido';

  if (!password) errors.password = 'La contraseña es requerida';
  else if (!minLength(password, 6)) errors.password = 'Mínimo 6 caracteres';

  return errors;
}

