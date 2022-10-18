import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread'

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
    </div>
  )
}

export default Home