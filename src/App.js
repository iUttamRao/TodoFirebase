import './App.css';
import { auth, provider, signInWithPopup } from './firebase';

function App() {
  const handleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // User signed in successfully
      console.log(res)
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };
  return (
    <div className="App">
      <button onClick={handleSignIn}>
      Sign In with Google
    </button>
    </div>
  );
}

export default App;
