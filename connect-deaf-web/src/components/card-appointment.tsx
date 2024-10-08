import * as React from 'react';
import { User, CaretLeft, CaretRight } from '@phosphor-icons/react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

type Customer = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  
  type Professional = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    areaOfExpertise: string;
    qualification: string;
    workStartTime: string;
    workEndTime: string;
    breakDuration: string;
  };
  
  type Schedule = {
    id: string;
    professionalId: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  
  type Service = {
    id: string;
    name: string;
    description: string;
    value: number;
    professional: Professional;
  };
  
  type Appointments = {
    id: string;
    customer: Customer;
    professional: Professional;
    schedule: Schedule;
    service: Service;
    status: string;
  };
  
  type CardAppointmentsProps = {
    appointments: Appointments[];
  };

interface Column {
    id: 'prestador' | 'serviço' | 'status do serviço' | 'início do serviço';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'prestador', label: 'Prestador', minWidth: 50, align: 'center' },
    { id: 'serviço', label: 'Serviço', minWidth: 50, align: 'center' },
    { id: 'status do serviço', label: 'Status do serviço', minWidth: 50, align: 'center' },
    { id: 'início do serviço', label: 'Início do serviço', minWidth: 50, align: 'center' },
];

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => void;
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = ({ count, page, rowsPerPage, onPageChange }) => {
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <CaretLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <CaretRight />
            </IconButton>
        </Box>
    );
};

const CardAppointments: React.FC<CardAppointmentsProps> = ({ appointments }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const currentRows = rowsPerPage > 0
        ? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : appointments;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="grid gap-2 cursor-pointer">
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
                <Table sx={{ minWidth: 500, borderCollapse: 'collapse' }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell style={{ width: 10 }} component="th" scope="row" align="center">
                                    <div className='flex items-center justify-start'>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
                                            <User size={10} />
                                        </div>
                                        <span className='pl-2 font-serif'>{item.professional.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ width: 150 }} align="center">
                                    {item.service.name}
                                </TableCell>
                                <TableCell style={{ width: 150 }} align="center">
                                    <div className='flex justify-center items-center'>
                                        {item.status === 'CANCEL' ? (
                                            <div className='flex justify-center items-center bg-[#9D1613] text-white font-normal rounded-full w-24 h-8'>Cancelado</div>
                                        ) : item.status === 'FINISH' ? (
                                            <div className='flex justify-center items-center bg-[#0FB800] text-white font-normal rounded-full w-24 h-8'>Concluído</div>
                                        ) : item.status === 'APPROVED' ?
                                            <div className='flex justify-center items-center bg-[#1f43b9] text-white font-normal rounded-full w-24 h-8'>Aceito</div>
                                            :
                                        (
                                            <div className='flex justify-center items-center bg-[#f3e308] text-white font-normal rounded-full w-24 h-8'>Em espera</div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell style={{ width: 150 }} align="center">
                                    {item.schedule.date} - {item.schedule.startTime}
                                </TableCell>
                            </TableRow>
                        ))}

                        {rowsPerPage - currentRows.length > 0 &&
                            (<TableRow style={{ height: 53 * rowsPerPage - currentRows.length }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>)}

                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={columns.length} style={{ border: 'none' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', boxShadow: 'none' }}>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
                                        colSpan={columns.length}
                                        count={appointments.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        slotProps={{ select: { inputProps: { 'aria-label': 'Linhas por pagina', }, native: true, }, }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="Linhas por página"
                                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                                        ActionsComponent={TablePaginationActions}
                                        sx={{ boxShadow: 'none', border: 0 }} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CardAppointments;