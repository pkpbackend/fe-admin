import React, { Fragment } from "react";
import { Alert, Table } from "reactstrap";
import "./table.scss";

const TableRuswa = ({ data = [] }) => {
  return data && data.length > 0 ? (
    <Table responsive hover size="sm" striped id="table-swadaya">
      {data.map((item, i) => {
        return (
          <Fragment key={i}>
            <tbody>
              <tr>
                <th colSpan="11">
                  Kabupaten : {item.nama} (Total Unit: {item.totalUnit})
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
                <th>Jumlah Unit PK</th>
                <th>Jumlah Unit PB</th>
              </tr>
              {item.Usulans?.map((item, index) =>
                item.Sasarans
                  ? item.Sasarans.map((detail, index) => (
                      <tr key={index}>
                        <td>{item.noUsulan || "-"}</td>
                        <td>{item.instansi || "-"}</td>
                        <td>{detail.City ? detail.City.nama : "-"}</td>
                        <td>
                          {detail.Kecamatan ? detail.Kecamatan.nama : "-"}
                        </td>
                        <td>{detail.Desa ? detail.Desa.nama : "-"}</td>
                        <td>{detail.lat || "-"}</td>
                        <td>{detail.lng || "-"}</td>
                        <td>{detail.JumlahUnit || "-"}</td>
                        <td>
                          {detail.MasterKegiatanId === 1
                            ? detail.JumlahUnit
                            : "-"}
                        </td>
                        <td>
                          {detail.MasterKegiatanId === 2
                            ? detail.JumlahUnit
                            : "-"}
                        </td>
                      </tr>
                    ))
                  : null
              )}
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

export default TableRuswa;
