"use client";
import React, { useEffect, useState } from 'react';
import { api } from '../src/lib/apiClient';

type Zone = { id: number; name: string };

export default function ZoneList() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api.get('/api/zones')
      .then(r => { if (mounted) setZones(r.data); })
      .catch(e => { if (mounted) setError(e.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Cargando zonas...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!zones.length) return <div>No hay zonas disponibles</div>;

  return (
    <ul>
      {zones.map(z => (
        <li key={z.id}>{z.name}</li>
      ))}
    </ul>
  );
}
