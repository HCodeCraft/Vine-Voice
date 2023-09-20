import React, { useState } from 'react';
import { useAddNewPlantMutation } from './plantsSlice';

const NewPlant = () => {
  const [addNewPlant, { isLoading }] = useAddNewPlantMutation()

  const [commonName, setCommonName] = useState('');
  const [sciName, setSciName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onCommonNameChanged = (e) => setCommonName(e.target.value);
  const onSciNameChanged = (e) => setSciName(e.target.value);
  const onImageUrlChanged = (e) => setImageUrl(e.target.value);

  const canSave = [commonName, sciName, imageUrl].every(Boolean) && !isLoading;

  const onSavePlantClicked = async () => {
    if (canSave) {
      try {
        await addNewPlant({ commonName, sciName, imageUrl }).unwrap();

        setCommonName('');
        setSciName('');
        setImageUrl('');
      } catch (err) {
        console.error('Failed to save the plant', err);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Plant</h2>
      <form>
        <label htmlFor="commonName">Common Name:</label>
        <input
          type="text"
          id="commonName"
          name="commonName"
          value={commonName}
          onChange={onCommonNameChanged}
        />
        <label htmlFor="sciName">Scientific Name:</label>
        <input
          type="text"
          id="sciName"
          name="sciName"
          value={sciName}
          onChange={onSciNameChanged}
        />
        <label htmlFor="imageUrl">Image Url:</label>
        <input
          type="text" 
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={onImageUrlChanged}
        />
        <button type="button" onClick={onSavePlantClicked} disabled={!canSave}>
          Save Plant
        </button>
      </form>
    </section>
  );
};

export default NewPlant;
