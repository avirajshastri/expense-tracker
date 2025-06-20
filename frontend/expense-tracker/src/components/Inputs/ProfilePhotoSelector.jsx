import React, {useState, useRef } from 'react'
import {LuUser,LuUpload,LuTrash} from 'react-icons/lu'

const ProfilePhotoSelector = ({image,setUser}) => {
    const inputRef = useRef(null);
    const [previewUrl,setPreviewUrl]= useState(null);

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            //update the image state
            setUser(prev => ({...prev,profilePic:file}))

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = ()=>{
        setUser(prev =>({...prev, profilePic:null}));
        setPreviewUrl(null);
    }

    const onChooseFile = ()=>{
        inputRef.current.click();
    }
  return (
    <div className='flex justify-center mb-6'>
        <input type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />

        {!image ? (
            <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                <LuUser className='text-4xl text-primary' />
                <button type='button'
                className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                onClick={onChooseFile}
                >
                    <LuUpload />
                </button>
            </div>
        ): (
            <div className='relative'>
                <img className='w-20 h-20 rounded-full object-cover'
                src={previewUrl}
                alt='profile photo'></img>
                <button 
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                onClick={handleRemoveImage}>
                    <LuTrash />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector