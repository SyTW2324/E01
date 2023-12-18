export function isSecurePassword(str: string): boolean {
  return !!str.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~])[A-Za-z0-9 -/:-@[-`{-~]{12,}$/);
}
