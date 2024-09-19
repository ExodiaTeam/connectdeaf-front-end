import * as React from 'react';
import { User, CaretLeft, CaretRight, Check, X } from '@phosphor-icons/react';
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
import Button from '@mui/material/Button';


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
  
  type CardAppointmentsProfessionalProps = {
    appointments: Appointments[];
  };


interface Column {
    id: 'cliente' | 'serviço' | 'status do serviço' | 'início do serviço' | 'solicitacoes';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'cliente', label: 'Cliente', minWidth: 50, align: 'center' },
    { id: 'serviço', label: 'Serviço', minWidth: 50, align: 'center' },
    { id: 'status do serviço', label: 'Status do serviço', minWidth: 50, align: 'center' },
    { id: 'início do serviço', label: 'Início do serviço', minWidth: 50, align: 'center' },
    { id: 'solicitacoes', label: 'Solicitações', minWidth: 50, align: 'center' },
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

const CardAppointmentsProfessional: React.FC<CardAppointmentsProfessionalProps> = ({ appointments }) => {
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

    const handleAccept = async (id: string) => {
        const token = localStorage.getItem('token') || '';
        try {
            const response = await fetch(`https://connectdeaf-app-hml.azurewebsites.net/api/appointments/${id}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                
            });
    
            if (!response.ok) {
                throw new Error('Erro ao aceitar a solicitação');
            }
    
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    
    const handleReject = async (id: string) => {
        try {
            const response = await fetch(`https://connectdeaf-app-hml.azurewebsites.net/api/appointments/${id}/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao recusar a solicitação');
            }
    
        } catch (error) {
            console.error('Erro:', error);
        }
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
                                        <span className='pl-2 font-serif'>{item.customer.name}</span>
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
                                <TableCell style={{ width: 150 }} align="center">
                                    {
                                        item.status === 'PENDING' &&
                                        <div>
                                            <Button
                                            variant="contained"
                                            onClick={() => handleAccept(item.id)}
                                            sx={{ 
                                                minWidth: 0, 
                                                padding: 1, 
                                                borderRadius: '50%', 
                                                width: 36, 
                                                height: 36,
                                                backgroundColor: '#356B99',
                                                '&:hover': {
                                                    backgroundColor: '#1c4466',
                                                }
                                            }}
                                            >
                                                <Check size={16} />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleReject(item.id)}
                                                sx={{ 
                                                    minWidth: 0, 
                                                    padding: 1, 
                                                    borderRadius: '50%', 
                                                    width: 36, 
                                                    height: 36, 
                                                    marginLeft: 1,
                                                    backgroundColor: '#5E0D0B',
                                                    '&:hover': {
                                                        backgroundColor: '#410302',
                                                    }
                                                }}
                                            >
                                                <X size={16} />
                                            </Button>

                                        </div>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}

                        {rowsPerPage - currentRows.length > 0 &&
                            (<TableRow style={{ height: 53 * (rowsPerPage - currentRows.length) }}>
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

export default CardAppointmentsProfessional;