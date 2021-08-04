package com.app.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.core.annotation.ServiceInfo;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("user")
public class UserController extends ControllerBase {

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;
		{
            add("/user/*");
            add("/user/id?*");
            add("/user/login?*");
            add("/user/logout?*");
        }
    };
    
	
	@Autowired
	ApplicationDBServiceIF service;
	
	
	private static Logger logger = LoggerFactory.getLogger(UserController.class);

	public UserController() {
	}
	

	@PostMapping("/id")
	@ServiceInfo(serviceCode = "WS-UP-01", serviceName = "Get User Information", queryId = "app.user.get")
	private ResponseDTO get(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		try {
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
	
	@PostMapping("/all")
	@ServiceInfo(serviceCode = "WS-UP-02", serviceName = "Get All User Information", queryId = "app.user.get.all")
	private ResponseDTO getAll(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			result = createSuccessResponse(requestInfo,service.getData(requestInfo));
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}

	@PostMapping("/registor")
	@ServiceInfo(serviceCode = "WS-UP-03", serviceName = "User Registration", queryId = "app.user.save", logActivity = true)
	private ResponseDTO registor(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		requestInfo.put(CommonConstants.KEY_ID, CoreUtils.getUUID());
		
		//set request info
		setRequestInfo(requestInfo);
		
		
		ResponseDTO result = null;
		try {
			
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			service.executeUpdate(requestInfo);
			result = createSuccessResponse(requestInfo,null);
			
			//Save Privacy Policy
			RequestInfo privacy = new RequestInfo();
			privacy.putAll(requestInfo);
			privacy.put(CommonConstants.KEY_QUERY_ID, "app.user.policy.save");
			service.executeUpdate(privacy);
			
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/login")
	@ServiceInfo(serviceCode = "WS-UP-04", serviceName = "Login service", queryId = "app.user.get", logActivity = true)
	private ResponseDTO login(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		RequestInfo logLoginTime = new RequestInfo();
		logLoginTime.putAll(requestInfo);
		try {
			System.out.println(CoreUtils.getJsonStringFromObject(logLoginTime));
			
			result = validate(requestInfo);
			logLoginTime.putAll(requestInfo);
			if(null != result) {
				return result;
			}
			
			result = createSuccessResponse(requestInfo,service.getDataObject(requestInfo));
			
			//Login history
			logLoginTime.put(CommonConstants.KEY_QUERY_ID, "app.user.login");
			service.executeUpdate(logLoginTime);
			
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/logout")
	@ServiceInfo(serviceCode = "WS-UP-05", serviceName = "Logout service", queryId = "app.user.logout", logActivity = false)
	private ResponseDTO logout(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		try {
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
	
	@PostMapping("/usertype")
	@ServiceInfo(serviceCode = "WS-UP-06", serviceName = "User Type", queryId = "app.user.type.get", logActivity = false)
	private ResponseDTO getUserType(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		
		
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			result = createSuccessResponse(requestInfo,service.getData(requestInfo));
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
}
