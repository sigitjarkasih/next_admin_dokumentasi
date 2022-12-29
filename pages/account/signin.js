import React from "react";
import * as Widget from "../../team/widget";
import AppContext from "../../config/context/app";
import Router from "next/router";
// import SetToken from "../../utils/setToken";
import { Box } from "@mui/material";
// import ReloadUser from "../../utils/reloadUser";
import Head from "next/head";
// import APIUserClient from "../../config/api/userClient";

class AccountSignin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    static contextType = AppContext;

    submitData = async () => {
        this.setState({ loading: true })
        const resp = await APIUserClient({
            channel: 'getTokenIdByEmailPassword',
            email: this.state.email.trim().toLowerCase(),
            password: this.state.password.trim(),
            fcm_token: "",
            user_id: 'guest'
        });

        console.log(resp.data);
        
        if (resp.data.status === 'success') {

            if (resp.data.data === 'failed') {
                this.setState({ loading: false })
                this.context.setSnackbar({
                    open: true,
                    message: "Login gagal, silahkan coba lagi..",
                });

            } else {

                // SET TOKEN
                SetToken(resp.data.data);

                // UPDATE STATUS LOG IN
                await this.context.setLoggedIn(true);

                // REFRESH CONTEXT USER
                const dataUser = await ReloadUser();
                this.setState({ loading: false })

                if (dataUser.is_admin === 0) {
                    alert('Anda tidak mempunyai izin untuk membuka panel admin!!!')
                    return;

                }

                if (dataUser.is_active === 0) {
                    // Router.push('/activation/block');
                    alert('Maaf, akun Anda belum di Aktivasi')
                    return
                } else {
                    await this.context.setUser(dataUser);
                    Router.push('/');
                }
            }
        } else {
            this.setState({ loading: false })
            this.context.setSnackbar({
                open: true,
                message: resp.data.message,
                severity: 'error'
            });
        }
    }

    componentDidMount() {
        // console.log('Sign In Page')
    }

    render() {
        return (
            <div style={{ margin: 0, padding: 0, background: '#F6F6F6', minHeight: '100vh' }}>
                <Head>
                    <link rel='icon' href='https://collections.dgpmall.com/image/1.03/logo.png' />
                    <title>Login | Admin Centre | DGMALL</title>
                </Head>

                <Box bgcolor="whitesmoke" minHeight="100vh" alignItems="center" display="flex" justifyContent="center">
                    <Box width={500}>
                        <Widget.Paper>
                            <Widget.TextField
                                label="Email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                placeholder="Masukkan Email"
                            />

                            <Widget.TextField
                                label="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                placeholder="Masukkan Password"
                                type="password"
                            />

                            <Widget.BreakSpace size={20} />

                            <Widget.Button
                                title="MASUK"
                                width="100%"
                                loading={this.state.loading}
                                onClick={this.submitData}
                            />
                        </Widget.Paper>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default AccountSignin;