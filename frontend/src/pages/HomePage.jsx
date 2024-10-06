import Footer from "../components/Footer";
import Header from "../components/Header";
import TimerBox from "../components/TimerBox";

function HomePage() {
  return (
    <div>
      <div className="grid min-h-40 grid-rows-[min-content_1fr_min-content] gap-y-5 p-3">
        <Header />
        <TimerBox />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
