// import React, { useReducer, useEffect, useState } from "react";
// import "./App.css";
// import Select from "react-select";
// import { useHttpWithId } from "./useHttpWithId";
// const POPULATE_STATE = "populateState";
// const CLEAR = "clear";
// const POPULATE_TOWN = "populateTown";
// const POPULATE_CITY = "populateCity";
// const initialState = {
//   disableCountry: false,
//   disableState: true,
//   disableTown: true,
//   stateToBeLoaded: [],
//   townToBeLoaded: [],
//   arr: []
// };
// function reducer(state, action) {
//   switch (action.type) {
//     case POPULATE_STATE:
//       return {
//         ...state,
//         disableCountry: true,
//         disableState: false,
//         disableTown: true,
//         stateToBeLoaded: action.payload,
//         arr: [action.payload]
//       };
//     case POPULATE_TOWN:
//       return {
//         ...state,
//         disableCountry: true,
//         disableState: false,
//         disableTown: false,
//         stateToBeLoaded: action.payload,
//         arr: [...state.arr, action.payload]
//       };
//     case POPULATE_CITY:
//       return {
//         ...state,
//         // stateToBeLoaded: action.payload,
//         arr: [...state.arr, action.payload]
//       };
//     case CLEAR:
//       return initialState;
//     default:
//       return initialState;
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [fetchedDataWithId] = useHttpWithId(`&id=${state.stateToBeLoaded}`, [
//     state.stateToBeLoaded
//   ]);
//   console.log(state.stateToBeLoaded);
//   console.log(fetchedDataWithId);
//   return (
//     <div className="App">
//       <Select
//         isDisabled={state.disableCountry}
//         placeholder="Select Country..."
//         name="country"
//         options={fetchedDataWithId ? fetchedDataWithId : null}
//         onChange={e => dispatch({ type: POPULATE_STATE, payload: e.value })}
//       />

//       {!state.disableState && (
//         <Select
//           isDisabled={state.disableState}
//           placeholder="Select State..."
//           name="state"
//           options={fetchedDataWithId}
//           onChange={e => dispatch({ type: POPULATE_TOWN, payload: e.value })}
//         />
//       )}
//       {!state.disableTown && fetchedDataWithId.length !== 0 && (
//         <Select
//           isDisabled={state.disableTown}
//           placeholder="Select town..."
//           name="town"
//           options={fetchedDataWithId}
//           onChange={e => dispatch({ type: POPULATE_CITY, payload: e.value })}
//         />
//       )}

//       <button type="button" onClick={() => console.log(state.arr)}>
//         Clear
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectContainer from "./SelectContainer";
import axios from "axios";
class App extends Component {
  state = {
    first_level: [],
    second_level: [],
    third_level: [],
    options: []
  };
  componentDidMount() {
    this.apiCall("first_level");
  }
  apiCall = (name, id) => {
    if (name === "first_level") {
      axios
        .get(
          `https://cloud-fabrica.herokuapp.com/test/api/v1/createDefaultForm/listCustomerExecutiveForm?adminId=5ce17df0c387f00017a0531a&companyName=airtel&type=services`
        )
        .then(res =>
          this.setState({
            [name]: res.data.result.immediateData
          })
        );
    } else {
      axios
        .get(
          `https://cloud-fabrica.herokuapp.com/test/api/v1/createDefaultForm/listCustomerExecutiveForm?adminId=5ce17df0c387f00017a0531a&companyName=airtel&type=services&id=${id}`
        )
        .then(res =>
          this.setState({
            [name]: res.data.result.immediateData
          })
        );
    }
  };
  onChange = (e, level) => {
    this.apiCall(level, e.value);
    console.log(e, level);
  };
  render() {
    let { first_level, second_level, third_level } = this.state;
    console.log(this.state);
    return (
      <div>
        {first_level.length > 0 ? (
          <SelectContainer
            options={first_level}
            onChange={e => this.onChange(e, "second_level")}
          />
        ) : null}
        {first_level.length > 0 && second_level.length > 0 ? (
          <SelectContainer
            options={second_level}
            onChange={e => this.onChange(e, "third_level")}
          />
        ) : null}
        {first_level.length > 0 &&
        second_level.length > 0 &&
        third_level.length > 0 ? (
          <SelectContainer options={third_level} />
        ) : null}
      </div>
    );
  }
}
export default App;
