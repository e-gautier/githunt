export const GITHUB_API = 'https://api.github.com';

/**
 * Build request headers, optionally with Bearer token auth.
 *
 * @param {string} accessToken
 * @returns {Headers}
 */
function buildHeaders(accessToken) {
  const headers = new Headers();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return headers;
}

/**
 * Fetch repos from Github according to a few parameters.
 *
 * @param sort
 * @param language
 * @param repoAmount
 * @param since
 * @param to
 * @param accessToken
 * @returns {Promise<any>}
 */
export async function fetchRepos(sort, language, repoAmount, since, to, accessToken = '') {
  const headers = buildHeaders(accessToken);
  const languageQuery = language ? ` language:${language}` : '';
  const dateRange = `${since.format('YYYY-MM-DD')}..${to ? to.format('YYYY-MM-DD') : '*'}`;
  const url = new URL(`${GITHUB_API}/search/repositories`);
  url.searchParams.set('sort', sort);
  url.searchParams.set('q', `created:${dateRange}${languageQuery}`);
  url.searchParams.set('per_page', repoAmount);
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.json();
    throw Error(body.message);
  }
  return response.json();
}

/**
 * Test on Github if the provided token is valid.
 *
 * @param {string} token
 * @returns {Promise<any>}
 */
export async function isAccessTokenValid(token, { signal } = {}) {
  const headers = buildHeaders(token);
  const response = await fetch(`${GITHUB_API}`, { headers, signal });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
