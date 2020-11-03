import React, { useEffect, useState } from 'react';
import CategoryCreate from '../components/CategoryCreate';
import CategoryEdit from '../components/CategoryEdit';
import { fetchCategories, resetCategories } from '../redux/category/categoryActions'
import { connect } from 'react-redux';
import Loader from '../components/app/Loader'

const Categories = ({ resetCategories, categories, fetchCategories }) => {

	const [loader, setloader] = useState(true);
	useEffect(() => {
		if(!categories.length) {
			fetchCategories()
		}
		setloader(false)
		//return () => resetCategories()
	}, []);
	
    return (
        <div>
          <div className="page-title">
            <h3>Categories</h3>
          </div>
					<section>

						{loader ? <Loader/> : 
													<div className="row">
													
													<CategoryCreate />
														
													<CategoryEdit />	
													</div>
						}
						
						</section>
				</div>

      )
}

const mapStateToProps = (state) => {
	return {
		categories: state.category.categories,
	}
}

const mapDispatchToProps = {
	fetchCategories, resetCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)