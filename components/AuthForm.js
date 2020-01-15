import React, { useState } from 'react';
import { EventBus, login } from '../utils';

const AuthForm = () => {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = e => {
    e.persist();

    setIsErrorShown(false);

    setInputs(inputs => {
      const { name, value } = e.target;
      return { ...inputs, [name]: value };
    });
  };

  const closeModal = () => EventBus.emit('closeAuthModal');

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await login(inputs);
      closeModal();
    } catch (e) {
      console.error('📣: AuthForm -> e', e);
      setIsErrorShown(true);
    }
  };

  return (
    <div role="dialog" className="modal fixed top-0 left-0 right-0 bottom-0 w-full h-full">
      <div className="modal-overlay absolute top-0 left-0 w-full h-full bg-black opacity-25 cursor-pointer"></div>

      <div className="relative w-full max-w-md h-screen max-h-screen mx-auto flex items-center justify-center">
        <div className="modal-inner w-full md:w-9/12 md:max-w-2xl m-6 bg-white rounded-sm shadow-lg overflow-y-auto">
          <form className="relative bg-white rounded p-8" onSubmit={onSubmit}>
            <button
              className="flex items-center justify-center absolute top-0 right-0 h-12 w-12 rounded-full text-2xl leading-none hover:opacity-50 focus:outline-none"
              onClick={closeModal}>
              &times;
            </button>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
                onChange={handleChange}
              />
            </div>

            {isErrorShown && <p className="text-red-500 text-xs italic">Something went wrong!</p>}

            <div className="flex items-center justify-between">
              <button
                className="inline-flex items-center px-4 py-2 rounded shadow bg-teal-500 hover:bg-teal-400 hover:shadow-lg focus:outline-none focus:bg-teal-400 text-white font-small tracking-wide"
                type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
