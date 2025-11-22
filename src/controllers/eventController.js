import { eventService } from "#services/eventService.js";

export const eventController = {
  async getNearby(req, res) {
    try {
      const list = await eventService.getNearby(req.body);
      res.json(list);
    } catch (e) {
      console.error(e);
      res.status(400).json({ fail_code: 1, message: e.message });
    }
  },

  async getOne(req, res) {
    try {
      const ev = await eventService.getOne(req.body.event_id);
      if (!ev) return res.status(404).json({ fail_code: 404 });
      res.json(ev);
    } catch (e) {
      console.error(e);
      res.status(500).json({ fail_code: 500 });
    }
  },

  async updateOne(req, res) {
    try {
      const ev = await eventService.save(req.body.Event);
      res.json(ev);
    } catch (e) {
      console.error(e);
      res.status(500).json({ fail_code: 500 });
    }
  },

  async deleteOne(req, res) {
    try {
      const ok = await eventService.deleteOne(req.body.event_id);
      res.json({ status: ok, event_id: req.body.event_id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ fail_code: 500 });
    }
  },
};
