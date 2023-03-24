import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditUser from "../components/EditUser";

function Edit() {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const getUserById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://cms-admin.ihsansolusi.co.id/testapi/user/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      setUser(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const editUser = async (name, address, gender, born_date, id) => {
    try {
      setLoading(true);
      await axios.put(
        "https://cms-admin.ihsansolusi.co.id/testapi/user/" + id,
        {
          name,
          address,
          gender,
          born_date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  return (
    <>
      {user && (
        <EditUser
          editUser={editUser}
          loading={loading}
          error={error}
          setError={setError}
          user={user}
        />
      )}
    </>
  );
}

export default Edit;
