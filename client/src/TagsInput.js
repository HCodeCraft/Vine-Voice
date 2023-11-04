import React, { useState } from 'react'

const TagsInput = ({tags, handleTagsChange, removeTag}) => {



  return (
    <div className="tags-input-container">


        { tags.map((tag, index)=> (
        <div className="tag-item" key={index}>
        <span className="text">{tag}</span>
        <span className="close" onClick={()=> removeTag(index)}>x</span>
    </div>
        ))}
        
        <input type="text" onKeyDown={handleTagsChange} className="tags-input" placeholder="Type something"/>
    </div>
  )
}

export default TagsInput