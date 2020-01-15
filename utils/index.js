import EventBus from './EventBus';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'time-to-have-more-fun.firebaseapp.com',
  databaseURL: 'https://time-to-have-more-fun.firebaseio.com',
  projectId: 'time-to-have-more-fun',
  storageBucket: 'time-to-have-more-fun.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

const snapshotToArray = querySnapshot => {
  if (!querySnapshot.docs && !querySnapshot.docs.length > 0) {
    throw new Error('No docs!!');
  }
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getUnvisitedPlaces = async () => {
  try {
    const querySnapshot = await db
      .collection('places')
      .where('visited', '==', 'No')
      .get();
    const placesArr = snapshotToArray(querySnapshot);
    return placesArr;
  } catch (e) {
    console.error('📣: fetchData -> e', e);
  }
};

const getVisitedPlaces = async () => {
  try {
    const querySnapshot = await db
      .collection('places')
      .where('visited', '==', 'Yes')
      .get();
    const placesArr = snapshotToArray(querySnapshot);
    return placesArr;
  } catch (e) {
    console.error('📣: fetchData -> e', e);
  }
};

/* eslint-disable */
const slugify = str => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};
/* eslint-enable */

const addPlace = async place => {
  try {
    await db
      .collection('places')
      .doc(place.id ? place.id : slugify(place.name))
      .set(place);
  } catch (e) {
    console.error('📣: addPlace -> e', e);
  }
};

const deletePlace = async place => {
  try {
    await db
      .collection('places')
      .doc(place.id)
      .delete();
  } catch (e) {
    console.error('📣: deletePlace -> e', e);
  }
};

const defaultTags = {
  type: {
    adventure: false,
    beach: false,
    city: false,
    ski: false,
  },
  temperature: {
    hot: false,
    cold: false,
    temperate: false,
  },
  flight: {
    long: false,
    medium: false,
    short: false,
  },
};

const defaultTagField = {
  type: '',
  temperature: '',
  flight: '',
};

const defaultPlace = {
  name: '',
  description: '',
  img: '',
  visited: 'No',
  visitedDate: '',
  tags: defaultTagField,
};

const getPlacesByTags = async tagsToQuery => {
  try {
    let query = db.collection('places').where('visited', '==', 'No');

    for (const key in tagsToQuery) {
      const value = tagsToQuery[key];
      if (value) {
        query = query.where(`tags.${key}`, '==', value);
      }
    }

    const querySnapshot = await query.get();
    const places = snapshotToArray(querySnapshot);
    return places;
  } catch (e) {
    console.error('📣: getPlacesByTags -> e', e);
  }
};

const login = async ({ email, password }) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    const { code, message } = e;
    console.error('📣: login -> error', code, message);
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    const { code, message } = e;
    console.error('📣: logout -> error', code, message);
  }
};

export {
  EventBus,
  db,
  auth,
  login,
  logout,
  snapshotToArray,
  defaultTags,
  defaultTagField,
  defaultPlace,
  addPlace,
  deletePlace,
  getPlacesByTags,
  getUnvisitedPlaces,
  getVisitedPlaces,
};
