import { GetServerSideProps } from "next";
import React from "react";
import css from "./search.module.scss";
import ResultList from "../../components/SearchResult/ResultList";
import { PrismaClient, User } from "@prisma/client";

interface SearchPageProps {
  users: User[];
  query: string;
}

const SearchPage = ({ users, query }: SearchPageProps) => {
  return (
    <div className={css["search__container"]}>
      <div className={css["filter"]}>
        <h1 className={css["filter-header"]}>Filter</h1>
      </div>
      <div className={css["search"]}>
        {users.length > 0 ? (
          <ResultList users={users} />
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
  const query = context.query.query as string;

  const prisma = new PrismaClient();
  const result = await prisma.user.findMany({
    where: {
      OR: [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  const users = JSON.parse(JSON.stringify(result));

  return { props: { users, query } };
};

export default SearchPage;
