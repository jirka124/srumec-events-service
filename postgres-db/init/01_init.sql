CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_ref UUID NOT NULL,
  title VARCHAR(32) NOT NULL,
  description VARCHAR(512) DEFAULT NULL,
  location GEOGRAPHY(Point, 4326) DEFAULT NULL,
  happen_time TIMESTAMP NOT NULL DEFAULT NOW()
);

-- COMMENTS
CREATE TABLE IF NOT EXISTS event_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_ref UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_ref UUID NOT NULL,
  reply_to_ref UUID NULL REFERENCES event_comments(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT NOW()
);

-- spatial index for fast nearby search
CREATE INDEX IF NOT EXISTS idx_events_location
  ON events
  USING GIST (location);
