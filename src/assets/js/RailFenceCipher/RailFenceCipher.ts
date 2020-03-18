export default class {
  form: HTMLFormElement
  resultElem: HTMLInputElement
  text: string
  height: number

  constructor() {
    this.form = <HTMLFormElement>document.getElementById('encrypt-form')
    this.resultElem = <HTMLInputElement>document.getElementById('encrypted')
    this.run()
  }

  run() {
    if (this.form) {
      this.handleForm()
    }
  }

  handleForm() {
    this.form.addEventListener('submit', (e: any) => {
      e.preventDefault()
      const formData = new FormData(e.target)

      const text = formData.get('text') as string
      const height = formData.get('height') as string

      if (text && height) {
        this.text = text
        this.height = parseInt(height)
        this.resultElem.value = this.encrypt(this.text, this.height)
      }
    })
  }

  encrypt(text: string, height: number): string {
    const textArray = text.split('')
    const textArrayLength = textArray.length - 1
    let matrix = []
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
}
