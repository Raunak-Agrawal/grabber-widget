import React, { useState, useEffect } from "react";
import axios from "axios";

export const useHttpWithId = (id, dependencies) => {
  const [fetchedDataWithId, setFetchedDataWithId] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://cloud-fabrica.herokuapp.com/test/api/v1/createDefaultForm/listCustomerExecutiveForm?adminId=5ce17df0c387f00017a0531a&companyName=airtel&type=services` +
          id
      )
      .then(res => setFetchedDataWithId(res.data.result.immediateData));
  }, dependencies);

  return [fetchedDataWithId];
};
