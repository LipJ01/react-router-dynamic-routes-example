import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Data from './components/Data';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const VENUES = {
  'wg-grace': {
    title: 'Wetherspoon: WG Grace ',
    url: 'https://www.jdwetherspoon.com/pubs/all-pubs/england/bristol/the-w-g-grace-bristol',
  },
  'berkley': {
    title: 'Wetherspoon: The Berkley',
    url: 'https://www.jdwetherspoon.com/pubs/all-pubs/england/bristol/the-berkeley-bristol',
  },
  'racks': {
    title: 'Racks',
    url: 'https://www.racks-bristol.co.uk/',
  },
  'channings': {
    title: 'Channings Hotel',
    url: 'https://www.greenekinginns.co.uk/hotels/the-channings-hotel/',
  },
};

const App = () => (
  <Router>
    <Navigation />
    <Content />
  </Router>
);

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/venues">Venues</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
  </ul>
);

const Content = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/venues/*" element={<Venue />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

const Home = () => <h1>My Home Page</h1>;

const About = () => <h1>My About Page</h1>;

const Venue = () => (
  <>
    <h1>
      Qualms Venue List and Item Page
    </h1>

    <Routes>
      <Route exact path="/" element={<VenueList />} />
      <Route path="/:id" element={<VenueItem />} />
    </Routes>
  </>
);

const VenueList = () => (
  <>
    <h2>All Courses</h2>
    <ul>
      {Object.keys(VENUES).map(key => (
        <li key={key}>
          Go to individual pub/bar route:&nbsp;
          <Link to={`/venues/${key}`}>{VENUES[key].title}</Link>
        </li>
      ))}
    </ul>
  </>
);

const VenueItem = () => {
  const { id } = useParams();

  const [qualm, setQualm] = useState('')
    const [data, setData] = useState([])
    // submit event
    const handleSubmit=(e)=>{
        e.preventDefault();

        console.log(qualm)
        
        const data = {
        qualm
        }

    //Add Task
    axios.post('https://sheet.best/api/sheets/729ee64c-5a65-4f3b-95b2-21a717a6ee98',data).then(response=>{
        // console.log(response);
        setQualm('');
    })
    }

    // getting data function
    const getData=()=>{
    axios.get('https://sheet.best/api/sheets/729ee64c-5a65-4f3b-95b2-21a717a6ee98').then((response)=>{
        setData(response.data);
    })
    }

    // triggering function
    useEffect(()=>{
    getData();
    },[data])
  return (
    <>
      <h2>{VENUES[id].title}</h2>
      <p>
        Go to <a href={VENUES[id].url}>Venue Website</a>
      </p>
      <div className='container'>
        <br></br>
        <form autoComplete="off" className='form-control'
        onSubmit={handleSubmit}>
        <label>Tell us your qualms..</label>
        <input type='text' className='form-control' required
            placeholder='Enter feedback' onChange={(e)=>setQualm(e.target.value)}
            value={qualm}
        />
        <br></br>
        <div style={{display:"flex",justifyContent:'flex-end'}}>
            <button type='submit' className='btn'>Submit</button>
        </div>
        </form>
        <div className='view-data'>
        {data.length<1&&<>No previous qualms</>}
        {data.length>0&&(
            <div className='table-responsive'>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>Previous qualms</th>
                </tr>
                </thead>
                <tbody>
                <Data data={data}/>
                </tbody>
            </table>
            </div>
        )}
        </div>
    </div>
      <p>
        Back to <Link to="/venues">Venues</Link>
      </p>
    </>
  );
};

export default App;
