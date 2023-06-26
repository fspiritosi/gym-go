const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function sendFile() {
  const imagePath = process.argv[2];

  if (!imagePath) {
    console.log(`Please provider image path ${imagePath}`);
    process.exit(1);
  }

  const options = {
    resource_type: "auto",
    unique_filename: false,
    folder: "Gym-Go",
  };

  try {
    const res = await cloudinary.uploader.upload(imagePath, options);
    console.log("Sucesfull", res);
    return res;
  } catch (error) {
    console.log(`Error send imagePath ${error.message}`);
  }
}

module.exports = { cloudinary, sendFile };
