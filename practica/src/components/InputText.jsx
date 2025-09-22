import React from 'react'

export const InputText = ({name,event,value}) => {
  return (
    <div>
          {name}: <input type="text" value={value} name={name} onChange={event} />
    </div>
  )
}
