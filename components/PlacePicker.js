import React, { useState, useEffect } from 'react';
import { getAllTags, getPlacesByTags } from '../utils';
import TagCheckboxes from './TagCheckboxes';
import PlaceCard from './PlaceCard';

const PlacePicker = () => {
  const [tags, setTags] = useState({});
  const [tagsToQuery, setTagsToQuery] = useState([]);
  const [showError, setShowError] = useState(false);
  const [destination, setDestination] = useState(null);
  const [destinationLoading, setDestinationLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsArr = await getAllTags();
        const tagsMap = {};
        const categories = Array.from(new Set(tagsArr.map(t => t.category)));
        categories.forEach(category => {
          tagsMap[category] = tagsArr.filter(t => t.category === category);
        });

        setTags(tagsMap);
      } catch (e) {
        console.error('📣: fetchData -> e', e);
      }
    };

    fetchData();
  }, []);

  const handleChange = e => {
    e.persist();

    setShowError(false);

    setTagsToQuery(tagsToQuery => {
      const { name, checked } = e.target;
      const tags = checked ? [...tagsToQuery, name] : tagsToQuery.filter(t => t !== name);
      return tags;
    });
  };

  const queryPlaces = async () => {
    if (!tagsToQuery.length) {
      setShowError(true);
      return;
    }

    try {
      setDestinationLoading(true);
      const places = await getPlacesByTags(tagsToQuery);
      const placeToGo = places[Math.floor(Math.random() * places.length)];

      setTimeout(() => {
        setDestinationLoading(false);
        setDestination(placeToGo);
      }, 4500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-12 md:flex md:justify-between">
      <div className="lg:w-1/2">
        <h2 className="text-4xl mb-5">This year we're going to...</h2>

        <div className="py-4 w-full">
          <TagCheckboxes tagsMap={tags} handleChange={handleChange} />
        </div>

        {showError && <p className="text-red-400 my-4">Select some tags first!</p>}

        <div className="mt-10 flex justify-center md:justify-start">
          <button
            className="inline-flex items-center bg-teal-500 hover:bg-teal-400 hover:shadow-lg focus:outline-none focus:bg-teal-400 px-6 py-3 rounded-lg text-white font-small tracking-wide shadow"
            onClick={queryPlaces}>
            Tell me already!!!
          </button>
        </div>
      </div>

      <div className="lg:w-1/2">
        {destination ? (
          <PlaceCard place={destination} />
        ) : typeof destination === 'undefined' ? (
          <div className="flex justify-center items-center h-full rounded-lg text-gray-700 bg-gray-200">
            <p>Sorry, nothing matched those tags!</p>
          </div>
        ) : (
          <img
            src={`/plane.${destinationLoading ? 'gif' : 'png'}`}
            alt="Plane"
            className="rounded-lg"
          />
        )}
      </div>
    </section>
  );
};

export default PlacePicker;
