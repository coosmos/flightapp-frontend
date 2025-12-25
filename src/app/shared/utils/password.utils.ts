export function isValidPassword(password: string): boolean {
  const regex = /^(?=.*\d).{6,}$/;
  return regex.test(password);
}
