import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const get = async (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

export default { get }