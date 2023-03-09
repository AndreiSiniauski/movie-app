import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './search-movie.css';

interface Props {
  searchValue: (value: string) => void;
}

const SearchMovies: React.FC<Props> = ({ searchValue }) => {
  const [regular] = useState(/^^\s*$/);

  const onValue = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const invalidText = regular.test(target.value);
      if (!invalidText) {
        searchValue(target.value);
      }
    },
    [regular, searchValue]
  );

  // eslint-disable-next-line react/jsx-filename-extension
  return <Input className="input-search" placeholder="Type to search..." onChange={debounce(onValue, 2600)} />;
};

export default SearchMovies;
