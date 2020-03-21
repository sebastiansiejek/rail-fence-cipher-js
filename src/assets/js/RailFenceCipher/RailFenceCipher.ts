import encrypt from './encrypt'
import decrypt from './decrypt'
import draw from './draw'
import file from './file'

export default class {
  encryptForm: HTMLFormElement
  decryptForm: HTMLFormElement
  fileForm: HTMLFormElement

  constructor() {
    this.encryptForm = <HTMLFormElement>document.getElementById('encrypt-form')
    this.decryptForm = <HTMLFormElement>document.getElementById('decrypt-form')
    this.fileForm = <HTMLFormElement>document.getElementById('file-form')
    this.run()
  }

  run() {
    this.handleEncrypt()
    this.handleDecrypt()
    this.handleFileForm()
  }

  handleEncrypt() {
    this.encryptForm.addEventListener('submit', (e: any) => {
      e.preventDefault()
      const { target } = e
      const formData = new FormData(target)

      const text = formData.get('text') as string
      const height = formData.get('height') as string

      if (text && height) {
        const { result, matrix } = encrypt(text, parseInt(height))
        target.querySelector('.result-input').value = result
        const drawContainer = document.getElementById('encrypt-drawing')
        draw(drawContainer, matrix)
      }
    })
  }

  handleDecrypt() {
    this.decryptForm.addEventListener('submit', (e: any) => {
      e.preventDefault()
      const { target } = e
      const formData = new FormData(e.target)

      const text = formData.get('text') as string
      const height = formData.get('height') as string

      if (text && height) {
        const { result, matrix } = decrypt(text, parseInt(height))
        target.querySelector('.result-input').value = result
        const drawContainer = document.getElementById('decrypt-drawing')
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
