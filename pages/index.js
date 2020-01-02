import React from 'react';
// import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';

const Home = () => (
  <div>
    <Head title="Time to Have More Fun" />
    <Nav />

    <div className="hero">
      <h1 className="title">Time to Have More Fun!</h1>

      <button>Add a place</button>

      <section>
        <h2>Places we've been</h2>
      </section>

      <section>
        <h2>Places we want to go</h2>
      </section>

      <section>
        <h2>Can't decide where to go?</h2>
      </section>
    </div>
  </div>
);

export default Home;
