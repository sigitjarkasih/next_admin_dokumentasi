import { Typography } from "@mui/material";

const Label = props => {
    return (
        <Typography variant="subtitle2" color="GrayText">
            {props.title}
        </Typography>
    )
}

export default Label;