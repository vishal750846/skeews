import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminTopBar from '../components/AdminTopBar';
import OrderView from './OrderView';

export default function Dashboard() {
    return (
        <div>
            <AdminTopBar />
            <div className='d-flex'>
                <AdminSideBar />
                <OrderView />
            </div>
        </div>
    )
}
