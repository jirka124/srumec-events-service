import { randomUUID } from "crypto";

export class Event {
  constructor({
    id = randomUUID(),
    organizer_ref,
    title,
    description,
    latitude,
    longitude,
    happen_time,
  }) {
    this.id = id;
    this.organizer_ref = organizer_ref;
    this.title = title;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.happen_time = happen_time;
  }
}
