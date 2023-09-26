const BASE_API_URL = 'https://import-coding-challenge-api.portchain.com/api/v2';

export async function api<T = unknown>(path: string): Promise<T> {
  const response = await fetch(`${BASE_API_URL}${path}`);
  const data = await response.json();
  return data as T;
}
