

async function fetchDogsApi(url: string, method: string = 'GET', data: unknown = {}, headers: object = {}) {
  try {
    const baseUrl = 'https://frontend-take-home-service.fetch.com';
    const fullUrl = baseUrl + url;

    const fetchHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const fetchOptions: RequestInit = {
      method: method,
      credentials: 'include',
      headers: fetchHeaders,
    };

    if (data && method !== 'GET') {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(fullUrl, fetchOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return 'There was an error';
  }
}

export default fetchDogsApi;