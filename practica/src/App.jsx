import { useState } from "react";
import { FilterForm } from "./components/FilterForm";
import {Persons} from  "./components/Persons";
import {InputText} from "./components/InputText";
import { useEffect } from "react";
import personService from "./services/person";
import {Notification} from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [messageNotification, setMessageNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(function(){

    personService.getAll()
      .then(response => {
        setPersons(persons.concat(response));
    })
      .catch(error => {
        setMessageNotification(error.message)
        setErrorMessage(!errorMessage)
          setTimeout(()=>{
            setMessageNotification(null);
          },2000)
      });
  },[])

  const handlerFilterPerson = (e) =>{
    setFilter(e.target.value);
  }

  const handlerDelete = (person)=>{
    const response =  window.confirm(`Delete ${person.name}?`);
    if(response){

      personService.delete(person.id)
        .then(rs =>{
          console.log(rs)
          setPersons(persons.filter(p => p.id != person.id));
        })
        .catch(err => {
          setMessageNotification(err.message);
          setErrorMessage(!errorMessage);
          setTimeout(()=>{
            setMessageNotification(null);
          },2000)
        });
    }
  }

  const findPerson = function(){
    const matchPerson = persons.find(i => i.name == newPerson);
    return matchPerson;
  } 

  const handlerSubmitPerson = (e)=>{
    e.preventDefault();
    const newPersonOf = {name:newPerson, number:newPhone};
    if(!findPerson()){
      personService.create(newPersonOf)
      .then( newCustomer =>{
          setPersons(persons.concat(newCustomer))
          setMessageNotification(`Added ${newPerson}`);
          setTimeout(()=>{
            setMessageNotification(null);
          },2000)
          setNewPerson('');
          setNewPhone('');
          }
        )
      .catch(err => console.error(err));
    }else{
      const message = window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new?`);
      if(message){
        const newPer = {
          id: findPerson().id,
          name: newPerson,
          number: newPhone
        }
        personService.update(newPer)
          .then(response => setPersons(persons.map(p => p.id != response.id? p : response )))
          .catch(err => {
            setErrorMessage(!errorMessage);
            setMessageNotification(err.message)
          setTimeout(()=>{
            setMessageNotification(null);
          },2000)
          });
      }
    }
  }

  const handlerChangeInput = (e)=>{
    e.preventDefault();
    const inputType = e.target.name; 
    if(inputType == "name"){
      setNewPerson(e.target.value);
    }else{
      setNewPhone(e.target.value)
    }
  }

  const personToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()));

  return (
    <>
      <header
        style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          backgroundColor:'black',
          color:'white'
        }}
        >
      {messageNotification && <Notification message={messageNotification} messageStyle={errorMessage? 'red' : 'green'} />}
      <h1>Phonebook</h1>
        <FilterForm handlerFilterPerson={handlerFilterPerson} placeholder={'Search...'} />
      </header>
      <h2>add a new</h2>
      <form
        onSubmit={(e)=>handlerSubmitPerson(e)}
      >
        <InputText name={'name'} event={handlerChangeInput} value={newPerson} />
        <InputText name={'phone'} value={newPhone} event={handlerChangeInput} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <main
        style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <h2>Numbers</h2>
        <Persons props={personToShow} handlerDelete={handlerDelete} />
      </main>
    </>
  )
}

export default App
