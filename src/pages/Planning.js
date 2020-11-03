import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCurrencyFilter } from '../hooks/setCurrencyFilter.hook';
import { fetchCategories } from '../redux/category/categoryActions';
import { fetchRecords } from '../redux/record/recordActions';
import Loader from '../components/app/Loader'
import { useTooltip } from '../hooks/useTooltip.hook';



const Planning = ({bill, categories, records, fetchCategories, fetchRecords}) => {

  const [loader, setloader] = useState(true);
  const [mappedcategories, setmappedcategories] = useState([]);
  const {bind} = useTooltip()

  useEffect(() => {
    if(!categories.length){
       fetchCategories()
    }
    fetchRecords() 
  }, []);

  useEffect(() => {
    if(categories.length && records.length) {
      const a = categories.map(c => {
        const spend = records
                        .filter(r => r.categoryId === c.id)
                        .filter(r => r.type === 'outcome')
                        .reduce((t, r) => t += +r.amount, 0)
        const percent = 100 * spend / c.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60  ? 'green' :
                              percent < 100 ? 'yellow' :
                                              'red'
        const tooltipHTML = (c.limit - spend) > 0 ? c.limit - spend : Math.abs(c.limit - spend)
        return {
          spend, progressPercent, progressColor,
          tooltipHTML, ...c
        }                     
    })
    
      setmappedcategories(a)
      setloader(false)
     
    }
  }, [categories, records]);

  


  return (
    <div>
      <div className="page-title">
        <h3>Planning</h3>
        <h4>{setCurrencyFilter(bill)}</h4>
      </div>
      {loader ? <Loader /> : 
        <section>
        {mappedcategories.map(cat => {
          return <div key={cat.id}>
                  <p>
                    <strong>{cat.title}:</strong>
                    {cat.spend} from {cat.limit}
                  </p>
                  <div className="progress" ref={(el) =>{ 
                    bind(el,cat.tooltipHTML)
                    }} >
                    <div
                        className={`determinate ${cat.progressColor}`}
                        style={{width: cat.progressPercent + '%'}}
                        
                        
                    >
                      
                    </div>
                  </div>
                </div>
        } )}
        
      </section>
      }
      
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    records: state.record.records,
    categories: state.category.categories,
    bill: state.info.user.bill,
  }
}

const mapDispatchToProps = {
  fetchCategories, fetchRecords
}


export default connect(mapStateToProps, mapDispatchToProps)(Planning)