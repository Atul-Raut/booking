package com.app.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.core.annotation.ServiceInfo;
import com.app.core.common.ApplicationContext;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.dto.RequestInfo;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.dto.ResponseDTO;
import com.app.utils.ImageUtil;

@RestController
@RequestMapping("upload")
public class UploadController extends ControllerBase {

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
			add("/upload/*");
		}
	};

	@Autowired
	ApplicationDBServiceIF service;


	private static Logger logger = LoggerFactory.getLogger(UploadController.class);

	public UploadController() {
	}



	@PostMapping("/image")
	@ServiceInfo(serviceCode = "WS-IMG-01", serviceName = "Upload image", queryId = "", logActivity = true)
	public ResponseDTO uploadMultipleFiles(
			@RequestParam(value ="image", required=true) MultipartFile image,
			@RequestParam("input") String input,
			@RequestAttribute("requestInfo") RequestInfo requestInfo, 
			@RequestAttribute("requestId") String requestId
			) {
		LogUtils.logInfo(logger, requestId, requestInfo.getServiceName() + " started.");
		ResponseDTO result = null;
		try {
			Map<String, Object> inputMap = null;
			if(null != input && !input.isEmpty()) {
				inputMap = CoreUtils.getMapFromJson(input);
				requestInfo.putAll(inputMap);
			}else {
				inputMap = new HashMap<String, Object>();
			}
			
			result = validate(requestInfo);

			if(null != result) {
				return result;
			}
			
			String nameLast = "";
			if(requestInfo.containsKey("imageNo") 
					&& null != requestInfo.get("imageNo")
					&& !requestInfo.get("imageNo").toString().isEmpty()) {
				nameLast = "_" + requestInfo.get("imageNo");
			}
			
			String imageBasePath = ApplicationContext.getProperty("app.resourcepath").replace("file:","");
			String imgPath = ImageUtil.saveImageAtLocal(image, imageBasePath , CoreUtils.getUUID() + nameLast);
			
			inputMap.put("imgPath", imgPath);
			result = createSuccessResponse(requestInfo, inputMap);

		}
		catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}

}
