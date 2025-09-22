export const FilterForm = ({handlerFilterPerson, placeholder}) => {
  return (
    <form>
        filter shown with <input onChange={handlerFilterPerson} placeholder={placeholder} />
    </form>
  )
}
