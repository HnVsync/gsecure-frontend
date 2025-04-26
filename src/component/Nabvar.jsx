import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Nabvar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="nabvar flex justify-between bg-black/30 backdrop-blur items-center">
        <li className='list-none p-2 m-2 text-2xl'><a href="/">G-secure</a></li>
        <li className='list-none p-2 m-2 w-12'><a href="https://github.com/devPeers" target='_blank' ><img src="github.png" alt="" /></a></li>
        <div>
          {user && <button className='list-none p-2 m-2 rounded bg-yellow-950 hover:bg-amber-800 transition'><a href="http://localhost:5173/vault">Vault</a></button>}
          {user && <button className='list-none p-2 m-2 rounded bg-yellow-950 hover:bg-amber-800 transition'><a href="http://localhost:5173/logout">Logout</a></button>}
        </div>
        {/* <span className="mr-4">
          Welcome <span className="font-semibold">{user.username}</span>
        </span> */}
      </div>
    </>
  )
}

export default Nabvar