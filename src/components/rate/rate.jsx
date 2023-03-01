import { Component } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

import MoviDbService from '../../services/moviDbService';

export default class RateStars extends Component {
  moviesDb = new MoviDbService();

  constructor(props) {
    super(props);
    this.rating = props.rating || 0;
    this.state = {
      rateValue: this.rating,
    };
  }

  rateChange = (value) => {
    const sessionId = localStorage.getItem('sessionId');
    const { idMovie } = this.props;
    this.setState({ rateValue: value });
    this.moviesDb.setRateMovie({ value }, idMovie, sessionId);
  };

  render() {
    const { rateValue } = this.state;
    const isAbility = rateValue > 0;

    return (
      <Rate value={rateValue} count="10" onChange={this.rateChange} style={{ fontSize: 16 }} disabled={isAbility} />
    );
  }
}

RateStars.propTypes = {
  idMovie: PropTypes.number.isRequired,
};
