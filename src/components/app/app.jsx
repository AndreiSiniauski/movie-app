import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import MoviDbService from '../../services/moviDbService';
import ListItem from '../list-item';
import SearchMovies from '../search-movie';
import PageHeader from '../page-header';
import { GenresProvider } from '../genres-context';

import './app.css';

export default class App extends React.Component {
  moviesDb = new MoviDbService();

  state = {
    movies: [],
    loading: true,
    error: false,
    queryStr: 'return',
    totalPages: 1,
    currentPages: 1,
    tabActive: 'search',
    genresId: [],
  };

  componentDidMount() {
    this.onLoadMovies();
    this.onLoadSessionID();
    this.onLoadGenres();
  }

  componentDidUpdate(_, prevState) {
    const { queryStr, currentPages } = this.state;
    if (prevState.queryStr !== queryStr || prevState.currentPages !== currentPages) {
      this.onLoadMovies();
    }
  }

  onSearchMovies = (text) => {
    this.setState({
      loading: true,
      error: false,
      queryStr: text,
    });
  };

  onCurrentPages = (page) => {
    this.setState({ loading: true, error: false, currentPages: page });
  };

  onLoadMovies = () => {
    const { queryStr, currentPages } = this.state;
    this.moviesDb
      .getSearchMovies(queryStr, currentPages)
      .then((res) => {
        this.setState({ movies: res.results, loading: false, totalPages: res.totalPages });
      })
      .catch(this.onError);
  };

  onLoadSessionID = () => {
    const idLocal = localStorage.getItem('sessionId');
    if (!idLocal) {
      this.moviesDb.getSessionID().then((res) => localStorage.setItem('sessionId', res.sessionId));
    }
  };

  onTogleTab = (tabName) => {
    if (tabName === 'search') {
      this.onLoadMovies();
    } else {
      this.onGetRatedMovies();
    }
    this.setState({ tabActive: tabName, loading: true });
  };

  onGetRatedMovies = () => {
    const sessionId = localStorage.getItem('sessionId');
    this.moviesDb
      .getRatedMovies(sessionId)
      .then((res) => this.setState({ movies: res.results, loading: false, totalPages: res.totalPages }))
      .catch(this.onError);
  };

  onLoadGenres = () => {
    this.moviesDb
      .getGenresId()
      .then((res) => {
        this.setState({ genresId: res.genres });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { movies, loading, error, currentPages, totalPages, tabActive, genresId } = this.state;

    const hasDate = !(loading || error);
    const errorMsg = error ? <Alert message="Error" type="error" /> : null;
    const spiner = loading ? <Spin className="spiner" size="large" /> : null;
    const content = hasDate ? <ListItem movies={movies} /> : null;
    const searchPanel = tabActive === 'search' ? <SearchMovies searchValue={this.onSearchMovies} /> : null;
    const paginationPanel =
      tabActive === 'search' && movies.length > 0 ? (
        <Pagination
          className="pagination"
          showSizeChanger={false}
          current={currentPages}
          total={totalPages}
          onChange={this.onCurrentPages}
        />
      ) : null;

    return (
      <GenresProvider value={genresId}>
        <div className="container">
          <Online>
            <PageHeader onTogleTab={this.onTogleTab} />
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
  }
}
