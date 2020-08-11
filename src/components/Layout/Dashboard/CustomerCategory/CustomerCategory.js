import React from 'react'
import { Card, Typography } from 'antd'
import { Chart, Legend, View, Coord, Geom, Label } from 'bizcharts'


export const CustomerCategory = (props) => {
    const { read, entities, status } = props

    React.useEffect(read,[])

    const data = entities ? entities.map(c => ({
        type: c.name,
        value: c.total_customer,
    })) : []
    
    return (
        <Card title="Client par catégorie" loading={status && status.isFetching}>
            <Typography.Title level={4}>{data && data.reduce((a,i) => a + i.value, 0)}</Typography.Title>
            <Chart
            height={500}
            weight={500}
            forceFit
            padding={[20, 0, "auto", 0]}
          >
            <Legend />
            <View
              data={data}
              start={{
                x: 0,
                y: 0
              }}
              end={{
                x: 1,
                y: 1
              }}
            >
              <Coord
                type="theta"
                startAngle={0}
                endAngle={Math.PI * 2}
              />
              <Geom
                type="intervalStack"
                position="value"
                color="type"
                shape="rect"
              >
                <Label
                  content={["type*value", (type, value)=>{
                    return `Client(e)s ${type} : ${value} `
                  }]}
                  offset={-20}
                  textStyle={{
                    rotate: 0
                  }}
                />
              </Geom>
            </View>
          </Chart>
        </Card>
    )
}