import React, { useState, useEffect } from 'react';
import { getAllTags, getPlacesByTags } from '../utils';
import TagCheckboxes from './TagCheckboxes';

const PlacePicker = () => {
  const [tags, setTags] = useState({});
  const [tagsToQuery, setTagsToQuery] = useState([]);
  const [showError, setShowError] = useState(false);
  const [destination, setDestination] = useState(null);

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
      const places = await getPlacesByTags(tagsToQuery);
      const placeToGo = places[Math.floor(Math.random() * places.length)];
      setDestination(placeToGo);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-10 flex justify-between">
      <div className="w-1/2">
        <h2 className="text-4xl mb-5">This year we're going to...</h2>

        <div className="py-4 w-full">
          <TagCheckboxes tagsMap={tags} handleChange={handleChange} />
        </div>

        {showError && <p className="text-red-400 my-4">Select some tags first!</p>}

        <div className="mt-10">
          <button
            className="inline-flex items-center bg-teal-500 hover:bg-teal-400 hover:shadow-lg focus:outline-none focus:bg-teal-400 px-6 py-3 rounded-lg text-white font-small tracking-wide shadow"
            onClick={queryPlaces}>
            Tell me already!!!
          </button>
        </div>
      </div>
      <div className="w-1/2">
        {destination && (
          <div className="flex justify-center items-center h-full border border-red-400">
            {destination.name}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlacePicker;
