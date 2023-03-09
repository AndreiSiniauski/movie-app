import { transformMovies, transformIDSession } from '../handlers/handlers';

export default class MoviDbService {
  baseUrl = 'https://api.themoviedb.org/3';

  apiKey = '4014f381b4c4f27bece1ab05ff7d4156';

  async getResurse(url: string) {
    try {
      const result = await fetch(`${this.baseUrl}${url}`);
      if (!result.ok) {
        throw new Error(`${result.status}`);
      }
      return await result.json();
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }

  async getSearchMovies(search: string = 'return', page: number = 1) {
    const res = await this.getResurse(
      `/search/movie?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}`
    );
    return transformMovies(res);
  }

  async getSessionID() {
    const res = await this.getResurse(`/authentication/guest_session/new?api_key=${this.apiKey}`);
    return transformIDSession(res);
  }

  async getRatedMovies(sessionId: string | null) {
    const res = await this.getResurse(`/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}`);
    return transformMovies(res);
  }

  async postResurse(url: string, metod: string, option: any) {
    try {
      const result = await fetch(`${this.baseUrl}${url}`, {
        method: metod,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(option),
      });
      if (!result.ok) {
        throw new Error(`${result.status}`);
      }
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  }

  async setRateMovie(value: { value: any }, idMovie: any, sessionId: string | null) {
    await this.postResurse(
      `/movie/${idMovie}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      'POST',
      value
    );
  }

  async getGenresId() {
    const res = await this.getResurse(`/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
    return res;
  }
}
