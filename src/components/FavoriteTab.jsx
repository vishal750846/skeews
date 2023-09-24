import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import AccountManagementTable from './AccountManagementTable';


export default function FavoriteTab() {
    return (
        <div>
            <Row>
                <Col lg={12} className="mt-sm-5 mt-2">
                    <div className='text-sm-end text-center'>
                        <Button className="bg-none text-black border border-2 mb-2 mb-sm-0">Delete</Button>
                        <Button className="bg-none text-black border border-2 mx-2 mb-2 mb-sm-0">Make Inactive/Active</Button>
                        <Button className="bg-none text-black border border-2 mb-2 mb-sm-0">Show Inactive</Button>
                        <Button className="bg-none text-black border border-2 ms-2 mb-2 mb-sm-0">Filter</Button>
                    </div>
                </Col>
                <Col lg={12} className="mt-sm-5 mt-2">
                    <AccountManagementTable />
                </Col>
            </Row>
        </div>
    )
}
