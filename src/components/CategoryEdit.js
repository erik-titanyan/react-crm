import React, { useEffect,  useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useValidationConfig } from '../hooks/useValidationConfig.hook'
import { updateCategory } from '../redux/category/categoryActions'

const CategoryEdit = ({ categories, updateCategory }) => {

  const [updating, setUpdating] = useState(false);

  const refSelect = useRef()

  const { categoryConfig } = useValidationConfig()

  const {register, errors, handleSubmit, setValue} = useForm()

  const currentCategory = () => {
    const res = categories.find(cat => cat.id === refSelect.current.value) || []
    setValue('title', res.title)
    setValue('limit', res.limit)
  }

  useEffect(() => {
      window.M.FormSelect.init(refSelect.current)
      currentCategory()
      window.M.updateTextFields()
  });

  const submitHandler = async (data) => {
    setUpdating(true)
    await updateCategory({title: data.title, limit: data.limit, id: refSelect.current.value})
    setUpdating(false)
  }

  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>Edit</h4>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-field">
            <select id='select' ref={refSelect} onChange={currentCategory} >
              {categories.map(cat => {
                return <option key={cat.id} value={cat.id}>
                          {cat.title}
                        </option>
              })}
            </select>
            <label>Choose category</label>
          </div>
          <div className="input-field">
            <input type="text" id="title" name='title'
             ref={register({required:categoryConfig.title.ifEmpty })} 
             />
            <label htmlFor="title">Title</label>
            {errors.title && <span className="helper-text invalid">{errors.title.message}</span>}
          </div>
          <div className="input-field">
            <input id="limitUpd" type="number" name='limit' 
            ref={register({required:categoryConfig.limit.ifNoValue,
                          min: {value: categoryConfig.limit.minValue, 
                                message: categoryConfig.limit.ifInvalid()} 
                                    })}
                                     />
            <label htmlFor="limitUpd">Limit</label>
            {errors.limit && <span className="helper-text invalid">{errors.limit.message}</span>}
          </div>
          <button className={`btn waves-effect waves-light ${updating ? 'disabled' : ''}`} type="submit">
            Update
											<i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories
  }
}

const mapDispatchToProps = {
  updateCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit)