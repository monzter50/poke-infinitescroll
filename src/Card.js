import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
  const {
    name,
  } = props;
  return (
    <div className="card-user">
      <img className="card-avatar" src={`https://img.pokemondb.net/artwork/${name}.jpg`} alt="" />
      <div className="card-description">
        <h2>
@
          {name}
        </h2>

      </div>

    </div>
  );
};
Card.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Card;
