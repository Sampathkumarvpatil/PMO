import PieChart from "./PieChart";
import ReportPieChart from "./ReportPieChart";

function TestResult({ sidebarToggle }) {
    return (
        <section className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"
            }`}>
            <div className="ml-12 mr-8" >
                <div className="flex justify-between">
                    <div className="mt-8 border shadow px-4 py-6 flex-1 mr-4" style={{ backgroundColor: '#b6e7e9' }}>
                        <h2 className="text-xl mb-4">Started At</h2>
                        <p className="text-2xl">May 20,2024 07:55:12 AM</p>
                    </div>
                    <div className="mt-8 border shadow px-4 py-6 flex-1 mr-4" style={{ backgroundColor: '#b6e7e9' }}>
                        <h2 className="text-xl mb-4">Ended At</h2>
                        <p className="text-2xl">May 20,2024 07:55:12 AM</p>
                    </div>
                    <div className="mt-8 border shadow px-4 py-6 flex-1 mr-4" style={{ backgroundColor: '#c0ebc0' }}>
                        <h2 className="text-xl mb-4">Number of Tests Passed</h2>
                        <p className="text-2xl" style={{ color: 'green' }}>0</p>
                    </div>
                    <div className="mt-8 border shadow px-4 py-6 flex-1 mr-4" style={{ backgroundColor: '#efc7c7' }}>
                        <h2 className="text-xl mb-4">Number of Tests Failed</h2>
                        <p className="text-2xl" style={{ color: 'red' }}>1</p>
                    </div>
                </div>
                <div className="grid grid-cols-[49%,49%] justify-between mt-12">
                    <div className="chart-container" style={{ paddingTop: '44px', border: '1px solid' }}>
                        <ReportPieChart />
                        <span className="flex flex-row items-center mx-4 mt-8 " style={{ borderTop: '1px solid' }}>
                            <h1 className="text-2xl font-bold mt-4" style={{ color: 'green' }}>0</h1>
                            <p className="text-lg mt-4">&nbsp;tests passed</p>
                        </span>
                        <span className="flex flex-row items-center ml-4 mt-2" >
                            <h1 className="text-2xl font-bold" style={{ color: 'red' }}>1</h1>
                            <p className="text-lg">&nbsp;tests failed,</p>
                            <h1 className="text-2xl font-bold" style={{ color: 'blue' }}>1</h1>
                            <p className="text-lg">&nbsp;skipped,</p>
                            <h1 className="text-2xl font-bold">0</h1>
                            <p className="text-lg">&nbsp;others,</p>
                        </span>
                    </div>
                    <div className="chart-container" style={{ paddingTop: '44px', border: '1px solid' }}>
                        <PieChart />
                        <span className="flex flex-row items-center mx-4 mt-8 " style={{ borderTop: '1px solid' }}>
                            <h1 className="text-2xl font-bold mt-4" style={{ color: 'green' }}>0</h1>
                            <p className="text-lg mt-4">&nbsp;events passed</p>
                        </span>
                        <span className="flex flex-row items-center ml-4 mt-2">
                            <h1 className="text-2xl font-bold" style={{ color: 'red' }}>2</h1>
                            <p className="text-lg">&nbsp;events failed,</p>
                            <h1 className="text-2xl font-bold">0</h1>
                            <p className="text-lg">&nbsp;others,</p>
                        </span>
                    </div>
                </div>
            </div>
            <div></div>
        </section>

    )
}
export default TestResult;
