export function getMonthStartEndUnixTimestamps(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

    // convert the dates unix timestamps as that's what's stored in the database
    const startOfMonthUnix = Math.floor(startOfMonth.getTime() / 1000);
    const endOfMonthUnix = Math.floor(endOfMonth.getTime() / 1000);

    return { startOfMonthUnix, endOfMonthUnix };
}
