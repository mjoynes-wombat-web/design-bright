import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = dotenv.config().parsed;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadImage = (image, options, success, error) => {
  cloudinary.uploader.upload_stream(
    response => (
      ('error' in response)
        ? error(response.error)
        : success(response)
    ),
    {
      crop: 'fill',
      ...options,
    },
  ).end(image.buffer);
};

export default uploadImage;
