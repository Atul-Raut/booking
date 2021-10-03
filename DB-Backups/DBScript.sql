--2021-08-18 Start
CREATE TABLE "M_VEHICLE_CAT"(
"ID" VARCHAR(50) NOT NULL,
"NAME" VARCHAR(200) NOT NULL,
"DEL_FLG" int DEFAULT 0,
"INS_DT" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
"INS_BY" VARCHAR(250) NOT NULL,
"UPD_DT" TIMESTAMP,
"UPD_BY" VARCHAR(250)
);
INSERT INTO "M_VEHICLE_CAT"("ID", "NAME", "DEL_FLG", "INS_DT", "INS_BY") VALUES (1, '3 Whiller', 0, CURRENT_TIMESTAMP, 'Atul');
INSERT INTO "M_VEHICLE_CAT"("ID", "NAME", "DEL_FLG", "INS_DT", "INS_BY") VALUES (2, '4 Whiller', 0, CURRENT_TIMESTAMP, 'Atul');
INSERT INTO "M_VEHICLE_CAT"("ID", "NAME", "DEL_FLG", "INS_DT", "INS_BY") VALUES (3, '6 Whiller', 0, CURRENT_TIMESTAMP, 'Atul');

ALTER TABLE "M_VEHICLE_TYPE" ADD COLUMN "CATEGORY" VARCHAR(50);

UPDATE "M_VEHICLE_TYPE" SET  "CATEGORY" ='1', "TYPE" ='Auto' WHERE "ID" = '2';
UPDATE "M_VEHICLE_TYPE" SET  "CATEGORY" ='2', "TYPE" ='Tempo' WHERE "ID" = '1';

INSERT INTO "M_VEHICLE_TYPE"("ID","TYPE","NAME","CATEGORY","DISP_ORD","DEL_FLG","INS_DT","INS_BY") VALUES ('3','Appa Riksha','Appa Riksha','1',1,0, CURRENT_TIMESTAMP,'Atul');

INSERT INTO "M_VEHICLE_TYPE"("ID","TYPE","NAME","CATEGORY","DISP_ORD","DEL_FLG","INS_DT","INS_BY") VALUES ('4','Car','Car','2',1,0, CURRENT_TIMESTAMP,'Atul');
INSERT INTO "M_VEHICLE_TYPE"("ID","TYPE","NAME","CATEGORY","DISP_ORD","DEL_FLG","INS_DT","INS_BY") VALUES ('5','Pickup','Pickup','2',1,0, CURRENT_TIMESTAMP,'Atul');
INSERT INTO "M_VEHICLE_TYPE"("ID","TYPE","NAME","CATEGORY","DISP_ORD","DEL_FLG","INS_DT","INS_BY") VALUES ('6','Chota Hatti','Chota Hatti','2',1,0, CURRENT_TIMESTAMP,'Atul');

INSERT INTO "M_VEHICLE_TYPE"("ID","TYPE","NAME","CATEGORY","DISP_ORD","DEL_FLG","INS_DT","INS_BY") VALUES ('7','Tempo','Tempo','3',1,0, CURRENT_TIMESTAMP,'Atul');
INSERT INTO "M_VEHICLE_TYPE"("ID","TYPE","NAME","CATEGORY","DISP_ORD","DEL_FLG","INS_DT","INS_BY") VALUES ('8','Truck','Truck','3',1,0, CURRENT_TIMESTAMP,'Atul');

INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-06','CONNON_CONFIG', 0, 'Get All Vehicle Types From Master Cat Wise', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

--2021-08-18 END


--2021-08-20 start
INSERT INTO public."T_USER_VEHICLE_IMG"(
	"ID", "USER_VEHICLE_ID", "USER_ID", "IMG_URL", "DEL_FLG", "INS_DT", "INS_BY")
	VALUES ('1', 'ec4fdd86-599a-4052-9ea5-d6dd4e4f0f97', 'atul.raut1', '../../assets/download.jpeg', 0, CURRENT_TIMESTAMP, 'Atul');
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-10','CONNON_CONFIG', 0, 'Profile', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
ALTER TABLE "M_USER" ADD COLUMN "BIRTH_DATE" VARCHAR(10);
INSERT INTO "T_POST_REQUEST" VALUES ('7','9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9','a','NEW',0, CURRENT_TIMESTAMP, 'ATUL', null,null);
INSERT INTO "T_POST_REQUEST" VALUES ('7','9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9','b','NEW',0, CURRENT_TIMESTAMP, 'ATUL', null,null);
INSERT INTO "T_POST_REQUEST" VALUES ('7','9fc615e0-ef2f-48f4-8e9a-5e34cd28a6a9','atul.raut2','NEW',0, CURRENT_TIMESTAMP, 'ATUL', null,null);
INSERT INTO public."T_USER_VEHICLE_IMG" VALUES ('2', 'ec4fdd86-599a-4052-9ea5-d6dd4e4f0f97', 'atul.raut1', 'download1.jpeg', 0, CURRENT_TIMESTAMP, 'ATUL');
INSERT INTO public."T_USER_VEHICLE_IMG" VALUES ('2', 'ec4fdd86-599a-4052-9ea5-d6dd4e4f0f97', 'atul.raut1', 'download1.jpeg', 0, CURRENT_TIMESTAMP, 'ATUL');
INSERT INTO public."T_USER_VEHICLE_IMG" VALUES ('3', 'ec4fdd86-599a-4052-9ea5-d6dd4e4f0f97', 'atul.raut1', 'download3.jpeg', 0, CURRENT_TIMESTAMP, 'ATUL');
INSERT INTO public."T_USER_VEHICLE_IMG" VALUES ('4', '30f12dca-e372-44c1-afe5-6a834db36241', 'b', 'download3.jpeg', 0, CURRENT_TIMESTAMP, 'ATUL');
INSERT INTO public."T_USER_VEHICLE_IMG" VALUES ('5', '30f12dca-e372-44c1-afe5-6a834db36241', 'b', 'download2.jpeg', 0, CURRENT_TIMESTAMP, 'ATUL');
--2020-08-20 end

--2021-08-22 Start
ALTER TABLE "T_USER_VEHICLE_IMG"  ADD CONSTRAINT user_vehicle_img_pk PRIMARY KEY ("ID");
UPDATE "T_POST" set "ACTIVITY_DATE_TIME_FROM" = null, "ACTIVITY_DATE_TIME_TO" = null;
ALTER TABLE "T_POST"
  ALTER "ACTIVITY_DATE_TIME_FROM" DROP DEFAULT
 ,ALTER "ACTIVITY_DATE_TIME_FROM" type timestamp without time zone
 USING "ACTIVITY_DATE_TIME_FROM"::timestamp without time zone;

ALTER TABLE "T_POST"
  ALTER "ACTIVITY_DATE_TIME_TO" DROP DEFAULT
 ,ALTER "ACTIVITY_DATE_TIME_TO" type timestamp without time zone
 USING "ACTIVITY_DATE_TIME_TO"::timestamp without time zone;
ALTER TABLE "T_POST" ADD COLUMN "POST_TITLE" VARCHAR(500);

--2021-08-22 end

--2021-08-26 Start
ALTER TABLE "T_USER_VEHICLE_IMG" ADD COLUMN "IMG_NO" integer;
ALTER TABLE "T_POST" ADD COLUMN "BID_DATE_TIME_FROM" timestamp without time zone;
ALTER TABLE "T_POST" ADD COLUMN "BID_DATE_TIME_TO" timestamp without time zone;
ALTER TABLE "T_POST" ADD COLUMN "BID" int DEFAULT 0;

ALTER TABLE "T_USER_VEHICLE_IMG"
    ADD CONSTRAINT unique_vehicle_image UNIQUE ("USER_VEHICLE_ID", "USER_ID", "IMG_NO", "DEL_FLG");


CREATE TABLE "T_POST_BID"(
"ID" VARCHAR(50) NOT NULL,
"POST_ID" VARCHAR(50) NOT NULL,
"REQUEST_USER_ID" VARCHAR(250) NOT NULL,
"AMOUNT" int NOT NULL,
"DEL_FLG" int DEFAULT 0,
"INS_DT" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
"INS_BY" VARCHAR(250) NOT NULL
)
ALTER TABLE "T_POST_BID"
    ADD CONSTRAINT bid_post_pk PRIMARY KEY ("ID");
INSERT INTO "M_CTL_CONFIG" VALUES('WS-FL-01','CONNON_CONFIG', 0, 'File Upload', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-IMG-01','CONNON_CONFIG', 0, 'Image Upload', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-BID-01','CONNON_CONFIG', 0, 'Create Post bid', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-BID-01','MANDATORY_VAL', 1, 'Create Post bid', '[{"fieldName":"userId"},{"fieldName":"acType"},{"fieldName":"postId"},{"fieldName":"amount"}]', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
--2021-08-29 end


--2021-09-04 Start
ALTER TABLE "T_POST" ADD COLUMN "SERVICE_PROVIDER_USER" VARCHAR(250);
--2021-09-04 End

--2021-09-07 start
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-12','CONNON_CONFIG', 0, 'Set New Password', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-12','MANDATORY_VAL', 1, 'Set New Password', '[{"fieldName":"userId"},{"fieldName":"acType"},{"fieldName":"newPassword"}]', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
--2021-09-07 end

--2021-09-09
DROP TABLE "M_FEEDBACK_QUESTIONS";
CREATE TABLE "M_FEEDBACK_QUESTIONS"
(
    "ID" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "QUESTION" character varying(250) COLLATE pg_catalog."default" NOT NULL,
    "OPTION_A" character varying(250),
    "OPTION_B" character varying(250),
    "OPTION_C" character varying(250),
    "OPTION_D" character varying(250),
	"TYPE" integer,
	"DISP_ORD" integer,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) COLLATE pg_catalog."default" NOT NULL
);

DROP TABLE "M_FEEDBACK_QUESTIONS";
CREATE TABLE "M_FEEDBACK_QUESTIONS"
(
    "ID" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "QUESTION" character varying(250) COLLATE pg_catalog."default" NOT NULL,
    "OPTION_A" character varying(250),
    "OPTION_B" character varying(250),
    "OPTION_C" character varying(250),
    "OPTION_D" character varying(250),
	"TYPE" integer,
	"DISP_ORD" integer,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) COLLATE pg_catalog."default" NOT NULL
);
ALTER TABLE "M_FEEDBACK_QUESTIONS"
    ADD CONSTRAINT M_FEEDBACK_QUESTIONS_image
	UNIQUE ("ID", "TYPE", "DEL_FLG");

INSERT INTO "M_FEEDBACK_QUESTIONS"(
	"ID", "QUESTION", "OPTION_A", "OPTION_B", "OPTION_C", "OPTION_D", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
	VALUES ('1', 'How was the service?', null, null, null, null, 0, CURRENT_TIMESTAMP, 'Atul', 1,1);
INSERT INTO "M_FEEDBACK_QUESTIONS"(
	"ID", "QUESTION", "OPTION_A", "OPTION_B", "OPTION_C", "OPTION_D", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
	VALUES ('1', 'Question2 ?', null, null, null, null, 0, CURRENT_TIMESTAMP, 'Atul', 1,2);

INSERT INTO "M_FEEDBACK_QUESTIONS"(
	"ID", "QUESTION", "OPTION_A", "OPTION_B", "OPTION_C", "OPTION_D", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
	VALUES ('1', 'How was the service?', null, null, null, null, 0, CURRENT_TIMESTAMP, 'Atul', 2,1);
INSERT INTO "M_FEEDBACK_QUESTIONS"(
	"ID", "QUESTION", "OPTION_A", "OPTION_B", "OPTION_C", "OPTION_D", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
	VALUES ('1', 'Question2 ?', null, null, null, null, 0, CURRENT_TIMESTAMP, 'Atul', 2,2);
INSERT INTO "M_FEEDBACK_QUESTIONS"(
	"ID", "QUESTION", "OPTION_A", "OPTION_B", "OPTION_C", "OPTION_D", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
	VALUES ('1', 'Question3 ?', null, null, null, null, 0, CURRENT_TIMESTAMP, 'Atul', 2,3);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-FED-01','CONNON_CONFIG', 0, 'Get feedback Question', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

INSERT INTO "M_CTL_CONFIG" VALUES('WS-FED-02','CONNON_CONFIG', 0, 'Save user feedback', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
CREATE TABLE "T_FEEDBACK"
(
    "ID" VARCHAR(50) NOT NULL,
    "FEEDBACK_BY" character varying(250) NOT NULL,
    "FEEDBACK_FOR" character varying(250) NOT NULL,
	"RATINGS" integer,
	"OTHER" character varying(3000),
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    CONSTRAINT tfeedback_pk PRIMARY KEY ("ID")
);


CREATE TABLE "T_FEEDBACK_QUE_ANS"
(
    "ID" VARCHAR(50) NOT NULL,
    "FEEDBACK_BY" character varying(250) NOT NULL,
    "FEEDBACK_FOR" character varying(250) NOT NULL,
	  "QUESTION_ID" character varying(50) NOT NULL,
	  "RATINGS" integer,
		"FEEDBACK_ID" VARCHAR(50) NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) NOT NULL,
    CONSTRAINT tfeedbackqueans_pk PRIMARY KEY ("ID")
);

--2021-09-09

--2021-09-12 start
INSERT INTO "M_CTL_CONFIG" VALUES('WS-FED-03','CONNON_CONFIG', 0, 'get user feedback', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

--2021-09-12 start

--2021-09-21 start
ALTER TABLE "M_VEHICLE_TYPE" ADD COLUMN "DIMENSION" VARCHAR(50);
ALTER TABLE "M_VEHICLE_TYPE" ADD COLUMN "CAPACITY" VARCHAR(5);
ALTER TABLE "M_VEHICLE_TYPE" ADD COLUMN "IMG_URL" VARCHAR(500);
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '5.5ft X 4.5ft X 5ft', "CAPACITY" = '500' WHERE "ID" = '1';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '6ft X 5ft X 5ft', "CAPACITY" = '500' WHERE "ID" = '2';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '6ft X 5ft X 5ft', "CAPACITY" = '500' WHERE "ID" = '3';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '', "CAPACITY" = '5' WHERE "ID" = '4';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '9ft X 5.5ft X 6ft', "CAPACITY" = '2000' WHERE "ID" = '5';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '7ft X 4ft X 5ft', "CAPACITY" = '750' WHERE "ID" = '6';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '10ft X 9ft X 11ft', "CAPACITY" = '2500' WHERE "ID" = '7';
Update "M_VEHICLE_TYPE" SET "DIMENSION" = '15ft X 10ft X 10ft', "CAPACITY" = '3500' WHERE "ID" = '8';
--2021-09-21 end

--2021-09-23 start
INSERT INTO "M_FEEDBACK_QUESTIONS"("ID", "QUESTION", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
VALUES ('6', 'Order created by mistake.', 0, CURRENT_TIMESTAMP, 'Atul', 3,1);
INSERT INTO "M_FEEDBACK_QUESTIONS"("ID", "QUESTION", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
VALUES ('7', 'Cost too high.', 0, CURRENT_TIMESTAMP, 'Atul', 3,3);
INSERT INTO "M_FEEDBACK_QUESTIONS"("ID", "QUESTION", "DEL_FLG", "INS_DT", "INS_BY", "TYPE","DISP_ORD")
VALUES ('8', 'Found cheaper some were else.', 0, CURRENT_TIMESTAMP, 'Atul', 3,3);

CREATE TABLE IF NOT EXISTS "T_REASON_ANS"
(
    "ID" character varying(50) COLLATE pg_catalog."default" NOT NULL,
	"ANS_FOR" character varying(50) COLLATE pg_catalog."default" NOT NULL,
	"ANS_BY" character varying(50) COLLATE pg_catalog."default" NOT NULL,
	"QUESTION_TYP" integer,
	"QUESTION_ID" character varying(50) COLLATE pg_catalog."default" NOT NULL,
	"ANS" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT treasonans_pk PRIMARY KEY ("ID")
);
--2021-09-23 end
--2021-09-30 start
DROP TABLE IF EXISTS "T_USER_NOTIFICATION";
CREATE TABLE IF NOT EXISTS "T_USER_NOTIFICATION"
(
    "ID" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "USER_ID" character varying(250) COLLATE pg_catalog."default" NOT NULL,
	"POST_ID" character varying(50),
    "MESSAGE" character varying(3000) COLLATE pg_catalog."default",
	"MESSAGE_TYPE" integer DEFAULT 0,
	"DISPLAY_TYPE" integer DEFAULT 0,
	"READ_STATUS" integer DEFAULT 0,
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) COLLATE pg_catalog."default" NOT NULL,
	"UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250),
    CONSTRAINT tusernotification_pk PRIMARY KEY ("ID")
);
CREATE TABLE IF NOT EXISTS "M_MESSAGE_TYPE"
(
    "ID" integer,
		"TITLE" character varying(50),
    "MESSAGE" character varying(250) COLLATE pg_catalog."default",
    "DEL_FLG" integer DEFAULT 0,
    "INS_DT" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "INS_BY" character varying(250) COLLATE pg_catalog."default" NOT NULL,
    "UPD_DT" timestamp without time zone,
    "UPD_BY" character varying(250) COLLATE pg_catalog."default",
    CONSTRAINT "M_MESSAGE_TYPE_pkey" PRIMARY KEY ("ID"),
    CONSTRAINT M_MESSAGE_TYPE_ID UNIQUE ("ID")
);

INSERT INTO "M_MESSAGE_TYPE" ("ID","TITLE","MESSAGE","INS_BY") VALUES (1, 'Request recived.', 'Request recived for ''{postName}'' post.', 'ATUL');
INSERT INTO "M_MESSAGE_TYPE" ("ID","TITLE","MESSAGE","INS_BY") VALUES (2, 'Request accepted.', 'Your request accepted for ''{postName}'' post.', 'ATUL');
INSERT INTO "M_MESSAGE_TYPE" ("ID","TITLE","MESSAGE","INS_BY") VALUES (3, 'Request canceled.', 'Your request canceled for ''{postName}'' post.', 'ATUL');

INSERT INTO "M_CTL_CONFIG" VALUES('WS-NOTIFY-03','CONNON_CONFIG', 0, 'Update notifications read status', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-NOTIFY-01','CONNON_CONFIG', 0, 'Get notification count by read status', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-NOTIFY-02','CONNON_CONFIG', 0, 'Get notifications by user id', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

--2021-09-30 end
