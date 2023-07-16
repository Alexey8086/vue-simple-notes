// определяет формат изображения (jpeg или png)
const getImageFormat = (imageBuffer) => {
    const uint = new Uint8Array(imageBuffer)
    if (uint.length >= 2 && uint[0] === 0xFF && uint[1] === 0xD8) {
      return 'jpeg'
    } else if (
      uint.length >= 8 &&
      uint[0] === 0x89 &&
      uint[1] === 0x50 &&
      uint[2] === 0x4E &&
      uint[3] === 0x47 &&
      uint[4] === 0x0D &&
      uint[5] === 0x0A &&
      uint[6] === 0x1A &&
      uint[7] === 0x0A
    ) {
      return 'png'
    }
    return 'jpeg'
}


export async function retrieveImage (imageBuffer) {
    try {
        let result = {}

      if (imageBuffer.length) {
        const imageFormat = getImageFormat(imageBuffer)
        const base64Image = btoa(
          new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )

        result.imageUrl = `data:image/${imageFormat};base64,${base64Image}`
        result.altText = `Uploaded ${imageFormat.toUpperCase()} Image`
      }

      return result
    } catch (e) {
      console.error('Error retrieving image:', e)
    }
  }