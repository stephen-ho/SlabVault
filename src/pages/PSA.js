import { load } from "cheerio";

export const validatePSA = function(response) {
  const $ = load(response.data);
  const alert = $('.glyphicon-alert');
  return alert.length > 0 ? false : true;
};

export const parsePSA = function(response, company) {
  const $ = load(response.data);
  const data = {};
  const cardData = $('tr');
  for (let i = 0; i < cardData.length; i++) {
    const currentRow = cardData.eq(i);
    const header = currentRow.find('th').text();
    const value = currentRow.find('td').text();
    data[header] = value;
    data["Grading Company"] = company;
  }
  return data;
};