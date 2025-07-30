import axios from "axios"
import { useState, useEffect } from "react"
import { Spinner } from "reactstrap"
import { ASSET_URL } from "@constants/app"

export default function ImageS3(props) {
  const { src, base64 } = props
  const [loading, setLoading] = useState(false)
  const [newSrc, setNewSrc] = useState()

  useEffect(() => {
    if (src) {
      const s3url = src.substr(0, 4) === "http" ? src : ASSET_URL + "/" + src

      if (base64) {
        setLoading(true)

        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = s3url

        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height

          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0)
          const urlData = canvas.toDataURL()

          setNewSrc(urlData)
          setLoading(false)
        }
      } else {
        if (src.substr(0, 4) === "http") {
          if (src.indexOf("amazonaws.com") === -1) {            
            setLoading(true)
            axios
              .get(src + "/s3url")
              .then((response) => {
                if (response?.data?.s3url) {
                  setNewSrc(response.data.s3url)
                }
              })
              .finally(() => setLoading(false))
          }
          else {
            setNewSrc(s3url)
          }
        }
        else {
          setNewSrc(s3url)
        }
      }
    }
  }, [src])

  return (
    <>
      {loading && <Spinner />}
      <img {...props} src={newSrc} />
    </>
  )
}
