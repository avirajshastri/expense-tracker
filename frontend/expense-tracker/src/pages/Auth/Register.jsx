import React,{useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { Usercontext } from '../../context/user.context';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';

const Register = () => {
  const [user, setUser] = useState({
    fullName:"",
    email:"",
    profilePic: null,
    password: "",
  })

  const [error,setError]= useState(null)
  const navigate = useNavigate()
  const [showPassword,setShowPassword] = useState(false)
  const [passType,setPassType] = useState("password");
  const {updateUser} = useContext(Usercontext)

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword);
    if(passType === 'password')
      setPassType('text')
    else if(passType === 'text')
      setPassType('password')
  }
  //handle signup
  const handleSignUp = async (e) =>{
    e.preventDefault();

    let profileImageUrl = "";

    if(!user.fullName)
    {
       setError("Please enter your name");
       setTimeout(()=> setError(null),3000)
       return 
    }

    if(!validateEmail(user.email))
    {
       setError("Please enter a valid email address")
       setTimeout(()=> setError(null),3000)
       return 
    }

    if(!user.password){
      setError("Please enter the password");
      setTimeout(()=> setError(null),3000)
      return
    }

    setError(null)

    //sign up API call
    try {

      // upload image if given
      if(user.profilePic){
        // console.log(user.profilePic);
        const imgUploadRes = await uploadImage(user.profilePic);
        user.profilePic = imgUploadRes.imageUrl || "";
      }

      console.log(user);
      const response= await axiosInstance.post(API_PATHS.AUTH.REGISTER,user);
      console.log(response.data);
      const {token, newUser:User} = response.data;

      if(token)
      {
          localStorage.setItem("token",token);
          updateUser(User);
          navigate("/dashboard");
      }

    } catch (error) {
      if(error.response && error.response.data.message)
      {
        setError(error.response.data.message);
        setTimeout(()=> setError(''),3000);
      }
      else
      {
        setError("Not able to register, Please try again")
      }
    }

  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h2 className='text-xl font-semibold text-black'>Create an Account</h2>
        <p className='text-xs text-slate-700 mt-[5px]  mb-6'>
          Join us today by filling your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={user.profilePic} setUser={setUser} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-[13px] text-slate-800'>Full Name</label>
              <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
                <input 
                className='w-full bg-transparent outline-none'
                value={user.fullName}
                onChange={(e) => setUser({...user,fullName:e.target.value})}
                placeholder='Alex'
                type='text'
                ></input>
              </div>
            </div>
            <div>
              <label className='text-[13px] text-slate-800'>Email Address</label>
              <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>   
              <input
              type='text'
              // type = {type == 'password' ? showPassword ? 'text' : 'password' : type}
              className='w-full bg-transparent outline-none'
              value={user.email}
              onChange={(e) => setUser({...user,email:e.target.value})}
              placeholder='alex@example.com'
              />
              </div>
          </div> 
          <div className='col-span-2'>
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
  
              <button type='submit' className='w-full text-sm font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600'>SIGN UP</button>
  
              <p className='text-[13px] text-slate-800 mt-3'>
                Already have an account?{' '}
                <Link className='font-medium text-primary underline' to='/login'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register