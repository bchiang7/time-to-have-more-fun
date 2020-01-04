import React from 'react';
import PropTypes from 'prop-types';

const PlaceCard = ({ place }) => (
  <div className="flex mb-4">
    <div className="w-1/3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {place.img && (
          <div className="bg-gray-200 w-full">
            <img className="w-full" src={place.img} alt="Sunset in the mountains" />
          </div>
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{place.name}</div>

          {place.description && <p className="text-gray-700 text-base mb-4">{place.description}</p>}
          {place.visited && (
            <p className="text-gray-500 text-xs uppercase tracking-wide font-bold">
              Visited {place.visitedDate ? place.visitedDate : ''}
            </p>
          )}
        </div>
        {place.tags &&
          place.tags.length > 0 &&
          place.tags.map(tag => (
            <div className="px-6 py-4" key={tag}>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #{tag}
              </span>
            </div>
          ))}
      </div>
    </div>
  </div>
);

PlaceCard.propTypes = {
  place: PropTypes.object,
};

export default PlaceCard;
