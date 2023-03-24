import React, { useState } from "react";
import Loading from "./Loading";

function EditUser({ setModal, editUser, loading, error, setError, user }) {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [bornDate, setBornDate] = useState(user.born_date);
  const [gender, setGender] = useState(user.gender);

  return (
    <div className="absolute top-0 left-0 z-50 w-screen h-screen flex justify-center items-center">
      <div className="px-6 py-6 fixed max-w-xs container bg-white shadow-xl border border-gray rounded-md flex justify-center items-center">
        <form className="flex flex-col w-full">
          <h1 className="pb-5 text-xl text-purple font-semibold text-center">
            Edit User
          </h1>
          <label className="py-1 flex justify-start">Name</label>
          <input
            className="p-2 border border-gray rounded-md"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            placeholder="type your task here"
          ></input>
          <label className="py-1 flex justify-start">Address</label>
          <input
            className="p-2 border border-gray rounded-md"
            required
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setError(null);
            }}
            placeholder="type your task here"
          ></input>
          <label className="py-1 flex justify-start">Born Date</label>
          <input
            type={'date'}
            className="p-2 border border-gray rounded-md"
            required
            value={bornDate}
            onChange={(e) => {
              setBornDate(e.target.value);
              setError(null);
            }}
            placeholder="type your task here"
          ></input>
          <label className="py-1 mt-2 flex justify-start">Gender</label>
          <select
            className="p-2 border border-gray rounded-md"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setError(null);
            }}
          >
            <option value={""}>Choose...</option>
            <option value={"l"}>Pria</option>
            <option value={"p"}>Wanita</option>
          </select>
          {error && <h1 className="p-2 mt-2 bg-red-300">{error}</h1>}
          <div className="pt-8 grid grid-cols-2 gap-3">
            <button
              className="p-2 bg-red-500 shadow-md rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setModal(false);
                setError(null);
              }}
            >
              Close
            </button>
            {loading ? (
              <button
                className="p-2 bg-gray shadow-md rounded-md flex justify-center"
                disabled
              >
                <Loading />
                Save
              </button>
            ) : (
              <button
                className="p-2 bg-blue-400 shadow-md rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  !name || !gender || !address || !bornDate
                    ? setError("Please fill all fields")
                    : editUser(name, address, gender, bornDate, user.id);
                }}
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;