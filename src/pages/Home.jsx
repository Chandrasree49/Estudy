import Banner from "../component/Banner";
import StudySessions from "./StudySessions";
import Tutors from "./Tutors";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div style={{ margin: "5%" }}>
        <StudySessions></StudySessions>
      </div>
      <div style={{ margin: "5%" }}>
        <Tutors></Tutors>
      </div>
    </div>
  );
};

export default Home;
