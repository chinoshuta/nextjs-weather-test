import type { GetStaticProps, NextPage } from "next";
import Image from 'next/image';
import styled from "styled-components";
import axios from "axios";
import { prefectures, PrefectureType } from "../../constants/prefectures";

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

export const getStaticPaths = async () => {
  const paths = prefectures.map(({ code }: PrefectureType) => ({
    params: {
      prefecture: code.toString(),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiParams = {
    units: "metric",
    appid,
    lang: "ja",
    id: params?.prefecture,
  };
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: apiParams,
    }
  );
  const props: Props = {
    weatherData: {
      name: data?.name,
      description: data?.weather[0]?.description,
      icon: data?.weather[0].icon,
      temp: data?.main.temp,
    },
  };
  return { props, revalidate: 600 };
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
          <Image src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} />
        )}
        <br />
        {weatherData?.temp}度
      </HomeWrapper>
    </>
  );
};

export default Home;
