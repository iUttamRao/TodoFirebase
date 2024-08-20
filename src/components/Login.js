import { useState } from 'react';
import { auth, db, provider, ref, set, signInWithPopup} from '../firebase';
import loginButton from '../assets/loginButton.svg'

function Login() {
  const [userData, setUserData] = useState(null);
  // const [dbData, setDbData] = useState(null);

  const handleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // User signed in successfully
      setUserData(res.user);
      const uid = res.user.uid;
      if (uid) {
        await set(ref(db, 'users/' + uid), {
          name: res.user.displayName,
          email: res.user.email,
        });
      }
      
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  // const handleReadData = async () => {
  //   const uid = userData?.uid;
  //   if (uid) {
  //     try {
  //       const snapshot = await get(ref(db, 'users/' + uid));
  //       if (snapshot.exists()) {
  //         setDbData(snapshot.val());
  //       } else {
  //         console.log('No data available');
  //       }
  //     } catch (error) {
  //       console.error('Error reading data from the database:', error.message);
  //     }
  //   } else {
  //     console.error('UID is missing or invalid');
  //   }
  // };

  return (
    <div className="App">
      <h1 style={{textAlign:'center', marginTop : '50px'}}>Todo with Authentication(Firebase)</h1>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', height: '500px' }}>
        <button onClick={handleSignIn} style={{ all: 'unset', cursor: 'pointer', scale:'5px' }}>
          <img src={loginButton} alt="button" width={300} />
        </button>
      </div>

      {/* <button onClick={handleSignIn}>
        Continue with Google
      </button> */}
      {/* <button onClick={handleData}>Send Data to Database</button>
      <button onClick={handleReadData}>Read Data from Database</button> */}
      {userData && (
        <div>
          <h2>Data from Database:</h2>
          <p>Name: {userData.displayName}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
