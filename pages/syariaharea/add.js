import React from "react";
import * as Widget from "../../team/widget";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../../config/context/app";
import Layout from "../../containers/templates/layout";
import Router from "next/router";
import FormikTextField from "../../components/atoms/Formik/TextField";
import FormikSelectField from "../../components/atoms/Formik/SelectField";
import { Box } from "@mui/material";
import APISyariahAreaCreate from "../../config/api/syariaharea/create";

class SyariahAreaAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      master_judul: "",
      is_active: 1,
    };
  }

  static contextType = AppContext;

  validate = Yup.object({
    master_judul: Yup.string().required("Wajib diisi!"),
  });

  submitData = async (values) => {
    const resp = await APISyariahAreaCreate(values);
    if (resp.data != "") {
      this.context.setSnackbar({
        open: true,
        message: "Submit Berhasil",
      });
      Router.push(`/syariaharea/edit?id=${resp.data}`);
    } else {
      this.context.setSnackbar({
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
            master_judul: this.state.master_judul,
            is_active: this.state.is_active,
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
                <Widget.PageHeader title="Create Article Syariah Area" />
                <Widget.Box>
                  <FrameField
                    title="Master Judul"
                    child={
                      <FormikTextField
                        name="master_judul"
                        placeholder="Masukkan Master Judul"
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

export default SyariahAreaAdd;

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
