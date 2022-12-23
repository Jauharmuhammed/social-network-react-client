import React from 'react'

const changeColor = ({text, colorText}) => {
    const coloredText = text?.replace(colorText, `<span className='text-blue-500'>${colorText}</span/>`)
  return coloredText
}

export default changeColor