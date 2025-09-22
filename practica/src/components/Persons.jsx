import React from 'react'

export const Persons = ({props,handlerDelete}) => {
  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        gap:'5px',
        width:'70dvw',
        justifyContent:'center'
      }}
    >
        {
          props.map(person=> (
            <article
              key={person.id}
              className='personContainer'
            >
              <p>{person.name}</p>
              <p>{person.number}</p>
              <button 
                onClick={()=> handlerDelete(person)}
                className='btnDelete'
              >delete</button>
            </article>
          ))
        }
    </div>
  )
}
