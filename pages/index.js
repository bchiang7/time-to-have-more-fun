import React from 'react';
// import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';

const Home = () => (
  <div>
    <Head title="Time to Have More Fun" />
    <Nav />

    <main className="container mx-auto">
      <header>
        <h1>Time to Have More Fun!</h1>
      </header>

      {/* <button>Add a place</button> */}

      <section>
        <h2>Places we've been</h2>

        <div className="flex mb-4">
          <div className="w-1/3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://tailwindcss.com/img/card-top.jpg"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                  nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  #winter
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Places we want to go</h2>
      </section>

      <section>
        <h2>Can't decide where to go?</h2>
      </section>
    </main>
  </div>
);

export default Home;
