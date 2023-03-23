import React from "react";

function Loading() {
  return (
      <div className="flex items-center">
        <span className="h-6 w-6 mx-2 block rounded-full border-4 border-t-black animate-spin"></span>
      </div>
  );
}

export default Loading;