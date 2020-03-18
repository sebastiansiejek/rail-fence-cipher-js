export default (text: string, height: number): { matrix: []; result: string } => {
  const matrix: any = []

  const textLength = text.length - 1
  const heightLength = height - 1

  //set empty matrix
  for (let i = 0; i <= heightLength; i++) {
    matrix[i] = []
    for (let j = 0; j <= textLength; j++) {
      matrix[i][j] = '*'
    }
  }

  let dirDown = false
  let row = 0
  let col = 0

  for (let i = 0; i <= textLength; i++) {
    if (row == 0 || row == heightLength) dirDown = !dirDown

    matrix[row][col] = text[i]
    col += 1

    if (dirDown) row += 1
    else row -= 1
  }

  const result: any = []

  for (let i = 0; i <= heightLength; i++) {
    for (let j = 0; j <= textLength; j++) {
      if (matrix[i][j] != '*') result.push(matrix[i][j])
    }
  }

  return {
    matrix: matrix,
    result: result.flat().join('')
  }
}
