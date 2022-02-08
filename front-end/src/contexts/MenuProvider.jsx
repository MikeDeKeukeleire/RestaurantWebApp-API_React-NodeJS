import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import * as menuApi from "../api/menu";
import { useToast } from "@chakra-ui/react";

const UpdateMenuContext = createContext();

export const MenuContext = createContext();
export const useMenu = () => useContext(MenuContext);
export const useMenuUpdate = () => useContext(UpdateMenuContext);

export const MenuProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const refreshMenu = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await menuApi.getAllMenus();
      setMenu(data.data);
    } catch (error) {
      setError(error);
      toast({
        title: "Menus kunnen niet opgehaald worden",
        description: "Contacteer de website beheerder voor verdere info",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!initialLoad) {
      refreshMenu();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshMenu]);

  const value = useMemo(
    () => ({
      menu,
      error,
      loading,
    }),
    [menu, error, loading]
  );

  return (
    <MenuContext.Provider value={value}>
      <UpdateMenuContext.Provider value={refreshMenu}>
        {children}
      </UpdateMenuContext.Provider>
    </MenuContext.Provider>
  );
};
