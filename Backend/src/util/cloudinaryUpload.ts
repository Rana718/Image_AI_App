import cloudinary from '../../cloudinaryConfig';
import { Buffer } from 'buffer';
import { UploadApiResponse } from 'cloudinary';


/**
 * Uploads an image to Cloudinary.
 * @param imageData - The image data buffer.
 * @returns The Cloudinary upload response object.
 */
export async function uploadToCloudinary(imageData: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result!);
            }
        );
        uploadStream.end(imageData);
    });
}
