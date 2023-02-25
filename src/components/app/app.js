import React from 'react';

import MoviDbService from '../../services/moviDbService';
import ListItem from '../list-item';

import './app.css';

export default class App extends React.Component {
  moviesDb = new MoviDbService();

  state = {
    movies: [],
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
        this.setState({ movies: res.results, totalPages: res.totalPages });
      })
      .catch(this.onError);
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <ListItem movies={movies} />
      </div>
    );
  }
}
