import { useState } from 'react';
import './App.css';
import { auth, db, provider, ref, set, signInWithPopup } from './firebase';

function App() {
  const [userData, setUserData] = useState()
  console.log(userData)

  const handleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // User signed in successfully
      setUserData(res.user)
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleData = async () => {
    const uid = userData.uid; // Make sure this is a valid UID
    if (uid) {
        await set(ref(db, 'users/' + uid), {
            name: userData.displayName,
            email: userData.email,
        });
    } else {
        console.error('UID is missing or invalid');
    }
}

  return (
    <div className="App">
      <button onClick={handleSignIn}>
        Sign In with Google
      </button>
      <button onClick={handleData}>Send Data to Database</button>
    </div>
  );
}

export default App;
