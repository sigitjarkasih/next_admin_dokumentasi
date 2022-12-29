import { Component } from "react";
import { Stack, Tooltip, IconButton } from "@mui/material";
import { url_media } from "../../../config/url";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Image from "next/image";
import AppContext from "../../../config/context/app";
import APIVacationImageListByVacation from "../../../config/api/vacationImage/listByVacation";
import APIVacationImageDelete from "../../../config/api/vacationImage/delete";
import ImageVacationUploadTools from "../imageVacationUploadTools";
import APIVacationSetImage from "../../../config/api/vacation/setImage";

class VacationEditImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            imageList: [],
            anchorEl: null
        }
        this.updateImageList = this.updateImageList.bind(this);
    }

    static contextType = AppContext;

    async updateImageList(vac_id) {
        const resp = await APIVacationImageListByVacation({
            vac_id: vac_id
        })
        this.setState({
            imageList: resp.data
        })
    }

    handleSetPhotoUtama = async (id, image_link) => {
        const resp = await APIVacationSetImage({
            id: id,
            vac_id: this.props.id,
            image_link: image_link
        })
        if (resp.data === 'success') {
            this.context.setSnackbar({
                open: true,
                message: "Foto utama berhasil di ubah",
            });
        } else {
            this.context.setSnackbar({
                open: true,
                message: resp.statusText,
            });
        }
        await this.updateImageList(this.state.id);
    }

    handleDeletePhoto = async (id) => {
        const resp = await APIVacationImageDelete({
            id: id
        })
        if (resp.data === 'success') {
            this.context.setSnackbar({
                open: true,
                message: "Foto berhasil di hapus",
            });
        } else {
            this.context.setSnackbar({
                open: true,
                message: resp.statusText,
            });
        }
        await this.updateImageList(this.state.id);
    }

    componentDidMount() {

        this.setState({
            id: this.props.id
        })
        this.updateImageList(this.props.id);
    }

    render() {
        return (
            <Stack direction="row" spacing={3}>
                {this.state.imageList.map((row, i) => (
                    <div
                        key={i}
                        style={{ border: '1px solid #E5E5E5', marginBottom: 13, position: 'relative' }}>
                        <Image
                            src={url_media + row.image_link}
                            height={70}
                            width={70}
                            objectFit="cover"
                            onMouseEnter={this.handleImageHover}
                            onClick={this.handleImageHover}
                        />
                        {row.as_main === 0 ?
                            <div style={{ position: 'absolute', top: -20, left: 50, zIndex: 10 }}>
                                <Tooltip title="Hapus Foto">
                                    <IconButton
                                        onClick={() => this.handleDeletePhoto(row.id)}
                                        color="error"
                                    >
                                        <HighlightOffIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            :
                            ''
                        }
                        {row.as_main === 0 ?
                            <div style={{ position: 'absolute', top: 50, left: 50, zIndex: 10 }}>
                                <Tooltip title="Jadikan Foto Utama">
                                    <IconButton
                                        onClick={() => this.handleSetPhotoUtama(row.id, row.image_link)}
                                        color="success"
                                    >
                                        <FolderSpecialIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            :
                            <div style={{ position: 'absolute', width: 80, fontSize: 12, color: 'GrayText' }}>
                                Foto Utama
                            </div>
                        }
                    </div>
                ))
                }

                <ImageVacationUploadTools onSuccessUpload={this.updateImageList} vac_id={this.state.id} />
            </Stack>
        )
    }
}

export default VacationEditImage;