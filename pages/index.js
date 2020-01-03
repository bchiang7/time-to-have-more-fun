import React from 'react';
// import Link from 'next/link';
import Head from '../components/head';
import PlacePicker from '../components/PlacePicker';
import WantToGo from '../components/WantToGo';
import BeenThere from '../components/BeenThere';

const Home = () => (
  <div>
    <Head title="Time to Have More Fun" />

    <div className="container mx-auto">
      <header className="py-20">
        <h1 className="font-bold">Time to Have More Fun!</h1>
      </header>

      <PlacePicker />

      <WantToGo />

      <BeenThere />
    </div>
  </div>
);

export default Home;
