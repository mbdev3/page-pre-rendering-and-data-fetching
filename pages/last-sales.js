import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
const LastSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR(
    'https://next-course-cf26e-default-rtdb.europe-west1.firebasedatabase.app/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );
  useEffect(() => {
    if (data) {
      const arraySales = [];
      for (const key in data) {
        arraySales.push({ id: key, username: data[key].username, volume: data[key].volume });
      }
      setSales(arraySales);
      console.log(sales, data);
    }
  }, [data]);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://next-course-cf26e-default-rtdb.europe-west1.firebasedatabase.app/sales.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const arraySales = [];
  //       for (const key in data) {
  //         arraySales.push({ id: key, username: data[key].username, volume: data[key].volume });
  //       }
  //       console.log(arraySales);
  //       setSales(arraySales);
  //       setIsLoading(false);
  //     });
  // }, []);
  if (error) {
    return <p>failed to load</p>;
  }
  if (!data || !sales) {
    return <p>Loading..</p>;
  }
  return (
    <ul>
      {sales.map((item) => {
        return (
          <li key={item.id}>
            {item.username} - {item.volume}
          </li>
        );
      })}
    </ul>
  );
};

export default LastSalesPage;
