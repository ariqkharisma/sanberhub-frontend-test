import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import AddUser from "../components/AddUser";

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://cms-admin.ihsansolusi.co.id/testapi/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user-token');
    setIsLoggedIn(false);
  };

  const addUser = async(name, address, gender, born_date) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://cms-admin.ihsansolusi.co.id/testapi/user",
        {
          name,
          address,
          gender,
          born_date
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      setModal(false);
      getUsers();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message)
      setLoading(false);
    }
  }

  const deleteData = async(id) => {
    try {
        setLoading(true);
        const res = await axios.delete(
          "https://cms-admin.ihsansolusi.co.id/testapi/user/" + id, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        );
        setLoading(false);
        getUsers();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
  }

  useEffect(() => {
    localStorage.getItem('user-token') ? setIsLoggedIn(true) : setIsLoggedIn(false);
    !isLoggedIn && navigate('/login')
    getUsers();
  }, [isLoggedIn]);

  return !loading ? (
    <>
        <div className="flex justify-between pt-20 pb-2 px-10">
            <button className="bg-slate-400 py-2 px-3 m-1 rounded-md" onClick={() =>setModal(true)}>
                Add New User
            </button>
            {modal && (
              <AddUser
                setModal={setModal}
                addUser={addUser}
                loading={loading}
                error={error}
                setError={setError}
              />)}
            <button className="bg-red-500 py-2 px-3 m-1 rounded-md" onClick={() => logout()}>
                Logout
            </button>
        </div>
      <div className="flex flex-col justify-center items-center">
        <table className="w-[80rem]">
          <thead className="border-2 bg-slate-100">
            <th>Name</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Born</th>
            <th>Created At</th>
            <th>Action</th>
          </thead>
          {users &&
            users.length &&
            users.map((user, index) => {
              return (
                <tbody className="border-2" key={index}>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.address}</td>
                  <td className="text-center">{user.gender}</td>
                  <td className="text-center">{user.born_date}</td>
                  <td className="text-center">{user.created_at}</td>
                  <td className="text-center">
                    <button className="bg-blue-400 py-2 px-3 m-1 rounded-md" onClick={() => navigate('/user/' + user.id)}>
                      Detail
                    </button>
                    <button className="bg-green-400 py-2 px-3 m-1 rounded-md">
                      Edit
                    </button>
                    <button className="bg-red-400 py-2 px-3 m-1 rounded-md" onClick={() => deleteData(user.id)}>
                      Delete
                    </button>
                  </td>
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
