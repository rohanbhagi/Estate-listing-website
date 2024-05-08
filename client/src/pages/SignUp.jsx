import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json ',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className="flex flex-col  gap-4 my-4" onSubmit={handleSubmit}>
        <input className="p-3 focus:outline-none rounded-lg" type="text" placeholder="Username" id='userName' onChange={handleChange}/>
        <input className="p-3 focus:outline-none rounded-lg" type="email" placeholder="Email" id='email' onChange={handleChange}/>
        <input className="p-3 focus:outline-none rounded-lg" type="password" placeholder="Passowrd" id='password' onChange={handleChange} />
        <button disabled={loading} className="uppercase bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Sign up'}</button>
      </form>
      <div className='flex gap-2'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-500'>sign-in</span>
        </Link>
      </div>
      { error && <p className='text-red-500'>{error}</p> }
    </div>
  )
}
