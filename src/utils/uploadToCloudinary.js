const cloudinary = require("./cloudinary");

async function uploadToCloudinary(buffer, folder) {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder },
        (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}

module.exports = uploadToCloudinary;
