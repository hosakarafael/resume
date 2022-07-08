import { User } from "@prisma/client";

import React, { useContext, useEffect, useState } from "react";
import getAxios from "../utils/getAxios";

interface UserContextInterface {
  user: User;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<Partial<UserContextInterface>>({});

UserContext.displayName = "UserContext";

export function useUserContext() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: JSX.Element;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getUser() {
      const { data } = await getAxios().get("/auth/cookie/user");
      setUser(data);
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser } as UserContextInterface}>
      {children}
    </UserContext.Provider>
  );
}
