import { commentService } from "#services/commentService.js";

export const commentController = {
  getAll(req, res) {
    const { event_id } = req.body;
    const list = commentService.getAll(event_id);
    res.json({ event_id, event_list: list });
  },

  updateOne(req, res) {
    const comment = commentService.save(req.body.Event_Comment);
    res.json(comment);
  },

  deleteOne(req, res) {
    const ok = commentService.deleteOne(req.body.comment_id);
    res.json({ status: ok, event_comment_id: req.body.comment_id });
  },
};
