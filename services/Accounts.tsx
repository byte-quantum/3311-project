import React, { useEffect, useState } from "react";

const Accounts = () => {
  const [AccountList, setAccountList] = useState(null);
  const data = async () => {
    const response = await fetch("http://localhost:8000/api/accounts", {
      method: "GET",
    });
    const data = await response.json();
    setAccountList(data);
  };
  console.log(AccountList);
};

export default Accounts;
