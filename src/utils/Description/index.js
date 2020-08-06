import React from 'react'
import { Typography, Row, Col } from 'antd'

export const Description = ({children, title, ...props}) => {
    const { Title } = Typography
    
    return (
        <div>
            <Title level={4}>{title}</Title>
            <Row gutter={[8,8]}>
            {
                children.map((child, key) => (
                    <Col xs={24} sm={8} lg={6} key={key}>
                        {child}
                    </Col>
                ))
            }
            </Row>
        </div>
    )
}