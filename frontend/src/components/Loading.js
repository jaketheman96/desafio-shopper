import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen bg-gray-200 absolute top-0 left-0 right-0 z-10">
      <div
        className="inline-block h-11 w-11 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite] absolute left-0 right-0 top-0 bottom-0 m-auto border-emerald-600"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
