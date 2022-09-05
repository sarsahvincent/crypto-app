import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link, useLocation } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
// user?.firstName.toLowerCase().includes(searchTerm.toLowerCase() || user?.lastName.toLowerCase().includes(searchTerm.toLowerCase())

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [searchTerm, cryptosList]);

  if (isFetching) return "Loading...";
  return (
    <>
      {location.pathname === "/cryptocurrencies" ? (
        <div className="search-crypto">
          <Input
            type="text"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : null}

      <Row gutter={[34, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="icon"
                  />
                }
                title={`${currency.rank}. ${currency.name}`}
                hoverable
              >
                <p>Prince: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
