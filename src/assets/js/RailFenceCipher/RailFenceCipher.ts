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
      const fromData = new FormData(this.fileForm)
      file.sendRequest(fromData).then(res => console.log(res))
    })
  }
}
