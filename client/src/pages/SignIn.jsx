import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
    }
    catch(err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={ handleSubmit }>
        <input className="rounded-lg focus:outline-none p-3" type="text" placeholder="Username" id='userName' onChange={handleChange}/>
        <input className="rounded-lg focus:outline-none p-3" type="email" placeholder="Email" id='email' onChange={handleChange}/>
        <input className="rounded-lg focus:outline-none p-3" type="password" placeholder="Password" id='password' onChange={handleChange}/>
        <button disabled={ loading } className="rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700 p-3 text-white">{ loading ? 'Loading...' : 'Sign in' }</button>
      </form>
      <div className='flex gap-2 my-3'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-500'>sign-up</span>
        </Link>
      </div>
    </div>
  )
}
