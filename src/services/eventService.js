import { Event } from "#models/Event.js";
// temporary in-memory DB
const EVENTS = [];

export const eventService = {
  getNearby({ latitude, longitude, proximity }) {
    // TODO: proper geo calculations
    return EVENTS;
  },

  getOne(id) {
    return EVENTS.find((e) => e.id === id) || null;
  },

  save(eventData) {
    if (eventData.id) {
      let existing = EVENTS.find((e) => e.id === eventData.id);
      if (existing) {
        Object.assign(existing, eventData);
        return existing;
      }
    }
    const ev = new Event(eventData);
    EVENTS.push(ev);
    return ev;
  },

  deleteOne(id) {
    const index = EVENTS.findIndex((e) => e.id === id);
    if (index === -1) return false;
    EVENTS.splice(index, 1);
    return true;
  },
};
