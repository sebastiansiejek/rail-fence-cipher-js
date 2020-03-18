export default (container: HTMLElement, matrix: []) => {
  container.innerHTML = ''

  matrix.forEach((row: []) => {
    const rowElem = document.createElement('div')

    row.forEach(sign => {
      const colElem = document.createElement('span')

      colElem.innerText = sign ? sign : '*'
      rowElem.appendChild(colElem)
    })

    container.appendChild(rowElem)
  })
}
