import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ListMenuSub = ({title, href}) => {
    const router = useRouter();
    var routerPathName = router.pathname;
    var theColor = (routerPathName === href) ? 'red' : 'black';

    return (
        <Link href={href}>
            <ListItemButton 
                sx={{ pl: 7.2, pt: 0, pb: 0 }} 
                style={{width: '100%', paddingLeft: 50}}
            >
                <ListItemText 
                    primary={title} 
                    primaryTypographyProps={
                        {
                            fontSize: 14, 
                            color: theColor
                        }
                    } 
                />
            </ListItemButton>
        </Link>
    )
}

export default ListMenuSub;