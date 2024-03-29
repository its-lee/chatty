import Bot from '../bot/Bot.js';

export default class Help extends Bot {
  constructor() {
    super({
      name: 'help',
      description: "Documents bots."
    });
  }

  getTests() {
    return [
      this.name,
      `${this.name} ${this.name}`
    ];
  }

  async onDirectMessage() {
    this.context.reply(this.context.describeBots().map(i => {
      return `${i.name} - ${i.description} ${i.enabled ? '(on)' : '(off)'}`;
    }).join('\n'));
  }
}