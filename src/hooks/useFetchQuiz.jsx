import { useState, useEffect } from "react";
import axios from "axios";

const useFetchQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (retries = 3) => {
      try {
        const response = await axios.get("https://opentdb.com/api.php?amount=10&type=multiple");
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        setQuestions(response.data.results);
        setError(null); // Clear any previous errors
        setLoading(false); // Set loading to false after successful fetch
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        if (retries > 0) {
          console.log(`Retrying... (${retries} attempts left)`);
          setTimeout(() => fetchData(retries - 1), 1000); // Retry after a delay
        } else {
          if (err.response) {
            setError(`Failed to load quiz data: ${err.response.statusText}`);
          } else if (err.request) {
            setError("Failed to load quiz data: No response from server");
          } else {
            setError(`Failed to load quiz data: ${err.message}`);
          }
          setLoading(false); // Set loading to false after all retries are exhausted
        }
      }
    };

    fetchData();
  }, []);

  return { questions, loading, error };
};

export default useFetchQuiz;
