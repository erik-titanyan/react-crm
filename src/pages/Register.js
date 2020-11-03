import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { useValidationConfig } from '../hooks/useValidationConfig.hook'
import { connect } from 'react-redux'
import { signUp } from '../redux/auth/authActions'


const Register = ({ signUp }) => {
		const {register, handleSubmit,  errors} = useForm()
		const history = useHistory()
		const config = useValidationConfig()

    const submitHandler = async ({email, password, name}) => {
			
        try {
			debugger
			await signUp({email, password, name})
            history.push('/')
        } catch (e) {} 
}

    return (
        <form className='card auth-card' onSubmit={handleSubmit(submitHandler)}>
        <div className='card-content'>
            <span className="card-title">Home bookkeeping</span>
            <div className='input-field'>
                <input id="name" type="text" 
                name='name'
                ref={register({required: config.name.ifEmpty })}
                />
                <label htmlFor="name">Name</label>
                {errors.name && <small className="helper-text invalid">
								{errors.name.message}
								</small>}
            </div>
            <div className='input-field'>
                    <input id="email" type="text" 
                    name='email' 
                    ref={register({ required: config.email.ifEmpty, 
                                     pattern: {value:config.email.regExp, 
                                               message: config.email.ifInvalid}})}
                                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && <small className="helper-text invalid">
										{errors.email.message}
										</small>}
                </div>
                <div className='input-field'>
                    <input id="password" type="password" name='password' 
										ref={register({
											required: config.password.ifEmpty,
											minLength: {
											value: config.password.valueOfMinLength,
											message: config.password.ifInvalid() 
										}})}/>
                    <label htmlFor="password">Password</label>
										{errors.password && <small className="helper-text invalid">
										{errors.password.message}
										</small>}
                </div>
            <div>
			<p>
				<label>
					<input type="checkbox" 
					name='checkbox'
					ref={register({required: config.checkbox.ifFalse})}
					/>
					<span>I agree!</span>
				</label>
				</p>
				{errors.checkbox && <small className="helper-text invalid">
				{errors.checkbox.message}
				</small>}
			</div>
        </div>
        <div className="card-action">
            <div>
            <button
                className="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Sign up!
                <i className="material-icons right">send</i>
            </button>
            </div>
            
            <p className="center">
            Already have account?
            <Link to='/login'>Log in</Link>
            </p>
        </div>
        
    </form>
    )
}

const mapDispatchToProps = {
	signUp
}

export default connect(null, mapDispatchToProps)(Register)