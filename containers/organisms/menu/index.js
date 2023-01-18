import * as React from "react";
import { List } from "@mui/material";
import MenuLogin from "./menuLogin";
import MenuRegister from "./menuRegister";
import MenuDonasi from "./menuDonasi";
import MenuAkad from "./menuAkad";
import MenuEvent from "./menuEvent";
import MenuDompetMadrasah from "./menuMadrasah";
import MenuPembeli from "./menuPembeli";
import MenuPenjual from "./menuPenjual";
import MenuStaycation from "./menuStaycation";
import MenuSyariaharea from "./menuSyariaharea";
import MenuAkundanKeamanan from "./pembeli/akundankeamanan";
import MenuKomplainPesanan from "./pembeli/komplainpesanan";
import MenuPembeliLainnya from "./pembeli/lainnya";
import MenuPembayaran from "./pembeli/pembayaran";
import MenuPengembalianDana from "./pembeli/pengembaliandana";
import MenuPembeliPengiriman from "./pembeli/pengiriman";
import MenuPembeliPesanan from "./pembeli/pesanan";
import MenuPembeliPromosi from "./pembeli/promosi";
import AppContext from "../../../config/context/app";

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
          {"Syariah Area" ? <MenuSyariaharea /> : <></>}
          {"Pembeli_Akun dan Keamanan" ? <MenuAkundanKeamanan /> : <></>}
          {"Pembeli_Komplain Pesanan" ? <MenuKomplainPesanan /> : <></>}
          {"Pembeli_Lainnya" ? <MenuPembeliLainnya /> : <></>}
          {"Pembeli_Pembayaran" ? <MenuPembayaran /> : <></>}
          {"Pembeli_Pengembalian Dana" ? <MenuPengembalianDana /> : <></>}
          {"Pembeli_Pengiriman" ? <MenuPembeliPengiriman /> : <></>}
          {"Pembeli_Pesanan" ? <MenuPembeliPesanan /> : <></>}
          {"Pembeli_Promosi" ? <MenuPembeliPromosi /> : <></>}
        </div>
        // ) : (<></>)
      }
    </List>
  );
}
