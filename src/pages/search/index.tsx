import React from "react";
import css from "./search.module.scss";
import ResultList from "../../components/SearchResult/ResultList";
import { User } from "@prisma/client";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useRouter } from "next/router";
import { UserPersonalDataService } from "../../service/userService";
import { GetServerSideProps } from "next";

interface SearchPageProps {
  users: User[];
  query: string;
  filter: string;
}

const SearchPage = ({ users, query, filter }: SearchPageProps) => {
  const router = useRouter();

  const handleSearch = (searchedQuery: string | undefined) => {
    if (searchedQuery !== query) {
      router.push(`/search?f=${filter}&q=${searchedQuery}`);
    }
  };

  const handleFilter = (selectedFilter: string) => {
    if (selectedFilter !== filter) {
      router.push(`/search?f=${selectedFilter}&q=${query}`);
    }
  };

  return (
    <div className={css["search__container"]}>
      <div className={css["filter"]}>
        <h1 className={css["filter-header"]}>Filter</h1>
        <ul className={css["filter-options"]}>
          <li
            onClick={() => handleFilter("name")}
            className={
              filter === "name"
                ? `${css["active"]} ${css["filter-option"]}`
                : css["filter-option"]
            }
          >
            Name
          </li>
          <li
            onClick={() => handleFilter("title")}
            className={
              filter === "title"
                ? `${css["active"]} ${css["filter-option"]}`
                : css["filter-option"]
            }
          >
            Title
          </li>
        </ul>
      </div>
      <div className={css["search"]}>
        <div className={css["searchbar"]}>
          <SearchBar onSubmit={handleSearch} placeHolder="Search..." />
        </div>
        {users.length > 0 ? (
          <ResultList users={users} />
        ) : query === "" ? (
          <></>
        ) : (
          <h1 className={css["no-result"]}>No result found for : {query}</h1>
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
  let result: User[] = [];

  if (query) {
    switch (filter) {
      case "name":
        result = await UserPersonalDataService.findByFirstORlastName(query);
        break;
      case "title":
        result = await UserPersonalDataService.findByTitle(query);
        break;
    }
  }

  const users: User[] = JSON.parse(JSON.stringify(result));

  return { props: { users, query, filter } };
};

export default SearchPage;
