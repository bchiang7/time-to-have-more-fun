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
          .where('visited', '==', 'No')
          .get();
        const placesArr = snapshotToArray(querySnapshot);
        setPlaces(placesArr);
      } catch (e) {
        console.error('📣: fetchData -> e', e);
      }
    };

    db.collection('places')
      .where('visited', '==', 'No')
      .onSnapshot(querySnapshot => {
        const placesArr = snapshotToArray(querySnapshot);
        setPlaces(placesArr);
      });

    fetchData();
  }, []);

  return (
    <section className="py-10">
      <h2 className="mb-8">Places we want to go</h2>

      <div className="flex flex-wrap mb-4 -mx-3">
        {places.length > 0 ? (
          places.map((place, i) => (
            <div className="w-1/4 p-3 mb-3" key={i}>
              <PlaceCard place={place} />
            </div>
          ))
        ) : (
          <p className="text-base text-gray-700 p-3">Add some places you want to go!</p>
        )}
      </div>
    </section>
  );
};

export default WantToGo;
