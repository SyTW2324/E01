import { verify } from "jsonwebtoken";

export function getToken(): string | null {
  return localStorage.getItem('sharethecost:auth:token');
};

export function saveToken(token: string): void {
  localStorage.setItem('sharethecost:auth:token', token);
}

export function deleteTokenAndPublicKey(): void {
  localStorage.removeItem('sharethecost:auth:token');
  localStorage.removeItem('sharethecost:auth:publickey');
}

export function getPublicKey(): string | null {
  return localStorage.getItem('sharethecost:auth:publickey');
}

export function savePublicKey(publickey: string): void {
  localStorage.setItem('sharethecost:auth:publickey', publickey);
}

export function checkToken(token: string): boolean {
  let correct_token: boolean = false;
  const publickey = getPublicKey();

  if (publickey !== null) {
    verify(token, publickey, function(err) {
      if (!err) {
        correct_token = true;
      }
    })
  }
  
  return correct_token;
}

export function fetchWithToken(url: string, options?: RequestInit): Promise<Response> {
  const token: string | null = getToken();

  if (token) {
    if (!options || typeof options !== "object") {
      options = {headers: new Headers()};
    }

    if (!options.headers || typeof options.headers !== "object" || !(options.headers instanceof Headers)) {
      options.headers = new Headers();
    }

    options.headers.set("Authorization", `Bearer ${token}`);

  } else {
    console.log("Enviar a la pantalla de log in");
  }

  return fetch(url, options);
};
