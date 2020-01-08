import React, { useState, useEffect } from 'react';
import { getAllTags, addPlace, deletePlace } from '../utils';
import PropTypes from 'prop-types';

const PlaceForm = ({ closeModal, isEditing, placeToEdit }) => {
  const [tags, setTags] = useState([]);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputs, setInputs] = useState(placeToEdit);

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

    document.querySelector('.modal-overlay').focus();
  }, []);

  const handleChange = e => {
    e.persist();

    setIsErrorShown(false);

    setInputs(inputs => {
      const { name, value, checked } = e.target;

      if (value !== 'tag') {
        return { ...inputs, [name]: value };
      }

      // If the tag gets checked, add it to the list
      // otherwise remove it from the list
      const tags = checked ? [...inputs.tags, name] : inputs.tags.filter(t => t !== name);

      return { ...inputs, tags };
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await addPlace(inputs);
      closeModal();
    } catch (e) {
      console.error('📣: PlaceForm -> e', e);
      setIsErrorShown(true);
    }
  };

  const onDelete = async e => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to delete this place?')) {
      return;
    }

    try {
      await deletePlace(inputs);
      closeModal();
    } catch (e) {
      console.error('📣: PlaceForm -> e', e);
      setIsErrorShown(true);
    }
  };

  return (
    <div role="dialog" className="modal w-full h-full fixed top-0 left-0 right-0 bottom-0">
      <div className="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"></div>

      <div className="relative w-full h-screen max-h-screen flex items-center justify-center">
        <div className="bg-white rounded-sm shadow-lg m-6 overflow-y-auto w-9/12 max-w-2xl modal-inner">
          <form className="w-full p-10" onSubmit={onSubmit}>
            <h2 className="mb-10 flex justify-between">
              {isEditing ? 'Edit place' : 'Add a new place'}
              <button
                className="rounded-full h-12 w-12 flex items-center justify-center hover:bg-gray-200 text-2xl -mr-4 leading-none pb-1 focus:outline-none"
                onClick={closeModal}>
                &times;
              </button>
            </h2>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 font-bold border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Budapest"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  rows="3"
                  placeholder="We want to go here"
                  value={inputs.description}
                  onChange={handleChange}></textarea>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="img">
                  Image URL
                </label>
                <input
                  id="img"
                  name="img"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-abc123"
                  value={inputs.img}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="visited">
                  Been there?
                </label>
                <div className="relative">
                  <select
                    id="visited"
                    name="visited"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue={inputs.visited}
                    onBlur={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="visitedDate">
                  Visited Date
                </label>
                <input
                  id="visitedDate"
                  name="visitedDate"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="1/1/2020"
                  value={inputs.visitedDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <div className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Tags
                </div>
                <div className="mt-2 flex flex-wrap">
                  {tags &&
                    tags.length > 0 &&
                    tags.map(tag => (
                      <div key={tag.name} className="w-1/3">
                        <label className="inline-flex items-center text-gray-700">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            name={tag.name}
                            onChange={handleChange}
                            value="tag"
                            defaultChecked={inputs.tags.includes(tag.name)}
                          />
                          <span className="ml-2 capitalize">{tag.name}</span>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {isErrorShown && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert">
                <strong className="font-bold mr-1">Oh no!</strong>
                <span className="block sm:inline">Something bad happened!</span>
              </div>
            )}

            <div className="flex justify-between mt-10">
              {isEditing && (
                <button
                  className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 text-gray-800 focus:outline-none px-6 py-3 rounded-lg text-white font-small tracking-wide"
                  onClick={onDelete}>
                  Delete
                </button>
              )}

              <button
                className="bg-teal-500 hover:bg-teal-400 focus:outline-none focus:bg-teal-400 px-6 py-3 rounded-lg text-white font-small tracking-wide"
                type="submit">
                {isEditing ? 'Save' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PlaceForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  placeToEdit: PropTypes.object.isRequired,
};

export default PlaceForm;
