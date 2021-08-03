package com.app.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("post")
public class PostController extends ControllerBase {
	
	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
            add("/post/*");
        }
    };
    
	@Autowired
	ApplicationDBServiceIF service;
	
	
	private static Logger logger = LoggerFactory.getLogger(PostController.class);

	public PostController() {
	}
	
	@PostMapping("/search")
	@ServiceInfo(serviceCode = "WS-PS-01", serviceName = "Search post", queryId = "app.post.search")
	private ResponseDTO getAll(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
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
	
	@PostMapping("/create")
	@ServiceInfo(serviceCode = "WS-PS-02", serviceName = "Create Post", queryId = "app.post.create", logActivity = true)
	private ResponseDTO registor(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		requestInfo.put(CommonConstants.KEY_ID, CoreUtils.getUUID());
		
		//set request info
		setRequestInfo(requestInfo);
		
		
		ResponseDTO result = null;
		try {
			
			requestInfo.put("status", "NEW");
			
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
	
	@PutMapping("/update")
	@ServiceInfo(serviceCode = "WS-PS-03", serviceName = "Update Post", queryId = "app.post.update", logActivity = true)
	private ResponseDTO update(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		
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
			
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	
	
	@PutMapping("/updatestatus")
	@ServiceInfo(serviceCode = "WS-PS-04", serviceName = "Update Post Status", queryId = "app.post.update.status", logActivity = true)
	private ResponseDTO updateStatus(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		
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
			
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@DeleteMapping("/delete")
	@ServiceInfo(serviceCode = "WS-PS-05", serviceName = "Delete Post", queryId = "app.post.delete", logActivity = true)
	private ResponseDTO delete(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		
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
			
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}

		
	@PostMapping("/createrequest")
	@ServiceInfo(serviceCode = "WS-PS-06", serviceName = "Create Post Request", queryId = "app.post.create.request", logActivity = true)
	private ResponseDTO createRequest(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		requestInfo.put(CommonConstants.KEY_ID, CoreUtils.getUUID());
		
		//set request info
		setRequestInfo(requestInfo);
		
		
		ResponseDTO result = null;
		try {
			
			requestInfo.put("status", "NEW");
			
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
	
	@DeleteMapping("/deleterequest")
	@ServiceInfo(serviceCode = "WS-PS-07", serviceName = "Delete Post Request", queryId = "app.post.delete.request", logActivity = true)
	private ResponseDTO deleteRequest(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		
		requestInfo.putAll(input);
		
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
			
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/getrequestcount")
	@ServiceInfo(serviceCode = "WS-PS-08", serviceName = "Get Post Request Count", queryId = "app.post.get.request.count")
	private ResponseDTO getrequestcount(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
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
	
	@PostMapping("/getrequest")
	@ServiceInfo(serviceCode = "WS-PS-09", serviceName = "Get Post Request", queryId = "app.post.get.request")
	private ResponseDTO getRequest(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
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
