export const GITHUB_API = 'https://api.github.com';

/**
 * Fetch repos from Github according to a few parameters.
 *
 * @param sort
 * @param language
 * @param repoAmount
 * @param since
 * @param to
 * @param username
 * @param accessToken
 * @returns {Promise<any>}
 */
export async function fetchRepos(sort, language, repoAmount, since, to, username = '', accessToken = '') {
  let headers = new Headers({'Authorization': `Basic ${Buffer.from(`${username}:${accessToken}`).toString('base64')}`});
  const languageQuery = language ? ` language:${language}` : '';
  const response = await fetch(
    `${GITHUB_API}/search/repositories?sort=${sort}&q=created:${since.format('YYYY-MM-DD')}..${
      to ? to.format('YYYY-MM-DD') : '*'
    }${languageQuery}&per_page=${repoAmount}`,
    {headers}
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
 * @param username
 * @param token
 * @returns {Promise<any>}
 */
export async function isAccessTokenValid(username, token) {
  let headers = new Headers({'Authorization': `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`});
  const response = await fetch(`${GITHUB_API}`, {headers});
  if (!response.ok) {
    throw Error(response.messageText);
  }
  return response.json();
}
