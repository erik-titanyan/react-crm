import React from 'react';
import { useHistory } from 'react-router-dom';
import {setDateFilter} from '../hooks/setDateFilter.hook'

const HistoryTable = ({ records }) => {

  const history = useHistory()

  return (
    <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Sum</th>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
           {records.map((r,idx) => {
             return <tr key={r.id}>
                      <td>{++idx}</td>
                      <td>{r.amount}</td>
                      <td>{setDateFilter(r.date)}</td>
                      <td>{r.categoryName}</td>
                      <td>
                        <span className={`white-text badge ${r.typeColor}`}>{r.type}</span>
                      </td>
                      <td>
                        <button className="btn-small btn" onClick={() => history.push(`/details/${r.id}`)}>
                          <i className="material-icons">open_in_new</i>
                        </button>
                      </td>
                    </tr> 
           })}
            
          </tbody>
        </table>
      </section>
  )
}

export default HistoryTable