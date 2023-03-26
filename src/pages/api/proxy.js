const axios = require('axios');

export default function handler(req, res) {
  const company = req.query.company;
  const certNum = req.query.certNum;
  let companyURL = ``;

  if (company === "PSA") {
    companyURL = `https://www.psacard.com/cert/${certNum}`;
  } else if (company === "CGC") {
    companyURL = `https://www.cgccards.com/certlookup/${certNum}`;
  } else {
    companyURL = `https://www.beckett.com/grading/card-lookup?item_type=BGS&item_id=${certNum}`;
  };

  axios({
    method: 'get',
    headers: {
      "Content-Type": "text/html",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    },
    url: companyURL,
  })
  .then((response) => {
    res.status(200).json(response.data)
  });
}