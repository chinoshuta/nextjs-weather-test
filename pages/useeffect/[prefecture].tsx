import type { NextPage } from "next";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const HomeWrapper = styled.div`
  max-width: 420px;
  width: auto;
  margin: 0 auto;
  text-align: center;
`;

const appid = "e5cdf193f04cfcc5a83be300d1f957f5";

const Home: NextPage = () => {
  const router = useRouter();
  const [weatherData, setWetherData] = useState<any>();

  useEffect(() => {
    const { prefecture } = router.query;
    if (prefecture) {
      const params = { units: "metric", appid, lang: "ja", id: prefecture };
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params,
        })
        .then(({ data }) => {
          setWetherData(data);
        })
        .catch((e) => console.log(JSON.stringify(e)));
    }
  }, [router]);

  return (
    <>
      <HomeWrapper>
        <h1>{weatherData?.name}</h1>
        <br />
        {weatherData?.weather[0]?.description}
        <br />
        {weatherData?.weather[0].icon && (
          <Image src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
        )}
        <br />
        {weatherData?.main.temp}度
      </HomeWrapper>
    </>
  );
};

export default Home;
