import React,{useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { Usercontext } from '../../context/user.context';

const Login = () => {
  // console.log("Rendered")
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [showPassword,setShowPassword] = useState(false)
  const [passType,setPassType] = useState("password");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(Usercontext);
  const navigate = useNavigate(); // read about this

  //handle login form submit
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!validateEmail(user.email)){
      setError("Please enter a valid email address");
      setTimeout(() => setError(''),3000)
      return ;
    }

    if(!user.password){
      setError("Please enter the password")
      setTimeout(() => setError(''),3000)
      return ;
    }

    setError("");

    // Api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,user)
      // console.log(response.data);
      const {token,user:User} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(User);
        navigate("/dashboard");
      }
    } catch (error) {
      // console.log(error)
      // console.log(error.response);
      // console.log(error.response.data)
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
        setTimeout(() => setError(''),3000);
      }else {
        setError("Not able to login, Please try again")
        setTimeout(() =>setError(''),3000);
      }
    }
  }

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword);
    if(passType === 'password')
      setPassType('text')
    else if(passType === 'text')
      setPassType('password')
  }
  return (
    <AuthLayout >
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Fill your details to log in
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='text-[13px] text-slate-800'>Email Address</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>   
            <input
            type='text'
            // type = {type == 'password' ? showPassword ? 'text' : 'password' : type}
            className='w-full bg-transparent outline-none'
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            placeholder='user@example.com'
            />
            </div>
          </div> 
          <div>
            <label className='text-[13px] text-slate-800'>Password</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
            <input
            type={passType} 
            className='w-full bg-transparent outline-none'
            value = {user.password}
            onChange={(e)=> setUser({...user, password:e.target.value})}
            placeholder='Min 8 characters'
            />

                {showPassword ? (
                  <FaRegEye
                  size={22}
                  className="text-primary cursor-pointer" 
                  onClick = {() => toggleShowPassword()}
                  />
                ): (
                  <FaRegEyeSlash
                  size = {22}
                  className='text-slate-400 cursor-pointer'
                  onClick= {()=> toggleShowPassword()}
                   />
            )}
            </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='w-full text-sm font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600'>LOGIN</button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Don't have an account?{' '}
              <Link className='font-medium text-primary underline' to='/register'>
                Register
              </Link>
            </p>
            <p className='text-[13px] text-slate-800 mt-3'>
              Go Home{' '}
              <Link className='font-medium text-primary underline' to='/'>
                Home
              </Link>
            </p>
          </div>    
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login