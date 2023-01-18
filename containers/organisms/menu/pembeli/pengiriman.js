import * as React from "react";
import List from "@mui/material/List";
import ListMenu from "../../../../components/atoms/ListMenu";
import InventoryIcon from "@mui/icons-material/Inventory";
import AppContext from "../../../../config/context/app";
import Link from "next/link";

export default function MenuPembeliPengiriman() {
  const [open, setOpen] = React.useState(false);
  const context = React.useContext(AppContext);
  const menu = "Pembeli Pengiriman";

  const handleClick = () => {
    // var data = context.menuCollapse;
    setOpen(!open);
    if (!open === true) {
      data.push(menu);
    } else {
      var index = data.indexOf(menu);
      if (index !== -1) {
        data.splice(index, 1);
      }
    }
    context.setMenuCollapse(data);
  };

  React.useEffect(() => {
    // const data = context.menuCollapse;
    // if (data.includes(menu)) {
    //     setOpen(true);
    // }
  });

  return (
    <>
      <Link href="/menu_pembeli_pengiriman">
        <ListMenu
          title="Pembeli Pengiriman"
          icon={<InventoryIcon fontSize="small" />}
          // iconStatus={
          //   open ? (
          //     <ExpandLess style={{ color: "GrayText" }} />
          //   ) : (
          //     <ExpandMore style={{ color: "GrayText" }} />
          //   )
          // }
          // onClick={handleClick}
        />
      </Link>
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListMenuSub title="Daftar Login" href={"/login"} />
        </List>
      </Collapse> */}
    </>
  );
}
