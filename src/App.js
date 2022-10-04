import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';


const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw response;
  return response.json();
};

export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery([url], () => fetchJson(url));
  return [ data, isLoading, error ];
};

const Main = () => {
  const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
  var [data, isLoading, error] = useJsonQuery(url);
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  return (
    <div>
      <Banner text={data.title} />
      <CourseList courseJson={data.courses} />
    </div>
  )

}

var queryClient = new QueryClient();

const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </div>
);

export default App;
