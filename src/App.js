import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import Modal from './components/Modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseForm from './components/CourseForm';
import { useDbData,useDbUpdate } from './utility/firebase.js';
import Navigation from './components/Navigation';
import { useAuthState } from './utility/firebase';

// Variables
var queryClient = new QueryClient();

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
const Main = ({user}) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedClassesMeets, setSelectedClassesMeets] = useState([]);
  const [open, setOpen] = useState(false);
  // const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
  // var [dataFetch, isLoadingFetch, errorFetch] = useJsonQuery(url);
  // if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  // if (isLoading) return <h1>Loading user data...</h1>;
  // const [update, result] = useDbUpdate(`/courses`);
  // update(dataFetch);
  const [data, error] = useDbData(`/`);
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (!data) return <h1>No user data found</h1>;
  return (
    <div>
      <Navigation title={data.title} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} user={user} />
      <button type="button" class="btn btn-primary button" onClick={() => setOpen(true)}>Course Plan</button>
      <CourseList 
        courseJson={data.courses} 
        selectedTerm={selectedTerm} 
        selectedClasses={selectedClasses} 
        setSelectedClasses={setSelectedClasses} 
        selectedClassesMeets={selectedClassesMeets} 
        setSelectedClassesMeets={setSelectedClassesMeets}
        user={user}
        />
      <Modal open={open} setOpen={setOpen} selectedCourses={selectedClasses} courseJson={data.courses} />
    </div>
  )
}

const App = () => {
  const [user, setUser] = useAuthState();
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <div className="app">
              <QueryClientProvider client={queryClient}>
                <Main user={user} />
              </QueryClientProvider>
            </div>
          } />
          <Route path="/edit-course" element={
            <div className="app">
              <CourseForm />
            </div>
          } />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
