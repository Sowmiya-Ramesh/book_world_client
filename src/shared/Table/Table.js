import React from 'react';
import './Table.scss';
import {
    Typography, Button
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditBookPopup from '../EditPage/EditPopup';

const TableList = ({ tableList, title, addTitle, handleUpdate, setSelectedId, selectedId, isEditPopupOpen, setEditPopupOpen, handleEditUpdate }) => {

    const ListColumn = [
        { id: 'book_id', label: title === 'BOOKS' ? 'Book Id' : title === 'ISSUANCE' ? 'Issuance Id' : title === 'PENDING RETURNS' ? 'Issuance Id' : 'Member Id', minWidth: 300 },
        { id: 'book_name', label: title === 'BOOKS' ? 'Book' : title === 'MEMBER' ? 'Status' : title === 'ISSUANCE' ? 'Issuance Member' : title === 'PENDING RETURNS' ? 'Issuance Member' : 'Member', minWidth: 150 },
        { id: 'collection', label: title === 'BOOKS' ? 'Collection' : title === 'ISSUANCE' ? 'Issued By' : title === 'PENDING RETURNS' ? 'Book Name' : 'Email', minWidth: 150 },
        { id: 'category', label: title === 'BOOKS' ? 'Category' : title === 'ISSUANCE' ? 'Issuance Status' : title === 'PENDING RETURNS' ? 'Target Return Date' : 'Phone', minWidth: 150 },
        { id: 'edit', label: title !== 'PENDING RETURNS' ? 'Edit' : '', minWidth: 150 },
    ];

    return (
        <>
            <Paper className='listPage' sx={{ borderRadius: '16px' }}>
                <div className='header'>
                    <Typography>{title}</Typography>
                    {title !== 'PENDING RETURNS' ? <Button variant="contained">{addTitle}</Button> : null}
                </div>
                <TableContainer className='tableContainer'>
                    <Table aria-label='caption table'>
                        <TableHead>
                            <TableRow>
                                {ListColumn.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        <Typography style={{ color: 'black' }} variant='h6'>
                                            {column.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableList.map((obj) => (
                                <TableRow hover key={obj._id}>
                                    <TableCell>
                                        <Typography>{title === 'BOOKS' ? obj?.book_id : title === 'ISSUANCE' ? obj?.book_id : title === 'PENDING RETURNS' ? obj?.issuance_id : obj?.mem_id?.member_id}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{title === 'BOOKS' ? obj?.book_name : title === 'ISSUANCE' ? obj?.issuance_member : obj?.mem_id?.status === true ? 'Active' : obj?.mem_id?.status === false ? 'Inactive' : title === 'PENDING RETURNS' ? obj?.member_name
                                            : obj?.mem_name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{title === 'BOOKS' ? obj?.book_collection_id?.collection_name : title === 'ISSUANCE' ? obj?.issued_by : title === 'PENDING RETURNS' ? obj?.book_name : obj?.mem_email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{title === 'BOOKS' ? obj?.book_cat_id?.cat_name : title === 'ISSUANCE' ? obj?.issuance_status : title === 'PENDING RETURNS' ? obj?.target_return_date.split('T')[0] : obj?.mem_phone}</Typography>
                                    </TableCell>
                                    {title !== 'PENDING RETURNS' ? <TableCell>
                                        <Button variant="contained" onClick={() => {
                                            // if(title === 'BOOKS')
                                            setSelectedId(obj?._id);
                                            setEditPopupOpen(true);

                                        }}>Update</Button>
                                    </TableCell> : ''}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <EditBookPopup
                isOpen={isEditPopupOpen}
                onClose={() => setEditPopupOpen(false)}
                onUpdate={handleEditUpdate} // Pass handleEditUpdate for the update logic
                initialData={{ book_name: '', book_publisher: '' }} // Initial data for the popup
                id={selectedId}
            />
        </>
    );
};

export default TableList;
