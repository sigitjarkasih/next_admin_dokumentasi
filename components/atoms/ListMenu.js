import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const ListMenu = ({icon, title, onClick, iconStatus}) => {
    return (
        <ListItemButton 
            onClick={onClick} 
            style={{width: '100%', paddingTop: 15, paddingBottom: 3, paddingLeft: 9}}
        >
            <ListItemIcon style={{minWidth: 40, paddingLeft: 8}}>
                {icon}
            </ListItemIcon>
            <ListItemText 
                primary={title}
                primaryTypographyProps={
                    {fontSize: 14, color: 'GrayText', fontWeight: 500}
                } 
            />
            {iconStatus}
        </ListItemButton>
    )
}

export default ListMenu;