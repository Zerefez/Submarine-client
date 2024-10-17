
import React from 'react';

import Graph from '../graph';

const generateRandomData = (startHour, endHour, isAM) => {
    const data = [];
    const period = isAM ? 'AM' : 'PM';
    
    for (let i = startHour; i <= endHour; i++) {
      const newEntry = {
        time: `${i}:00 ${period}`,
        // Generate temperature between 10°C and 30°C
        temperature_in: Math.floor(Math.random() * (30 - 10 + 1)) + 10,
  
        // Generate pressure between 900 hPa and 1100 hPa (realistic sea-level pressure range)
        pressure: Math.floor(Math.random() * (1100 - 900 + 1)) + 900,
  
        // Generate CO2 level between 100 and 500 ppm
        co2Level: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
      };
  
      data.push(newEntry);
    }
  
    return data;
  };
  
  // Generate data for the morning (8 AM to 12 PM) and afternoon (1 PM to 10 PM)
  const morningData = generateRandomData(8, 12, true);
  const afternoonData = generateRandomData(1, 10, false);
  
  // Combine both datasets
  const data = [...morningData, ...afternoonData];
  
  console.log(data);
  export { data };
  
  

const Mockdata = () => {
  return (
    <section id="mockdata" className="section">
        <div className="container">
            <h2 className="headline-2">
                Mock Data
            </h2>
            <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
                This is the mock data for the submarine
            </p>
            <div className="text-zinc-400 font-bold grid gap-x-4 gap-y-5 grid-cols-1">
              <Graph data={data} title="Submarine Data" />
            </div>
        </div>
    </section>
  )
}

export default Mockdata
