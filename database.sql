DROP TABLE "todoList";

CREATE TABLE "todoList" (
	"id" serial primary key,
	"task" varchar(200) not null,
	"complete" BOOLEAN DEFAULT FALSE
	
);

INSERT INTO "todoList" 
	("task", "complete") 
VALUES 
	('Finish Weekend Project', FALSE),
	('Play Bloodborne', FALSE);
	
SELECT * FROM "todoList";
	