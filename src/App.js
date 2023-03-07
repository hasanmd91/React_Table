import React, { lazy, Suspense } from "react";
// import FilteringTable from "./Component/FilteringTable";
// import PaginationTablei from "./Component/PaginationTable";

const PaginationTable = lazy(() => import("./Component/PaginationTable"));

const App = () => {
  return (
    <>
      <Suspense fallback={<div>...Loading </div>}>
        <PaginationTable />
      </Suspense>
    </>
  );
};

export default App;
