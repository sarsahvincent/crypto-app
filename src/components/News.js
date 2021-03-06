import React, { useState } from "react";
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Select, Row, Typography, Col, Avatar, Card } from "antd";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);

  //wihtout shearch
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 8 : 30,
  });

  //with search functionality implimentation

  /*

  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory: "cryptocurrency",
    count: simplified ? 8 : 30,
  });


   */

  console.log("news", cryptoNews?.value);
  if (!cryptoNews?.value) return "Loading...";
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="slect-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children
                  .toLowerCase()
                  .indexOf(input.toLocaleLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreference">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name.length > 100
                      ? `${news.name.substring(0, 100)} ...`
                      : news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="images"
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                    />
                    <Text className="proiveder-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default News;
