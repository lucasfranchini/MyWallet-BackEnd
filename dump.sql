--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    date timestamp with time zone,
    value integer,
    type text,
    "userId" integer,
    name text
);


--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (90, 191, '047559b0-f71e-472c-a2d7-ffe78fbcf203');
INSERT INTO public.sessions VALUES (91, 194, 'd062d82c-31a7-44fa-87a8-0d1132abe435');
INSERT INTO public.sessions VALUES (93, 199, 'f946d947-6689-463b-a26d-4003695d8a4e');
INSERT INTO public.sessions VALUES (94, 200, '2c7665ce-dfca-46c8-ab13-eb2a6bd3c7f2');
INSERT INTO public.sessions VALUES (95, 201, 'ac778037-8778-4dab-a375-af6ac7238c2d');
INSERT INTO public.sessions VALUES (96, 202, '7aadc0dd-7930-40a3-9b17-1bc16fc40dbf');


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.transactions VALUES (27, '2021-06-25 15:45:41.120877-03', 3000, 'income', 201, '1');
INSERT INTO public.transactions VALUES (28, '2021-06-25 15:45:50.765644-03', 3000, 'income', 201, '321');
INSERT INTO public.transactions VALUES (29, '2021-06-25 15:45:57.703706-03', 3000, 'income', 201, '321');
INSERT INTO public.transactions VALUES (30, '2021-06-25 15:58:09.15056-03', 3000, 'income', 201, 'dsa');
INSERT INTO public.transactions VALUES (31, '2021-06-25 18:03:06.014536-03', 3000, 'income', 202, 'teste');
INSERT INTO public.transactions VALUES (32, '2021-06-25 18:03:13.612699-03', 4000, 'expense', 202, 'teste');
INSERT INTO public.transactions VALUES (33, '2021-06-25 18:03:30.169468-03', 3333, 'income', 202, 'subindo');
INSERT INTO public.transactions VALUES (34, '2021-06-25 18:03:35.851121-03', 3000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (35, '2021-06-25 18:03:41.290717-03', 3333, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (36, '2021-06-25 18:03:48.025906-03', 3334, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (37, '2021-06-25 18:03:54.72422-03', 20, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (38, '2021-06-25 18:04:05.02937-03', 2000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (39, '2021-06-25 18:04:12.542736-03', 20, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (40, '2021-06-25 18:04:32.460894-03', 1000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (41, '2021-06-25 18:04:37.244346-03', 20, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (42, '2021-06-25 18:04:46.556045-03', 1000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (43, '2021-06-25 18:05:02.965161-03', 1000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (44, '2021-06-25 18:05:09.083579-03', 10, 'expense', 202, 'a');
INSERT INTO public.transactions VALUES (45, '2021-06-25 18:05:13.889947-03', 1000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (46, '2021-06-25 18:05:18.144051-03', 1000, 'income', 202, 'a');
INSERT INTO public.transactions VALUES (47, '2021-06-25 18:09:28.664823-03', 1000, 'income', 201, 'a');
INSERT INTO public.transactions VALUES (48, '2021-06-25 18:12:43.760252-03', 1050, 'income', 201, 'a');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (200, '789', '123@teste.com', '$2b$12$nrzqfKOFzlPX95Q.jUV8b.63gp60y9gINwctK18ZfbRAcnMnLKm/S');
INSERT INTO public.users VALUES (201, 'lucas', 'lucas@lucas.com', '$2b$12$smNDdOyQWEB98FC47NFTvepg6Qur9Y0HX3yFUgXea3eqA3EoLaJ7u');
INSERT INTO public.users VALUES (202, 'lucas', '123@123.com', '$2b$12$ByYnS2fOeFdY0qBCWIqN8uSgAXsNPica50s1sCROl3oK7g8gDP.ui');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 96, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.transactions_id_seq', 48, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 202, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

