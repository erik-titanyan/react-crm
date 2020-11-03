import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useValidationConfig } from '../hooks/useValidationConfig.hook';
import { connect } from 'react-redux';
import { createCategory } from '../redux/category/categoryActions'

const CategoryCreate = ({ createCategory }) => {

  const {register, errors, handleSubmit, reset, setValue} = useForm()

  const [submiting, setSubmiting] = useState(false);

  const {categoryConfig} = useValidationConfig()

  

  const submitHandler = async (event) => {
    setSubmiting(true)
    await createCategory({title: event.title, limit: event.limit})
    setValue('title','')
    setValue('limit', '')
    reset()
    setSubmiting(false)
  }


  return (
    <div className="col s12 m6">
      <div className="page-subtitle">
        <h4>Create</h4>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="input-field" >
          <input id="name" type="text" name='title' ref={register({required:categoryConfig.title.ifEmpty })} />
          <label htmlFor="name">Title</label>
          {errors.title && <span className="helper-text invalid">{errors.title.message}</span>}
          
        </div>
        <div className="input-field">
          <input id="limit" type="number" name='limit' 
          ref={register({required:categoryConfig.limit.ifNoValue,
                         min: {value: categoryConfig.limit.minValue, 
                              message: categoryConfig.limit.ifInvalid()} 
                                    })}/>
          <label htmlFor="limit">Limit</label>
          {errors.limit && <span className="helper-text invalid">{errors.limit.message}</span>}
        </div>
        <button className={`btn waves-effect waves-light ${submiting ? 'disabled' : ''}`} type="submit">
          Create
											<i className="material-icons right">send</i>
        </button>
        
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createCategory
}

export default connect(null, mapDispatchToProps)(CategoryCreate)