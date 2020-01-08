import React from 'react';
import PropTypes from 'prop-types';

const TagCheckboxes = ({ tagsMap, handleChange, defaultCheckedItems }) => (
  <div className="mt-4 flex flex-wrap">
    {Object.keys(tagsMap).length > 0 &&
      Object.keys(tagsMap).map(type => (
        <div key={type} className={`w-1/${Object.keys(tagsMap).length}`}>
          <div className="uppercase tracking-wide text-gray-500 text-xs font-medium mb-2">
            {type}
          </div>

          {tagsMap[type].length > 0 &&
            tagsMap[type].map(tag => (
              <label className="flex items-center text-gray-700" key={tag.id}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  name={tag.name}
                  onChange={handleChange}
                  value="tag"
                  defaultChecked={
                    defaultCheckedItems ? defaultCheckedItems.includes(tag.name) : false
                  }
                />
                <span className="ml-2 capitalize">{tag.name}</span>
              </label>
            ))}
        </div>
      ))}
  </div>
);

TagCheckboxes.propTypes = {
  tagsMap: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  defaultCheckedItems: PropTypes.array,
};

export default TagCheckboxes;
