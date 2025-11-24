import Header from './Header';
import Welcome from './Welcome';
import Programmes from './Programmes';
import NewsEvents from './NewsEvents';
import Footer from './Footer';

function MainContainer() {


  return (
    <div className="main-container">
      <Header />
      <Welcome />
      <Programmes />
      <NewsEvents />
      <Footer />
    </div>
  )
}

export default MainContainer
