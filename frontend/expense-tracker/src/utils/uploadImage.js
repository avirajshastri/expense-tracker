import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) =>{
    console.log(imageFile)
    const formData = new FormData();

    //appned image file to form data
    formData.append('image',imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                'Content-Type': 'multipart/form-data', //set header for file upload
            }
        })

        console.log("img hogyi upload")
        return response.data;
    } catch (error) {
        console.error("Error uploading the image",error);
        throw error;
    }
} 

export default uploadImage;