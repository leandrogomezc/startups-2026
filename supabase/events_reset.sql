-- Ejecutar SOLO si necesitás borrar el módulo de eventos y volver a correr events.sql desde cero.
-- Caso típico: ERROR 42703 "column starts_at does not exist" porque public.events ya existía con otro esquema
-- (CREATE TABLE IF NOT EXISTS no añade columnas; el índice sobre starts_at falla).
--
-- ADVERTENCIA: elimina datos de event_registrations y events. No usar en producción con datos que importen
-- sin backup.

drop table if exists public.event_registrations cascade;
drop table if exists public.events cascade;

drop type if exists public.registration_status cascade;
drop type if exists public.payment_status cascade;
drop type if exists public.location_type cascade;
