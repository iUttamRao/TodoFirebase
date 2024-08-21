import { auth, db, provider, ref, set, signInWithPopup} from '../firebase';
import loginButton from '../assets/loginButton.svg'
import { useNavigate } from 'react-router-dom';
import { TODO } from '../routing/keys';
import { useEffect } from 'react';
import { checkTokenExpiration } from '../routing/router';

function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const isExpired = checkTokenExpiration();
    if (isExpired) {
      navigate(TODO);
    }
// eslint-disable-next-line
  }, []); 

  const handleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res)
      localStorage.setItem("accessToken", res.user.accessToken)
      localStorage.setItem("userId",res.user.uid)
      const uid = res.user.uid;
      if (uid) {
        await set(ref(db, 'users/' + uid), {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL
        });
      }
      navigate(TODO)
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };
  
  return (
    <div className="App">
      <h1 style={{textAlign:'center', marginTop : '50px'}}>Todo with Authentication(Firebase)</h1>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', height: '500px' }}>
        <button onClick={handleSignIn} style={{ all: 'unset', cursor: 'pointer', scale:'5px' }}>
          <img src={loginButton} alt="button" width={300} />
        </button>
      </div>
    </div>
  );
}

export default Login;
