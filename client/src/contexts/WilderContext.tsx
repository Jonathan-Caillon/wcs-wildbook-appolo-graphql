import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import IWilder from "../interface/IWilder";
import { getWilder } from "../wildersData";

interface WildersContextProps {
  wildersData: IWilder[];
  fetchData: () => void | Promise<void>;
}

export const WildersContext = createContext<WildersContextProps>({
  wildersData: [],
  fetchData: () => {},
});

export const WildersProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [wildersData, setWildersData] = useState<IWilder[]>([]);

  const fetchData = async (): Promise<void> => {
    const result = await getWilder();
    setWildersData(result.data);
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <WildersContext.Provider value={{ wildersData, fetchData }}>
      {children}
    </WildersContext.Provider>
  );
};

export const useWilders = () => {
  return useContext(WildersContext);
};
