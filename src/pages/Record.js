import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Loader from '../components/app/Loader';
import { useValidationConfig } from '../hooks/useValidationConfig.hook';
import { fetchCategories, resetCategories } from '../redux/category/categoryActions'
import { createRecord } from '../redux/record/recordActions'
import { updateInfo, getUserInfo } from '../redux/info/infoActions'
import { useToast } from '../hooks/useToast.hook';
import { setCurrencyFilter } from '../hooks/setCurrencyFilter.hook';
import { Link } from 'react-router-dom';

const Record = ({categories, bill, fetchCategories, resetCategories, createRecord, updateInfo, getUserInfo}) => {

  const [loader, setloader] = useState(false);

  const refSelect = useRef()

  const {errorToast} = useToast()

  const {handleSubmit, errors, register,  setValue} = useForm()

  const {categoryConfig} = useValidationConfig()

  useEffect(() => {
    if(!categories.length) {
      (async function() {
        setloader(true)
        await fetchCategories()
        setloader(false)
        window.M.FormSelect.init(refSelect.current)
      })()
    } 

    // return () => {
    //   resetCategories()
    // }
  }, []);

 

  const submitHandler = async ({amount, description, type}) => {
    const canCreate = type === 'income' ? true : bill >= amount
    if(canCreate) {
      await createRecord({
        amount, description, type,
        categoryId: refSelect.current.value,
        date: new Date().toJSON()
      })
      const newBill = type === 'income' ? bill + +amount : bill - amount
      await updateInfo({bill: newBill})
      setValue('amount', '')
      setValue('description', '')
      setValue('type', null)
    }else { errorToast('You do not have enough money ' + setCurrencyFilter((amount - bill))  ) }
  }

  return (
    <div>
      <div className="page-title">
        <h3>New record</h3>
      </div>
      
      {loader ? <Loader /> : 
      !categories.length ? <p>You do not have any categories. Wanna {<Link to='/categories'>add</Link>}?</p> :
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
        <div className="input-field">
          <select ref={refSelect}>
            {categories.map(cat => {
              return <option key={cat.id} value={cat.id}>{cat.title}</option>
            })}
          </select>
          <label>Choose category</label>
        </div>
        <div>
        <p>
          <label>
            <input className="with-gap" name="type" type="radio" defaultValue="income" 
              ref={register({required: categoryConfig.record.ifRadioUnchoosen})}
             />
            <span>income</span>
          </label>
        </p>
        <p>
          <label>
            <input className="with-gap" name="type" type="radio" defaultValue="outcome" 
              ref={register({required:categoryConfig.record.ifRadioUnchoosen})}
            />
            <span>outcome</span>
          </label>
        </p>
        {errors.type && <small className="helper-text invalid">{errors.type.message}</small>}
        </div>
        <div className="input-field">
          <input id="amount" type="number" name='amount'
            ref={register({required: categoryConfig.limit.ifNoValue,
                                      min: {value: categoryConfig.limit.minValue, 
                                      message:categoryConfig.limit.ifInvalid()}})}
          />
          <label htmlFor="amount">Sum</label>
          {errors.amount && <span className="helper-text invalid">{errors.amount.message}</span>}
        </div>
        <div className="input-field">
          <input id="description" type="text" name='description' 
             ref={register({required:categoryConfig.record.ifDescriptionEmpty})}
          />
          <label htmlFor="description">Description</label>
          {errors.description && <span className="helper-text invalid">{errors.description.message}</span>}
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Create
      <i className="material-icons right">send</i>
        </button>
      </form>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    bill: state.info.user.bill
  }
}

const mapDispatchToProps = {
  fetchCategories, resetCategories, createRecord, updateInfo, getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)