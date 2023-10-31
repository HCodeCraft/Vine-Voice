import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const ProfileImage = () => {
  const [ image, setImage] = useState("")

    const latestImage = useSelector((state) => state.user.loggedInUser.image)

    useEffect(()=> {
      setImage(latestImage)

    },[latestImage])
    
  return (
    <div>
      <img src={image} alt="latest image" className="latest-image"/>
    </div>
  )
}

export default ProfileImage