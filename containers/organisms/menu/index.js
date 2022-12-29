import * as React from 'react';
import { List } from '@mui/material';
// import MenuShipment from './menuShipment';
import MenuArticle from './menuArticle';
import AppContext from '../../../config/context/app';


export default function Menu() {
    const context = React.useContext(AppContext);
    // const adminAccess = context.user.admin_access;

    return (
        <List
            sx={{ maxWidth: 360 }}
            component="nav"
        >
            {/* <MenuShipment />  */}
            {
                // adminAccess != undefined ? (
                    <div>
                        {/* {
                            ('app_profile') ? (
                                <MenuAppProfile />
                            ) : <></>
                        }
                        {
                            ('remove') ? (
                                <MenuRemove />
                            ) : <></>
                        }
                        {
                            ('mobilepulsa') ? (
                                <MenuMobilepulsa />
                            ) : <></>
                        }
                        {
                            ('finance') ? (
                                <MenuFinance />
                            ) : <></>
                        }
                        {
                            ('customerservice') ? (
                                <MenuCustomerService />
                            ) : <></>
                        }
                        {
                            ('category') ? (
                                <MenuCategory />
                            ) : <></>
                        }
                        {
                            ('helpdoc') ? (
                                <MenuHelpDoc />
                            ) : <></>
                        }
                        {
                            ('client') ? (
                                <MenuClient />
                            ) : <></>
                        } */}
                        {
                            ('article') ? (
                                <MenuArticle />
                            ) : <></>
                        }
                    </div>
                // ) : (<></>)
            }

        </List>
    );
}
