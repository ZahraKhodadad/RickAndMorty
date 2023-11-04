import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (query,url) => {

 const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}=${query}`
      );
      setCharacters(data.results);
    } catch (error) {
      setCharacters([]);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  if (characters) fetchData();
}, [query]);
 return {loading,characters}
}
 
export default useFetch;