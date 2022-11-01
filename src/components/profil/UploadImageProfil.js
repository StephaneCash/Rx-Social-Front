import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/UserActions';

function UploadImageProfil() {

  const [file, setFile] = useState('');
  const dispach = useDispatch()
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();

    const data = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispach(uploadPicture(data, userData._id, config))
  };

  return (
    <form action='' onSubmit={handlePicture} className="upload-pic" encType="multipart/form-data" id="form">
      <label htmlFor='file'>Changer d'image</label>
      <input type="file" id="file" name='file' accept='.jpg, .jpeg, .png, .gif'
        onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <input type="submit" value="Envoyer" style={{border:"1px solid silver"}} />
    </form>
  )
}

export default UploadImageProfil