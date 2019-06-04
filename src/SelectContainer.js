import React from "react";
import Select from "react-select";
function SelectContainer({ options, onChange }) {
  return (
    // <select onChange={onChange}>
    //   {options.map(option => {
    //     return (
    //       <option key={option.label} value={option.value}>
    //         {option.label}
    //       </option>
    //     );
    //   })}
    // </select>
    <Select
      isDisabled={false}
      placeholder="Select town..."
      name="town"
      options={options}
      onChange={onChange}
    />
  );
}

export default SelectContainer;
