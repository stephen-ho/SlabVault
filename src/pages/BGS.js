import { load } from "cheerio";

export const validateBGS = function(response) {
  const $ = load(response.data);
  const alert = $('.recNotF');
  return alert.length > 0 ? false : true;
};

export const parseBGS = function(response, company, certNum) {
  const $ = load(response.data);
  const data = {};
  const cardData = $('.cardDetail').eq(0).find('tr');
  data["Card Serial Number"] = certNum;
  for (let i = 0; i < cardData.length; i++) {
    const currentRow = cardData.eq(i);
    const header = currentRow.find('b').text();
    const value = currentRow.find('td').eq(2).text();
    data[header] = value;
    data["Grading Company"] = company;
  }
  return data;
}