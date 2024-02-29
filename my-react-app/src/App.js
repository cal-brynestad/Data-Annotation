import React from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment'; // For easy datetime handling

function MyForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      dateTime: moment().format('YYYY-MM-DDTHH:mm') // ISO format for 'datetime-local'
    }
  });

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="dateTime">Date and Time:</label>
      <input 
        type="datetime-local" 
        id="dateTime"
        {...register("dateTime")} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;