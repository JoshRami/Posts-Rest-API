class HttpException {
  status: number;

  messages: string[];

  constructor(status: number, messages: string[]) {
    this.status = status;
    this.messages = messages;
  }
}

export default HttpException;
