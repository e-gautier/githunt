export const GITHUB_API = 'https://api.github.com';

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
  const languageQuery = language ? ` language:${language}` : '';
  const response = await fetch(
    `${GITHUB_API}/search/repositories?sort=${sort}&q=created:${since.format('YYYY-MM-DD')}..${
      to ? to.format('YYYY-MM-DD') : '*'
    }${languageQuery}&per_page=${repoAmount}&access_token=${accessToken}`
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
 * @param token
 * @returns {Promise<any>}
 */
export async function isAccessTokenValid(token) {
  const response = await fetch(`${GITHUB_API}?access_token=${token}`);
  if (!response.ok) {
    throw Error(response.messageText);
  }
  return response.json();
}
