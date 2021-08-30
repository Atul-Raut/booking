package com.app.controller;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.core.annotation.ServiceInfo;
import com.app.core.common.ApplicationContext;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;
import com.app.utils.ImageUtil;

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


		ResponseDTO result = null;
		try {
			if(null != input && !input.isEmpty()) {
				requestInfo.putAll(input);
			}

			requestInfo.put(CommonConstants.KEY_ID, CoreUtils.getUUID());

			//set request info
			setRequestInfo(requestInfo);

			result = validate(requestInfo);

			if(null != result) {
				return result;
			}

			service.executeUpdate(requestInfo);
			requestInfo.setQueryId("app.vehicle.get.uservehiclelatestone");

			Map<String, Object> vehicle = service.getDataObject(requestInfo);
			String vehicleID = vehicle.get("userVehicleId").toString();
			
			List<RequestInfo> images = new ArrayList<RequestInfo>();
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> imputImages = (List<Map<String, Object>>) requestInfo.get("images");
			if(null != imputImages) {
				imputImages.forEach(imgInfo -> {
					RequestInfo img = new RequestInfo();
					img.putAll(requestInfo);
					img.put("imgPath", imgInfo.get("imgPath"));
					img.put("imgNo", imgInfo.get("imgNo"));
					img.put(CommonConstants.KEY_ID, CoreUtils.getUUID());
					img.put(CommonConstants.KEY_QUERY_ID, "app.vehicle.save.uservehicleimage");
					img.put("vehicleID", vehicleID);
					images.add(img);
				});
			}
			
			for (RequestInfo image : images) {
				service.executeUpdate(image);
			}

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

			List<Map<String, Object>> userVehicles = service.getData(requestInfo);

			requestInfo.setQueryId("app.vehicle.get.uservehicleImages");
			List<Map<String, Object>> images = service.getData(requestInfo);
			Map<String,Map<String,String>> vImages = new HashMap<String, Map<String,String>>();
			String baseUrl = ApplicationContext.getProperty("app.baseurl");

			images.forEach(image ->{
				if(!vImages.containsKey(image.get("vehicleId"))) {
					vImages.put(image.get("vehicleId").toString(), new HashMap<String, String>());
				}
				Map<String, String> imags = vImages.get(image.get("vehicleId"));
				imags.put("image" + image.get("imgNo"), baseUrl + "image/thumb-" + image.get("imgUrl"));
			});

			userVehicles.forEach(vehicle->{
				if(vImages.containsKey(vehicle.get("userVehicleId"))) {
					vehicle.putAll(vImages.get(vehicle.get("userVehicleId")));
				}
			});

			result = createSuccessResponse(requestInfo,userVehicles);
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
			
			String vehicleID = requestInfo.get("userVehicleId").toString();
			
			List<RequestInfo> images = new ArrayList<RequestInfo>();
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> imputImages = (List<Map<String, Object>>) requestInfo.get("images");
			if(null != imputImages) {
				imputImages.forEach(imgInfo -> {
					RequestInfo img = new RequestInfo();
					img.putAll(requestInfo);
					img.put("imgPath", imgInfo.get("imgPath"));
					img.put("imgNo", imgInfo.get("imgNo"));
					img.put(CommonConstants.KEY_ID, CoreUtils.getUUID());
					img.put(CommonConstants.KEY_QUERY_ID, "app.vehicle.save.uservehicleimage");
					img.put("vehicleID", vehicleID);
					images.add(img);
				});
			}
			
			for (RequestInfo image : images) {
				service.executeUpdate(image);
			}
			
			result = createSuccessResponse(requestInfo,null);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
}
