
DROP TABLE IF EXISTS users;
CREATE TABLE users (
 id SERIAL,
 first_name VARCHAR(15),
 last_name VARCHAR(15)
);


ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS todo_list_items;
CREATE TABLE todo_list_items (
 id SERIAL,
 id_users INTEGER,
 task TEXT
);


ALTER TABLE todo_list_items ADD CONSTRAINT todo_list_items_pkey PRIMARY KEY (id);

ALTER TABLE todo_list_items ADD CONSTRAINT todo_list_items_id_users_fkey FOREIGN KEY (id_users) REFERENCES users(id);

INSERT INTO users (first_name, last_name) VALUES
('Eddy', 'Edster'),
('Mary', 'Jane'),
('Cole', 'Slaw');

INSERT INTO todo_list_items (id_users, task) VALUES
(1, 'Clean room'),
(1, 'Take trash out'),
(2, 'Pay bills'),
(3, 'Complete homework'),
(3, 'Do dishes');

