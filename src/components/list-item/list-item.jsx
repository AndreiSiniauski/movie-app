import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Alert } from 'antd';

import './list-item.css';
import cutText from '../../handlers/cutText';
import Item from '../item';
import { transformDate } from '../../handlers/handlers';

function ListItem({ movies }) {
  const elements = movies.map((el) => {
    const newEl = transformDate(el);
    const { id, originalTitle, posterPath, overview, releaseDate, rating, movieGenre, voteAverage } = newEl;
    let dataFns = 'Unknown date';
    let vote = voteAverage.toFixed(1);

    if (releaseDate) {
      dataFns = format(new Date(releaseDate), 'MMMM d, yyyy');
    }

    const textOverview = cutText(overview, 130);

    return (
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
}

ListItem.defaultProps = {
  movies: [],
};

ListItem.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.objectOf),
};

export default ListItem;
