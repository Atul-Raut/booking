package com.app.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.exceptions.DataNotFoundException;
import com.app.core.exceptions.InvalidDataException;
import com.app.core.service.NotificationService;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("user")
public class UserController extends UserControllerBase {

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
	
	@Autowired
	private org.springframework.context.ApplicationContext context;
	
	
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
	
	@SuppressWarnings("null")
	@PutMapping("/passwordupdate")	
	@ServiceInfo(serviceCode = "WS-UP-07", serviceName = "Change Password", queryId = "app.user.password.update", logActivity =true)
	private ResponseDTO changePassword(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
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
			
			RequestInfo requestInfoTemp =  new RequestInfo();
			requestInfoTemp.putAll(requestInfo);
			requestInfoTemp.put("password", requestInfoTemp.get("currentPassword"));
			if(!(requestInfo.containsKey("otpValidated") 
					&& "true".equals( Objects.toString(requestInfo.get("otpValidated"),"false").toLowerCase()))){
				//Check password
				requestInfoTemp.setQueryId("app.user.get");
				service.getDataObject(requestInfoTemp);
			}

			try {
				//Check with old password
				requestInfoTemp.put("password", requestInfoTemp.get("newPassword"));
				requestInfoTemp.setQueryId("app.user.password.count");
				Map<String, Object> oldPassCount = service.getDataObject(requestInfoTemp);
				if(null != oldPassCount || !oldPassCount.isEmpty()) {
					Integer count = Integer.parseInt(Objects.toString(oldPassCount.get("count"), "0"));
					if(count > 0) {
						throw new InvalidDataException(CommonConstants.ERROR_HIST_MATCH, "New password match with one of the old password.", null);
					}
				}
			}
			catch(DataNotFoundException e) {
				LogUtils.logDebug(logger, requestId, "New password not match with old password.");
			}
		
			//Update new password
			service.executeUpdate(requestInfo);
			
			//save password into history
			requestInfo.setQueryId("app.user.password.hist.save");
			requestInfo.put("password", requestInfo.get("newPassword"));
			service.executeUpdate(requestInfo);
			result = createSuccessResponse(requestInfo,null);
		}catch(DataNotFoundException e) {
			e.setErrorDescription("Password update failed. Username or Password not match.");
			result = createErrorResponse(requestInfo, null, e);
		}
		catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/sendotp")
	@ServiceInfo(serviceCode = "WS-UP-08", serviceName = "Forgot Password OTP", queryId = "app.user.otp.save", logActivity =true)
	private ResponseDTO sendOTP(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		
		
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			//Check UserId is exist or not
			RequestInfo requestInfoTemp =  new RequestInfo();
			requestInfoTemp.putAll(requestInfo);
			requestInfoTemp.setQueryId("app.user.get.for.otp");
			Map<String, Object>  userInfo = service.getDataObject(requestInfoTemp);
			requestInfo.put("userInfo", userInfo);
			
			String otp = sendOtp(requestInfo);
			requestInfo.put("otp", otp);
			service.executeUpdate(requestInfo);
			//TODO validate OTP by SMS
			context.getBean("SMSNotificationService", NotificationService.class).publish(requestInfo);
			//TODO OTP by EMAIL
			context.getBean("EmailNotificationService", NotificationService.class).publish(requestInfo);
			
			result = createSuccessResponse(requestInfo, null);
		}
		catch(DataNotFoundException e) {
			e.setErrorDescription("Username not exist.");
			result = createErrorResponse(requestInfo, null, e);
		}
		catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	
	
	@PostMapping("/validateotp")
	@ServiceInfo(serviceCode = "WS-UP-09", serviceName = "Validate OTP", queryId = "app.user.otp.get", logActivity =true)
	private ResponseDTO validateOTP(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		
		
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		requestInfo.putAll(input);
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}

			//TODO validate OTP
			
			result = createSuccessResponse(requestInfo, null);
		}
		catch(DataNotFoundException e) {
			e.setErrorDescription("Invalid OTP.");
			result = createErrorResponse(requestInfo, null, e);
		}
		catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}

	
}
