import { Button } from '@mui/material';
import React, { useState } from 'react';
import { backgroundColor, imageBaseUrl } from '../../../utils/config';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ImageToUpload({ image: { s3_key }, onRemove, hover }) {
  const [isHover, setIsHover] = useState(hover || false);
  const [iconHover, setIconHover] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ?
        <Button
          onClick={onRemove}
          onMouseOver={() => setIconHover(true)}
          onMouseOut={() => setIconHover(false)}
        >
          <HighlightOffIcon style={{
            position: "absolute",
            right: 10,
            top: 10,
            color: iconHover ? "white" : "black"
          }} />
        </Button>
        :
        null
      }
      <img
        src={`${imageBaseUrl}/${s3_key}`}
        alt="selected to upload"
        style={{
          maxWidth: 300,
          maxHeight: 300,
          padding: 4,
          borderWidth: 1,
          borderColor: isHover ? "black" : backgroundColor,
          borderStyle: "solid",
        }}
      />
    </div>
  );
}
