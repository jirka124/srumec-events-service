import { commentService } from "#services/commentService.js";

export const commentController = {
  async getAll(req, res) {
    try {
      const { event_id } = req.body;

      const data = await commentService.getAll(event_id);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  },

  async updateOne(req, res) {
    try {
      const commentData = req.body.Event_Comment;
      const updated = await commentService.updateOne(commentData);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update comment" });
    }
  },

  async deleteOne(req, res) {
    try {
      const { comment_id } = req.body;
      const result = await commentService.deleteOne(comment_id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  },
};
