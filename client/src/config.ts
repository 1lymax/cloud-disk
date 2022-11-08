export let API_URL: string
if (process.env.NODE_ENV === 'production')
    API_URL = 'https://cloudisx-api.herokuapp.com/'
else
    API_URL = 'http://localhost:5000/'
