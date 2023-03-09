import { Card, Typography, Tag } from 'antd';
import './item.css';
import React from 'react';

import RateStars from '../rate/rate';
import { GenresConsumer, GenresContextValue } from '../genres-context/genres-context';

interface Genres {
  id: number;
  name: string;
}

interface ItemProps {
  title?: string;
  posterPath?: string | null;
  overview?: string;
  releaseDate?: string;
  rating?: number;
  idMovie: number;
  movieGenre: number[];
  voteAverage?: number;
}

function Item({
  title = 'not Name',
  posterPath = null,
  overview = 'not Text',
  rating = 0,
  idMovie,
  releaseDate,
  movieGenre = [],
  voteAverage,
}: ItemProps) {
  const { Text, Title } = Typography;

  let posterMovie = posterPath
    ? `https://image.tmdb.org/t/p/w500/${posterPath}`
    : 'https://www.vokrug.tv/pic/product/f/9/9/c/f99cc0c6948c95170009df1a785203bc.jpg';

  const generis = (genresId: GenresContextValue, movieGenre: number[]) => {
    if (movieGenre.length === 0) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <Tag key={1}>{'No data'}</Tag>
      );
    }
    const element = movieGenre.map((id) => {
      // eslint-disable-next-line no-undef
      const re = genresId.filter((el: Genres) => el.id === id) as Genres[];
      const gener = re.length > 0 ? re[0].name : 'No data';
      return <Tag key={id}>{gener}</Tag>;
    });
    return element;
  };

  const colorReiting = (reit: number) => {
    if (reit > 7) {
      return 'max';
    }
    if (reit > 5) {
      return 'norm';
    }
    if (reit > 3) {
      return 'poor';
    }
    return 'low';
  };

  return (
    <Card className="card">
      <div className="card__img">
        <img alt={`poster ${title}`} src={posterMovie} />
      </div>
      <div className="card__content">
        <div className="card__header">
          <Title level={4} className="card__movie-title">
            {title}
          </Title>
          <div className={`card__reiting ${colorReiting(voteAverage || 0)}`}>{voteAverage}</div>
        </div>
        <Text type="secondary" className="card__release-date">
          {releaseDate || 'Unknown date'}
        </Text>
        <div className="card__genres">
          <GenresConsumer>{(genresId) => generis(genresId, movieGenre)}</GenresConsumer>
        </div>
        <Text className="card__overview">{overview}</Text>
        <div className="card__rate">
          <RateStars rating={rating} idMovie={idMovie} />
        </div>
      </div>
    </Card>
  );
}

export default Item;
