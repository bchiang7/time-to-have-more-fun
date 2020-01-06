import React from 'react';
import PropTypes from 'prop-types';

const PlaceCard = ({ place }) => (
  <div className="w-1/3 px-3">
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {place.img && (
        <div className="bg-gray-200 w-full">
          <img className="w-full" src={place.img} alt="Sunset in the mountains" />
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{place.name}</div>

        {place.description && <p className="text-gray-700 text-base mb-4">{place.description}</p>}
        {place.visited === 'Yes' && (
          <p className="text-gray-500 text-xs uppercase tracking-wide font-bold">
            Visited {place.visitedDate ? place.visitedDate : ''}
          </p>
        )}
      </div>
      <div className="px-6 py-4">
        {place.tags &&
          place.tags.length > 0 &&
          place.tags.map((tag, i) => (
            <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2"
              key={i}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="inline-block fill-current w-4 mr-1">
                <path
                  className="heroicon-ui"
                  d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM20 12l-8-8H7a3 3 0 0 0-3 3v5l8 8 8-8zM7 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                />
              </svg>
              <span className="inline-block">{tag}</span>
            </span>
          ))}
      </div>
    </div>
  </div>
);

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceCard;
