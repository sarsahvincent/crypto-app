import { render } from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./App.css";
import {
  Navbar,
  HomePage,
  Exchanges,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/exchanges" exact element={<Exchanges />} />
              <Route
                path="/Cryptocurrencies"
                exact
                element={<Cryptocurrencies />}
              />
              <Route path="/crypto/:coinId" exact element={<CryptoDetails />} />
              <Route path="/news" exact element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer" level={5}>
          <Typography.Title style={{ color: "white", textAlign: "center", fontSize:'18px' }}>
            Algo Crypto <br /> All rights reserved
          </Typography.Title>
          <Typography.Title>
            <Space style={{fontSize:'18px'}}>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/nesw">News</Link>
            </Space>
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}

export default App;
