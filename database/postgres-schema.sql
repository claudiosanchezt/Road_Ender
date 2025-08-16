--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    client_id text NOT NULL,
    guide_id integer,
    zone_id integer,
    tourist_place_id integer,
    start_date date,
    end_date date,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_id_seq OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: continents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.continents (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.continents OWNER TO postgres;

--
-- Name: continents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.continents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.continents_id_seq OWNER TO postgres;

--
-- Name: continents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.continents_id_seq OWNED BY public.continents.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text NOT NULL,
    continent_id integer
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: favorite_tourist_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_tourist_places (
    id integer NOT NULL,
    user_id text NOT NULL,
    tourist_place_id integer
);


ALTER TABLE public.favorite_tourist_places OWNER TO postgres;

--
-- Name: favorite_tourist_places_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorite_tourist_places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_tourist_places_id_seq OWNER TO postgres;

--
-- Name: favorite_tourist_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorite_tourist_places_id_seq OWNED BY public.favorite_tourist_places.id;


--
-- Name: favorite_zones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_zones (
    id integer NOT NULL,
    user_id text NOT NULL,
    zone_id integer
);


ALTER TABLE public.favorite_zones OWNER TO postgres;

--
-- Name: favorite_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorite_zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_zones_id_seq OWNER TO postgres;

--
-- Name: favorite_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorite_zones_id_seq OWNED BY public.favorite_zones.id;


--
-- Name: guide_languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guide_languages (
    guide_id integer NOT NULL,
    language_id integer NOT NULL
);


ALTER TABLE public.guide_languages OWNER TO postgres;

--
-- Name: guide_specialties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guide_specialties (
    guide_id integer NOT NULL,
    specialty_id integer NOT NULL
);


ALTER TABLE public.guide_specialties OWNER TO postgres;

--
-- Name: guide_tourist_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guide_tourist_places (
    guide_id integer NOT NULL,
    tourist_place_id integer NOT NULL
);


ALTER TABLE public.guide_tourist_places OWNER TO postgres;

--
-- Name: guide_zones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guide_zones (
    guide_id integer NOT NULL,
    zone_id integer NOT NULL
);


ALTER TABLE public.guide_zones OWNER TO postgres;

--
-- Name: guides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guides (
    id integer NOT NULL,
    user_id text NOT NULL,
    name text,
    bio text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.guides OWNER TO postgres;

--
-- Name: guides_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guides_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.guides_id_seq OWNER TO postgres;

--
-- Name: guides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guides_id_seq OWNED BY public.guides.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.languages_id_seq OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id text NOT NULL,
    title text,
    body text,
    read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    booking_id integer,
    amount numeric(10,2) NOT NULL,
    currency character varying(8) DEFAULT 'CLP'::character varying,
    status character varying(32) DEFAULT 'pending'::character varying
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: specialties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    name text NOT NULL,
    category_id integer
);


ALTER TABLE public.specialties OWNER TO postgres;

--
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specialties_id_seq OWNER TO postgres;

--
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specialties_id_seq OWNED BY public.specialties.id;


--
-- Name: specialty_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specialty_categories (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.specialty_categories OWNER TO postgres;

--
-- Name: specialty_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specialty_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specialty_categories_id_seq OWNER TO postgres;

--
-- Name: specialty_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specialty_categories_id_seq OWNED BY public.specialty_categories.id;


--
-- Name: tourist_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tourist_places (
    id integer NOT NULL,
    name text NOT NULL,
    zone_id integer,
    description text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tourist_places OWNER TO postgres;

--
-- Name: tourist_places_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tourist_places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tourist_places_id_seq OWNER TO postgres;

--
-- Name: tourist_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tourist_places_id_seq OWNED BY public.tourist_places.id;


--
-- Name: weather_alerts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.weather_alerts (
    id integer NOT NULL,
    zone_id integer,
    message text NOT NULL,
    severity character varying(16) DEFAULT 'medium'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.weather_alerts OWNER TO postgres;

--
-- Name: weather_alerts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.weather_alerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.weather_alerts_id_seq OWNER TO postgres;

--
-- Name: weather_alerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.weather_alerts_id_seq OWNED BY public.weather_alerts.id;


--
-- Name: zones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zones (
    id integer NOT NULL,
    name text NOT NULL,
    region text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.zones OWNER TO postgres;

--
-- Name: zones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zones_id_seq OWNER TO postgres;

--
-- Name: zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zones_id_seq OWNED BY public.zones.id;


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: continents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.continents ALTER COLUMN id SET DEFAULT nextval('public.continents_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: favorite_tourist_places id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_tourist_places ALTER COLUMN id SET DEFAULT nextval('public.favorite_tourist_places_id_seq'::regclass);


--
-- Name: favorite_zones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_zones ALTER COLUMN id SET DEFAULT nextval('public.favorite_zones_id_seq'::regclass);


--
-- Name: guides id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guides ALTER COLUMN id SET DEFAULT nextval('public.guides_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialties_id_seq'::regclass);


--
-- Name: specialty_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialty_categories ALTER COLUMN id SET DEFAULT nextval('public.specialty_categories_id_seq'::regclass);


--
-- Name: tourist_places id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tourist_places ALTER COLUMN id SET DEFAULT nextval('public.tourist_places_id_seq'::regclass);


--
-- Name: weather_alerts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weather_alerts ALTER COLUMN id SET DEFAULT nextval('public.weather_alerts_id_seq'::regclass);


--
-- Name: zones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones ALTER COLUMN id SET DEFAULT nextval('public.zones_id_seq'::regclass);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: continents continents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.continents
    ADD CONSTRAINT continents_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: favorite_tourist_places favorite_tourist_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_tourist_places
    ADD CONSTRAINT favorite_tourist_places_pkey PRIMARY KEY (id);


--
-- Name: favorite_zones favorite_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_zones
    ADD CONSTRAINT favorite_zones_pkey PRIMARY KEY (id);


--
-- Name: guide_languages guide_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_languages
    ADD CONSTRAINT guide_languages_pkey PRIMARY KEY (guide_id, language_id);


--
-- Name: guide_specialties guide_specialties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_specialties
    ADD CONSTRAINT guide_specialties_pkey PRIMARY KEY (guide_id, specialty_id);


--
-- Name: guide_tourist_places guide_tourist_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_tourist_places
    ADD CONSTRAINT guide_tourist_places_pkey PRIMARY KEY (guide_id, tourist_place_id);


--
-- Name: guide_zones guide_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_zones
    ADD CONSTRAINT guide_zones_pkey PRIMARY KEY (guide_id, zone_id);


--
-- Name: guides guides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: specialties specialties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (id);


--
-- Name: specialty_categories specialty_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialty_categories
    ADD CONSTRAINT specialty_categories_pkey PRIMARY KEY (id);


--
-- Name: tourist_places tourist_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tourist_places
    ADD CONSTRAINT tourist_places_pkey PRIMARY KEY (id);


--
-- Name: weather_alerts weather_alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weather_alerts
    ADD CONSTRAINT weather_alerts_pkey PRIMARY KEY (id);


--
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: bookings bookings_tourist_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_tourist_place_id_fkey FOREIGN KEY (tourist_place_id) REFERENCES public.tourist_places(id) ON DELETE SET NULL;


--
-- Name: bookings bookings_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id) ON DELETE SET NULL;


--
-- Name: countries countries_continent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_continent_id_fkey FOREIGN KEY (continent_id) REFERENCES public.continents(id) ON DELETE SET NULL;


--
-- Name: favorite_tourist_places favorite_tourist_places_tourist_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_tourist_places
    ADD CONSTRAINT favorite_tourist_places_tourist_place_id_fkey FOREIGN KEY (tourist_place_id) REFERENCES public.tourist_places(id) ON DELETE CASCADE;


--
-- Name: favorite_zones favorite_zones_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_zones
    ADD CONSTRAINT favorite_zones_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id) ON DELETE CASCADE;


--
-- Name: guide_languages guide_languages_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_languages
    ADD CONSTRAINT guide_languages_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: guide_languages guide_languages_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_languages
    ADD CONSTRAINT guide_languages_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON DELETE CASCADE;


--
-- Name: guide_specialties guide_specialties_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_specialties
    ADD CONSTRAINT guide_specialties_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: guide_specialties guide_specialties_specialty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_specialties
    ADD CONSTRAINT guide_specialties_specialty_id_fkey FOREIGN KEY (specialty_id) REFERENCES public.specialties(id) ON DELETE CASCADE;


--
-- Name: guide_tourist_places guide_tourist_places_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_tourist_places
    ADD CONSTRAINT guide_tourist_places_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: guide_tourist_places guide_tourist_places_tourist_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_tourist_places
    ADD CONSTRAINT guide_tourist_places_tourist_place_id_fkey FOREIGN KEY (tourist_place_id) REFERENCES public.tourist_places(id) ON DELETE CASCADE;


--
-- Name: guide_zones guide_zones_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_zones
    ADD CONSTRAINT guide_zones_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- Name: guide_zones guide_zones_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guide_zones
    ADD CONSTRAINT guide_zones_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id) ON DELETE CASCADE;


--
-- Name: payments payments_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;


--
-- Name: specialties specialties_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.specialty_categories(id) ON DELETE SET NULL;


--
-- Name: tourist_places tourist_places_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tourist_places
    ADD CONSTRAINT tourist_places_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id) ON DELETE SET NULL;


--
-- Name: weather_alerts weather_alerts_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weather_alerts
    ADD CONSTRAINT weather_alerts_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

