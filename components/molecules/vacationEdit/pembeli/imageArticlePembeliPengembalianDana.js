import { Component, createRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import { url_media, url_media_local } from "../../../../config/url";
import { Box } from "@mui/system";
import AppContext from "../../../../config/context/app";
import APIPembeliPengembaliandanaImageUpload from "../../../../config/api/dokumentasi_pembeli/pengembaliandana/imageUpload";

class ImageArticlePembeliPengembalianDanaUploadTools extends Component {
  constructor(props) {
    super(props);
    this.inputFileRef = createRef();
    this.state = {
      id: "",
      image: "",
      imagePreviewUrl: "",
      file: null,
      snackbar: {
        open: false,
        message: "...",
      },
    };
  }

  setSnackbar = (snackbar) => {
    this.setState((prevState) => ({ snackbar }));
  };

  static contextType = AppContext;

  handleUpload = async (e) => {
    // this.context.setLoading(true);
    console.log("handleUpload");
    console.log(this.props.id);
    let file = this.state.file;
    let formdata = new FormData();
    formdata.append("image", file);
    formdata.append("id", this.props.id);
    console.log(formdata);
    const resp = await APIPembeliPengembaliandanaImageUpload(formdata);
    console.log(resp);
    if (resp.statusText === "OK") {
      this.setSnackbar({
        open: true,
        message: "Gambar Berhasil Disimpan",
      });

      this.setState({
        id: resp.data,
        image: url_media_local + resp.data,
        file: null,
        image_link: null,
        // imagePreviewUrl: '',
      });
    } else {
      this.setSnackbar({
        open: true,
        message: resp.statusText,
      });
    }

    // this.props.onSuccessUpload(this.props.product_id);
    // this.context.setLoading(false);
  };

  handleClickImage = () => {
    this.inputFileRef.current.click();
  };

  handleFile(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <>
        {this.props.image_link != null ? (
          // <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src={url_media_local + this.props.image_link}
            height={50}
            width={100}
            alt="cover"
          />
        ) : (
          // </div>
          ""
        )}

        <div
          style={{
            border: "1px solid #E5E5E5",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            hidden
            name="file"
            ref={this.inputFileRef}
            onChange={(e) => this.handleFile(e)}
          />
          <div onClick={this.handleClickImage}>
            {this.state.imagePreviewUrl !== "" ? (
              <Box p={3}>
                <Box m={4}></Box>
                <div style={{ color: "GrayText" }}>Gambar Baru</div>
                <Box m={2}></Box>
                <Image
                  src={this.state.imagePreviewUrl}
                  height={50}
                  width={100}
                  alt="cover"
                />
              </Box>
            ) : (
              <div
                style={{
                  background: "#F5F5F5",
                  width: 70,
                  padding: 10,
                  textAlign: "center",
                  fontSize: 12,
                  color: "GrayText",
                }}
              >
                {this.props.image_link != null ? "Ubah File" : "Tambah File"}
              </div>
            )}
          </div>

          {this.state.file === null ? (
            ""
          ) : (
            <div style={{ position: "absolute" }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={(e) => this.handleUpload(e)}
                style={{ textTransform: "none", padding: "5px", width: 120 }}
              >
                Submit Gambar
              </Button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ImageArticlePembeliPengembalianDanaUploadTools;
