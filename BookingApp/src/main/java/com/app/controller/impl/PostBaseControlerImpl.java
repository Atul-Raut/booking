package com.app.controller.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

import com.app.controller.ControllerBase;
import com.app.core.dto.RequestInfo;

public class PostBaseControlerImpl extends ControllerBase {
	
	private static final SimpleDateFormat sd = new SimpleDateFormat("yyyyMMddHHmmss");
	
	public void convertStringToDateAdd(String key, RequestInfo requestInfo) throws ParseException {
		String dateString = Objects.toString(requestInfo.get(key), null);
		
		if(null != dateString && !dateString.isEmpty()) {
			Date d = sd.parse(dateString);
			requestInfo.put(key, d);
		}else {
			requestInfo.put(key, null);
		}
		
	}
}
