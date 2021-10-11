import React from 'react';
import { Link } from 'react-router-dom';
import Table from './components/table';
import EditButton from './components/editBtn';
import DeleteButton from './components/deleteBtn';

export default ({ columns, data, editUrl, onDelete, hilightRow = () => '' }) => {
    if (data.length === 0) {
        return <></>;
    }

    return (
        <Table>
            <thead>
                <tr>
                    {columns.map(col => <th key={col.key}>{col.title}</th>)}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                        <tr key={row._id} style={{ background: hilightRow(row)}}>
                            {columns.map(col => {
                                const hasFormatter = typeof col.format === 'function';
                                const content = row[col.key];
                                const formattedContent = hasFormatter ? col.format(content) : content;
                                return <td key={col.key}>{formattedContent}</td>
                            })}
                            <td>
                                <Link to={editUrl(row._id)}><EditButton/></Link>
                                <DeleteButton onClick={() => onDelete(row._id)} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
};
