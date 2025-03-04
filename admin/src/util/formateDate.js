export const formateDate = (date) => {
    // Check if the input is a string and convert it to a Date object
    if (typeof date === 'string') {
        date = new Date(date);
    }

    // Ensure the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid Date';
    }

    // Format the date as "day month year"
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}