import { useState, useRef } from "react"
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop"

import Button from "../../components/button"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import useTheme from "../../hooks/useTheme"

const MIN_DIMENSION = 150
const ASPECT_RATIO = 1

library.add(faUpload)

const UploadImage = ({ image, setImage, croppedImage, setCroppedImage }) => {
  const { darkMode } = useTheme()

  const imgRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState("")
  const imagePicker = useRef(null)

  const [crop, setCrop] = useState()

  const onChangeImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    if (file.size > 10485760) setError("Image size is too big.")
    else {
      reader.onloadend = () => {
        const imageElement = new Image()
        const imageUrl = reader.result?.toString() || ""
        imageElement.src = imageUrl
        // The result includes the Base64 Data URL
        imageElement.addEventListener("load", (e) => {
          if (error) setError("")
          const { naturalHeight, naturalWidth } = event.currentTarget
          if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
            setError("Image must be at least 150x150 pixels")
            return setImage("")
          }
        })
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleOnSelect = () => {
    imagePicker.current.click()
  }
  const resetImage = () => {
    setError("")
    setImage("")
    setCroppedImage("")
  }

  const onLoadImage = (e) => {
    const { width, height, naturalHeight, naturalWidth } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
      setError("Image must be at least 150x150 pixels")
      setImage("")
      return
    }
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    )
    setCrop(centerCrop(crop, width, height))
  }
  const getCroppedImg = (
    image, // HTMLImageElement
    canvas, // HTMLCanvasElement
    crop // PixelCrop
  ) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("No 2d context")
    }

    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = "high"
    ctx.save()

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    ctx.translate(-cropX, -cropY)
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    )

    ctx.restore()
  }

  return (
    <>
      <div
        className={`${image ? "hidden" : ""} w-[300px] mt-5 cursor-pointer h-[200px] border-dashed hover:border-yellow-500 hover:dark:border-white transition-all ease-in-out border-blue-500 dark:border-neutral-700 border-2 rounded-md p- flex flex-col gap-2 justify-center tems-center`}
        onClick={handleOnSelect}
      >
        <FontAwesomeIcon
          icon="upload"
          size="2xl"
          color={`${darkMode ? "gray" : "black"}`}
        />
      </div>

      <input
        ref={imagePicker}
        id="avatar"
        type="file"
        accept=".png,.jpeg, .heif"
        onChange={onChangeImage}
        className="hidden"
      />

      {error && <p className="text-red-500 font-bold">{error}</p>}
      {image && (
        <>
          <div className="flex flex-col gap-3 items-center justify-center">
            {image && (
              <>
                <div className="flex gap-3 flex-col justify-center items-center">
                  {!croppedImage ? (
                    <div>
                      <ReactCrop
                        crop={crop}
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                        onChange={(percent, pixels) => setCrop(percent)}
                      >
                        <img
                          onLoad={onLoadImage}
                          ref={imgRef}
                          width={250}
                          height={150}
                          src={image}
                          alt="Upload Image"
                        />
                      </ReactCrop>

                      <div className="flex gap-3 justify-center">
                        {/* Crop feature */}

                        <Button
                          text={"Сrop"}
                          onClick={() => {
                            getCroppedImg(
                              imgRef.current,
                              canvasRef.current,
                              convertToPixelCrop(
                                crop,
                                imgRef.current.width,
                                imgRef.current.height
                              )
                            )
                            const dataURL = canvasRef.current.toDataURL()
                            setCroppedImage(dataURL)
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <p className="dark:text-white font-bold">
                        Image Preview:
                      </p>
                      <img width={150} height={150} src={croppedImage} alt="" />
                    </div>
                  )}
                  <Button text={"Reset"} onClick={resetImage} />
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default UploadImage
