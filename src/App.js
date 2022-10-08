import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import Modal from './components/Modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Variables
var queryClient = new QueryClient();
const terms = ['Fall', 'Winter', 'Spring'];


// Functions
const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw response;
  return response.json();
};
export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery([url], () => fetchJson(url));
  return [ data, isLoading, error ];
};

// Components
const Main = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
  var [data, isLoading, error] = useJsonQuery(url);
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  return (
    <div>
      <Banner text={data.title} />
      {RadioButtons({selectedTerm, setSelectedTerm})}
      <button type="button" class="btn btn-primary button" onClick={() => setOpen(true)}>Course Plan</button>
      <CourseList courseJson={data.courses} selectedTerm={selectedTerm} selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses}/>
      <Modal open={open} setOpen={setOpen} selectedCourses={selectedClasses} courseJson={data.courses} />
    </div>
  )
}
const RadioButtons = ({ selectedTerm, setSelectedTerm }) => (
  <div className="radioButtonGroup">
    <p id="radioButtonTitle">Filter by term:</p>
    {
      terms.map(term => 
        (
          <div className="radioButton">
            <input type="radio" id={term} checked={selectedTerm === term} autoComplete="off" onChange={() => setSelectedTerm(term)} />
            <label className='' htmlFor={term}>{term}</label>
          </div>
        )
      )
    }  
  </div>
)
const App = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </div>
);

export default App;
