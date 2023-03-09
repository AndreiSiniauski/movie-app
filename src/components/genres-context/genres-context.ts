import React from 'react';

interface GenresContextValue {
  filter(arg0: (el: any) => boolean): unknown;
  genres?: any[];
}

const { Provider: GenresProvider, Consumer: GenresConsumer } = React.createContext<GenresContextValue>({
  genres: [],
  filter: function (arg0: (el: any) => boolean): unknown {
    throw new Error('Function not implemented.');
  },
});

export { GenresProvider, GenresConsumer, GenresContextValue };
