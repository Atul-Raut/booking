INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-01','CONNON_CONFIG', 0, 'Get All Vehicle From Master', '{}', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-01','MANDATORY_VAL', 1, 'Get All Vehicle From Master', '[{"filedName":"userId","errorCd":"VAL_001"}]', 1, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-02','CONNON_CONFIG', 0, 'User Vehicle Registration', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-02','MANDATORY_VAL', 1, 'User Vehicle Registration', '[{"filedName":"userId"},{"filedName":"acType"},{"filedName":"vehicleId"},{"filedName":"vehicleNo"}]', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);

INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-03','CONNON_CONFIG', 0, 'Get User Vehicles', '{}', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
INSERT INTO "M_CTL_CONFIG" VALUES('WS-VS-03','MANDATORY_VAL', 1, 'Get User Vehicles', '[{"filedName":"userId"}]', 0, 0, CURRENT_TIMESTAMP, 'ATUL', null, null);
