import React, { useState, useEffect } from 'react';
import { getAllTags } from '../utils';

const PlacePicker = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsArr = await getAllTags();
        setTags(tagsArr);
      } catch (e) {
        console.error('📣: fetchData -> e', e);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-10">
      <h2 className="mb-5">Can't decide where to go?</h2>

      {tags &&
        tags.length > 0 &&
        tags.map((tag, i) => (
          <span
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            key={i}>
            #{tag.name}
          </span>
        ))}
    </section>
  );
};

export default PlacePicker;
