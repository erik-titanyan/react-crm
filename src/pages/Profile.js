import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useValidationConfig } from '../hooks/useValidationConfig.hook'
import { updateInfo } from '../redux/info/infoActions'

const Profile = ({ updateInfo }) => {

	const {errors, register, handleSubmit} = useForm()
	const {name} = useValidationConfig()

	const profileNameSubmit = ({profileName}) => {
		updateInfo({name: profileName})
	}

	return (
		<div>
			<div className='page-title'>
				<h3>Profile</h3>
			</div>
			<form className="form" onSubmit={handleSubmit(profileNameSubmit)}>
				<div className="input-field">
					<input
						id="description"
						type="text"
						name='profileName'
						ref={register({required: name.ifEmpty})}
					/>
					<label htmlFor="description">Name</label>
					{errors.profileName && <span className="helper-text invalid">{errors.profileName.message}</span>}
				</div>
				<button className="btn waves-effect waves-light" type="submit">
					Update
      <i className="material-icons right">send</i>
				</button>
			</form>
		</div>

	)
}

const mapDispatchToProps = {
	updateInfo
}

export default connect(null, mapDispatchToProps)(Profile)