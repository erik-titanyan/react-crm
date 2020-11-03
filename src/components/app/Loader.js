import React from 'react';

const Loader = () => {
	
		const spinnerColor = ['red', 'blue', 'green'].filter((i, idx) => idx === Math.floor(Math.random() * 3))

    return (
			<div className='app-loader'>
       <div className="preloader-wrapper active center-align">
				<div className={`spinner-layer spinner-${spinnerColor}-only`}>
					<div className="circle-clipper left">
						<div className="circle" />
					</div><div className="gap-patch">
						<div className="circle" />
					</div><div className="circle-clipper right">
						<div className="circle" />
					</div>
				</div>
			</div>
</div>
    )
}

export default Loader