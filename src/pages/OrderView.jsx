import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/footer';
import OrderGraph from '../components/OrderGraph';
import OrderTable from '../components/OrderTable';

export default function OrderView() {
    return (
        <div>
            <OrderGraph />
            <OrderTable />
            {/* <Footer /> */}
        </div>
    )
}
