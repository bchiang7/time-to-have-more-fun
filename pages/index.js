import React, { useState } from 'react';
import Head from '../components/head';
import Nav from '../components/nav';
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

      <Nav addPlace={addPlace} />

      <div className="container mx-auto px-4">
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
