import React from "react";

const TagsInput = ({ tags, removeTag, handleKeyDown}) => {
  return (
    <div className="tags-input-container">
      {tags?.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            x
          </span>
        </div>
      ))}

      <input
        type="text"
        onKeyDown={handleKeyDown}
        className="tags-input"
        placeholder="Type something"
      />
    </div>
  );
};

export default TagsInput;
