import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { usePengumumanQuery } from "@api/domains/pengumuman";
import { useState } from 'react';
import moment from 'moment/moment';
import DetailInformasi from './DetailInformasi';

export default function AnnouncementWidget() {
  const { data: pengumuman } = usePengumumanQuery({
    page: 1,
    pageSize: 10,
    filtered: JSON.stringify([
      { id: "in$type", value: [1,2] },
    ])
  });

  const [toggle, setToggle] = useState({
    modal: false,
    modalData: {},
  });

  return (
    <Card>
      <CardHeader>Panel Informasi SIBARU</CardHeader>
      <CardBody>
        {pengumuman?.data?.length > 0 ? (
          pengumuman?.data?.map(peng => {
            let classD = '';
            let tipeD = '';

            if (peng.type === 1) {
              classD = 'alert-success';
              tipeD = 'Usulan';
            } else if (peng.type === 2) {
              classD = 'alert-primary';
              tipeD = 'Sistem';
            } else {
              classD = 'alert-info';
              tipeD = 'Lainnya';
            }

            return (
              <div
                // onClick={() =>
                //   setToggle({
                //     modal: true,
                //     modalData: peng,
                //   })
                // }
                className={'alert ' + classD}
                style={{ cursor: 'pointer' }}
                role="alert"
              >
                <span style={{ fontSize: 14, fontWeight: 'bold' }}>{tipeD + ' - '}</span>{' '}
                <span style={{ fontSize: 14 }}>{peng.title}</span>{' '}
                <span className={'float-right'} style={{ fontSize: 12 }}>
                  {moment(peng.createdAt).format('DD-MM-YYYY')}
                </span>
              </div>
            );
          })
        ) : (
          <div className={'alert alert-secondary p-2'} role="alert">
            <span style={{ fontSize: 14 }}>Tidak ada pengumuman</span>
          </div>
        )}
      </CardBody>

      <Modal
        isOpen={toggle.modal}
        toggle={() => {
          setToggle({
            ...toggle,
            modal: !toggle.modal,
          });
        }}
        size={'lg'}
      >
        <ModalHeader
          toggle={() => {
            setToggle({
              ...toggle,
              modal: !toggle.modal,
            });
          }}
          className="bg-darkblue"
        >
          {toggle.modalData.title ? toggle.modalData.title : 'Detail Pengumuman'}
        </ModalHeader>
        <ModalBody>
          <DetailInformasi toggle={toggle} />
        </ModalBody>
      </Modal>
    </Card>
  );
}
