import React from 'react';
import format from 'date-fns/format';
import { Alert } from 'antd';

import './list-item.css';
import cutText from '../../handlers/cutText';
import Item from '../item/item';
interface Movie {
  id: number;
  originalTitle: string;
  posterPath: string;
  overview: string;
  releaseDate: string;
  rating: number;
  movieGenre: number[];
  voteAverage: number;
}

interface ListItemProps {
  movies: Movie[];
}
const ListItem: React.FC<ListItemProps> = ({ movies }) => {
  const elements = movies.map((movie) => {
    const newMovie = movie;
    const { id, originalTitle, posterPath, overview, releaseDate, rating, movieGenre, voteAverage } = newMovie;
    let dataFns = 'Unknown date';
    let vote = Number(Number(voteAverage).toFixed(1));
    if (releaseDate) {
      dataFns = format(new Date(releaseDate), 'MMMM d, yyyy');
    }

    const textOverview = cutText(overview, 130);

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Item
        key={id}
        title={originalTitle}
        posterPath={posterPath}
        overview={textOverview}
        idMovie={id}
        releaseDate={dataFns}
        rating={rating}
        movieGenre={movieGenre}
        voteAverage={vote}
      />
    );
  });

  return movies.length > 0 ? <div className="list-item">{elements}</div> : <Alert message="Not found..." />;
};

export default ListItem;
