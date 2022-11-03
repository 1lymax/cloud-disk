export let API_URL: string
if (process.env.SERV === 'HEROKU')
    API_URL = 'https://cloudisx-api.herokuapp.com/'
else
    API_URL = 'http://localhost:5000/'
