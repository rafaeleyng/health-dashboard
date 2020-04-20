export default [
  {
    target: 'cells/mcL',
    datapoints: [
      [5000000, Date.now() - 60000000],
      [5500000, Date.now() - 50000000],
      [6000000, Date.now() - 40000000],
      [4000000, Date.now() - 30000000]
    ]
  },
  {
    target: 'some other method or unit',
    datapoints: [
      [4000000, Date.now() - 30000000],
      [5000000, Date.now() - 20000000],
      [4500000, Date.now() - 10000000]
    ]
  }
]
