package com.app.controller.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

import com.app.controller.ControllerBase;
import com.app.core.dto.RequestInfo;

public class PostBaseControlerImpl extends ControllerBase {
	
	private static final SimpleDateFormat sd = new SimpleDateFormat("yyyyMMddHHmmss");
	
	public void convertStringToDateAdd(String key, RequestInfo requestInfo, String columnName) throws ParseException {
		String dateString = Objects.toString(requestInfo.get(key), null);
		
		if(null != dateString && !dateString.isEmpty()) {
			Date d = sd.parse(dateString);
			requestInfo.put(key, d);
			String sqlPart = Objects.toString(requestInfo.get("{SQL_PART}"), "");
			sqlPart = sqlPart + ":"+ key+", \n" ;
			requestInfo.put("{SQL_PART}", sqlPart);
		}else {
			String sqlPart = Objects.toString(requestInfo.get("{SQL_PART}"), "");
			sqlPart = sqlPart + "null, \n" ;
			requestInfo.put("{SQL_PART}", sqlPart);
			requestInfo.put(key, null);
		}
		
	}
}
