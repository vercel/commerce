import { random } from 'lodash'

export function getRandomPairOfColors() {
  const colors = ['#37B679', '#DA3C3C', '#3291FF', '#7928CA', '#79FFE1']
  const getRandomIdx = () => random(0, colors.length - 1)
  let idx = getRandomIdx()
  let idx2 = getRandomIdx()

  // Has to be a different color
  while (idx2 === idx) {
    idx2 = getRandomIdx()
  }

  // Returns a pair of colors
  return [colors[idx], colors[idx2]]
}
