import React, { useState, useEffect } from 'react';
import { getAllTags } from '../utils';
import TagCheckboxes from './TagCheckboxes';

const PlacePicker = () => {
  const [tags, setTags] = useState([]);

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
  };

  return (
    <section className="py-10">
      <h2 className="text-4xl mb-5">This year we're going to...</h2>

      <div className="py-4 w-1/2">
        <TagCheckboxes tagsMap={tags} handleChange={handleChange} />
      </div>
    </section>
  );
};

export default PlacePicker;
