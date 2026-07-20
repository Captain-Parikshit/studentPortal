import React from "react";
import NavBar from "./shared/NavBar";
import Job from "./job";

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto my10">
        <h1 className="font-bold text-xl my-10">Search Result ({randomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((item, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
