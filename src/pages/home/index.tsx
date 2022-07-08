import UserList from "../../components/User/UserList";
import { GetServerSideProps } from "next";
import { UserPersonalDataService } from "../../service/userService";
import { User } from "@prisma/client";

interface HomeProps {
  users: User[] | null;
}

const Home = ({ users }: HomeProps) => {
  return (
    <div>
      <h1 className="font-bold text-5xl text-green-800">Users</h1>
      <UserList users={users} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const users = await UserPersonalDataService.findAll();
  return { props: { users: users } };
};

export default Home;
