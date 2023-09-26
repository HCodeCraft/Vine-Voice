import React from 'react'
import Button from '@mui/material/Button';

const CommonButton = ({children, color, disabled, size, sx, variant, onClick}) => {

    const buttonStyles = {
        backgroundColor: '#4CAF50',
        color:'#FFD600',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#43A035 '
        }}

  return (
    <Button color={color} disabled={disabled} size={size} variant={variant} sx={buttonStyles} onClick={onClick}>
{children}
    </Button>
  )
}

export default CommonButton