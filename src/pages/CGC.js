import { load } from "cheerio";

export const validateCGC = function(response) {
  const $ = load(response.data);
  const cardData = $('dl');
  return cardData.length === 0 ? false : true;
};

export const parseCGC = function(response, company) {
  const $ = load(response.data);
  const data = {};
  const cardData = $('dl');
  for (let i = 0; i < cardData.length; i++) {
    const currentRow = cardData.eq(i);
    const header = currentRow.find('dt').text();
    const value = currentRow.find('dd').text();
    data[header] = value;
    data["Grading Company"] = company;
  }
  return data;
}