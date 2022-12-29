import { Box, Grid, Typography } from "@mui/material";

const HeaderPage = ({ title, subtitle, action }) => {
    return (
        <Grid
            container
            justifyContent="space-between"
            direction="row"
            borderBottom={"2px solid #F4F4F4"}
            mb={3}
        >
            <Grid item>
                <Box mb={3}>
                    <Typography variant="h6" fontWeight={600}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom color="GrayText">
                        {subtitle}
                    </Typography>
                </Box>
            </Grid>
            <Grid item>
                {action}
            </Grid>
        </Grid>

    )
}

export default HeaderPage;