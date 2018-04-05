BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `Songs` (
	`url`	TEXT,
	`Artist`	TEXT,
	`Song`	TEXT,
	`Link`	TEXT,
	`DateCrawled`	TEXT
);
COMMIT;
