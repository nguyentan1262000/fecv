import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const data = [
        { name: 'Group A', value: 100 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
    
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
      return (
        <div>
            <div className=''>

          <h2>Pie Chart Example (Recharts)</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
            </div>
            <div className=''>
                <DauMuc color="#000"/>
            </div>
        </div>
      );
}

const DauMuc = (props) => {
    return <div className='flex items-center gap-4'>
        <div className={`bg-[${props.color}] h-[40px] w-[40px]`}></div>
        <span className='text-[18px]'>Tổng số ứng viên : </span>
    </div>
}

export default Dashboard;