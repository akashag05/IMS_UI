import React from "react";

const PageHeading = (props: any) => {
  return (
    <div className="border-b pb-2">
      <p className="text-lg">{props.heading}</p>
    </div>
  );
};

export default PageHeading;
