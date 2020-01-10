import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ addPlace }) => (
  <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-4 px-6 fixed w-full">
    <div className="flex items-center flex-shrink-0 text-white">
      <svg
        className="fill-current h-8 w-8 mr-2"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="512px"
        height="512px"
        viewBox="0 0 512 512">
        <path
          d="M445.355,67.036l-0.391-0.392c-19.986-19.006-59.898,14.749-59.898,14.749l-72.463,57.049l-76.285-13.52
	c11.005-15.953,14.32-31.79,6.983-39.127c-9.503-9.503-33.263-1.15-53.068,18.655c-3.464,3.464-6.568,7.049-9.297,10.657
	l-58.574-10.381L83.346,137.97l159.044,72.979L140.427,334.152l-63.505-11.906l-16.083,16.06L173.696,451.16l16.058-16.082
	l-11.906-63.506l123.204-101.963l72.979,159.043l33.244-39.016l-10.381-58.574c3.609-2.729,7.193-5.832,10.658-9.297
	c19.805-19.805,28.158-43.564,18.656-53.066c-7.339-7.338-23.177-4.022-39.13,6.982l-13.52-76.284l57.049-72.464
	C430.607,126.934,464.363,87.021,445.355,67.036z"
        />
      </svg>

      <span className="font-medium text-xl tracking-tight">Time to Have More Fun</span>
    </div>
    <div className="">
      <button
        onClick={addPlace}
        className="inline-block text-md px-4 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white focus:outline-none focus:bg-white focus:text-teal-500">
        Add Place
      </button>
    </div>
  </nav>
);

Nav.propTypes = {
  addPlace: PropTypes.func.isRequired,
};

export default Nav;
