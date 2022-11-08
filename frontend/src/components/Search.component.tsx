import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITopic } from "../types/type";
import { setQuery, setQuerySearch } from "../redux/features/topics";

import { useNavigate } from "react-router-dom";
interface ISearch {
  type: string;
  name: string;
  placeholder: string;
}

export const SearchComponent: FC<ISearch> = ({
  type,
  name,
  placeholder,

  ...props
}) => {
  const { databaseTopics, query } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryDataBase = databaseTopics.filter(({ topic }: ITopic) =>
    topic.includes(query.toLowerCase())
  );

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("queryString", JSON.stringify(queryDataBase));
    dispatch(setQuerySearch(queryDataBase));
    navigate("/searchresult");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(setQuery(event.target.value));
  };

  return (
    <Box>
      <form onSubmit={onSearchSubmit}>
        <input
          type={type}
          value={query}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};
const Box = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  position: absolute;
  align-item: center;
  left: 0;
  right: 0;
  input {
    padding: 1rem 16rem 1rem 1rem;
    border-radius: 1.5rem;
    outline: none;
    background: var(--light-gray);
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 500px) {
      padding: 1rem 10rem 1rem 1rem;
    }

    ::placeholder {
      font-style: italic;
      font-size: 10px;
    }
  }
  @media screen and (max-width: 500px) {
    top: 3rem;
  }
`;
