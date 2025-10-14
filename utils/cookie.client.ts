// app/utils/cookie.client.ts
export function getClientCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match?.[2];
}

export function setClientCookie(name: string, value: string, maxAge?: number) {
  let cookieStr = `${name}=${value}; path=/`;
  if (maxAge) cookieStr += `; max-age=${maxAge}`;
  cookieStr += '; secure; samesite=strict';
  document.cookie = cookieStr;
}

export function deleteClientCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function clearClientCookies() {
  if (typeof document === 'undefined') return;
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name}=; path=/; max-age=0`;
  }
}
