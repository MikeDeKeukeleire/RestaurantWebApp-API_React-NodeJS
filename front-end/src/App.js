import "./App.css";
import Home from "./pages/Home";
import Kaart from "./pages/Kaart";
import Evenementen from "./pages/Evenementen";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AuthHome from "./pages/AuthHome";
import PrivateRoute from "./components/PrivateRoute";
import AuthKaart from "./pages/AuthKaart";
import AuthEvents from "./pages/AuthEvents";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { MenuProvider } from "./contexts/MenuProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { EventProvider } from "./contexts/EventProvider";
import { ChakraProvider } from "@chakra-ui/provider";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <EventProvider>
          <MenuProvider>
            <Router>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/kaart" exact>
                  <Kaart />
                </Route>
                <Route path="/evenementen" exact>
                  <Evenementen />
                </Route>
                <Route path="/contact" exact>
                  <Contact />
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
                <PrivateRoute path="/authhome" exact>
                  <AuthHome />
                </PrivateRoute>
                <PrivateRoute path="/authkaart" exact>
                  <AuthKaart />
                </PrivateRoute>
                <PrivateRoute path="/authevents" exact>
                  <AuthEvents />
                </PrivateRoute>
              </Switch>
            </Router>
          </MenuProvider>
        </EventProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
