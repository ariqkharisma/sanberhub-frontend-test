import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState();
    const [user, setUser] = useState();

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
    }

    useEffect(() => {
      getUserById(id);
    }, [id])
    

  return (
    !loading ? 
    user && 
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <h1 className='mb-10 text-4xl'>User Detail</h1>
        <div className='border-2 p-8 rounded-lg shadow-md shadow-slate-200'>
            <h1 className='text-2xl p-2'>Name: {user.name}</h1>
            <h1 className='text-2xl p-2'>Address: {user.address}</h1>
            <h1 className='text-2xl p-2'>Born: {user.born_date}</h1>
            {user.gender === "p" ? <h1 className='text-2xl p-2'> Gender: Wanita </h1> : <h1 className='text-2xl p-2'> Gender: Pria </h1>
            }
        </div>
        
    </div> :
    <Loading />
  )
}

export default Detail;