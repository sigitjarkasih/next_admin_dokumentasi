import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Component } from "react";
import APIArticleDelete from "../../../config/api/article/delete";
import AppContext from "../../../config/context/app";


class ArticleDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false,
        }
    }

    static contextType = AppContext;

    handleDelete = () => {
        this.setState({
            openConfirm: true,
        })
    }

    handleCloseConfirmDelete = () => {
        this.setState({
            openConfirm: false
        })
    }

    handleOKConfirmDelete = () => {
        this.deleteArticle();
        this.setState({
            openConfirm: false
        })
    }

    deleteArticle = async () => {
        const resp = await APIArticleDelete({ 'id': this.props.id });
        if (resp.data === 'success') {
            this.context.setSnackbar({
                open: true,
                message: "Article berhasil dihapus",
            });
            this.props.onRefresh();
        }
    }

    render() {
        return (
            <>
                <Dialog
                    onClose={this.handleCloseConfirmDelete}
                    open={this.state.openConfirm}
                    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                    maxWidth="xs"
                >
                    <DialogTitle>Konfirmasi</DialogTitle>
                    <DialogContent dividers>
                        <Box p={3}>
                            Yakin akan hapus ?
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.handleCloseConfirmDelete}
                        >
                            BATAL
                        </Button>
                        <Button
                            onClick={this.handleOKConfirmDelete}
                        >
                            HAPUS
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    color="secondary"
                    onClick={this.handleDelete}
                >
                    Hapus
                </Button>
            </>
        )
    }
}

export default ArticleDelete;