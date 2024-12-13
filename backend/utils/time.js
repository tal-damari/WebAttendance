import axios from "axios";
const regTime = new RegExp(/(\d{2}:\d{2})/);

export async function getTime() {
    try {
        const response = await axios.get('https://worldtimeapi.org/api/timezone/Europe/Berlin', {
            timeout: 10000,  // Set a timeout of 10 seconds to avoid premature timeout errors
        });

        const currentTime = response.data["datetime"];  // The `datetime` field contains the current time

        // Ensure the regex match finds a result
        const match = currentTime.match(regTime);
        if (match) {
            const currentTime = match[0];  // Extract the time part
            console.log(`Current date in Berlin: ${currentTime}`);
            return currentTime;  // Return the date
        } else {
            console.error('Error: Could not extract date from datetime string.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching time:', error);
        if (error.code === 'ECONNRESET') {
            console.error('Connection was reset. Retrying...');
        }
        return null;  // Return null if there's an error
    }
}

