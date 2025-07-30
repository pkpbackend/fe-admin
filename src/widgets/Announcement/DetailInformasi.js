import React, { Fragment, useState } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

const DetailInformasi = props => {
  const { toggle } = props;
  let { modalData: pengumuman } = toggle;

  const [open, setOpen] = useState(null);

  return (
    <Fragment>
      {pengumuman && (
        <div>
          <Row>
            <Col md={12}>{pengumuman.description}</Col>
          </Row>
          <br></br>
          <Row>
            <Col md={12}>
              {pengumuman?.attachments.map(attach => {
                return (
                  <div
                    onClick={() => setOpen(attach)}
                    className={'alert alert-secondary'}
                    style={{ cursor: 'pointer' }}
                    role="alert"
                  >
                    <span>{attach.originalname}</span>
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
      )}
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(null);
        }}
        size={'lg'}
      >
        <ModalHeader
          toggle={() => {
            setOpen(null);
          }}
          className="bg-darkblue"
        >
          {open?.originalname}
        </ModalHeader>
        <ModalBody>
          <iframe src={`${open?.s3url}`} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default DetailInformasi;
