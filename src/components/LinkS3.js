import axios from "axios"
import { useState, useEffect } from "react"
import { ASSET_URL } from "@constants/app"

export default function LinkS3(props) {
  const { href, model, children } = props
  const [loading, setLoading] = useState(false)
  const [newHref, setNewHref] = useState("javascript:")

  useEffect(() => {
    if (href) {
      if (href.substr(0, 4) === "http") {
        if (href.indexOf("amazonaws.com") === -1) {
          setLoading(true)
          axios
            .get(href + "/s3url")
            .then((response) => {
              if (response?.data?.s3url) {
                setNewHref(response.data.s3url)
              }
            })
            .finally(() => setLoading(false))
        }
        else {
          setNewHref(href)
        }
      } else {
        let address = ASSET_URL
        if (model === "Vermin" || model === "Vertek") {
          address = ASSET_URL + "/public/files"
        }
        setNewHref(address + "/" + href)
      }
    }
  }, [href])

  const newProps = { ...props }

  delete newProps.model
  delete newProps.children

  return (
    <a {...newProps} href={newHref} target="_blank">
      {loading ? "..." : children}
    </a>
  )
}
