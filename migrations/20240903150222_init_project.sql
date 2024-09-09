CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`ref_id` text NOT NULL,
	`name` text NOT NULL,
	`display_name` text NOT NULL,
	`url` text NOT NULL,
	`path` text DEFAULT '/' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` integer NOT NULL;