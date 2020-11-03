import React, { useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/app/Loader';
import { setDateFilter } from '../hooks/setDateFilter.hook';
import { getCategoryById } from '../redux/category/categoryActions'
import {   getRecordById } from '../redux/record/recordActions'

const Details = ({ getCategoryById, getRecordById }) => {

  const {id} = useParams()

  const [record, setRecord] = useState({});

  const [loader, setloader] = useState(true);

  

  const func = async () => {
    const fetchedRecord = await getRecordById(id)
      const {title} = await getCategoryById(fetchedRecord.categoryId)
      setRecord({
        ...fetchedRecord, categoryName: title, 
        color: fetchedRecord.type === 'outcome' ? 'red' : 'green'
      })
      setloader(false)
  }

  useEffect(() => {
   func()
  }, [id]);

  return (
    <div>
    {loader ? <Loader /> : 
      <div>
        <div className="breadcrumb-wrap">
          <a href="/history" className="breadcrumb">History</a>
          <a className="breadcrumb">
            {record.type}
      </a>
        </div>
        <div className="row">
          <div className="col s12 m6">
            <div className={`card ${record.color}`}>
              <div className="card-content white-text">
                <p>Description: {record.description}</p>
                <p>Amount: {record.amount}</p>
                <p>Category: {record.categoryName}</p>
                 <small>{setDateFilter(record.date)}</small> 
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
    
  )
}


const mapDispatchToProps = {
  getCategoryById, getRecordById 
}

export default connect(null, mapDispatchToProps)(Details)