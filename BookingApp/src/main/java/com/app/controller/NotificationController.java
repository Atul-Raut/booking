package com.app.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.core.annotation.ServiceInfo;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.dto.RequestInfo;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("notification")
public class NotificationController extends ControllerBase {
	
	private static final Pattern pattern = Pattern.compile("\\{(.*?)\\}");

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
			add("/notification/*");
		}
	};

	@Autowired
	ApplicationDBServiceIF service;


	private static Logger logger = LoggerFactory.getLogger(NotificationController.class);

	public NotificationController() {
	}
	
	@PostMapping("/count")	
	@ServiceInfo(serviceCode = "WS-NOTIFY-01", serviceName = "Get notification count by read status", queryId = "app.notification.count.get", logActivity =false)
	private ResponseDTO getCount(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
			result = validate(requestInfo);

			if(null != result) {
				return result;
			}

			result = createSuccessResponse(requestInfo,service.getDataObject(requestInfo));
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/get")	
	@ServiceInfo(serviceCode = "WS-NOTIFY-02", serviceName = "Get notifications by user id", queryId = "app.notification.get", logActivity =false)
	private ResponseDTO get(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
			result = validate(requestInfo);

			if(null != result) {
				return result;
			}
			
			List<Map<String, Object>> data = service.getData(requestInfo);
			data.forEach(item -> {
				String message = Objects.toString(item.get("message"), null);
				if(null != message) {
					Matcher m = pattern.matcher(message);
					while (m.find()) {
					   String key = m.group(1);
					    String value = Objects.toString(item.get(key), "");
					    message = message.replaceAll("\\{" + key + "\\}", value);
					}
					item.put("message", message);
				}
			});

			result = createSuccessResponse(requestInfo, data);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PutMapping("/update")	
	@ServiceInfo(serviceCode = "WS-NOTIFY-03", serviceName = "Update notifications read status", queryId = "app.notification.update", logActivity =false)
	private ResponseDTO update(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
			result = validate(requestInfo);

			if(null != result) {
				return result;
			}

			service.executeUpdate(requestInfo);
			result = createSuccessResponse(requestInfo,null);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
}
