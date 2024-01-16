export function isValidEmail(email: unknown): boolean {
  return typeof email === "string" && !!email.match(/^.+@.+$/);
}
