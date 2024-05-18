import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => setFormData({ ...formData, photo: downloadUrl }));
      }
    );
  };

  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-center text-3xl uppercase font-semibold my-7">Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} className="place-self-center rounded-full h-24 w-24 object-cover mb-7 cursor-pointer" src={formData.photo || currentUser.photo}></img>
        <p className="self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error in Uploading image</span>
          ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
            <span className="text-slate-700">{fileUploadPercentage}%</span>
          ) : fileUploadPercentage === 100 ? (
            <span className="text-green-700">Image Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input className="rounded-lg focus:outline-none p-3" type="text" placeholder="UserName" id="userName" />
        <input className="rounded-lg focus:outline-none p-3" type="email" placeholder="Email" id="email" />
        <input className="rounded-lg focus:outline-none p-3" type="password" placeholder="Password" id="password" />
        <button type="" className="uppercase rounded-lg bg-slate-700 p-3 my-3 text-white font-semibold hover:opacity-95 disabled:opacity-85">
          Update
        </button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer mt-5">Delete Account</span>
        <span className="text-red-700 cursor-pointer mt-5">Sign out</span>
      </div>
    </div>
  );
}
