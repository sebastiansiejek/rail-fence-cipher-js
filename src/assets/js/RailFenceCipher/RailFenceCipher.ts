import encrypt from './encrypt'
import decrypt from './decrypt'
import draw from './draw'
import file from './file'

export default class {
  cipherForm: HTMLFormElement
  fileForm: HTMLFormElement

  constructor() {
    this.cipherForm = <HTMLFormElement>document.getElementById('cipher-form')
    this.fileForm = <HTMLFormElement>document.getElementById('file-form')
    this.run()
  }

  run() {
    this.handleEncrypt()
    this.handleFileForm()
  }

  handleEncrypt() {
    this.cipherForm.addEventListener('submit', (e: any) => {
      e.preventDefault()
      const { target } = e
      const formData = new FormData(target)

      const text = formData.get('text') as string
      const height = formData.get('height') as string
      const type = formData.get('type') as string

      if (text && height && type) {
        const { result, matrix } = type == 'encrypt' ? encrypt(text, parseInt(height)) : decrypt(text, parseInt(height))
        target.querySelector('.result-input').value = result
        const drawContainer = document.getElementById('cipher-drawing')
        draw(drawContainer, matrix)
      }
    })
  }

  handleFileForm() {
    this.fileForm.addEventListener('submit', (e: any) => {
      e.preventDefault()
      const formData = new FormData(this.fileForm)

      const arr: any = []

      return file.sendRequest(formData).then(res => {
        const { result } = res
        const { type, data } = result
        if (type == 'SUCCESS') {
          const cipherKind = formData.get('type') as string

          data.forEach((line: { word: string; height: number }) => {
            const { word, height } = line
            if (cipherKind == 'encrypt') arr.push({ ...encrypt(word, height), word, height })
            if (cipherKind == 'decrypt') arr.push({ ...decrypt(word, height), word, height })
          })

          if (e.target.querySelector('.result')) e.target.querySelector('.result').remove()

          const resultElem = document.createElement('div')
          resultElem.className = 'result'
          e.target.appendChild(resultElem)

          const tableElem = document.createElement('table')
          tableElem.innerHTML = `
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Word</th>
                  <th>Height</th>
                  <th>Result</th>
                  <th>Drawing</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          `

          arr.forEach((a: any, key: number) => {
            const singleElem = document.createDocumentFragment()

            tableElem.querySelector('tbody').innerHTML += `
              <td>${key + 1}</td>
              <td>${a.word}</td>
              <td>${a.height}</td>
              <td>${a.result}</td>
              <td class="table__drawing"></td>
            `
            singleElem.appendChild(tableElem)
            resultElem.appendChild(singleElem)
            draw(e.target.querySelector(`table tbody tr:nth-child(${key + 1}) .table__drawing`), a.matrix)
          })
        }
      })
    })
  }
}
