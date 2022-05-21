import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { prefectures } from "../constants/prefectures";
import { useState } from "react";

const HomeWrapper = styled.div`
  width: 420px;
  margin: 0 auto;
  padding: 15px;
  text-align: center;
`;

const StyleSelect = styled.select`
  width: 150px;
  height: 30px;
`;

const options = [
  { value: "useeffect", label: "useEffect" },
  { value: "isr", label: "ISR" },
  { value: "ssr", label: "SSR" },
  { value: "ssg", label: "SSG" },
];

const Home: NextPage = () => {
  const [selectValue, setSelectValue] = useState<any>(options[0].value);
  return (
    <>
      <HomeWrapper>
        <h1>全国の現在の天気</h1>
        <StyleSelect
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {options.map((n) => (
            <option value={n.value} key={n.label}>
              {n.label}
            </option>
          ))}
        </StyleSelect>
        {prefectures.map(({ name, code }) => (
          <Link key={name} href={`/${selectValue}/${code}`}>
            <a>
              <p>{name} </p>
            </a>
          </Link>
        ))}
      </HomeWrapper>
    </>
  );
};

export default Home;
