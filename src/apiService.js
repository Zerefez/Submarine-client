async function fetchData() {
  try {
    const response = await fetch('http://192.168.0.1:8080/api/submarines');

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export { fetchData };
