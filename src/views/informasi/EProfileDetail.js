import React, { Fragment, useState, useEffect } from 'react';
import { Row, Card, CardHeader, CardBody, Col, Table } from 'reactstrap';

const EProfileDetail = props => {
  let { modalData, modalType } = props.toggle;
  const [data, setData] = useState([]);
  const [dataX, setDataX] = useState([]);

  useEffect(() => {
    setData(modalData.meong.kabupaten);

    let zxc = modalData.meong.kabupaten.map((kab, index) => {
      let meong = [];

      if (modalType === 'demand') {
        meong.push(
          <tr key={index}>
            <td>{kab.kabupaten_name}</td>
            <td className={'text-right'}>
              {Number(kab.meong.backlog.kepemilikan).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.backlog.penghunian).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.rtlh).toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </td>
            <td className={'text-right'}>0</td>
            <td className={'text-right'}>
              {Number(kab.meong.hunian.unit).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.hunian.persen).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
          </tr>,
        );
      } else if (modalType === 'supply') {
        meong.push(
          <tr key={index}>
            <td>{kab.kabupaten_name}</td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbn.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbn.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbn.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbn.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdprov.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdprov.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdprov.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdprov.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdkab.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdkab.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdkab.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdkab.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdes.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdes.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdes.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.apbdes.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dak.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dak.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dak.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dak.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dau.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dau.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dau.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.dau.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.otonomi_khusus.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.otonomi_khusus.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.otonomi_khusus.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.otonomi_khusus.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.yayasan.pk.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.yayasan.pk.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.yayasan.pb.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.yayasan.pb.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.kegiatan_lainnya.volume).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pemerintah.kegiatan_lainnya.biaya).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>

            <td className={'text-right'}>
              {Number(kab.meong.imb.perumahan.mbr).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.imb.perumahan.non_mbr).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.imb.perorangan.mbr).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.imb.perorangan.non_mbr).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>

            <td className={'text-right'}>
              {Number(kab.meong.pengembang.rumah_umum.realisasi).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pengembang.rumah_umum.harga).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pengembang.rumah_komersial.realisasi).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.pengembang.rumah_komersial.harga).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>

            <td className={'text-right'}>
              {Number(kab.meong.perbankan.rumah_umum.realisasi).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.perbankan.rumah_umum.harga).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.perbankan.rumah_komersial.realisasi).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
            <td className={'text-right'}>
              {Number(kab.meong.perbankan.rumah_komersial.harga).toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </td>
          </tr>,
        );
      }

      return meong;
    });

    setDataX(zxc);
  }, []);

  return (
    <Fragment>
      {modalType === 'demand' && (
        <Fragment>
          {data && (
            <Row>
              <Col md="12">
                <Table bordered>
                  <thead>
                    <tr>
                      <th rowSpan="2">Kabupaten</th>
                      <th colSpan="2">Backlog</th>
                      <th colSpan="2">RTLH</th>
                      <th colSpan="2">Hunian</th>
                    </tr>
                    <tr>
                      <th>Kepemilikan</th>
                      <th>Penghunian</th>
                      <th>Pemda</th>
                      <th>e-Rtlh</th>
                      <th>Unit</th>
                      <th>Persen</th>
                    </tr>
                  </thead>
                  <tbody>{dataX}</tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Fragment>
      )}
      {modalType === 'supply' && (
        <Row>
          <Col md="12" style={{ overflowX: 'auto' }}>
            {data && (
              <Row>
                <Col md="12">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th rowSpan="4">Kabupaten</th>
                        <th colSpan="34">Pemerintah</th>
                        <th colSpan="4">IMB</th>
                        <th colSpan="4">Pengembang</th>
                        <th colSpan="4">Perbankan</th>
                      </tr>
                      <tr>
                        <th colSpan="4">APBN</th>
                        <th colSpan="4">APBD Prov</th>
                        <th colSpan="4">APBD Kab</th>
                        <th colSpan="4">APBD Des</th>
                        <th colSpan="4">DAK</th>
                        <th colSpan="4">DAU</th>
                        <th colSpan="4">Otonomi Khusus</th>
                        <th colSpan="4">Yayasan / CSR</th>
                        <th rowSpan="2" colSpan="2">
                          Kegiatan Lainnya
                        </th>
                        <th rowSpan="2" colSpan="2">
                          Perumahan
                        </th>
                        <th rowSpan="2" colSpan="2">
                          Perorangan
                        </th>

                        <th rowSpan="2" colSpan="2">
                          Umum
                        </th>

                        <th rowSpan="2" colSpan="2">
                          Komersial
                        </th>

                        <th rowSpan="2" colSpan="2">
                          Umum
                        </th>

                        <th rowSpan="2" colSpan="2">
                          Komersial
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>

                        <th colSpan="2">PK</th>
                        <th colSpan="2">PB</th>
                      </tr>
                      <tr>
                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>
                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>Volume</th>
                        <th>Biaya</th>

                        <th>MBR</th>
                        <th>Non MBR</th>

                        <th>MBR</th>
                        <th>Non MBR</th>

                        <th>Realisasi</th>
                        <th>Harga</th>

                        <th>Realisasi</th>
                        <th>Harga</th>

                        <th>Realisasi</th>
                        <th>Harga</th>

                        <th>Realisasi</th>
                        <th>Harga</th>
                      </tr>
                    </thead>
                    <tbody>{dataX}</tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default EProfileDetail;
