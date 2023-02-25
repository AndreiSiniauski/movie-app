import { Card, Typography, Tag } from 'antd';
import './item.css';
import PropTypes from 'prop-types';

import poster from './poster.jpeg';

function Item({ title, posterPath, overview, releaseDate }) {
  const { Text, Title } = Typography;
  let posterMovie = `https://image.tmdb.org/t/p/w500/${posterPath} `;
  if (!posterPath) {
    posterMovie = poster;
  }

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
        </div>
        <Text type="secondary" className="card__release-date">
          {releaseDate}
        </Text>
        <div className="card-genres">
          <Tag>Active</Tag>
        </div>
        <Text className="card__overview">{overview}</Text>
      </div>
    </Card>
  );
}

Item.defaultProps = {
  title: 'not Name',
  posterPath: null,
  overview: 'not Text',
};

Item.propTypes = {
  title: PropTypes.string,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  idMovie: PropTypes.number.isRequired,
};

export default Item;
