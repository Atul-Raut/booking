package com.app.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.exceptions.NonRecoverableError;
import com.app.core.exceptions.ValidationError;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO; 


public class AppUtils {
	
	private static Logger logger = LoggerFactory.getLogger(AppUtils.class);

	public static Map<String, Object> getRequestParameters(HttpServletRequest request) throws IOException {
		Map<String, Object> body = new HashMap<>();
		if("GET".equalsIgnoreCase(request.getMethod())) {
			
			ArrayList<String> params = Collections.list(request.getParameterNames());
			
			for (String param : params) {
				body.put(param, request.getParameter(param));
			}
		}

		return body;
	}

	
	
	/**
	 * Create Success Response
	 * @param result
	 * @return response map
	 */
	public static ResponseDTO createSuccessResponse(RequestInfo requestInfo, Object result, ApplicationDBServiceIF service){
		LogUtils.logDebug(logger, requestInfo.getRequestId(), "Creating success response.");
		
		ResponseDTO response = new ResponseDTO(CommonConstants.SUCCESS_CODE, CommonConstants.SUCCESS_MSG);
		response.setRetCode(CommonConstants.SUCCESS_CODE);
		response.setMessage(CommonConstants.SUCCESS_MSG);
		if(null != result) {
			response.setResult(result);
		}
		LogUtils.logInfo(logger, requestInfo.getRequestId(), "Successfull response created.");
		
		try {
			LogUtils.logDebug(logger, requestInfo.getRequestId(), CoreUtils.getJsonStringFromObject(response));
		}catch(Exception e) {
			LogUtils.logError(logger, requestInfo.getRequestId(), null,"Debug log error", e);
		}
		
		try {
			logActivity(requestInfo, CommonConstants.SUCCESS_CODE, service, null);
		}catch(Exception | Error e) {
			LogUtils.logError(logger, requestInfo.getRequestId(), null, "Activity log error.", e);
		}
		
		return response;
	}
	
	/**
	 * Log Activity
	 * @param requestInfo
	 * @param successCode
	 */
	private static void logActivity(RequestInfo requestInfo, String status, ApplicationDBServiceIF service, String message) {
		if(!requestInfo.getLogActivity()) {
			return;
		}
		
		requestInfo.put("activityStatus", status);
		requestInfo.put(CommonConstants.KEY_QUERY_ID, "common.log.activity");
		requestInfo.put("otherInfo", message);
		
		if(!requestInfo.containsKey("userId")) {
			requestInfo.put("userId", null);
		}
		if(!requestInfo.containsKey("acType")) {
			requestInfo.put("acType", -1);
		}
		if(!requestInfo.containsKey("macAddress")) {
			requestInfo.put("macAddress", null);
		}
		
		try {
			service.executeUpdate(requestInfo);
		} catch (Exception e) {
			LogUtils.logError(logger, requestInfo.getRequestId(), null,"Activity log error", e);
		}
	}

	/**
	 * Create Error Response
	 * @param result
	 * @return response map
	 */
	public static ResponseDTO createErrorResponse(RequestInfo requestInfo, Map<String, Object> result, Exception e, 
			ApplicationDBServiceIF service){
		ResponseDTO response = new ResponseDTO();

		String errorCode = CommonConstants.ERROR_UNEXPECTED;
		String message = CommonConstants.UNEXPECTED_MSG;		
		
		if(e instanceof NonRecoverableError) {
			errorCode = ((NonRecoverableError)e).getErrorCode();
			message = ((NonRecoverableError)e).getErrorDescription();
		}
		else if(e.getMessage().contains("org.hibernate.exception.ConstraintViolationException")) {
			if(null != e.getCause() && null != e.getCause().getCause() 
					&& e.getCause().getCause().toString().contains("violates not-null constraint")) {
				errorCode = CommonConstants.ERROR_UNEXPECTED;
				message = "violates not-null constraint";
			}else if(null != e.getCause() && null != e.getCause().getCause() 
					&& e.getCause().getCause().toString().contains("duplicate key value violates unique constraint")) {
				errorCode = CommonConstants.ERROR_DATA_EXIST;
				message = "Data Already exist.";
			}
			else if(null != e.getCause() && null != e.getCause().getCause() 
					&& e.getCause().getCause().toString().contains("violates foreign key constraint")) {
				errorCode = CommonConstants.ERROR_DATA_ERROR;
				message = "Data missmatch with parent and child.";
			}
		}
		
		if(!(e instanceof ValidationError)) {
			LogUtils.logError(logger, requestInfo.getRequestId(), errorCode, message, e);
		}
		
		
		response.setRetCode(errorCode);
		response.setMessage(message);
		
		try {
			LogUtils.logInfo(logger, requestInfo.getRequestId(), "Error response created.");
			logActivity(requestInfo, errorCode, service, message);
		}catch(Exception | Error e1) {
			LogUtils.logError(logger, requestInfo.getRequestId(), null, "Activity log error.", e1);
		}
		
		return response;
	}
}
