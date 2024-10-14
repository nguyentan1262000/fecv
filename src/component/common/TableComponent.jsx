import React, { useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

const TableComponent = (props) => {
    const navigate = useNavigate();
    const onChange = (page) => {
        props.onPageChange(page)
    }
    return<div className='table-component'>
        <div className='title'>
            <NavLink className="btn__add-new" to="#">Add new</NavLink>
            <h2 className='title-text'>{props.title}</h2>
        </div>
        <Table className='mb-5' columns={props.columns} dataSource={props.data} pagination={false}/>
        <Pagination defaultCurrent={1} onChange={onChange} total={props.total}/>
    </div> 
    
}

export default TableComponent