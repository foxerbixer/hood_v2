import React from 'react'
import Loader  from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div style={{ margin: 'auto', width: '150px' }}>
      <Loader 
        type="Audio"
        color="black"
        height="100"	
        width="100"
      />
  </div>
  )
}

export default Spinner
