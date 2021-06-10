# Frontend code test

As part of a new feature for a React Mobile application, write a JavaScript function, `fromBookings`, that receives an array of bookings and achieves the following acceptance criteria.

- Demonstrate that the bookings in the results array are unique, determined by booking id.
- Demonstrate that the bookings in the results array are sorted by booking start time, ascending.
- Demonstrate that gap entries appear for days with zero bookings (see examples below for gap output).
- Demonstrate that gap entries appear in the correct order in the results array, relative to the start times of existing bookings.
- Demonstrate that a gap entry appears as the last item in the results array with a null end date, indicating there are no bookings after the last.
- Demonstrate either a map can be opened for a booking or the booking data can be stored locally in the app.

NOTES:

- You will be scheduled for an hour and a half with an interviewer to discuss and solve this problem.
- A booking will not exceed 24 hours in duration.
- As part of your solution please create a local git repo and provide it to your interviewer at the end as a zip file.
- Please use the editor of your choice.
- Feel free to spruce up the UI.
- Consider how to render large data sets.

## Background

PO = Product Owner
DEV = Developer

DEV > Hey, the requirements you gave me say that we need to show gaps for days
without bookings. What does that look like? Would you like an entry per day,
or a single entry for a span of days?

PO > Let's create only one entry per span of days, so that users don't see
too many entries when they don't book very often. The screen will be
confusing.

DEV > Cool. What would you like to do when a booking lasts several days, or
a week, or something like that?

PO > I think I said bookings will only last 24 hours, at most, in this case.
Do you see any issues with that?

DEV > No, I see that in the AC now. I think I missed it before.

DEV > Should we put any validation on the bookings to check that they're never
more than 24h?

PO > No, the API will enforce that rule.

DEV > What about the last booking? Should we let users know when they've
reached the end of their bookings list?

PO > Yes, please. Add a gap entry at the end of the list.

DEV > Will do. Thanks.

## Examples:

1.

```
const result = fromBookings([
  { id: 1, title: "Booking 1", start: new Date("2018-02-28T08:00:00"), end: new Date("2018-02-28T09:00:00") },
  { id: 2, title: "Booking 2", start: new Date("2018-03-02T10:00:00"), end: new Date("2018-03-02T11:00:00") }]);

console.log(result);
```

Output

```
[{ id: 1, title: "Booking 1", start: new Date("2018-02-28T08:00:00"), end: new Date("2018-02-28T09:00:00") },
 { title: "No bookings", start: new Date("2018-03-01T00:00:00"), end: new Date("2018-03-01T23:59:59.999") },
 { id: 2, title: "Booking 2", start: new Date("2018-03-02T10:00:00"), end: new Date("2018-03-02T11:00:00") },
 { title: "No bookings", start: new Date("2018-03-03T00:00:00"), end: null }]
```

2)

```
const result = fromBookings([
  { id: 2, title: "Booking 2", start: new Date("2018-03-02T10:00:00"), end: new Date("2018-03-02T11:00:00") },
  { id: 1, title: "Booking 1", start: new Date("2018-02-28T08:00:00"), end: new Date("2018-03-01T07:00:00") },
  { id: 2, title: "Booking 2", start: new Date("2018-03-02T10:00:00"), end: new Date("2018-03-02T11:00:00") }]);

console.log(result);
```

Output

```
[{ id: 1, title: "Booking 1", start: new Date("2018-02-28T08:00:00"), end: new Date("2018-03-01T07:00:00") },
 { title: "No bookings", start: new Date("2018-03-01T00:00:00"), end: new Date("2018-03-01T23:59:59.999") },
 { id: 2, title: "Booking 2", start: new Date("2018-03-02T10:00:00"), end: new Date("2018-03-02T11:00:00") },
 { title: "No bookings", start: new Date("2018-03-03T00:00:00"), end: null }]
```

3)

```
const result = fromBookings([
  { id: 3, title: "Booking 3", start: new Date("2019-01-11T12:00:00"), end: new Date("2019-01-11T13:00:00") },
  { id: 1, title: "Booking 1", start: new Date("2018-12-05T13:00:00"), end: new Date("2018-12-05T15:00:00") },
  { id: 2, title: "Booking 2", start: new Date("2018-12-31T23:00:00"), end: new Date("2019-01-01T02:00:00") },
  { id: 3, title: "Booking 3", start: new Date("2019-01-11T12:00:00"), end: new Date("2019-01-11T13:00:00") }]);

console.log(result);
```

Output

```
[{ id: 1, title: "Booking 1", start: new Date("2018-12-05T13:00:00"), end: new Date("2018-12-05T15:00:00") },
 { title: "No bookings", start: new Date("2018-12-06T00:00:00"), end: new Date("2018-12-30T23:59:59.999") },
 { id: 2, title: "Booking 2", start: new Date("2018-12-31T23:00:00"), end: new Date("2019-01-01T02:00:00") },
 { title: "No bookings", start: new Date("2019-01-01T00:00:00"), end: new Date("2019-01-10T23:59:59.999") },
 { id: 3, title: "Booking 3", start: new Date("2019-01-11T12:00:00"), end: new Date("2019-01-11T13:00:00") },
 { title: "No bookings", start: new Date("2019-01-12T00:00:00.000"), end: null } ]
```
