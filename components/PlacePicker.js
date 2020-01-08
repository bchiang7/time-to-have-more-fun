import React, { useState, useEffect } from 'react';
import { getAllTags } from '../utils';
import Tag from './Tag';

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

      <div className="py-4 flex flex-wrap items-center">
        {tags && tags.length > 0 && tags.map(tag => <Tag tag={tag.name} key={tag.id} />)}
      </div>
    </section>
  );
};

export default PlacePicker;
