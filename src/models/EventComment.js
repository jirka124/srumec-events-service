import { randomUUID } from "crypto";

export class EventComment {
  constructor({
    id = randomUUID(),
    event_ref,
    user_ref,
    reply_to_ref = null,
    content,
    create_time = new Date(),
  }) {
    this.id = id;
    this.event_ref = event_ref;
    this.user_ref = user_ref;
    this.reply_to_ref = reply_to_ref;
    this.content = content;
    this.create_time = create_time;
  }
}
