import * as React from 'react';
import { List } from '@mui/material';
import MenuLogin from './menuLogin';
import MenuRegister from './menuRegister';
import MenuDonasi from './menuDonasi';
import MenuAkad from './menuAkad';
import MenuEvent from './menuEvent';
import MenuDompetMadrasah from './menuMadrasah';
import MenuPembeli from './menuPembeli';
import MenuPenjual from './menuPenjual';
import MenuStaycation from './menuStaycation';
import AppContext from '../../../config/context/app';


export default function Menu() {
    const context = React.useContext(AppContext);
    // const adminAccess = context.user.admin_access;

    return (
      <List sx={{ maxWidth: 360 }} component="nav">
        {/* <MenuShipment />  */}
        {
          // adminAccess != undefined ? (
          <div>
            {"Login" ? <MenuLogin /> : <></>}
            {"Register" ? <MenuRegister /> : <></>}
            {"Penjual" ? <MenuPenjual /> : <></>}
            {"Pembeli" ? <MenuPembeli /> : <></>}
            {"Dompet Madrasah" ? <MenuDompetMadrasah /> : <></>}
            {"Event" ? <MenuEvent /> : <></>}
            {"staycation" ? <MenuStaycation /> : <></>}
            {"donasi" ? <MenuDonasi /> : <></>}
            {"Akad Transaksi" ? <MenuAkad /> : <></>}
          </div>
          // ) : (<></>)
        }
      </List>
    );
}
