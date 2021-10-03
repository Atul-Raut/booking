package com.app.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Set;

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

import com.app.controller.impl.PostBaseControlerImpl;
import com.app.core.annotation.ServiceInfo;
import com.app.core.common.ApplicationContext;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("post")
public class PostController extends PostBaseControlerImpl {
	
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
	
	@PostMapping("/search-customer")
	@ServiceInfo(serviceCode = "WS-PS-01", serviceName = "Search post for customer", queryId = "app.post.search.customer")
	private ResponseDTO getCustomerAll(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
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
	
	@PostMapping("/search-provider")
	@ServiceInfo(serviceCode = "WS-PS-01-2", serviceName = "Search post for provider", queryId = "app.post.search.provider")
	private ResponseDTO getProviderAll(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
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
			
			String vehicleId = Objects.toString(requestInfo.get("vehicleId"), "");
			vehicleId = vehicleId.replace("(", "");
			vehicleId = vehicleId.replace(")", "");
			vehicleId = vehicleId.replace("[", "");
			vehicleId = vehicleId.replace("]", "");
			requestInfo.put("vehicleId", vehicleId);

			convertStringToDateAdd("activityFromDate",requestInfo, "ACTIVITY_DATE_TIME_FROM");
			convertStringToDateAdd("activityToDate",requestInfo, "ACTIVITY_DATE_TIME_TO");
			convertStringToDateAdd("bidFromDate",requestInfo, "BID_DATE_TIME_FROM");
			convertStringToDateAdd("bidToDate",requestInfo, "BID_DATE_TIME_TO");
			
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
			
			if(requestInfo.containsKey("reasonInfo") && null != requestInfo.get("reasonInfo")) {
				requestInfo.setQueryId("WS-PS-04.app.post.status.reason.insert");
				@SuppressWarnings("unchecked")
				Set<Entry<String, Object>> reasons = ((Map<String,Object>)requestInfo.get("reasonInfo")).entrySet();
				for (Entry<String, Object> entry : reasons) {
					try {
						requestInfo.generateID();
						String ans = Objects.toString(entry.getValue());
						
						if(ans == null || ans.isEmpty()) {
							continue;
						}
						
						String queId = null;
						try {
							queId = entry.getKey().replaceAll("ANS_", "");
						}catch(Exception e) {
							queId = entry.getKey();
						}
						requestInfo.put("queId", queId);
						requestInfo.put("type", 3);
						requestInfo.put("ans", ans);
						service.executeUpdate(requestInfo);
					}catch(Exception e) {
						LogUtils.logError(logger, requestId, CommonConstants.ERROR_DATA_INS_UPD_FAILED, 
								"Reason insert failed." + CoreUtils.getJsonStringFromObject(requestInfo), e);
					}
				}
			}
			
			requestInfo.put("displayType",1);
			requestInfo.put("notificationFor", requestInfo.get("userId")) ;
			addNotification(requestInfo);
			
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
			
			requestInfo.setQueryId("app.get.post.by.id");
			Map<String, Object> postDetails = service.getDataObject(requestInfo);
			
			
			requestInfo.put("notificationFor", postDetails.get("userId"));
			requestInfo.put("displayType",1);
			addNotification(requestInfo);
			
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
			//Get post request
			List<Map<String, Object>> requests = service.getData(requestInfo);
			
			//get user images
			requestInfo.setQueryId("app.vehicle.get.uservehicleimage");
			List<Map<String, Object>> images = service.getData(requestInfo);
			
			String baseUrl = ApplicationContext.getProperty("app.baseurl");
			
			//group images request wise
			Map<String, List<String>> requestWiseImages = new HashMap<String, List<String>>();
			images.forEach(image -> {
				String postRequestId = image.get("requestID").toString();
				if(!requestWiseImages.containsKey(postRequestId)) {
					requestWiseImages.put(postRequestId, new ArrayList<String>());
				}
				
				List<String> vImages = requestWiseImages.get(postRequestId);
				vImages.add(baseUrl + "image/thumb-" + image.get("url").toString());
				
				requestWiseImages.put(postRequestId, vImages);
			});
			
			//Add images to each request
			requests.forEach(req -> {
				String postRequestId = req.get("requestID").toString();
				req.put("images", requestWiseImages.get(postRequestId));
			});
			
			
			
			result = createSuccessResponse(requestInfo,requests);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
}
