const annotation = {
  name: 'annotation name',
  enabled: true,
  datasource: 'generic datasource',
  showLine: true
}

const annotations = [
  { annotation: annotation, title: 'Started drug A', time: Date.now() - 60000000 },
  { annotation: annotation, title: 'Surgery', time: Date.now() - 50000000 },
  { annotation: annotation, title: 'Stopped eating food X', time: Date.now() - 40000000 }
]

export default annotations
