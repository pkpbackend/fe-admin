import axios from "axios"
import { useState, useEffect } from "react"
import { Spinner } from "reactstrap"
import { ASSET_URL } from "@constants/app"

export default function VideoS3(props) {
  const { src, width } = props
  const [loading, setLoading] = useState(false)
  const [newSrc, setNewSrc] = useState()

  useEffect(() => {
    if (src) {
      if (src.substr(0, 4) === "http") {
        setLoading(true)
        axios
          .get(src + "/s3url")
          .then((response) => {
            if (response?.data?.s3url) {
              setNewSrc(response.data.s3url)
            }
          })
          .finally(() => setLoading(false))
      } else {
        setNewSrc(ASSET_URL + "/" + src)
      }
    }
  }, [src])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <video width={width} controls preload="auto">
          {newSrc && <source src={newSrc} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      )}
    </>
  )
}
