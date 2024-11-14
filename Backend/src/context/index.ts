import cloudinary from '../../cloudinaryConfig';
import { ImageTracking } from '../../types';


const imageTracking: ImageTracking = {}

interface addImageProps {
    email: string,
    publicId: string,
    url: string,
}

export const addImageToTracking  = ({email, publicId, url}: addImageProps) => {
    imageTracking[email] = {
        url,
        publicId,
        uploadedAt: Date.now(),
    };
    startTimeOut(email);
}


const startTimeOut = (email: string) => {
    setTimeout(async () =>{
        if(imageTracking[email] && imageTracking[email].publicId) {
            const timeDiff = Date.now() - imageTracking[email].uploadedAt;
            if(timeDiff > 1800000){
                try{
                    await cloudinary.uploader.destroy(imageTracking[email].publicId);
                    delete imageTracking[email];
                }catch(err) {
                    console.log(err);
                }
            }
        }
    }, 1800000);
}


export const getImageTracking = () => imageTracking;
