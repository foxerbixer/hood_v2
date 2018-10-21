import React from 'react'

const Scroll = (props) => {
  return (
    <div style={{'overflow': 'scroll', 'border': '5px dotted grey', 'height': '700px'}}>
      {props.children}
    </div>
  )
}

export default Scroll
