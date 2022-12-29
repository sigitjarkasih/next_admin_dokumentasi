import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Router from "next/router";
import APIArticleCreate from "../../config/api/article/create";
import Layout from "../../containers/templates/Layout";
import { Grid, Button, CardContent, Container, Box } from "@mui/material";
import Head from "next/head";
import * as Widget from "../../team/widget";
import FormikSelectField from "../../components/atoms/Formik/SelectField";
import FormikTextField from "../../components/atoms/Formik/TextField";
import AppContext from "../../config/context/app";

class ArticleAdd extends React.Component {
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
      title: "",
      is_activa: 1,
    };
  }

  static contextType = AppContext;

  validate = Yup.object({
    title: Yup.string().required("Wajib diisi!"),
  });

  submitData = async (values) => {
    const resp = await APIArticleCreate(values);
    if (resp.data != "") {
      this.setState({
        open: true,
        message: "Submit Berhasil",
      });
      Router.push(`/article`);
      // Router.push(`/article/edit?id=${resp.data}`);
    } else {
      this.setState({
        open: true,
        message: resp.statusText,
      });
    }
  };

  keepSelectProField = (data) => {
    const objectArray = Object.entries(data);
    objectArray.forEach(([key, value]) => {
      this.setState({ [key]: value });
    });
  };

  render() {
    return (
      <Layout>
        <Formik
          initialValues={{
            title: this.state.title,
            is_activa: this.state.is_activa,
          }}
          enableReinitialize
          validationSchema={this.validate}
          onSubmit={(values, { resetForm }) => {
            this.submitData(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <Widget.Paper>
                <Widget.PageHeader title="Create Articel" />
                <Button href="/article/">Daftar Artikel</Button>
                <Widget.Box>
                  <FrameField
                    title="Title"
                    child={
                      <FormikTextField
                        name="title"
                        placeholder="Masukkan judul article"
                      />
                    }
                  />
                  <FrameField
                    title="Status"
                    child={
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
                    }
                  />
                  <Box m={3}></Box>

                  <Widget.Box textAlign="right" p={0}>
                    <Widget.Button type="submit" title="SUBMIT" />
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
export default ArticleAdd;

const optionsIsActive = [
  { value: 0, label: "Tidak Aktif" },
  { value: 1, label: "Tampilkan" },
];

const FrameField = ({ title, child, action }) => {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        fontSize: 14,
        gridTemplateColumns: "138px auto",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          color: "#575757",
          paddingRight: 20,
        }}
      >
        {title}
      </div>
      <div>{child}</div>
    </div>
  );
};
