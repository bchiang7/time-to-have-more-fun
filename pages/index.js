import React, { useState } from 'react';
import Head from '../components/head';
import PlaceForm from '../components/PlaceForm';
import PlacePicker from '../components/PlacePicker';
import WantToGo from '../components/WantToGo';
import BeenThere from '../components/BeenThere';
import { EventBus } from '../utils';

const defaultPlace = {
  name: '',
  description: '',
  img: '',
  visited: 'No',
  visitedDate: '',
  tags: [],
};

const Home = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [placeToEdit, setPlaceToEdit] = useState(defaultPlace);

  const openModal = (place = defaultPlace) => {
    document.body.classList.add('freeze');
    setPlaceToEdit(place);
    setIsModalShown(true);
  };

  const closeModal = () => {
    document.body.classList.remove('freeze');
    setIsModalShown(false);
  };

  const addPlace = () => {
    setIsEditing(false);
    openModal();
  };

  EventBus.on('editPlace', place => {
    setIsEditing(true);
    openModal(place);
  });

  return (
    <div>
      <Head title="Time to Have More Fun" />

      <div className="container mx-auto">
        <header className="py-20 flex justify-between items-center">
          <h1 className="font-bold">Time to Have More Fun!</h1>

          <button
            className="inline-flex items-center bg-teal-500 hover:bg-teal-400 focus:outline-none focus:bg-teal-400 px-6 py-3 rounded-lg text-white font-small tracking-wide"
            onClick={addPlace}>
            Add Place
          </button>
        </header>

        {isModalShown && (
          <PlaceForm closeModal={closeModal} isEditing={isEditing} placeToEdit={placeToEdit} />
        )}

        <PlacePicker />

        <WantToGo />

        <BeenThere />
      </div>
    </div>
  );
};

export default Home;
