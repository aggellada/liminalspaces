// hooks/useGeofence.ts
import { getNonplaceBroadcasts } from "@/app/action/broadcast.action";
import { useState, useEffect } from "react";

type Broadcast = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  anonymousId: string;
  nonplaceId: string;
  anonymous: {
    handle: string;
  };
};

export function useGeofence() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nonPlace, setNonPlace] = useState<string | null>(null);
  const [nonPlaceId, setNonPlaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const minimumDelay = new Promise((resolve) => setTimeout(resolve, 2000));

        // const { latitude, longitude } = position.coords;
        const latitude = 14.511153;
        const longitude = 121.015243;

        setLocation({ lat: latitude, lng: longitude });

        try {
          const response = await fetch("/api/nonplace/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });

          const data = await response.json();

          if (data.status === "FOUND") {
            setNonPlace(data.nonplace.name);
            setNonPlaceId(data.nonplace.id);
          } else {
            setNonPlace(null);
          }
        } catch (err) {
          setError("Failed to connect to satellite uplink.");
        } finally {
          await minimumDelay;
          setLoading(false);
        }
      },
      (err) => {
        setError("Location permission denied.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  return { location, nonPlace, loading, error, nonPlaceId };
}
