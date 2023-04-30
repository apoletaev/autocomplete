import { useState } from 'react';

export function useFetchData(){
  const [data, setData] = useState([])
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState (false);

  const executeFetchData = async (url: string) => {
      try {
          setLoading(true);

          const response = await fetch(url);

          if (!response.ok) {
              setLoading(false);

              setError(true);

              setData([]);

              console.error("Network response was not OK");
          }

          const data = await response.json();


          if(data?.status === 404 || data?.message === "Page Not Found"){
              setLoading(false);

              setError(true);

              setData([]);
          } else {
              setLoading(false);

              setError(false);

              setData(data);
          }
      } catch (error) {

          setLoading(false);

          setError(true);

          setData([]);

          console.error("There has been a problem with your fetch operation:", error);
      }
  };

  const clearData = () => setData([]);
  const clearError = () => setError(false);

  return {data, isError, isLoading, executeFetchData, clearData, clearError};
}
