export async function fetchDailyEventsTable() {
    const response = await fetch('events/daily');
    const data = await response.json();
    return data;
};

export async function fetchHourlyEventsTable() {
    const response = await fetch('events/hourly');
    const data = await response.json();
    return data;
};

export async function fetchDailyStatsTable() {
    const response = await fetch('stats/daily');
    const data = await response.json();
    return data;
};

export async function fetchHourlyStatsTable() {
    const response = await fetch('stats/hourly');
    const data = await response.json();
    return data;
};

export async function fetchPoiTable() {
    const response = await fetch('poi');
    const data = await response.json();
    return data;
};

export function formatDate(date, hours) {
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ' - ' + hours + ' ' + ampm;
}