import React from 'react';
import PropTypes from 'prop-types';
import { EventBus } from '../utils';
import Tag from './Tag';

const PlaceCard = ({ place }) => {
  const editPlace = () => {
    EventBus.emit('editPlace', place);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      editPlace();
    }
  };

  return (
    <div
      className="w-full h-full rounded overflow-hidden shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none flex flex-col justify-between cursor-pointer"
      onClick={editPlace}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0">
      <div>
        {place.img && (
          <div className="bg-gray-200 w-full">
            <img className="w-full" src={place.img} alt={place.name} />
          </div>
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 flex justify-between items-center">
            {place.name}
          </div>

          {place.description && <p className="text-gray-700 text-base">{place.description}</p>}
          {place.visited === 'Yes' && place.visitedDate && (
            <p className="text-gray-500 text-xs uppercase tracking-wide font-bold">
              {place.visitedDate}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-4 flex flex-wrap items-center">
        {place.tags &&
          place.tags.length > 0 &&
          place.tags.map((tag, i) => <Tag tag={tag} key={i} />)}
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceCard;
