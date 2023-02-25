import { transformMovies } from '../handlers/handlers';

export default class MoviDbService {
  baseUrl = 'https://api.themoviedb.org/3';

  apiKey = '4014f381b4c4f27bece1ab05ff7d4156';

  async getResurse(url) {
    try {
      const result = await fetch(`${this.baseUrl}${url}`);
      if (!result.ok) {
        throw new Error(`${result.status}`);
      }
      return await result.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getSearchMovies(search = 'return', page = '1') {
    const res = await this.getResurse(
      `/search/movie?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}`
    );
    return transformMovies(res);
  }
}
