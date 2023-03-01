import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './search-movie.css';

export default class SearchMovies extends React.Component {
  constructor() {
    super();
    this.regular = /^^\s*$/;
  }

  onValue = ({ target }) => {
    const { searchValue } = this.props;
    const invalidText = this.regular.test(target.value);
    if (!invalidText) {
      searchValue(target.value);
    }
  };

  render() {
    return <Input className="input-search" placeholder="Type to search..." onChange={debounce(this.onValue, 2600)} />;
  }
}
