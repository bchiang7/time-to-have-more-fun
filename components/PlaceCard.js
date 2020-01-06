import React from 'react';
import PropTypes from 'prop-types';
import { EventBus } from '../utils';

const PlaceCard = ({ place }) => {
  const editPlace = () => {
    EventBus.emit('editPlace', place);
  };

  return (
    <div className="w-1/3 px-3">
      <div className="max-w-sm h-full rounded overflow-hidden shadow-md hover:shadow-lg">
        {place.img && (
          <div className="bg-gray-200 w-full">
            <img className="w-full" src={place.img} alt="Sunset in the mountains" />
          </div>
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 flex justify-between items-center">
            <span>{place.name}</span>
            <button
              onClick={editPlace}
              className="text-teal-500 hover:text-teal-400 focus:outline-none focus:text-teal-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-5 fill-current">
                <path
                  className="heroicon-ui"
                  d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"
                />
              </svg>
            </button>
          </div>

          {place.description && <p className="text-gray-700 text-base mb-4">{place.description}</p>}
          {place.visited === 'Yes' && place.visitedDate && (
            <p className="text-gray-500 text-xs uppercase tracking-wide font-bold">
              {place.visitedDate}
            </p>
          )}
        </div>
        <div className="px-6 py-4 flex flex-wrap items-center">
          {place.tags &&
            place.tags.length > 0 &&
            place.tags.map((tag, i) => (
              <span
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2 flex items-center"
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
                <span>{tag}</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceCard;
