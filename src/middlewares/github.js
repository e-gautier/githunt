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
  const response = await fetch(
    `${GITHUB_API}/search/repositories?sort=${sort}&q=created:${since.format('YYYY-MM-DD')}..${
      to ? to.format('YYYY-MM-DD') : '*'
    }${languageQuery}&per_page=${repoAmount}`,
    { headers }
  );
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
export async function isAccessTokenValid(token) {
  const headers = buildHeaders(token);
  const response = await fetch(`${GITHUB_API}`, { headers });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
