import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const MeasurementTable = ({
  data,
  initialSortConfig,
  setSelectedMeasurement,
}) => {
  const [tableData, setTableData] = useState([...data]);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);

  useEffect(() => {
    // Re-sort table data when data or sortConfig changes
    if (sortConfig?.key) {
      const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
      setTableData(sortedData);
    } else {
      setTableData([...data]);
    }
  }, [data, sortConfig]);

  const sortTable = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key === key) {
      return sortConfig?.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <div className="relative mt-12 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-zinc-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-zinc-400">
          <tr>
            {data.length > 0 ? (
              Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => sortTable(key)}
                >
                  <div className="flex items-center text-center justify-center">
                    {key
                      .replace(/_/g, ' ')
                      .replace(/\b(\w)/g, (match) => match.toUpperCase())}{' '}
                    {getSortIcon(key)}
                  </div>
                </th>
              ))
            ) : (
              <th className="px-6 py-3">No Data Available</th>
            )}
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr
              onClick={() => {
                console.log('row', row);

                setSelectedMeasurement(row.groupid);
              }}
              key={index}
              className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 text-center"
            >
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="px-6 py-4">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MeasurementTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      groupid: PropTypes.string.isRequired,
      total_measurement: PropTypes.number,
      timestamp: PropTypes.string,
    })
  ).isRequired,
  initialSortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
};

MeasurementTable.defaultProps = {
  initialSortConfig: { key: null, direction: 'asc' },
};

export default MeasurementTable;
