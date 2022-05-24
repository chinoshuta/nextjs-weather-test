import type { GetServerSideProps, NextPage } from "next";
import Image from 'next/image';
import styled from "styled-components";
import axios from "axios";

type wetherDataType = {
  name: string;
  description: string;
  temp: string;
  icon: string;
};

type Props = {
  weatherData: wetherDataType;
};

const HomeWrapper = styled.div`
  max-width: 420px;
  width: auto;
  margin: 0 auto;
  text-align: center;
`;

const appid = "e5cdf193f04cfcc5a83be300d1f957f5";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { prefecture } = context.query;
  const params = { units: "metric", appid, lang: "ja", id: prefecture };
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params,
    }
  );
  const props: Props = {
    weatherData: {
      name: data.name,
      description: data.weather[0]?.description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
    },
  };
  return { props };
};

const Home: NextPage<Props> = ({ weatherData }) => {
  return (
    <>
      <HomeWrapper>
        <h1>{weatherData?.name}</h1>
        <br />
        {weatherData?.description}
        <br />
        {weatherData?.icon && (
          <Image width={100} height={100} src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} />
        )}
        <br />
        {weatherData?.temp}度
      </HomeWrapper>
    </>
  );
};

export default Home;
