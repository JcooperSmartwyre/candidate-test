import fromBookings from "./fromBookings";

describe("fromBookings", () => {
  let dataSet = [];
  let bookings = [];

  describe("data set one", () => {
    beforeEach(async () => {
      dataSet = [
        {
          id: 1,
          title: "Booking 1",
          start: new Date("2018-02-28T08:00:00"),
          end: new Date("2018-02-28T09:00:00")
        },
        {
          id: 2,
          title: "Booking 2",
          start: new Date("2018-03-02T10:00:00"),
          end: new Date("2018-03-02T11:00:00")
        }
      ];

      bookings = await fromBookings(dataSet);
    });

    it("returns bookings", () => {
      expect(bookings).toEqual([
        {
          id: 1,
          title: "Booking 1",
          start: new Date("2018-02-28T08:00:00"),
          end: new Date("2018-02-28T09:00:00")
        },
        {
          title: "No bookings",
          start: new Date("2018-03-01T00:00:00"),
          end: new Date("2018-03-01T23:59:59.999")
        },
        {
          id: 2,
          title: "Booking 2",
          start: new Date("2018-03-02T10:00:00"),
          end: new Date("2018-03-02T11:00:00")
        },
        {
          title: "No bookings",
          start: new Date("2018-03-03T00:00:00"),
          end: null
        }
      ]);
    });
  });
});
