import React from "react";

const CustomeButton = (props: any) => {
  return (
    <div className="inline-flex items-center justify-center rounded-md bg-primary py-1 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-6 cursor-pointer">
      {props.title}
    </div>
  );
};

export default CustomeButton;
