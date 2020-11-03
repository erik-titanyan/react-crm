import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash'
import { connect } from 'react-redux';
import { Pie, PieChart, Legend, Cell, Tooltip } from 'recharts';
import Loader from '../components/app/Loader';
import HistoryTable from '../components/HistoryTable'
import { fetchCategories } from '../redux/category/categoryActions'
import { fetchRecords } from '../redux/record/recordActions'
import { useHistory } from 'react-router-dom';

const History = ({ categories, records, fetchCategories, fetchRecords }) => {

  const [loader, setloader] = useState(true);
  const [mappedRecords, setMappedRecords] = useState([]);
  const [chartData, setchartData] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({});
  const [paginateItems, setpaginateItems] = useState([]);
  const history = useHistory()
  

  useEffect(() => {
    !categories.length && fetchCategories()
    !records.length && fetchRecords()
  }, []);


  useEffect(() => {
    if(records.length && categories.length) {
      const recs =  records.map(r => {
        const categoryName = categories.find(c => r.categoryId === c.id).title
        const typeColor = r.type === 'outcome' ? 'red' : 'green'
        return {
          ...r, categoryName, typeColor
        } 
      })

      const pages = 0
      const page = history.location.search[history.location.search.length-1] || 0
     
      const allitems = _.chunk(recs, 5)
      const pageCount = _.size(allitems)

      setMappedRecords(allitems[0])

      setpaginateItems(allitems)

      setPaginationConfig(
       {
         page, pages, allitems, pageCount
       }
      )
      
      setchartData(categories.map(i => {
        return {
          "name": i.title,
          "value": records.reduce((t,r) => {
                      if (r.categoryId === i.id && r.type === 'outcome') {
                        t += +r.amount
                      }
                      return t
                    }, 0),
          "backgroundColor": '#' + (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
        }
      }))
      setloader(false)
    }
    
  }, [categories, records]);

 const paginationHandler = (e) => {
  history.push(`${history.location.pathname}?page=${e.selected}`)
  setMappedRecords(paginateItems[e.selected] || paginateItems[0])
 }

  return (
    <div>
      <div className="page-title">
        <h3>History of records</h3>
      </div>
      {loader ? <Loader /> : 
      <Fragment>
      <div className="history-chart">
        <PieChart width={600} height={300}>
          <Legend />
          <Pie data={chartData}  dataKey="value" cx={290} cy={120} outerRadius={120} fill="#8884d8">
            {chartData.map((ch, idx) => {
              return <Cell key={`cell-${idx}`} fill={ch.backgroundColor} />
            })}
          </Pie>
          <Tooltip/>
        </PieChart>
      </div>
      <HistoryTable records={mappedRecords} />
      <ReactPaginate
        activeClassName={'active'}
        initialPage={paginationConfig.page}
        pageRangeDisplayed={17}
        pageCount={paginationConfig.pageCount}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        containerClassName={'center pagination'}
        pageClassName={'waves-effect'}
        nextClassName={'waves-effect'}
        previousClassName={'waves-effect'}
        onPageChange={(e) => paginationHandler(e) }
      />
      </Fragment>
      }
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    records: state.record.records
  }
}

const mapDispatchToProps = {
  fetchCategories, fetchRecords
}

export default connect(mapStateToProps, mapDispatchToProps)(History)