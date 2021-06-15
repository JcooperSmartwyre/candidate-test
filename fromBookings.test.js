import fromBookings from './fromBookings';

describe('fromBookings', () => {
  test.each([
    {
      data: [
        {
          id: 1,
          title: 'Booking 1',
          start: new Date('2018-02-28T00:00:00.000'),
          end: new Date('2018-02-28T23:59:59.999'),
        },
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-03-02T00:00:00.000'),
          end: new Date('2018-03-02T23:59:59.999'),
        },
      ],
      expected: [
        {
          id: 1,
          title: 'Booking 1',
          start: new Date('2018-02-28T00:00:00.000'),
          end: new Date('2018-02-28T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2018-03-01T00:00:00.000'),
          end: new Date('2018-03-01T23:59:59.999'),
        },
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-03-02T00:00:00.000'),
          end: new Date('2018-03-02T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2018-03-03T00:00:00.000'),
          end: null,
        },
      ],
    },
    {
      data: [
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-03-02T00:00:00.000'),
          end: new Date('2018-03-02T23:59:59.999'),
        },
        {
          id: 1,
          title: 'Booking 1',
          start: new Date('2018-02-28T00:00:00.000'),
          end: new Date('2018-03-01T23:59:59.999'),
        },
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-03-03T00:00:00.000'),
          end: new Date('2018-03-03T23:59:59.999'),
        },
      ],
      expected: [
        {
          id: 1,
          title: 'Booking 1',
          start: new Date('2018-02-28T00:00:00.000'),
          end: new Date('2018-03-01T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2018-03-02T00:00:00.000'),
          end: new Date('2018-03-02T23:59:59.999'),
        },
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-03-03T00:00:00.000'),
          end: new Date('2018-03-03T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2018-03-04T00:00:00.000'),
          end: null,
        },
      ],
    },
    {
      data: [
        {
          id: 3,
          title: 'Booking 3',
          start: new Date('2019-01-11T00:00:00'),
          end: new Date('2019-01-11T00:00:00'),
        },
        {
          id: 1,
          title: 'Booking 1',
          start: new Date('2018-12-05T00:00:00.000'),
          end: new Date('2018-12-05T23:59:59.999'),
        },
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-12-31T00:00:00.000'),
          end: new Date('2019-01-01T23:59:59.999'),
        },
        {
          id: 3,
          title: 'Booking 3',
          start: new Date('2019-01-11T00:00:00.000'),
          end: new Date('2019-01-11T23:59:59.999'),
        },
      ],
      expected: [
        {
          id: 1,
          title: 'Booking 1',
          start: new Date('2018-12-05T00:00:00.000'),
          end: new Date('2018-12-05T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2018-12-06T00:00:00.000'),
          end: new Date('2018-12-30T23:59:59.999'),
        },
        {
          id: 2,
          title: 'Booking 2',
          start: new Date('2018-12-31T00:00:00.000'),
          end: new Date('2019-01-01T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2019-01-02T00:00:00.000'),
          end: new Date('2019-01-10T23:59:59.999'),
        },
        {
          id: 3,
          title: 'Booking 3',
          start: new Date('2019-01-11T00:00:00.000'),
          end: new Date('2019-01-11T23:59:59.999'),
        },
        {
          title: 'No bookings',
          start: new Date('2019-01-12T00:00:00.000'),
          end: null,
        },
      ],
    },
  ])('returns bookings case %#', async ({data, expected}) => {
    const result = await fromBookings(data);

    expect(result).toEqual(expected);
  });

  xdescribe('(extra) paginations', () => {
    const data = [
      {
        id: 1,
        title: 'Booking 1',
        start: new Date('2018-02-28T00:00:00.000'),
        end: new Date('2018-02-28T23:59:59.999'),
      },
      {
        id: 2,
        title: 'Booking 2',
        start: new Date('2018-03-02T00:00:00.000'),
        end: new Date('2018-03-02T23:59:59.999'),
      },
      {
        id: 3,
        title: 'Booking 3',
        start: new Date('2018-03-03T00:00:00.000'),
        end: new Date('2018-03-03T23:59:59.999'),
      },
    ];

    test.each([
      [
        1,
        2,
        [
          {
            id: 1,
            title: 'Booking 1',
            start: new Date('2018-02-28T00:00:00.000'),
            end: new Date('2018-02-28T23:59:59.999'),
          },
          {
            title: 'No bookings',
            start: new Date('2018-03-01T00:00:00.000'),
            end: new Date('2018-03-01T23:59:59.999'),
          },
        ],
      ],
      [
        2,
        2,
        [
          {
            id: 2,
            title: 'Booking 2',
            start: new Date('2018-03-02T00:00:00.000'),
            end: new Date('2018-03-02T23:59:59.999'),
          },
          {
            id: 3,
            title: 'Booking 3',
            start: new Date('2018-03-03T00:00:00.000'),
            end: new Date('2018-03-03T23:59:59.999'),
          },
        ],
      ],
      [
        3,
        2,
        [
          {
            title: 'No bookings',
            start: new Date('2018-03-04T00:00:00.000'),
            end: null,
          },
        ],
      ],
      [4, 2, []],
    ])('shows correct results on page %i', async (page, size, expected) => {
      const result = await fromBookings(data, page, size);

      expect(result).toEqual(expected);
    });
  });
});
