import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from "axios";
import { load } from "cheerio";
import { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import Table from "./Table";
import { validatePSA, parsePSA } from "./PSA";
import { validateCGC, parseCGC } from "./CGC";
import { validateBGS, parseBGS } from "./BGS";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [cardInfo, setCardInfo] = useState({});
  const [certNum, setCertNum] = useState("");
  const [isCardInfo, setIsCardInfo] = useState(true);
  const [company, setCompany] = useState("PSA");
  const [searched, setSearched] = useState([]);

  const companies = ['PSA', 'CGC', 'BGS'];

  const companyOptionElements = companies.map((company) => {
    return (
      <option key={company} value={company}>{company}</option>
    );
  });

  useEffect(() => {
    console.log(searched);
  }, [searched])

  function fetchCardInfo() {
    axios.get(`/api/proxy?company=${company}&certNum=${certNum}`)
    .then((response) => {
      const isValid = validateResponse(response, company);
      setIsCardInfo(isValid);

      if (isValid) {
        const data = parseCardInfo(response, company, certNum);
        setCardInfo(data);
        setSearched((searched) => [...searched, data]);
      }
    });
  }

  function validateResponse(response, company) {
    if (company === "PSA") {
      return validatePSA(response);
    }
    if (company === "CGC") {
      return validateCGC(response);
    }
    if (company === "BGS") {
      return validateBGS(response);
    }
    return false;
  }

  function parseCardInfo(response, company, certNum) {
    if (company === "PSA") {
      return parsePSA(response, company);
    }
    if (company === "CGC") {
      return parseCGC(response, company);
    }
    if (company === "BGS") {
      return parseBGS(response, company, certNum);
    }
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
        <title>SlabVault</title>
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
            <select className="form-select" onChange={handleCompany}>
              {companyOptionElements}
            </select>
            <input
              className="form-control"
              type="text"
              name="certNo"
              placeholder="Certification #"
              value={certNum}
              onChange={handleChange}
            />
          </form>
          <button className="btn btn-primary" onClick={fetchCardInfo}>Click Me!</button>
        </div>
        {cardContent}
        <Table company={company} searched={searched} />
      </main>
    </>
  )
}
