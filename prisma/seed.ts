import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

async function main() {
  console.log("🌱 Starting Seed...");

  // 1. Read the GeoJSON file
  const filePath = path.join(__dirname, "seed", "locations.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const geoData = JSON.parse(rawData);

  // 2. Loop through every feature (Airport, Mall, etc.)
  for (const feature of geoData.features) {
    const name = feature.properties.name || feature.properties.iata || "Unknown Zone";
    const geometry = feature.geometry;

    // Skip if it has no name or isn't a Polygon
    if (!name || (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon")) {
      continue;
    }

    console.log(`Processing: ${name}`);

    // 3. THE MAGIC: Insert Raw SQL
    // We pass the geometry object as a string directly to PostGIS
    // ST_GeomFromGeoJSON parses the JSON string into a binary geometry
    // ST_SetSRID(..., 4326) tells DB this is GPS data (Earth)
    await prisma.$executeRaw`
      INSERT INTO "NonPlace" (id, name, description, geofence, "updatedAt")
      VALUES (
        gen_random_uuid(), 
        ${name}, 
        'A liminal space',
        -- THE CHANGE IS HERE:
        -- 1. ST_GeomFromGeoJSON parses the JSON
        -- 2. ST_Multi(...) wraps it. If it's a Polygon, it becomes a MultiPolygon.
        -- 3. ST_SetSRID(...) sets it to GPS coordinates.
        ST_SetSRID(ST_Multi(ST_GeomFromGeoJSON(${JSON.stringify(geometry)}::text)), 4326),
        NOW()
      )
    `;
  }

  console.log("✅ Seeding Complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
