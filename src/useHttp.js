import React, { useState, useEffect } from "react";
import axios from "axios";

export const useHttp = dependencies => {
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://cloud-fabrica.herokuapp.com/test/api/v1/createDefaultForm/listCustomerExecutiveForm?adminId=5ce17df0c387f00017a0531a&companyName=airtel&type=services`
      )
      .then(res => setFetchedData(res.data.result.immediateData));
  }, dependencies);

  return [fetchedData];
};
