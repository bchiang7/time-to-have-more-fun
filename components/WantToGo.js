import React, { useState, useEffect } from 'react';
import { db, snapshotToArray, getUnvisitedPlaces } from '../utils';
import { PlaceCard } from '../components';

const WantToGo = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesArr = await getUnvisitedPlaces();
        setPlaces(placesArr);
      } catch (e) {
        console.error('📣: fetchData -> e', e);
      }
    };

    fetchData();

    // Listen for live updates
    db.collection('places')
      .where('visited', '==', 'No')
      .onSnapshot(querySnapshot => {
        const placesArr = snapshotToArray(querySnapshot);
        setPlaces(placesArr);
      });
  }, []);

  return (
    <section className="py-12">
      <h2 className="mb-8">Places we want to go</h2>

      <div className="flex flex-wrap mb-4 -mx-3">
        {places.length > 0 ? (
          places.map((place, i) => (
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-3 p-3" key={i}>
              <PlaceCard place={place} />
            </div>
          ))
        ) : (
          <p className="p-3 text-base text-gray-700">Add some places you want to go!</p>
        )}
      </div>
    </section>
  );
};

export default WantToGo;
