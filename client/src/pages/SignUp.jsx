import { Link } from 'react-router-dom';
 
export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className="flex flex-col  gap-4 my-4">
        <input className="p-3 focus:outline-none rounded-lg" type="text" placeholder="Username"/>
        <input className="p-3 focus:outline-none rounded-lg" type="email" placeholder="Email"/>
        <input className="p-3 focus:outline-none rounded-lg" type="password" placeholder="Passowrd"/>
        <button className="uppercase bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-95">sign up</button>
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
