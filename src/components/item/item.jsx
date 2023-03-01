import { Card, Typography, Tag } from 'antd';
import './item.css';
import PropTypes from 'prop-types';

import RateStars from '../rate';
import { GenresConsumer } from '../genres-context';

import poster from './poster.jpeg';

function Item({ title, posterPath, overview, releaseDate, rating, idMovie, movieGenre, voteAverage }) {
  const { Text, Title } = Typography;
  let posterMovie = `https://image.tmdb.org/t/p/w500/${posterPath} `;
  if (!posterPath) {
    posterMovie = poster;
  }

  const generis = (genresId, movieGenreList) => {
    if (movieGenreList.length === 0) {
      return (
        <Tag key={1} size="small">
          {'No data'}
        </Tag>
      );
    }
    const element = movieGenreList.map((id) => {
      const re = genresId.filter((el) => el.id === id);
      const gener = re.length > 0 ? re[0].name : (re.name = 'No data');
      return (
        <Tag key={id} size="small">
          {gener}
        </Tag>
      );
    });
    return element;
  };

  const colorReiting = (reit) => {
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
          <div className={`card__reiting ${colorReiting(voteAverage)}`}>{voteAverage}</div>
        </div>
        <Text type="secondary" className="card__release-date">
          {releaseDate}
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

Item.defaultProps = {
  title: 'not Name',
  posterPath: null,
  overview: 'not Text',
  rating: 0,
};

Item.propTypes = {
  title: PropTypes.string,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  idMovie: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

export default Item;
