import TestIcons from "./TestIcons";

function FailedTest({ sidebarToggle }) {
    return (
        <div
            className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"
                }`}
        >
            <div className="grid grid-cols-[5%,94%] justify-between">
                <div style={{backgroundColor:'#e2e3f3' }}>
                    <TestIcons />
                </div>
                <div className="grid grid-cols-[12%,38%,50%] mt-4 px-4">
                    <div style={{ borderRight: '1px solid' }}>
                        <h3 className="rounded-lg inline-block px-2 py-1" style={{ backgroundColor: '#aee7ae', color: 'green' }}>TIMESTAMP</h3>
                        <h1 className="px-4 py-8" >7:55:28 AM</h1>
                    </div>
                    <div style={{ borderRight: '1px solid' }}>
                        <h3 className="ml-2 rounded-lg inline-block px-2 py-1" style={{ backgroundColor: '#aee7ae', color: 'green' }}>SCREENSHOT</h3>
                        <img src="../dummy_img.png" width={500} style={{ height: '300px' }} className="ml-2 px-4 py-8"></img>
                    </div>
                    <div>
                        <h3 className="ml-2 rounded-lg inline-block px-2 py-1" style={{ backgroundColor: '#aee7ae', color: 'green' }}>EXCEPTION</h3>
                        <p className="ml-2 px-4 py-8 text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde obcaecati, culpa officiis est aliquid molestiae repudiandae. Nobis ipsam eos, sunt cum praesentium eius tenetur numquam a laborum, consequatur eligendi porro?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis animi et vitae nostrum nobis rem vel, cum amet aliquid rerum sint maxime error dolor itaque iure. Voluptas minima quo laboriosam!</p>
                    </div>
                    <div style={{ borderRight: '1px solid' }}>
                        <h1 className="px-4 py-8" >7:55:28 AM</h1>
                    </div>
                    <div style={{ borderRight: '1px solid' }}>
                        <img src="../dummy_img.png" width={500} style={{ height: '300px' }} className="ml-2 px-4 py-8"></img>
                    </div>
                    <div>
                        <p className="ml-2 px-4 py-8 text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde obcaecati, culpa officiis est aliquid molestiae repudiandae. Nobis ipsam eos, sunt cum praesentium eius tenetur numquam a laborum, consequatur eligendi porro?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis animi et vitae nostrum nobis rem vel, cum amet aliquid rerum sint maxime error dolor itaque iure. Voluptas minima quo laboriosam!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FailedTest;