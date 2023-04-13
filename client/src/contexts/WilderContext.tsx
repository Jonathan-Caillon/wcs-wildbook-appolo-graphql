import { createContext, PropsWithChildren, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import IWilder from "../interface/IWilder";

interface WildersContextProps {
  wildersData: IWilder[];
  fetchData: () => void | Promise<void>;
}

export const WildersContext = createContext<WildersContextProps>({
  wildersData: [],
  fetchData: () => {},
});

const GET_WILDERS = gql`
  query GetAllWilders {
    getAllWilders {
      id
      name
      city
      skills {
        id
        name
      }
    }
  }
`;

export const WildersProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const { data, refetch } = useQuery(GET_WILDERS);
  const wildersData = data?.getAllWilders || [];
  const fetchData = async () => {
    await refetch();
  };

  return (
    <WildersContext.Provider value={{ wildersData, fetchData }}>
      {children}
    </WildersContext.Provider>
  );
};

export const useWilders = () => useContext(WildersContext);
