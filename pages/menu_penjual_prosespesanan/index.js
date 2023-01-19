import React from "react";
import * as Widget from "../../team/widget";
import { Button } from "@mui/material";
import APIPenjualProsesList from "../../config/api/dokumentasi_penjual/prosespesanan/list";
import AppContext from "../../config/context/app";
import Image from "next/image";
import Link from "next/link";
import { url_media, url_media_local } from "../../config/url";
import Head from "next/head";
import Layout from "../../containers/templates/layout";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  static contextType = AppContext;

  getData = async () => {
    const resp = await APIPenjualProsesList({
      //   user_id: this.context.user.us er_id,
    });
    console.log(resp);
    if (resp.status === 200) {
      this.setState({
        data: resp.data,
      });
    }
    console.log(resp.data);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const dataList = this.state.data;
    return (
      <Layout>
        <Widget.Paper elevation={3}>
          <Head>
            <title>DGMall Syariah Dokumentasi</title>
            <link rel="icon" href="/logoDgmall.png" />
          </Head>
          <Widget.PageHeader title="Dokumentasi Article Proses Pesanan" />
          <Link href="./menu_penjual_prosespesanan/add">
            <Button variant="outlined" color="success">
              Create Article
            </Button>
          </Link>
          <Widget.Box>
            {dataList.length > 0 ? (
              <Widget.Table
                head={[
                  { title: "Image", align: "center" },
                  { title: "Master Judul", align: "left" },
                  { title: "Sub Judul", align: "left" },
                  { title: "Status", align: "center" },
                  { title: "Actions", align: "left" },
                ]}
                body={dataList.map(function (row) {
                  return [
                    {
                      value: (
                        <>
                          {row.image_link === null ? (
                            <div style={{ fontSize: 10, color: "GrayText" }}>
                              No Image
                            </div>
                          ) : (
                            <Image
                              src={url_media_local + row.image_link}
                              height={55}
                              width={55}
                              alt="cover"
                            />
                          )}
                        </>
                      ),
                      align: "center",
                    },
                    { value: row.master_judul, align: "left" },
                    { value: row.title, align: "left" },
                    {
                      value: (
                        <>
                          {row.is_active === 1 ? (
                            <span style={{ color: "green" }}>Tampilkan</span>
                          ) : (
                            <span style={{ color: "#D1D1D1" }}>
                              Tidak Aktif
                            </span>
                          )}
                        </>
                      ),
                      align: "center",
                    },
                    {
                      value: (
                        <Link
                          href={`./menu_penjual_prosespesanan/edit?id=${row.id}`}
                        >
                          <Button size="small" color="warning">
                            Edit
                          </Button>
                        </Link>
                      ),
                      align: "left",
                    },
                  ];
                })}
              />
            ) : (
              <div style={{ color: "GrayText" }}>
                Belum ada Article yang dibuat
              </div>
            )}
          </Widget.Box>
        </Widget.Paper>
      </Layout>
    );
  }
}

export default ArticlePage;
