import { db } from "#root/config/db.js";
import { eventComments } from "#models/schema.js";
import { sql } from "drizzle-orm";

export const commentService = {
  async getAll(event_id) {
    const rows = await db.execute(sql`
      SELECT *
      FROM event_comments
      WHERE event_ref = ${event_id}
      ORDER BY create_time ASC;
    `);

    return {
      event_id,
      event_comments_list: rows,
    };
  },

  async updateOne(data) {
    //
    // UPDATE (data.id existuje)
    //
    if (data.id) {
      const updates = [];

      if (data.content !== undefined) {
        updates.push(sql`content = ${data.content}`);
      }

      if (data.reply_to_ref !== undefined) {
        updates.push(sql`reply_to_ref = ${data.reply_to_ref}`);
      }

      // nic k updatu?
      if (updates.length === 0) {
        throw new Error("Nothing to update.");
      }

      const result = await db.execute(sql`
        UPDATE event_comments
        SET ${sql.join(updates, sql`, `)}
        WHERE id = ${data.id}
        RETURNING *;
      `);

      return result[0] ?? null;
    }

    //
    // INSERT (data.id neexistuje)
    //
    const columns = ["event_ref", "user_ref", "content"];
    const values = [data.event_ref, data.user_ref, data.content];

    // optional reply_to_ref
    if (data.reply_to_ref !== undefined) {
      columns.push("reply_to_ref");
      values.push(data.reply_to_ref);
    }

    const columnsSql = sql.raw(columns.map((col) => `"${col}"`).join(", "));
    const valuesSql = sql.join(values, sql`, `);

    const result = await db.execute(sql`
      INSERT INTO event_comments (${columnsSql})
      VALUES (${valuesSql})
      RETURNING *;
    `);

    return result[0];
  },

  async deleteOne(comment_id) {
    const result = await db.execute(sql`
      DELETE FROM event_comments
      WHERE id = ${comment_id}
      RETURNING id;
    `);

    return {
      status: !!result[0],
      event_comment_id: comment_id,
    };
  },
};
