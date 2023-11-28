export function getToken(): string | null{
  return localStorage.getItem('sharethecost:auth:token');
};

export function sendToken(url: string, options?: RequestInit): Promise<Response> {
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
