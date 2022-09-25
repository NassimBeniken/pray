export const getTimings = async (latitude, longitude) => {
    try {
        const response = await fetch(`http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}`)
        const json = await response.json()
        console.log(json?.data?.timings)
        return json?.data?.timings
    } catch (error) {
        console.error(error)
    }
}