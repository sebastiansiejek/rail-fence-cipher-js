import encrypt from './encrypt'
import decrypt from './decrypt'
import draw from './draw'

export default class {
  encryptForm: HTMLFormElement
  decryptForm: HTMLFormElement

  constructor() {
    this.encryptForm = <HTMLFormElement>document.getElementById('encrypt-form')
    this.decryptForm = <HTMLFormElement>document.getElementById('decrypt-form')
    this.run()
  }

  run() {
    this.handleEncrypt()
    this.handleDecrypt()
  }

  handleEncrypt() {
    this.encryptForm.addEventListener('submit', (e: any) => {
      e.preventDefault()
      const { target } = e
      const formData = new FormData(target)

      const text = formData.get('text') as string
      const height = formData.get('height') as string

      if (text && height) {
        target.querySelector('.result-input').value = encrypt(text, parseInt(height))
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
        const decrypted = decrypt(text, parseInt(height))
        target.querySelector('.result-input').value = decrypted.result
        const drawContainer = document.getElementById('decrypt-drawing')
        draw(drawContainer, decrypted.matrix)
      }
    })
  }
}
