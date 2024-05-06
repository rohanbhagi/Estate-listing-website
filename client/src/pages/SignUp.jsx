import { useState } from 'react';
import { Link } from 'react-router-dom';
 
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ',
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log(data);
  }

  console.log(formData);

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className="flex flex-col  gap-4 my-4" onSubmit={handleSubmit}>
        <input className="p-3 focus:outline-none rounded-lg" type="text" placeholder="Username" id='userName' onChange={handleChange}/>
        <input className="p-3 focus:outline-none rounded-lg" type="email" placeholder="Email" id='email' onChange={handleChange}/>
        <input className="p-3 focus:outline-none rounded-lg" type="password" placeholder="Passowrd" id='password' onChange={handleChange} />
        <button className="uppercase bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80">sign up</button>
      </form>
      <div className='flex gap-2'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-500'>sign-in</span>
        </Link>
      </div>
    </div>
  )
}
