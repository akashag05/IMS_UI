// import React, { useState, useRef, useEffect } from "react";
// import CloseIcon from "@mui/icons-material/Close";

// const MultiselectDropdown = () => {
//   const [selectedItems, setSelectedItems] = useState<any>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const selectRef = useRef(null);

//   const options: any = ["USA", "UK", "Canada"];

//   const handleCheckboxChange = (option: any) => {
//     if (selectedItems.includes(option)) {
//       setSelectedItems(selectedItems.filter((item) => item !== option));
//     } else {
//       setSelectedItems([...selectedItems, option]);
//     }
//   };

//   const handleRemoveItem = (item) => {
//     setSelectedItems(
//       selectedItems.filter((selectedItem) => selectedItem !== item)
//     );
//   };

//   const handleToggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (selectRef.current && !selectRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="mt-2">
//       <div className="mb-1 block text-black dark:text-white">
//         <label>Select Credential Profile</label>
//       </div>
//       <div
//         ref={selectRef}
//         className="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-1 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
//       >
//         <div
//           className="flex items-center cursor-pointer"
//           onClick={handleToggleDropdown}
//         >
//           <div className="w-full">
//             {selectedItems.length > 0 ? (
//               <div className="flex flex-wrap">
//                 {selectedItems.map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-center border-2 rounded-lg m-1 px-1"
//                   >
//                     <span className="mr-2">{item}</span>
//                     <CloseIcon
//                       fontSize="12px"
//                       //   icon={faTimes}
//                       className="text-red-500 cursor-pointer"
//                       onClick={() => handleRemoveItem(item)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <span className="opacity-50">Select</span>
//             )}
//           </div>
//         </div>
//         {isOpen && (
//           <div
//             className="absolute top-full left-0 w-full rounded-lg border-2 dark:bg-form-input"
//             style={{ backgroundColor: "white" }}
//           >
//             {options.map((option: any) => (
//               <div
//                 key={option}
//                 className="flex items-center p-2 border-b-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   id={option}
//                   onChange={() => handleCheckboxChange(option)}
//                   checked={selectedItems.includes(option)}
//                 />
//                 <label
//                   htmlFor={option}
//                   className="ml-2"
//                   onClick={() => handleCheckboxChange(option)}
//                 >
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiselectDropdown;
import React from "react";

const MultiSelect = () => {
  return <div>MultiSelect</div>;
};

export default MultiSelect;
