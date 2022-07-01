import UserList from "../../components/User/UserList";
import useAxios from "../../hook/useAxios";
import NoteEntity from "../../models/UserEntity";

interface HomeProps {
  users: NoteEntity[];
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
  const axios = useAxios();

  const { data } = await axios.get("/users");
  return { users: data };
};

export default Home;
