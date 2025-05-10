import axiosInstance from "."

export const trade = () => {
  try {
    const data = axiosInstance.get('/api/trade')
    return data
  } catch (error) {
    console.log('Error fetching trades:', error)
  }
}
