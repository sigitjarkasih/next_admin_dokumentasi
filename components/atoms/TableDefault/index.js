import { Paper } from "@mui/material"
import { TableContainer } from "@mui/material"
import { Table } from "@mui/material"
import { TableHead } from "@mui/material"
import { TableRow } from "@mui/material"
import { TableCell } from "@mui/material"
import { TableBody } from "@mui/material"

const styleHead = {
    fontWeight: 'bold', fontSize: 'smaller', color: 'white'
}

const TableDefault = ({ head, body }) => {
    return (
        <Paper>
            <TableContainer style={{ borderRadius: 5 }}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead style={{ background: '#0085B8' }}>
                        <TableRow>
                            {head.map((row, i) => (
                                <TableCell style={styleHead} align={row.align} key={i}>
                                    {row.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {body.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {
                                    row.map((col, i) => (
                                        <TableCell align={col.align} key={i} style={{ fontSize: 13 }}>
                                            {col.value}
                                        </TableCell>

                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TableDefault;