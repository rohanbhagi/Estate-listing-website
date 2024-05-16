import { useSelector } from "react-redux"

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-center text-3xl uppercase font-semibold my-7">Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto gap-4">
        <img className='place-self-center rounded-full h-24 w-24 object-cover mb-7 cursor-pointer' src={ currentUser.photo }></img>
        <input className='rounded-lg focus:outline-none p-3' type="text" placeholder="UserName" id="userName"/>
        <input className='rounded-lg focus:outline-none p-3' type="email" placeholder="Email" id='email'/>
        <input className='rounded-lg focus:outline-none p-3' type="password" placeholder="Password" id='password'/>
        <button type='' className="uppercase rounded-lg bg-slate-700 p-3 my-3 text-white font-semibold hover:opacity-95 disabled:opacity-85" >Update</button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer mt-5">Delete Account</span>
        <span className="text-red-700 cursor-pointer mt-5">Sign out</span>
      </div>
    </div>
  )
}
