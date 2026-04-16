-- Supabase Storage: bucket público para portadas de eventos (subida vía API con service role).
-- Ejecutá en SQL Editor después de events.sql. Si el bucket ya existe, los INSERT/ policies pueden fallar; ajustá según tu proyecto.
--
-- Portadas se guardan en public.events.cover_image_url como URL pública del objeto.

-- Bucket público (lectura anónima vía URL /object/public/...)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-covers',
  'event-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Cualquiera puede leer objetos de este bucket (URLs embebidas en el sitio).
drop policy if exists "Public read event covers" on storage.objects;
create policy "Public read event covers"
  on storage.objects for select
  to public
  using (bucket_id = 'event-covers');

-- Las subidas las hace solo el backend con SUPABASE_SERVICE_ROLE_KEY (no requiere policy de INSERT para anon).
