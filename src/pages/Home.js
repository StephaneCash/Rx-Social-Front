import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm';
import FriendsHit from '../components/profil/FriendsHit';
import Thread from '../components/Thread'
import Trends from '../components/Trends';

function Home() {

  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className='main'>
        <div className='home-header'>
          {uid ? <NewPostForm /> : ""}
        </div>
        <Thread />
      </div>
      <div className='right-side'>
        <div className='right-side-container'>
          <div className='wrapper'>
            <Trends />
            {uid && <FriendsHit />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home