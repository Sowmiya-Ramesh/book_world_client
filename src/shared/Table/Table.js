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
import EditPopup from '../EditPage/EditPopup';

const TableList = ({ tableList, title, addTitle, handleUpdate, setSelectedId, selectedId, isEditPopupOpen, setEditPopupOpen, handleEditUpdate}) => {

    const ListColumn = [
        { id: 'book_id', label: title === 'BOOKS' ? 'Book Id' : title === 'ISSUANCE' ? 'Issuance Id' : title === 'PENDING RETURNS' ? 'Issuance Id' : 'Member Id', minWidth: 300 },
        { id: 'book_name', label: title === 'BOOKS' ? 'Book' : title === 'ISSUANCE' ? 'Issuance Member' : title === 'PENDING RETURNS' ? 'Issuance Member' : 'Member Status', minWidth: 150 },
        { id: 'collection', label: title === 'BOOKS' ? 'Collection' : title === 'ISSUANCE' ? 'Issued By' : title === 'PENDING RETURNS' ? 'Book Name' : 'Email', minWidth: 150 },
        { id: 'category', label: title === 'BOOKS' ? 'Category' : title === 'ISSUANCE' ? 'Issuance Status' : title === 'PENDING RETURNS' ? 'Target Return Date' : 'Phone', minWidth: 150 },
        { id: 'edit', label: title !== 'PENDING RETURNS' ? 'Edit' : '', minWidth: 150 },
    ];

    return (
        <>
            <Paper className='listPage' sx={{ borderRadius: '16px' }}>
                <div className='header'>
                    <Typography variant='h5'>{title}</Typography>
                    {title !== 'PENDING RETURNS' ? <Button variant="contained" disabled>{addTitle}</Button> : null}
                </div>
                <TableContainer className='tableContainer'>
                    <Table aria-label='caption table'>
                        <TableHead className='tableHead'>
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
                        <TableBody className='tableBody'>
                            {tableList.map((obj) => (
                                <TableRow hover key={obj._id} className='tableRow'>
                                    <TableCell >
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
                                        <Button variant="contained"  className='button' onClick={() => {
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

            <EditPopup
                isOpen={isEditPopupOpen}
                onClose={() => setEditPopupOpen(false)}
                onUpdate={handleEditUpdate} 
                initialData= {title === 'BOOKS' ? { book_name: '', book_publisher: '' } : title === 'ISSUANCE' ? {issuance_member:'', issuance_status:''} : {mem_name:'', mem_email:''}}
                id={selectedId}
                title={title === 'BOOKS' ? 'Edit Book' : title === 'ISSUANCE' ? 'Edit Issuance' : 'Edit Member'}
                labelName1={title === 'BOOKS' ? 'Book Name' : title === 'ISSUANCE' ? 'Issuance Member' : 'Member Name'}
                name1={title === 'BOOKS' ? 'book_name' : title === 'ISSUANCE' ? 'issuance_member' : 'mem_name'}
                labelName2={title === 'BOOKS' ? 'Book Publisher' : title === 'ISSUANCE' ? 'Issuance Status' : 'Email'}
                name2={title === 'BOOKS' ? 'book_publisher' : title === 'ISSUANCE' ? 'issuance_status' : 'mem_email'}
            />
        </>
    );
};

export default TableList;
