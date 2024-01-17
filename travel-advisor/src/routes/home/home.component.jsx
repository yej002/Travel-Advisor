import { Outlet } from 'react-router-dom';
import Banner from "../components/banner/banner";
import Service from "../components/service/service";
import Team from "../components/team/team";

const Home = () => {

  return (
    <div className="home">
      <Banner />
      <Service />
      <Team />
    </div>
  );
};

export default Home;
