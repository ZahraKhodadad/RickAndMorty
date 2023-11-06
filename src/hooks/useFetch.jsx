import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetch = (query,url) => {

 const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get(
        `${url}=${query}`
      );
      // console.log(data);
      setCharacters(data.results);
    } catch (error) {
      setCharacters([]);
      toast.error(error.response.data.error);
      setError("there isn't Character");
    } finally {
      setLoading(false);
    }
  };
  if (characters) fetchData();
}, [query]);
 return {loading,characters,error}
}
 
export default useFetch;