import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import * as eventApi from "../api/event";
import { useToast } from "@chakra-ui/react";

const UpdateEventContext = createContext();

export const EventContext = createContext();
export const useEvent = () => useContext(EventContext);
export const useEventUpdate = () => useContext(UpdateEventContext);

export const EventProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [event, setEvent] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const refreshEvent = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await eventApi.getAllEvents();
      setEvent(data.data);
    } catch (error) {
      setError(error);
      toast({
        title: "Events kunnen niet opgehaald worden",
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
      refreshEvent();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshEvent]);

  const value = useMemo(
    () => ({
      event,
      error,
      loading,
    }),
    [event, error, loading]
  );

  return (
    <EventContext.Provider value={value}>
      <UpdateEventContext.Provider value={refreshEvent}>
        {children}
      </UpdateEventContext.Provider>
    </EventContext.Provider>
  );
};
