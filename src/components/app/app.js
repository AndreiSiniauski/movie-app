import React from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import MoviDbService from '../../services/moviDbService';
import ListItem from '../list-item';

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
  };

  componentDidMount() {
    this.onLoadMovies();
  }

  onLoadMovies = () => {
    const { queryStr, currentPages } = this.state;
    this.moviesDb
      .getSearchMovies(queryStr, currentPages)
      .then((res) => {
        this.setState({ movies: res.results, loading: false, totalPages: res.totalPages });
      })
      .catch(this.onError);
  };

  render() {
    const { movies, loading, error } = this.state;

    const hasDate = !(loading || error);
    const errorMsg = error ? <Alert message="Error" type="error" /> : null;
    const spiner = loading ? <Spin className="spiner" size="large" /> : null;
    const content = hasDate ? <ListItem movies={movies} /> : null;

    return (
      <div className="container">
        <Online>
          {errorMsg}
          {spiner}
          {content}
        </Online>
        <Offline>
          <h1>Oops...No internet connection</h1>
        </Offline>
      </div>
    );
  }
}
