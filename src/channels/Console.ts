import readline from 'readline';

import logger from '../Logger.js';
import { Channel, Message } from '../Channel.js';

export default class Console extends Channel {
  #from = 'console';
  #exit = 'exit';

  #send(content: string) {
    console.log(content);
  }

  listen() {
    this.#send(`Hi @${this.#from}, type "${this.#exit}" to exit > `)

    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    });

    io.prompt();

    io.on('line', line => {
      if (line.toLowerCase() === this.#exit) {
        this.#send('Bye!');
        process.exit(0);
      } else {
        this.onNewMessage({ from: this.#from, content: line.trim() })
      }
      io.prompt();
    }).on('close', () => {
      this.#send('Exiting..');
      process.exit(0);
    });
  }

  send({ content }: Message) {
    this.#send(content);
  }
}