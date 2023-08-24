CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
