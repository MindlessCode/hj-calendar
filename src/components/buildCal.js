


export default function buildCalendar(value) {
    const startDay = value.clone().startOf("month").startOf("week");
    var endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const calendar = [];
    const end = endDay.date();
    function iendDay (end) {
        return endDay.add(end, "day");
    }
        while (day.isBefore(endDay, "day")) {
            calendar.push(
                Array(7).fill(0).map(() => day.add(1, "day").clone())
            );
            if(end === day.date() && calendar.length <= 5 && calendar.length > 4) {
                iendDay(7);
            }
            else if(end === day.date() && calendar.length === 4) {
                iendDay(14);
            }
        
        }
        return calendar;
}

