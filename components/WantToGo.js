import React, { useState, useEffect } from 'react';
import { db, snapshotToArray } from '../utils';
import PlaceCard from './PlaceCard';

const WantToGo = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db
          .collection('places')
          .where('visited', '==', false)
          .get();
        const placesArr = snapshotToArray(querySnapshot);
        setPlaces(placesArr);
      } catch (e) {
        console.error('📣: fetchData -> e', e);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-10">
      <h2 className="mb-8">Places we want to go</h2>

      <div>
        {places.length > 0 ? (
          places.map((place, i) => <PlaceCard place={place} key={i} />)
        ) : (
          <p className="text-base">Add some places you want to go!</p>
        )}
      </div>
    </section>
  );
};

export default WantToGo;
