import React from 'react';
import PropTypes from 'prop-types';
import { defaultTags } from '../utils';

const TagCheckboxes = ({ handleChange, defaultCheckedItems }) => {
  const categories = Object.keys(defaultTags);

  return (
    <div className="flex flex-wrap mt-4">
      {categories.length > 0 &&
        categories.map(type => {
          const options = Object.keys(defaultTags[type]);

          return (
            <div key={type} className={`w-1/${categories.length}`}>
              <div className=" mb-2 text-gray-500 text-xs font-medium tracking-wide uppercase">
                {type}
              </div>

              {options.length > 0 &&
                options.map((tag, i) => (
                  <label className="flex items-center text-gray-700" key={i}>
                    <input
                      type="radio"
                      name={type}
                      onChange={handleChange}
                      value={`tag-${tag}`}
                      defaultChecked={
                        defaultCheckedItems ? defaultCheckedItems[type] === tag : false
                      }
                    />
                    <span className="ml-2 capitalize">{tag}</span>
                  </label>
                ))}
            </div>
          );
        })}
    </div>
  );
};

TagCheckboxes.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultCheckedItems: PropTypes.object,
};

export default TagCheckboxes;
