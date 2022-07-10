import React from 'react'
import { useForm } from 'react-hook-form'

const InputSearch = ({setSearchProduct}) => {
  const {handleSubmit,register,reset}= useForm()
  
  const submit =data=>{
   setSearchProduct(data)
   reset({
    searchText:''
   })
  }
  
  
  return (
    <form onSubmit={handleSubmit(submit)} className='form-home'>
        <input type="text" {...register('searchText')} placeholder='What are you looking for?' />
        <button><i className="fa-solid fa-magnifying-glass"></i> Search</button>

    </form>
        
    )
}

export default InputSearch