CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`ref_id` text NOT NULL,
	`owner` text NOT NULL,
	`repo` text NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`branch` text DEFAULT 'main' NOT NULL,
	`path` text DEFAULT '/' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`access_token` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`platform_id` text NOT NULL,
	`platform_data` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`avatar_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
