import { initializeApp } from 'firebase/app';
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update} from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyABxTJKF-PfdE8Iabyraj7lEA9LTdSlep8",
    authDomain: "class-scheduler-b57bc.firebaseapp.com",
    databaseURL: "https://class-scheduler-b57bc-default-rtdb.firebaseio.com",
    projectId: "class-scheduler-b57bc",
    storageBucket: "class-scheduler-b57bc.appspot.com",
    messagingSenderId: "45012929710",
    appId: "1:45012929710:web:d9ae1081beac41d4a4713f",
    measurementId: "G-8TYYQGCYGN"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       setData( snapshot.val() );
      }, (error) => {
        setError(error);
      })
    ), [ path ]);
  
    return [ data, error ];
};
  
const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};
  
export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
      update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
    }, [database, path]);
  
    return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};

export const useProfile = () => {
  const [user] = useAuthState();
  const [isAdmin, isLoading, error] =  useDbData(`/admins/${user?.uid || 'guest'}`);
  return [{ user, isAdmin }, isLoading, error];
};