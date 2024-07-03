import React from 'react';

const ManualTestTable = ({ testCases, handleTestCaseChange }) => {
  return (
    <div className="overflow-x-scroll">
      <table className="p-5 m-5 border-x-[0.5px] border-[#E6E6E6] border-t-[1px] text-[#414141] rounded-t-xl overflow-hidden">
        <thead>
          <tr className="p-2 m-2 bg-[#0A1070] text-white">
            {[
              'Test Case ID',
              'Title/Description',
              'Preconditions',
              'Test Steps',
              'Expected Results',
              'Actual Results',
              'Date',
              'Status',
              'Author',
              'Comments',
            ].map((header) => (
              <th key={header} className="p-2 m-2 border border-[#E6E6E6]">
                <h3 className="rounded-lg inline-block px-2 py-1">{header}</h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase, index) => (
            <tr
              key={testCase.id}
              className="p-2 m-2 border-b-[0.5px] border-[#E6E6E6] hover:bg-[#F9FAFF]"
              style={{
                borderLeft: '1px solid #E6E6E6',
                borderRight: '1px solid #E6E6E6',
              }}
            >
              {Object.keys(testCase).map((field) => (
                <td key={field} className="p-2 m-2 border border-[#E6E6E6]">
                  {field === 'date' ? (
                    <input
                      type="date"
                      value={testCase[field]}
                      onChange={(e) => handleTestCaseChange(index, field, e.target.value)}
                      className="w-full p-2"
                    />
                  ) : (
                    <textarea
                      value={testCase[field]}
                      onChange={(e) => handleTestCaseChange(index, field, e.target.value)}
                      className="w-full h-full p-2"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManualTestTable;
