(function () {
  const baseURL = 'http://localhost:3000';

  function testAPIs() {
    let testId = '';

   
    callAPI('GET', '/api/locations')
      .then((list) => {
        console.log('📦 LIST RESULTS:', list);
        testId = list[0]?._id;
      })
      .then(() => {
        const newData = {
          name: "API Test Location",
          address: "456 Testing Way",
          date: new Date().toISOString(),
          isActive: true,
          hours: "12pm - 5pm"
        };

        return callAPI('POST', '/api/locations', newData);
      })
      .then((created) => {
        console.log('CREATE RESULT:', created);
        testId = created._id;

        //GET 
        return callAPI('GET', `/api/locations/${testId}`);
      })
      .then((item) => {
        console.log('FIND RESULT:', item);

        //Update
        item.hours = "1pm - 6pm";
        return callAPI('PUT', `/api/locations/${item._id}`, item);
      })
      .then((updated) => {
        console.log('UPDATE RESULT:', updated);

        //DELETE
        return callAPI('DELETE', `/api/locations/${updated._id}`);
      })
      .then(() => {
        console.log('DELETE SUCCESSFUL');
        document.getElementById('output').textContent =
          "REST API test completed successfully. Check the console for details.";
      })
      .catch((err) => {
        console.error(err);
        document.getElementById('output').textContent = "Error: " + err.message;
      });
  }

  async function callAPI(method, uri, data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (method === 'POST' || method === 'PUT') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(baseURL + uri, config);

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`API call failed: ${response.status}\n${errorDetails}`);
    }

    //no content returned
    return response.status !== 204 ? response.json() : {};
  }

  document.querySelector('#testme').addEventListener("click", () => {
    testAPIs();
  });
})();
