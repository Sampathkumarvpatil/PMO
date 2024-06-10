import React from "react";

export default function Modal({ modalContent, title }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="flex flex-row justify-center items-center ml-4 my-2  px-1 py-1 text-lg cursor-pointer bg-[#105AED] text-white rounded-lg"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <h3 className="px-1 py-1 text-lg cursor-pointer">Exception</h3>
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full max-w-3xl mx-auto my-6 h-full max-h-screen">
              {/*content*/}
              <div className="relative flex flex-col w-full h-full max-h-screen bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 py-2 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-red-600">
                    {title}
                  </h3>

                  <button
                    className="p-2 text-lg font-bold text-red-600 rounded-full"
                    onClick={() => setShowModal(false)}
                  >
                    ❌
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6 overflow-y-auto">
                  <p className="my-4 text-lg leading-relaxed text-blueGray-500">
                    {modalContent}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 py-1 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear bg-transparent outline-none focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
