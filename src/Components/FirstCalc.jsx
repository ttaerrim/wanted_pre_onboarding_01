import React, { useState, useEffect } from "react";
import style from "./FirstCalc.module.css";

const FirstCalc = () => {
  const [quotes, setQuotes] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [nation, setNation] = useState("krw");
  //아래 state 하나로 합치기 ->리팩토링
  const [sendMoney, setSendMoney] = useState(0);
  const [getMoney, setGetMoney] = useState(0);

  const [isShow, setIsShow] = useState(false);

  
  const access_key = "4e8b4a82ea5e0ae977ad9426c136f301";
  const getCurrency = async () => {
    const response = await fetch(
      "http://api.currencylayer.com/live?access_key=" + access_key
    );
    const json = await response.json();
    setQuotes(json.quotes);
  };

  useEffect(getCurrency, []);

  const handleChangeCountry = (event) => {
    switch (event.target.value) {
      case "krw":
        setExchangeRate(quotes.USDKRW);
        break;
      case "jpy":
        setExchangeRate(quotes.USDJPY);
        break;
      case "php":
        setExchangeRate(quotes.USDPHP);
        break;
    }
    setIsShow(false);
    setNation(event.target.value.toUpperCase());
  };

  const handleSendMoney = (e) => {
    setSendMoney(e.target.value);
  };

  const handleSubmit = () => {
    setGetMoney((curr) => (sendMoney * exchangeRate).toLocaleString());
    setIsShow(true);
  };

  return (
    <>
      <h1>환율 계산</h1>
      <div>
        <div>
          <p>송금국가: 미국 (USD)</p>
          <div>
            수취국가:
            <select onChange={handleChangeCountry}>
              <option value="krw" select="true">
                한국(KRW)
              </option>
              <option value="jpy">일본(JPY)</option>
              <option value="php">필리핀(PHP)</option>
            </select>
          </div>

          <div>
            <p>
              환율 :{exchangeRate} {nation}/USD
            </p>
          </div>

          <div>
            <p>
              송금액:
              <input value={sendMoney} onChange={handleSendMoney} />
              USD
            </p>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div style={isShow ? { display: "inline-block" } : { display: "none" }}>
        <p>
          수취금액은 {getMoney} {nation} 입니다.
        </p>
      </div>
    </>
  );
};

export default FirstCalc;
