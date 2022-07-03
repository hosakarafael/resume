import UserList from "../../components/User/UserList";
import getAxios from "../../utils/getAxios";
import UserEntity from "../../models/UserEntity";

interface HomeProps {
  users: UserEntity[];
}

const Home = ({ users }: HomeProps) => {
  return (
    <div>
      <h1 className="font-bold text-5xl text-green-800">Users</h1>
      <UserList users={users} />
    </div>
  );
};

Home.getInitialProps = async () => {
  const axios = getAxios();

  const { data } = await axios.get("/users");
  return { users: data };
};

export default Home;
