export default class {
  button: string

  static async sendRequest(file: FormData) {
    return await fetch('http://localhost:2000/cipher-file', {
      method: 'POST',
      body: file
    }).then(res => res.json())
  }
}
