import { db } from "#root/config/db.js";
import { events } from "#models/schema.js";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export const eventService = {
  async getNearby({ latitude, longitude, proximity }) {
    const rows = await db.execute(sql`
      SELECT *
      FROM events
      WHERE ST_DWithin(
        location,
        ST_MakePoint(${longitude}, ${latitude})::geography,
        ${proximity}
      );
    `);

    return rows;
  },

  async getOne(id) {
    const result = await db
      .select()
      .from(events)
      .where(sql`${events.id} = ${id}`);
    return result[0] || null;
  },

  async save(data) {
    //
    // UPDATE
    //
    if (data.id) {
      const updates = [];

      if (data.title !== undefined) {
        updates.push(sql`title = ${data.title}`);
      }

      if (data.description !== undefined) {
        updates.push(sql`description = ${data.description}`);
      }

      if (data.happen_time !== undefined) {
        updates.push(sql`happen_time = ${data.happen_time}`);
      }

      // optional location
      if (data.latitude !== undefined && data.longitude !== undefined) {
        updates.push(
          sql`
            location = ST_SetSRID(
              ST_MakePoint(${data.longitude}, ${data.latitude}),
              4326
            )::geography
          `
        );
      }

      if (updates.length === 0) {
        throw new Error("Nothing to update.");
      }

      const result = await db.execute(sql`
        UPDATE events
        SET ${sql.join(updates, sql`, `)}
        WHERE id = ${data.id}
        RETURNING *;
      `);

      return result[0] ?? null;
    }

    //
    // INSERT
    //
    const columns = ["organizer_ref", "title"];
    const values = [data.organizer_ref, data.title];

    if (data.description !== undefined) {
      columns.push("description");
      values.push(data.description);
    }

    if (data.happen_time !== undefined) {
      columns.push("happen_time");
      values.push(data.happen_time);
    }

    // Optional location
    if (data.latitude !== undefined && data.longitude !== undefined) {
      columns.push("location");
      values.push(
        sql`
      ST_SetSRID(
        ST_MakePoint(${data.longitude}, ${data.latitude}),
        4326
      )::geography
    `
      );
    }

    // FIX: column names must be raw
    const columnsSql = sql.raw(columns.map((col) => `"${col}"`).join(", "));
    const valuesSql = sql.join(values, sql`, `);

    const result = await db.execute(sql`
      INSERT INTO events (${columnsSql})
      VALUES (${valuesSql})
      RETURNING *;
    `);

    return result[0];
  },

  async deleteOne(id) {
    const result = await db
      .delete(events)
      .where(eq(events.id, id))
      .returning({ id: events.id });

    return result.length > 0;
  },
};
