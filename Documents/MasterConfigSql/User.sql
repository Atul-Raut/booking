
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-01','CONNON_CONFIG', 0, 'Get User Information', '{}', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-01','MANDATORY_VAL', 1, 'Get User Information', '[{"filedName":"userId","errorCd":"VAL_001"}]', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-02','CONNON_CONFIG', 0, 'Get All User Information', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-03','CONNON_CONFIG', 0, 'User Registration', '{}', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-03','MANDATORY_VAL', 1, 'User Registration', '[{"filedName":"userId","errorCd":"VWS-E-CM-0005"},{"filedName":"acType","errorCd":"VWS-E-CM-0005"},{"filedName":"password","errorCd":"VWS-E-CM-0005"}]', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);


INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-04','CONNON_CONFIG', 0, 'Login service', '{}', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-04','MANDATORY_VAL', 1, 'Login service', '[{"filedName":"userId","errorCd":"VWS-E-CM-0005"},{"filedName":"acType","errorCd":"VWS-E-CM-0005"},{"filedName":"password","errorCd":"VWS-E-CM-0005"}]', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-05','CONNON_CONFIG', 0, 'Logout service', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-UP-05','MANDATORY_VAL', 1, 'Logout service', '[{"filedName":"userId","errorCd":"VWS-E-CM-0005"},{"filedName":"acType","errorCd":"VWS-E-CM-0005"}]', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
