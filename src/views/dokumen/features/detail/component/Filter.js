import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Search } from "react-feather"
import Select from "react-select"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap"
import classnames from "classnames"

const Filter = ({ handleTableAttrChange, loading }) => {

  const [open, setOpen] = useState("")
  const toggle = (id) => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: "",
      nama: "",
      model: "",
    },
  })

  const onSubmit = (data) => {
    const filtered = []

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        filtered.push({
          id: key,
          value: data?.[key],
        })
      }
    }
    
    handleTableAttrChange({
      filtered: filtered.length ? filtered : [],
      page: 1,
    })
  }

  const optionsModel = [
    { label: "Vermin", value: "Vermin" },
    { label: "SerahTerima", value: "SerahTerima" },
  ]

  return (
    <Accordion className="mb-2" open={open} toggle={toggle}>
      <AccordionItem className="shadow">
        <AccordionHeader targetId="1">Filter</AccordionHeader>
        <AccordionBody accordionId="1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col sm={6}>
                <Row className="mb-3">
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="nama">
                      Nama Dokumen
                    </Label>
                    <Controller
                      name="nama"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="nama"
                          {...field}
                          placeholder="Masukan nama dokumen..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="model">
                      Model
                    </Label>
                    <Controller
                      name="model"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          id="model"
                          name="model"
                          placeholder="Pilih model..."
                          className={classnames("react-select")}
                          classNamePrefix="select"
                          menuPlacement="auto"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          isDisabled={loading}
                          options={optionsModel}
                          value={
                            optionsModel.find((c) => c.value === value) || ""
                          }
                          onChange={(val) => {
                            console.log(val)
                            onChange(val.value)
                          }}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="filter-actions">
              <Button
                color="secondary"
                outline
                onClick={() => {
                  reset()
                  handleTableAttrChange({
                    page: 1,
                    filtered: [],
                  })
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari Dokumen
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  )
}

export default Filter
