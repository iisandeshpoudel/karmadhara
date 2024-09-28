import React from 'react';

function PublicLayout({ children }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 to-[#111827] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex content-center items-center justify-center">
          <div className="w-full lg:w-[40%] px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PublicLayout;
