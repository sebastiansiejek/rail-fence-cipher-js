export default (decryptedText: string, height: number): string => {
  const matrix: any = []

  const textLength = decryptedText.length - 1
  const heightLength = height - 1

  //set empty matrix
  for (let i = 0; i <= heightLength; i++) {
    matrix[i] = []
    for (let j = 0; j <= textLength; j++) {
      matrix[i][j] = ''
    }
  }

  let dir_down = false
  let row = 0
  let col = 0

  // fill * in matrix
  for (let i = 0; i <= textLength; i++) {
    if (row == 0) dir_down = true
    if (row == heightLength) dir_down = false

    matrix[row][col] = '*'
    col += 1

    if (dir_down) row += 1
    else row -= 1
  }

  // fill sign in matrix
  let index = 0
  for (let i = 0; i <= heightLength; i++) {
    for (let j = 0; j <= textLength; j++) {
      if (matrix[i][j] == '*' && index <= textLength) {
        matrix[i][j] = decryptedText[index]
        index += 1
      }
    }
  }

  // read signs
  const result: any = []
  row = 0
  col = 0

  for (let i = 0; i <= textLength; i++) {
    if (row == 0) dir_down = true
    if (row == heightLength) dir_down = false

    if (matrix[row][col] != '*') result.push(matrix[row][col])
    col += 1

    if (dir_down) row += 1
    else row -= 1
  }

  return result.flat().join('')
}
