import PropTypes from 'prop-types';
import format from 'date-fns/format';

import './list-item.css';
import cutText from '../../handlers/cutText';
import Item from '../item';
import { transformDate } from '../../handlers/handlers';

function ListItem({ movies }) {
  const elements = movies.map((el) => {
    const newEl = transformDate(el);
    const { id, originalTitle, posterPath, overview, releaseDate } = newEl;
    let dataFns = 'Unknown date';

    if (releaseDate) {
      dataFns = format(new Date(releaseDate), 'MMMM d, yyyy');
    }

    const textOverview = cutText(overview, 80);

    return (
      <Item
        key={id}
        title={originalTitle}
        posterPath={posterPath}
        overview={textOverview}
        idMovie={id}
        releaseDate={dataFns}
      />
    );
  });

  return <div className="list-item">{elements}</div>;
}

ListItem.defaultProps = {
  movies: [],
};

ListItem.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.objectOf),
};

export default ListItem;
