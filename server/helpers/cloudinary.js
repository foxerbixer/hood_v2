import cheerio from 'cheerio'
import cloudinary from 'cloudinary'

export const fetchPictureToCloudinary = async(picture, cnf) => {

  cloudinary.config({
    cloud_name: cnf.name,
    api_key: cnf.key,
    api_secret: cnf.secret
  })

  if (picture.length !== 0) {
    const result = cloudinary.image(picture, {type: 'fetch'})
    const $ = cheerio.load(result)
    const cloud_link = $(result).attr().src
    return cloud_link
  }
}