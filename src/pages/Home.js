import React, { useEffect, useState } from 'react'
import HomeBill from '../components/HomeBill'
import CurrencyBill from '../components/CurrencyBill'
import Loader from '../components/app/Loader'
import { connect } from 'react-redux'
import { fetchCurrency } from '../redux/info/infoActions'

const Home = ({ loading, info, fetchCurrency }) => {
  
 
  
  useEffect(() => {
     fetchCurrency()
  }, []);  

    return (
        <div className="home">
          <div>
      			<div className="page-title">
        		<h3>Bill</h3>
						<button className="btn waves-effect waves-light btn-small">
          	<i className="material-icons">refresh</i>
        		</button>
      		</div>

          { loading ? <Loader/> : <div className='row'>
                              
                                  <HomeBill rates={info.currency.rates} bill={info.user.bill}/>  

                                  <CurrencyBill rates={info.currency.rates} date={info.currency.date} />
                                </div> 
                            }
          
      </div>
    
  </div>
    )
}

const mapStateToProps = (state) => {
  return {
    loading: state.info.loading,
    info: state.info
  }
}

const mapDispatchToProps = {
  fetchCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)