import React, { useState, useEffect } from 'react';
import { getAllTags } from '../utils';

const AddPlace = () => {
  const [tags, setTags] = useState([]);
  const [isModalShown, setIsModalShown] = useState(false);

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

  const openModal = () => {
    setIsModalShown(true);
  };

  const closeModal = () => {
    setIsModalShown(false);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  const submit = () => {
    console.warn('submit');
  };

  return (
    <div>
      <button
        className="inline-flex items-center bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-green-500 px-6 py-3 rounded-lg text-white font-small tracking-wide"
        onClick={openModal}>
        Add Place
      </button>

      {isModalShown && (
        <div className="modal absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <div
            className="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex="0"></div>

          <div className="absolute bg-white rounded-sm shadow-lg flex items-center justify-center w-9/12 max-w-2xl">
            <form className="w-full p-10">
              <h2 className="mb-10 flex justify-between">
                Add a place
                <button
                  className="rounded-full h-12 w-12 flex items-center justify-center hover:bg-gray-200 text-2xl"
                  onClick={closeModal}>
                  &times;
                </button>
              </h2>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="place-name">
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="place-name"
                    type="text"
                    placeholder="Budapest"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="place-description">
                    Description
                  </label>
                  <textarea
                    id="place-description"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    rows="3"
                    placeholder="We want to go here"></textarea>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="place-image">
                    Image URL
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="place-image"
                    type="url"
                    placeholder="https://images.unsplash.com/photo-abc123"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state">
                    Been there?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state">
                      <option>Yes</option>
                      <option>No</option>
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
                    htmlFor="grid-zip">
                    Visited Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    placeholder="1/1/2020"
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
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 capitalize">{tag.name}</span>
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="mt-10 inline-flex items-center bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-green-500 px-6 py-3 rounded-lg text-white font-small tracking-wide"
                  onClick={submit}>
                  Add This Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPlace;
