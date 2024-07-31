// let headersList = {
//     "Cookie": "uid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VydHVzaGFyQGdtYWlsLmNvbSIsImlhdCI6MTcxODE5NzAzOH0.Beov7JIWCIyOd3n8et5O9vbLiRcYSJZayEjayrlDtiw"
//    }

const fetchevents = async () => {
    try {
        const response = await fetch('http://localhost:3000/getchats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Include cookies with the request
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchevents()