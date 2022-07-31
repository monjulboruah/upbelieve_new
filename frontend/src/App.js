import { DataProvider } from "./GlobalState";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter as Router } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AllPages from "./components/AllPages";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <DataProvider>
        <Router>
          <AllPages />
          {/* <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="test" element={<Homepage />} />
              <Route path="all-incident" element={<Allincident />} />
              <Route path="create-incident" element={<CreateIncident />} />
              <Route path="edit-incident/:id" element={<EditIncident />} />
              <Route path="create-zone" element={<CreateZone />} />
              <Route path="all-zone" element={<AllZones />} />
              <Route
                path="product-classification"
                element={<ProductClassification />}
              />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={
                    <New inputs={productInputs} title="Add New Product" />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter> */}
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
