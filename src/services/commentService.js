import { EventComment } from "#models/EventComment.js";

const COMMENTS = [];

export const commentService = {
  getAll(event_id) {
    return COMMENTS.filter((c) => c.event_ref === event_id);
  },

  save(commentData) {
    if (commentData.id) {
      let existing = COMMENTS.find((c) => c.id === commentData.id);
      if (existing) {
        Object.assign(existing, commentData);
        return existing;
      }
    }
    const comment = new EventComment(commentData);
    COMMENTS.push(comment);
    return comment;
  },

  deleteOne(id) {
    const index = COMMENTS.findIndex((c) => c.id === id);
    if (index === -1) return false;
    COMMENTS.splice(index, 1);
    return true;
  },
};
