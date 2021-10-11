export default date => {
    const year = new Date(date).getFullYear();
    let month = 1 + new Date(date).getMonth() + '';
    let day = new Date(date).getDate() + '';

    while (month.length !== 2) {
        month = '0' + month;
    }

    while (day.length !== 2) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}
