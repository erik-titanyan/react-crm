import React from 'react'
import useRoutes from '../routes'


const EmptyLayout = () => {
    const routes = useRoutes()
    return (
    <div>
		<div className="grey darken-1 empty-layout">
			{routes}
		</div>
	</div>
    )}

export default EmptyLayout