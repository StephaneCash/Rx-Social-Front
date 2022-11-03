import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import FriendsHit from '../components/profil/FriendsHit';
import Trends from '../components/Trends';

function Trainding() {
  const uid = useContext(UidContext);
  const trendingList = useSelector((state) => state.tredingReducer);

  return (
    <div className='trending-page'>
      <LeftNav />
      <div className='main'>
        <ul>
          {trendingList && trendingList.map((post) =>
            <Card post={post} key={post._id} />
          )}
        </ul>
      </div>
      <div className='right-side'>
        <div className='right-side-container'>
          <Trends />
          {uid && <FriendsHit />}
        </div>
      </div>
    </div>
  )
}

export default Trainding