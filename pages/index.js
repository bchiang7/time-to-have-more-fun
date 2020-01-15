import React, { useState, useEffect } from 'react';
import { EventBus, defaultPlace, auth, logout } from '../utils';
import { Head, Nav, AuthForm, PlaceForm, PlacePicker, WantToGo, BeenThere } from '../components';

const Home = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [authModalShown, setAuthModalShown] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [placeToEdit, setPlaceToEdit] = useState(defaultPlace);

  useEffect(() => {
    auth.onAuthStateChanged(user => setAuthed(!!user));
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

  EventBus.on('addPlace', () => {
    if (authed) {
      setIsEditing(false);
      openModal();
    } else {
      setAuthModalShown(true);
    }
  });

  EventBus.on('editPlace', place => {
    setIsEditing(true);
    openModal(place);
  });

  EventBus.on('login', () => {
    closeModal();
    setAuthModalShown(true);
  });

  EventBus.on('closePlaceModal', () => closeModal());
  EventBus.on('closeAuthModal', () => setAuthModalShown(false));
  EventBus.on('logout', async () => await logout());

  return (
    <div>
      <Head title="Time to Have More Fun" />

      <Nav authed={authed} />

      <div className="container mx-auto px-4 pt-20">
        {authModalShown && <AuthForm />}

        {isModalShown && (
          <PlaceForm isEditing={isEditing} placeToEdit={placeToEdit} authed={authed} />
        )}

        <PlacePicker />

        <WantToGo />

        <BeenThere />
      </div>
    </div>
  );
};

export default Home;
