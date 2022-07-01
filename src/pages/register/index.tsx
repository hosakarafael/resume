import React, { useState } from "react";
import useAxios from "../../hook/useAxios";

const New = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const axios = useAxios();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("/users", { firstName: firstName, lastName: lastName });
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <span>First name</span>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <span>Last name</span>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default New;
