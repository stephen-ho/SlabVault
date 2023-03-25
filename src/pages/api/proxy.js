const axios = require('axios');

export default function handler(req, res) {
  axios({
    method: 'get',
    headers: {
      "Content-Type": "text/html",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    },
    url: 'https://www.psacard.com/cert/71064017',
  })
  .then((response) => {
    res.status(200).json(response.data)
  });
}