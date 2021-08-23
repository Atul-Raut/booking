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
