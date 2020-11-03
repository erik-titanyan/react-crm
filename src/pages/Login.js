import React from 'react' 
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useForm }  from 'react-hook-form'
import { signIn } from '../redux/auth/authActions'
import { connect } from 'react-redux';
import { useValidationConfig } from '../hooks/useValidationConfig.hook'


const Login = ({ signIn }) => {
  const {register, handleSubmit, errors} = useForm()
  const history = useHistory()
  const config = useValidationConfig()

  const submitHandler = async ({email, password}) => {
            try {
                await signIn({email, password})
                history.push('/')
            } catch (e) {} 
            
  }

    return (
        <form className='card auth-card' onSubmit={handleSubmit(submitHandler)}>
            <div className='card-content'>
                <span className="card-title">Home bookkeeping</span>
                <div className='input-field'>
                    <input id="email" type="text" 
                    name='email' 
                    ref={register({ required: config.email.ifEmpty, 
                                     pattern: {value: config.email.regExp, 
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
            </div>
            <div className="card-action">
                <div>
                <button
                    className="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    Log in
                    <i className="material-icons right">send</i>
                </button>
                </div>
                
                <p className="center">
                Don't have account yet?
                <Link to='/register'>Register</Link>
                </p>
            </div>
            
        </form>
    )
}

const mapDispatchToProps = {
    signIn
}

export default connect(null, mapDispatchToProps)(Login)