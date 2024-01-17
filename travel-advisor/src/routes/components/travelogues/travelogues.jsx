import React, { useEffect, useState } from "react";
import Travelogue from "./travelogue/travelogue";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Travelogues({travelogues}) {

    return (
        <Row xs={1} md={2} className="g-4">
            {travelogues.map((travelogue) => (
                <Col key={travelogue._id}>
                    <Travelogue key={travelogue._id} travelogue={travelogue} />
                </Col>
            ))}
        </Row>
    );
}

