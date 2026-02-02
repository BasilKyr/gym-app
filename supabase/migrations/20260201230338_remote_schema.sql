drop extension if exists "pg_net";

create sequence "public"."workouts_id_seq";


  create table "public"."workouts" (
    "id" bigint not null default nextval('public.workouts_id_seq'::regclass),
    "title" text not null,
    "difficulty" text not null,
    "duration_minutes" integer not null,
    "notes" text,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."workouts" enable row level security;

alter sequence "public"."workouts_id_seq" owned by "public"."workouts"."id";

CREATE INDEX workouts_created_at_idx ON public.workouts USING btree (created_at DESC);

CREATE UNIQUE INDEX workouts_pkey ON public.workouts USING btree (id);

alter table "public"."workouts" add constraint "workouts_pkey" PRIMARY KEY using index "workouts_pkey";

alter table "public"."workouts" add constraint "workouts_difficulty_check" CHECK ((difficulty = ANY (ARRAY['easy'::text, 'medium'::text, 'hard'::text]))) not valid;

alter table "public"."workouts" validate constraint "workouts_difficulty_check";

alter table "public"."workouts" add constraint "workouts_duration_minutes_check" CHECK ((duration_minutes > 0)) not valid;

alter table "public"."workouts" validate constraint "workouts_duration_minutes_check";

grant delete on table "public"."workouts" to "anon";

grant insert on table "public"."workouts" to "anon";

grant references on table "public"."workouts" to "anon";

grant select on table "public"."workouts" to "anon";

grant trigger on table "public"."workouts" to "anon";

grant truncate on table "public"."workouts" to "anon";

grant update on table "public"."workouts" to "anon";

grant delete on table "public"."workouts" to "authenticated";

grant insert on table "public"."workouts" to "authenticated";

grant references on table "public"."workouts" to "authenticated";

grant select on table "public"."workouts" to "authenticated";

grant trigger on table "public"."workouts" to "authenticated";

grant truncate on table "public"."workouts" to "authenticated";

grant update on table "public"."workouts" to "authenticated";

grant delete on table "public"."workouts" to "service_role";

grant insert on table "public"."workouts" to "service_role";

grant references on table "public"."workouts" to "service_role";

grant select on table "public"."workouts" to "service_role";

grant trigger on table "public"."workouts" to "service_role";

grant truncate on table "public"."workouts" to "service_role";

grant update on table "public"."workouts" to "service_role";


  create policy "workouts_public_read"
  on "public"."workouts"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


