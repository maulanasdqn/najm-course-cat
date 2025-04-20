export class EventEmitter<T> {
  events: { [event: string]: (data?: T) => void };
  constructor() {
    this.events = {};
  }

  on(event: string, listener: (data?: T) => void) {
    this.events[event] = listener;
  }

  off(event: string) {
    delete this.events[event];
  }

  emit(event: string, data?: T) {
    const listeners = this.events[event];
    listeners(data);
  }
}
