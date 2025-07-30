import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import classnames from "classnames"
import { Search } from "react-feather"
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
      name: "",
      DirektoratId: "",
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
      filtered,
      page: 1,
    })
  }

  const optionsDirektorat = [
    { label: "Rumah Susun", value: 1 },
    { label: "Rumah Khusus", value: 2 },
    { label: "Rumah Swadaya", value: 3 },
    { label: "Rumah Umum dan Komersial", value: 4 },
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
                    <Label className="form-label" for="name">
                      Nama Kategori
                    </Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="name"
                          {...field}
                          placeholder="Masukan nama kategori..."
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
                    <Label className="form-label" for="DirektoratId">
                      Direktorat
                    </Label>
                    <Controller
                      name="DirektoratId"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          id="DirektoratId"
                          name="DirektoratId"
                          placeholder="Pilih direktorat..."
                          className={classnames("react-select")}
                          classNamePrefix="select"
                          menuPlacement="auto"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          isDisabled={loading}
                          options={optionsDirektorat}
                          value={
                            optionsDirektorat.find((c) => c.value === value) ||
                            ""
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
