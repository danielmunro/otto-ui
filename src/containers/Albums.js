import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { createAlbum, getAlbums } from '../actions/album';
import Album from '../components/Album';
import TextInput from '../components/TextInput';
import Context from '../utils/Context';

export default function Albums({ username }) {
  const [albums, setAlbums] = useState([]);
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const { sessionToken } = useContext(Context);

  const reloadAlbums = async () => {
    const response = await getAlbums(username);
    const data = await response.json();
    setAlbums(data);
  };

  const cancelAddAlbum = () => {
    setShowNewAlbum(false);
    setNewAlbumName("");
  }

  const tryCreateAlbum = async () => {
    await createAlbum(sessionToken, newAlbumName);
    setNewAlbumName("");
    await reloadAlbums();
  };

  useEffect(() => {
    (async function() {
      await reloadAlbums();
    })();
  }, []);

  return (
    <div>
      { !showNewAlbum && (
        <Button variant="outlined" onClick={() => setShowNewAlbum(true)}>
          Add Album
        </Button>
      )}
      { showNewAlbum && (
        <Button variant="outlined" onClick={cancelAddAlbum}>
          Cancel
        </Button>
      )}
      { showNewAlbum && (
        <div style={{marginTop: 10}}>
          <TextInput
            label="Album name"
            variant="outlined"
            onChangeValue={setNewAlbumName}
            value={newAlbumName}
            style={{width: 400}}
          />
          <Button style={{margin: 16}} onClick={tryCreateAlbum}>
            Create New Album
          </Button>
        </div>
      )}
      {albums.map((album) => (
        <Album album={album} key={album.uuid} />
      ))}
    </div>
  );
}
