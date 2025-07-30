import { Fragment } from "react"

export const CustomInputWrapper = ({ children, error }) => {
  return (
    <Fragment>
      <div style={{ marginBottom: 5 }}>{children}</div>
      <span className="text-danger" style={{ fontSize: 12 }}>
        {error?.message}
      </span>
    </Fragment>
  )
}
