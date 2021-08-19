package com.app.controller;


import java.util.ArrayList;
import java.util.HashMap;
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

import javassist.bytecode.analysis.Type;

@RestController
@RequestMapping("vehicle")
public class VehicleController extends ControllerBase {
	
	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
            add("/vehicle/*");
        }
    };
    
	@Autowired
	ApplicationDBServiceIF service;
	
	
	private static Logger logger = LoggerFactory.getLogger(VehicleController.class);

	public VehicleController() {
	}
	
	@PostMapping("/all")
	@ServiceInfo(serviceCode = "WS-VS-01", serviceName = "Get All Vehicle From Master", queryId = "app.vehicle.get.all")
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
	@PostMapping("/allcatwise")
	@ServiceInfo(serviceCode = "WS-VS-06", serviceName = "Get All Vehicle From Master with categry", queryId = "app.vehicle.get.allcatwise")
	private ResponseDTO getAllCatWise(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId) throws Exception {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			requestInfo.putAll(input);
			result = validate(requestInfo);

			if(null != result) {
				return result;
			}
			
			Map<String, List<Map<String, Object>>> categories = new HashMap<String, List<Map<String, Object>>>();
			List<Map<String, Object>> allData = service.getData(requestInfo);
			Map<String, String> idName = new HashMap<String, String>();
			
			allData.forEach( type -> {
				String cat = type.get("CATEGORY_ID").toString();
				if(!categories.containsKey(cat)) {
					categories.put(cat, new ArrayList<Map<String,Object>>());
				}
				idName.put(cat, type.get("CATEGORY_NAME").toString());
				
				List<Map<String, Object>> catItems = categories.get(cat);
				Map<String, Object> item = new HashMap<String, Object>();
				item.put("id", type.get("vehicleId"));
				item.put("name", type.get("vehicleName"));
				item.put("vehicleType", type.get("vehicleType"));
				catItems.add(item);
				categories.put(cat, catItems);
			});
			
			List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
			
			idName.forEach((key, value) ->{
				Map<String, Object> item = new HashMap<String, Object>();
				item.put("name", value);
				item.put("id", key);
				item.put("children", categories.get(key));
				data.add(item);
			});
		
			
			result = createSuccessResponse(requestInfo,data);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/registor")
	@ServiceInfo(serviceCode = "WS-VS-02", serviceName = "User Vehicle Registration", queryId = "app.vehicle.save", logActivity = true)
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
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PostMapping("/uservehicle")
	@ServiceInfo(serviceCode = "WS-VS-03", serviceName = "Get User Vehicles", queryId = "app.vehicle.get.uservehicle")
	private ResponseDTO getUserVehicle(@RequestBody Map<String,Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
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
	
	
	@DeleteMapping("/deletevehicle")	
	@ServiceInfo(serviceCode = "WS-VS-04", serviceName = "Delete User Vehicle", queryId = "app.vehicle.delete.uservehicle", logActivity =true)
	private ResponseDTO delete(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
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
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@PutMapping("/updatevehicle")	
	@ServiceInfo(serviceCode = "WS-VS-05", serviceName = "Update User Vehicle", queryId = "app.vehicle.update.uservehicle", logActivity =true)
	private ResponseDTO update(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo, 
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
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
}
