import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptosNewsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "44995485dfmsh25ec6d4edbc231bp16fbf8jsn85a4ad69f08b",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptosNewsApiHeaders,
});

//news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}
//news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}
export const cryptosNewsApi = createApi({
  reducerPath: "cryptosNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptosNewsApi;

/*

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news',
  params: {safeSearch: 'Off', textFormat: 'Raw'},
  headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '44995485dfmsh25ec6d4edbc231bp16fbf8jsn85a4ad69f08b'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
 */
