import React from 'react';
import { usePDF } from 'react-to-pdf';
import { useLocation } from 'react-router-dom';

const Getpdf = ({sidebarToggle}) => {
  const data = useLocation().state;
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  return (
    <div>
      <div className={`flex justify-end m-4 transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
        <button
          onClick={() => toPDF()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
      <div ref={targetRef}>
        <h1 className='font-bold m-6 text-4xl text-center'>{data.desc}</h1>
        {Object.entries(data.sections).map(([sectionTitle, sectionData]) => (
          <div key={sectionTitle} className='m-6'>
            <h2 className="font-semibold text-3xl mx-4 my-2">{sectionTitle}</h2>
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Sr no.</th>
                  <th className="border border-gray-400 px-4 py-2">Content</th>
                  <th className="border border-gray-400 px-4 py-2">Votes</th>
                </tr>
              </thead>
              <tbody>
                {sectionData.map((div, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-400 px-4 py-2 text-center">{index}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{div.content}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">Votes: {div.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getpdf;
