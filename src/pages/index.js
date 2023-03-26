import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from "axios";
import { load } from "cheerio";
import { useState } from "react";
import CardInfo from "./CardInfo";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [cardInfo, setCardInfo] = useState({});
  const [certNum, setCertNum] = useState("");
  const [isCardInfo, setIsCardInfo] = useState(true);
  const [company, setCompany] = useState("PSA");

  function fetchInfo() {
    axios.get(`/api/proxy?company=${company}&certNum=${certNum}`)
    .then((response) => {
      const $ = load(response.data);
      const alert = $('.glyphicon-alert');
      if (alert.length > 0) {
        setIsCardInfo(false);
      } else {
        const cardData = $('tr');
        const data = {};
        for (let i = 0; i < cardData.length; i++) {
          const currentRow = cardData.eq(i);
          const header = currentRow.find('th').text();
          const value = currentRow.find('td').text();
          data[header] = value;
        }
        setCardInfo(data);
        setIsCardInfo(true);
      }
    });
  }

  function handleChange(e) {
    setCertNum(e.target.value);
  }

  function handleCompany(e) {
    setCompany(e.target.value);
  }

  const cardContent = isCardInfo ? (<CardInfo cardInfo={cardInfo} />) : (<div>Invalid Certification Number</div>);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="header">
          <h1>SlabVault</h1>
        </div>
        <div className="cardInput">
          <form>
            <select onChange={handleCompany}>
              <option value="PSA">PSA</option>
              <option value="CGC">CGC</option>
              <option value="BGS">BGS</option>
            </select>
            <label>Certification #:</label>
            <input type="text" name="certNo" value={certNum} onChange={handleChange}/>
          </form>
          <button onClick={fetchInfo}>Click Me!</button>
        </div>
        {cardContent}
      </main>
    </>
  )
}
