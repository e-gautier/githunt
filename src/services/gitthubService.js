export default class GithubService {
  GITHUB_API = 'https://api.github.com';

  /**
   *
   * @param {String} sort
   * @param {String} language
   * @param {moment} since
   * @param {moment} to
   * @returns {Promise<Response>}
   */
  fetchRepos(sort, language, repoAmount, since, to = null) {
    const languageQuery = language ? ` language:${language}` : '';
    return fetch(
      `${
        this.GITHUB_API
      }/search/repositories?sort=${sort}&q=created:${since.format(
        'YYYY-MM-DD'
      )}..${
        to ? to.format('YYYY-MM-DD') : '*'
      }${languageQuery}&per_page=${repoAmount}`
    );
  }
}
