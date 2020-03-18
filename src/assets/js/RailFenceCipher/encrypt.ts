export default (text: string, height: number): string => {
  const textArray = text.split('')
  const textArrayLength = textArray.length - 1
  let matrix: any = []
  let row = 0

  for (let row = 0; row < height; row++) {
    matrix[row] = []
  }

  let direction = 1
  for (let i = 0; i <= textArrayLength; i++) {
    matrix[row].push(textArray[i])

    if ((row == height - 1 && direction == 1) || (row == 0 && direction == -1)) {
      direction = -direction
    }

    row = row + direction
  }

  return matrix.flat().join('')
}
