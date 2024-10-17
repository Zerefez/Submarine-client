import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Text,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
  function Graph(props) {
    const { data, label, name, title } = props;
  
    console.log('DATA RECIEVED!!', data);
  
    return (
      <div>
        <Text
          x={500} // Adjust the position as needed
          y={30} // Adjust the position as needed
          textAnchor="middle" // Align text to the middle
          fontSize="50px"
          fontWeight="bold"
          fill="#333" // Text color
        >
          {title}
        </Text>
  
        <LineChart
          className="shadow-md rounded mt-[5px] p-10 border ml-10"
          width={1000}
          height={600}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" />
          <YAxis yAxisId="left" label={label} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="measurement_data"
            stroke="#ba0921"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name={name}
          />
        </LineChart>
      </div>
    );
  }
  
  export default Graph;
  