import React, { useState } from 'react';
import { getPlacesByTags, defaultTagField } from '../utils';
import { TagCheckboxes, PlaceCard } from '../components';

const PlacePicker = () => {
  const [tagsToQuery, setTagsToQuery] = useState(defaultTagField);
  const [showError, setShowError] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [destination, setDestination] = useState(null);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const handleChange = e => {
    e.persist();

    setShowError(false);
    setShowClearButton(true);

    setTagsToQuery(tagsToQuery => {
      const { name, value } = e.target;
      const queryThese = { ...tagsToQuery, [name]: value.substring(4) };
      return queryThese;
    });
  };

  const queryPlaces = async () => {
    try {
      setShowError(false);
      setDestinationLoading(true);
      setDestination(null);
      const places = await getPlacesByTags(tagsToQuery);

      if (!places.length) {
        console.warn('No places returned!');
        setTimeout(() => {
          setShowError(true);
          setDestinationLoading(false);
          setDestination(null);
        }, 1000);
        return;
      }

      const placeToGo = places[Math.floor(Math.random() * places.length)];

      setTimeout(() => {
        setDestinationLoading(false);
        setDestination(placeToGo);
      }, 4500);
    } catch (e) {
      console.error(e);
    }
  };

  const clearFilters = () => {
    const filters = document.querySelectorAll('input[type="radio"]');
    const checkedFilters = Array.from(filters).filter(f => f.checked);
    checkedFilters.forEach(f => (f.checked = false));
    setTagsToQuery(defaultTagField);
  };

  return (
    <section className="py-12 md:flex md:justify-between">
      <div className="lg:w-1/2">
        <h2 className="mb-5 text-4xl">This year we're going to...</h2>

        <div className="w-full py-4">
          <TagCheckboxes handleChange={handleChange} />
        </div>

        <div className="flex justify-center md:justify-start mt-10">
          <button
            className="inline-flex items-center px-6 py-3 rounded-lg shadow bg-teal-500 hover:bg-teal-400 hover:shadow-lg focus:outline-none focus:bg-teal-400 text-white font-small tracking-wide"
            onClick={queryPlaces}>
            Tell me already!!!
          </button>

          {showClearButton && (
            <button
              className="ml-6 text-teal-500 hover:text-teal-400 focus:text-teal-400 focus:outline-none"
              onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="lg:w-1/2">
        {destination ? (
          <PlaceCard place={destination} />
        ) : showError ? (
          <div className="flex justify-center items-center h-full rounded-lg bg-gray-200 text-gray-700">
            <p>Sorry, nothing matched those tags!</p>
          </div>
        ) : destinationLoading ? (
          <img src="/plane.gif" alt="Plane taking off" className="rounded-lg" />
        ) : (
          <img src="/plane.png" alt="Plane" className="rounded-lg" />
        )}
      </div>
    </section>
  );
};

export default PlacePicker;
