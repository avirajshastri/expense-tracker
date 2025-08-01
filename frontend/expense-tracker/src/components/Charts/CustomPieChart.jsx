import React from 'react'
import {PieChart, Pie,Cell,Tooltip,ResponsiveContainer,Legend} from 'recharts'
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
    // console.log("data",data);
    // console.log("shoeTextAnchor",showTextAnchor)
    // console.log('label',label)
    // console.log('amount',totalAmount)
  return (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false} >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index% colors.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />}/>
                    <text 
                    x="50%"
                    y="50%"
                    dy={-25}
                    textAnchor='middle'
                    fill='#666'
                    fontSize="14px"
                    >
                        {label}
                    </text>

                    <text 
                    x="50%"
                    y="50%"
                    dy={8}
                    textAnchor='middle'
                    fill='#333'
                    fontSize="24px"
                    fontWeight="semi-bold"
                    >
                        {totalAmount}
                    </text>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart