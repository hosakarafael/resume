import React, { useState } from "react";
import css from "./search.module.scss";
import ResultList from "../../components/SearchResult/ResultList";
import { User } from "@prisma/client";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useRouter } from "next/router";
import {
  AgeFilterInterface,
  UserPersonalDataService,
} from "../../service/userService";
import { GetServerSideProps } from "next";
import _ from "lodash";

interface SearchPageProps {
  users: User[];
  q: string;
  f: string;
  minA?: string;
  maxA?: string;
}

const SearchPage = ({ users, q, f, minA, maxA }: SearchPageProps) => {
  const router = useRouter();
  const filterOptions = ["name", "title"];
  const [query, setQuery] = useState(q);
  const [filter, setFilter] = useState(f);
  const [minAge, setMinAge] = useState(minA);
  const [maxAge, setMaxAge] = useState(maxA);

  const handleSearch = (searchedQuery: string | undefined) => {
    setQuery(searchedQuery ?? "");
  };

  const handleFilterSelected = (selectedFilter: string) => {
    setFilter(selectedFilter ?? "");
  };

  const applyFilter = () => {
    let url = `/search?f=${filter}&q=${query}`;
    if (minAge) {
      url += `&minA=${minAge}`;
    }
    if (maxAge) {
      url += `&maxA=${maxAge}`;
    }
    router.push(url);
  };

  const getSelectableFilter = () => {
    return (
      <ul className={css["filter-options"]}>
        {filterOptions.map((option) => (
          <li
            key={option}
            onClick={() => handleFilterSelected(option)}
            className={
              filter === option
                ? `${css["active"]} ${css["filter-option"]}`
                : css["filter-option"]
            }
          >
            {_.upperFirst(option)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={css["search__container"]}>
      <div className={css["filter"]}>
        <div>
          <h1 className={css["filter-header"]}>Filter</h1>
          {getSelectableFilter()}
          <div className={css["filter-age"]}>
            <span>Min Age</span>
            <span>Max age</span>
            <select
              value={minAge}
              onChange={(e) => setMinAge(e.currentTarget.value)}
              className="form-select"
            >
              <option key="" value=""></option>
              {[...Array(10).keys()].map((index) => (
                <option key={(index + 1) * 10} value={(index + 1) * 10}>
                  {(index + 1) * 10}
                </option>
              ))}
            </select>
            <select
              value={maxAge}
              onChange={(e) => setMaxAge(e.currentTarget.value)}
              className="form-select"
            >
              <option key="" value=""></option>
              {[...Array(10).keys()].map((index) => (
                <option key={(index + 1) * 10} value={(index + 1) * 10}>
                  {(index + 1) * 10}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={css["filter-btn__container"]}>
          <button
            onClick={applyFilter}
            className="btn btn--primary btn--stretched"
          >
            Apply filter
          </button>
        </div>
      </div>
      <div className={css["search"]}>
        <div className={css["searchbar"]}>
          <SearchBar
            onSubmit={applyFilter}
            onChange={handleSearch}
            placeHolder="Search..."
          />
        </div>
        {users.length > 0 ? (
          <ResultList users={users} />
        ) : q === "" ? (
          <></>
        ) : (
          <h1 className={css["no-result"]}>No result found</h1>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const query = context.query.q as string;
  const filter = context.query.f as string;
  const minAge = context.query.minA as string;
  const maxAge = context.query.maxA as string;

  let result: User[] = [];

  const ageFilter: AgeFilterInterface = {};

  if (query) {
    if (minAge || maxAge) {
      ageFilter.age = {};
      if (minAge) {
        ageFilter.age.gte = parseInt(minAge);
      }
      if (maxAge) {
        ageFilter.age.lte = parseInt(maxAge);
      }
    }

    switch (filter) {
      case "name":
        result = await UserPersonalDataService.findByFirstORlastName(
          query,
          ageFilter
        );
        break;
      case "title":
        result = await UserPersonalDataService.findByTitle(query, ageFilter);
        break;
    }
  }

  const users: User[] = JSON.parse(JSON.stringify(result));

  return {
    props: {
      users,
      q: query,
      f: filter,
      minA: minAge ?? "",
      maxA: maxAge ?? "",
    },
  };
};

export default SearchPage;
