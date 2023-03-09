/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import MoviDbService from '../../services/moviDbService';
import ListItem from '../list-item/list-item';
import SearchMovies from '../search-movie/search-movie';
import PageHeader from '../page-header/page-header';
import { GenresProvider } from '../genres-context/genres-context';
import { Movie } from '../../handlers/handlers';

import './app.css';

type AppProps = {};

const App: React.FC<AppProps> = (AppProps) => {
  const moviesDb = new MoviDbService();

  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [queryStr, setQueryStr] = React.useState('return');
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [tabActive, setTabActive] = React.useState('search');
  const [genresId, setGenresId] = React.useState<number[]>([]);

  React.useEffect(() => {
    onLoadMovies();
    onLoadSessionID();
    onLoadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStr, currentPages]);

  const onSearchMovies = (text: string) => {
    setLoading(true);
    setError(false);
    setQueryStr(text);
  };

  const onCurrentPages = (page: number) => {
    setLoading(true);
    setError(false);
    setCurrentPages(page);
  };

  const onLoadMovies = () => {
    moviesDb
      .getSearchMovies(queryStr, currentPages)
      .then((res) => {
        setMovies(res.results);
        setLoading(false);
        setTotalPages(res.totalPages);
      })
      .catch(onError);
  };

  const onLoadSessionID = () => {
    const idLocal = localStorage.getItem('sessionId');
    if (!idLocal) {
      moviesDb.getSessionID().then((res) => localStorage.setItem('sessionId', res.sessionId));
    }
  };

  const onTogleTab = (tabName: string) => {
    if (tabName === 'search') {
      onLoadMovies();
    } else {
      onGetRatedMovies();
    }
    setTabActive(tabName);
    setLoading(true);
  };

  const onGetRatedMovies = () => {
    const sessionId = localStorage.getItem('sessionId');
    moviesDb
      .getRatedMovies(sessionId)
      .then((res) => {
        setMovies(res.results);
        setLoading(false);
        setTotalPages(res.totalPages);
      })
      .catch(onError);
  };

  const onLoadGenres = () => {
    moviesDb
      .getGenresId()
      .then((res) => {
        setGenresId(res.genres);
      })
      .catch(onError);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const hasDate = !(loading || error);
  const errorMsg = error ? <Alert message="Error" type="error" /> : null;
  const spiner = loading ? <Spin className="spiner" size="large" /> : null;
  const content = hasDate ? <ListItem movies={movies} /> : null;
  const searchPanel = tabActive === 'search' ? <SearchMovies searchValue={onSearchMovies} /> : null;
  const paginationPanel =
    tabActive === 'search' && movies.length > 0 ? (
      <Pagination
        className="pagination"
        showSizeChanger={false}
        current={currentPages}
        total={totalPages}
        onChange={onCurrentPages}
      />
    ) : null;

  return (
    <GenresProvider value={genresId}>
      <div className="container">
        <Online>
          <PageHeader onTogleTab={onTogleTab} />
          {searchPanel}
          {errorMsg}
          {spiner}
          {content}
          {paginationPanel}
        </Online>
        <Offline>
          <h1>Oops...No internet connection</h1>
        </Offline>
      </div>
    </GenresProvider>
  );
};

export default App;
