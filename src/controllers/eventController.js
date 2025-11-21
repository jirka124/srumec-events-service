import { eventService } from "#services/eventService.js";

export const eventController = {
  getNearby(req, res) {
    try {
      const list = eventService.getNearby(req.body);
      res.json(list);
    } catch (e) {
      res.status(400).json({ fail_code: 1, message: e.message });
    }
  },

  getOne(req, res) {
    const ev = eventService.getOne(req.body.event_id);
    if (!ev) return res.status(404).json({ fail_code: 404 });
    res.json(ev);
  },

  updateOne(req, res) {
    const ev = eventService.save(req.body.Event);
    res.json(ev);
  },

  deleteOne(req, res) {
    const ok = eventService.deleteOne(req.body.event_id);
    res.json({ status: ok, event_id: req.body.event_id });
  },
};
