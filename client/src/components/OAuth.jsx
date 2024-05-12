import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async (e) => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res =  await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        }
        catch(error) {
            console.log('Could now sign in with Google', error);
        }
    }
  return (
  <button 
    type="button" 
    onClick={handleGoogleClick}
    className="p-3 bg-red-700 text-white uppercase rounded-lg hover:opacity-95">
        Continue With Google
</button>
  )
}
