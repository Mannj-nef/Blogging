import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { ENV } from '~/shared/constants'

const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [imageURL, setImageUrl] = useState('')

  const handleUploadImage = async ({
    event,
    file
  }: {
    event: ChangeEvent<HTMLInputElement>
    file?: File
  }) => {
    const files = event.target.files

    const bodyFormData = new FormData()
    bodyFormData.append('image', file ? file : (files as FileList)[0])

    try {
      setIsLoading(true)
      const { data: response } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_BASE_URL}`,
        bodyFormData
      )
      const imageData = response.data

      setImageUrl(imageData.url)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { imageURL, handleUploadImage, setImageUrl, isLoading }
}

export default useUploadImage
