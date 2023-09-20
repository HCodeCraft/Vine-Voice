// import React, { useState } from 'react'
// import { useUpdatePlantMutation, useDeletePlantMutation } from './plantsSlice'
// import { useNavigate } from 'react-router-dom'

const EditPlant = () => {

//     const navigate = useNavigate()

// const [ updatePlant, { isLoading }] = useUpdatePlantMutation()
// const [deletePlant] = useDeletePlantMutation()


// const [commonName, setCommonName] = useState(plant?.common_name)
// const [sciName, setSciName] = useState(plant?.scientific_name)
// const [imageUrl, setImageUrl] = useState(plant?.image_url)

// const onCommonNameChanged= e => setCommonName(e.target.value)
// const onSciNameChanged = e => setSciName(e.target.value)
// const onImageUrlChanged= e => setImageUrl(e.target.value)

// const canSave = [commonName, sciName, imageUrl].every(Boolean) && !isLoading;


// const onSavePlantClicked = async () => {
//   if (canSave) {
//       try {
//           await updatePost({ commonName, sciName, imageUrl }).unwrap()

//           setCommonName('')
//           setSciName('')
//           setImageUrl('')
//           navigate(`/plant/${plantId}`)
//       } catch (err) {
//           console.error('Failed to save the plant', err)
//       }
//   }
// }

// const onDeletePlantClicked = async () => {
//   try {
//       await deletePlant({ id: post?.id }).unwrap()

//       setCommonName('')
//       setSciName('')
//       setImageUrl('')
//       navigate('/')
//   } catch (err) {
//       console.error('Failed to delete the post', err)
//   }
// }



//   return (
//     <section>
//     <h2>Edit Plant</h2>
//     <form>
//         <label htmlFor="commonName">Common Name:</label>
//         <input
//             type="text"
//             id="commonName"
//             name="commonName"
//             value={commonName}
//             onChange={onCommonNameChanged}
//         />
//         <label htmlFor="sciName">Scientific Name:</label>
//         <input
//             type="text"
//             id="sciName"
//             name="sciName"
//             value={sciName}
//             onChange={onSciNameChanged}
//         />
//         <label htmlFor="imageUrl">Image Url:</label>
//         <textarea
//             id="imageUrl"
//             name="imageUrl"
//             value={imageUrl}
//             onChange={onImageUrlChanged}
//         />
//         <button
//             type="button"
//             onClick={onSavePlantClicked}
//             disabled={!canSave}
//         >Save Post</button>
//     </form>
//     <button onClick={onDeletePlantClicked}>Delete Plant</button>
// </section>
//   )
}

export default EditPlant