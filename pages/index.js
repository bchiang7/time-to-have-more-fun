import React, { useState, useEffect } from 'react';
import { EventBus, defaultTagField, auth } from '../utils';
import { Head, Nav, AuthForm, PlaceForm, PlacePicker, WantToGo, BeenThere } from '../components';

const defaultPlace = {
  name: '',
  description: '',
  img: '',
  visited: 'No',
  visitedDate: '',
  tags: defaultTagField,
};

const Home = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [placeToEdit, setPlaceToEdit] = useState(defaultPlace);
  const [authed, setAuthed] = useState(false);
  const [authModalShown, setAuthModalShown] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
  }, []);

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
    if (authed) {
      setIsEditing(false);
      openModal();
    } else {
      setAuthModalShown(true);
    }
  };

  EventBus.on('editPlace', place => {
    setIsEditing(true);
    openModal(place);
  });

  return (
    <div>
      <Head title="Time to Have More Fun" />

      <Nav addPlace={addPlace} />

      <div className="container mx-auto px-4 pt-20">
        {authModalShown && <AuthForm closeModal={() => setAuthModalShown(false)} />}

        {isModalShown && (
          <PlaceForm
            closeModal={closeModal}
            isEditing={isEditing}
            placeToEdit={placeToEdit}
            authed={authed}
          />
        )}

        <PlacePicker />

        <WantToGo />

        <BeenThere />
      </div>
    </div>
  );
};

export default Home;
