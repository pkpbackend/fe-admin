import React, { Fragment } from "react";
import { Alert, Table } from "reactstrap";
import "./table.scss";

const TableRusun = ({ data = [] }) => {
  return data && data.length > 0 ? (
    <Table responsive hover size="sm" striped id="table-rusun">
      {data.map((key, i) => {
        return (
          <Fragment key={i}>
            <tbody>
              <tr>
                <th colSpan="9">
                  Kabupaten : {key.nama} (Total Unit: {key.totalUnit})
                </th>
              </tr>
              <tr>
                <th>No Usulan</th>
                <th>Instansi/Lemabaga Pengusul</th>
                <th>Kabupaten Kota</th>
                <th>Kecamatan</th>
                <th>Desa</th>
                <th>Lat</th>
                <th>Long</th>
                <th>Jumlah Unit</th>
                <th>Jumlah TB</th>
              </tr>
              {key.Usulans?.map((item, index) => (
                <tr key={index}>
                  <td>{item.noUsulan || "-"}</td>
                  <td>{item.instansi || "-"}</td>
                  <td>{item.City ? item.City.nama : "-"}</td>
                  <td>{item.Kecamatan ? item.Kecamatan.nama : "-"}</td>
                  <td>{item.Desa ? item.Desa.nama : "-"}</td>
                  <td>{item.lat || "-"}</td>
                  <td>{item.lng || "-"}</td>
                  <td>{item.jumlahUnit || "-"}</td>
                  <td>{item.jumlahTb || "-"}</td>
                </tr>
              ))}
            </tbody>
            <br />
          </Fragment>
        );
      })}
    </Table>
  ) : (
    <Alert className="fs-4 text-center" color="secondary ">
      Tidak ada data
    </Alert>
  );
};

export default TableRusun;
