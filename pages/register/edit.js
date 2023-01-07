import React from "react";
import * as Widget from "../../team/widget/";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Layout from "../../containers/templates/layout";
import AppContext from "../../config/context/app";
import FormikTextField from "../../components/atoms/Formik/TextField";
import FormikSelectField from "../../components/atoms/Formik/SelectField";
import { Box, Button, Stack, Typography, Container, Grid } from "@mui/material";
import APIRegisterListById from "../../config/api/register/listById";
import ImageArticleRegisterUploadTools from "../../components/molecules/vacationEdit/imageArticleRegisterUploadTools";
import ConfirmationDialog from "../../components/molecules/vacationEdit/confirmationDialog";
import Router, { withRouter } from "next/router";
import Head from "next/head";
import APIRegisterUpdate from "../../config/api/register/update";
import APIRegisternDelete from "../../config/api/register/delete";
// import TiptapEditor from "../../../components/vacationEdit/tiptapEditor";
// import TipTap from "../../../components/vacationEdit/Tiptap";
import Textarea from "../../components/molecules/vacationEdit/Textarea";

export async function getServerSideProps(context) {
  const res = await APIRegisterListById({
    id: context.query.id,
  });
  const data = await res.data[0];

  return {
    props: { data },
  };
}

class DonasiUpdate extends React.Component {
  state = {
    snackbar: { message: "", open: false },
  };

  handleClick = () => {
    this.setState({ snackbar: { message: "Berhasil Update!", open: true } });
  };

  handleClose = () => {
    this.setState({ snackbar: { message: "", open: false } });
  };

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      master_judul: "",
      title: "",
      content_desc: "",
      is_active: "",
      image_link: null,
      image_width: "",
      image_height: "",
      openConfirmDelete: false,
    };
  }

  static contextType = AppContext;

  validate = Yup.object({
    id: Yup.string().required("Wajib diisi!"),
    master_judul: Yup.string().required("Wajib diisi!"),
    title: Yup.string().required("Wajib diisi!"),
    content_desc: Yup.string().required("Wajib diisi!"),
    is_active: Yup.string().required("Wajib diisi!"),
  });

  submitData = async (values) => {
    const resp = await APIRegisterUpdate(values);
    if (resp.data === "success") {
      this.setState({
        open: true,
        message: "Update Berhasil",
      });
      Router.push("/donasi/");
    } else {
      this.setState({
        open: true,
        message: resp.statusText,
      });
    }
  };

  handleDelete = () => {
    this.setState({
      openConfirmDelete: true,
    });
  };

  handleCloseConfirmDelete = () => {
    this.setState({
      openConfirmDelete: false,
    });
  };

  handleOKConfirmDelete = () => {
    this.deleteArticle();
    this.setState({
      openConfirmDelete: false,
    });
  };

  deleteArticle = async () => {
    let data = {};
    data.id = this.props.data["id"];
    const resp = await APIRegisternDelete(data);
    Router.push("/register/");
  };

  keepSelectProField = (data) => {
    const objectArray = Object.entries(data);
    objectArray.forEach(([key, value]) => {
      this.setState({ [key]: value });
    });
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({
      id: this.props.data["id"],
      master_judul: this.props.data["master_judul"],
      title: this.props.data["title"],
      content_desc: this.props.data["content_desc"],
      is_active: this.props.data["is_active"],
      image_link: this.props.data["image_link"],
    });
  }

  onUpdateContent = (result) => {
    this.setState({
      content_desc: result,
    });
  };

  render() {
    console.log(this.state.image_link);
    return (
      <Layout>
        <Formik
          initialValues={{
            id: this.state.id,
            master_judul: this.state.master_judul,
            title: this.state.title,
            content_desc: this.state.content_desc,
            is_active: this.state.is_active,
          }}
          enableReinitialize
          validationSchema={this.validate}
          onSubmit={(values) => {
            this.submitData(values);
          }}
        >
          {(formik) => (
            <Form>
              <ConfirmationDialog
                title="Konfirmasi"
                child={<Box p={3}>Yakin akan hapus ?</Box>}
                open={this.state.openConfirmDelete}
                onClose={this.handleCloseConfirmDelete}
                onCancel={this.handleCloseConfirmDelete}
                onOK={this.handleOKConfirmDelete}
              />
              <Widget.Paper>
                <Widget.PageHeader title="Edit Article" />
                <Stack direction="row">
                  <Button color="error" onClick={this.handleDelete}>
                    Hapus
                  </Button>
                  <Button href="/donasi/">Daftar Artikel</Button>
                </Stack>
                <Widget.Box>
                  <Box mb={3}>
                    <Typography>Image</Typography>
                    <ImageArticleRegisterUploadTools
                      id={this.state.id}
                      image_link={this.state.image_link}
                      image_width={100}
                      image_height={100}
                    />
                  </Box>

                  <Box mb={3}>
                    <Typography>Master Judul</Typography>
                    <FormikTextField
                      name="master_judul"
                      placeholder="Masukkan Master Judul article"
                    />
                  </Box>

                  <Box mb={3}>
                    <Typography>Sub Title</Typography>
                    <FormikTextField
                      name="title"
                      placeholder="Masukkan judul article"
                    />
                  </Box>

                  <Box mb={3}>
                    <Typography>Content_Desc</Typography>
                    <Textarea
                      name="content_desc"
                      placeholder="Masukkan Deskripsi article"
                      rows="10"
                      cols="120"
                    />
                  </Box>

                  <Box mb={3}>
                    <Typography>Status</Typography>
                    <FormikSelectField
                      id="is_active"
                      instanceId="is_active"
                      name="is_active"
                      options={optionsIsActive}
                      onChange={(e) => this.setState({ is_active: e.value })}
                      value={optionsIsActive.filter(
                        (obj) => obj.value === this.state.is_active
                      )}
                      onInputChange={(e) =>
                        this.keepSelectProField(formik.values)
                      }
                    />
                  </Box>

                  <Box m={3}></Box>

                  <Widget.Box textAlign="right" p={0}>
                    <Widget.Button type="submit" title="SIMPAN" />
                  </Widget.Box>
                </Widget.Box>
              </Widget.Paper>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  }
}
export default DonasiUpdate;

const optionsIsActive = [
  { value: 0, label: "Tidak Aktif" },
  { value: 1, label: "Aktif" },
];
