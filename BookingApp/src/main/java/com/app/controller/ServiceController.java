package com.app.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.annotation.ServiceInfo;
import com.app.common.ApplicationService;
import com.app.dto.RequestInfo;
import com.app.dto.ResponseDTO;
import com.app.utils.LogUtils;

@RestController
@RequestMapping("service")
public class ServiceController extends ControllerBase {
	
	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
            add("/service/type/*");
        }
    };
    
	@Autowired
	ApplicationService service;
	
	
	private static Logger logger = LoggerFactory.getLogger(ServiceController.class);

	public ServiceController() {
	}
	
	@GetMapping("/type/all")
	@ServiceInfo(serviceCode = "WS-SE-01", serviceName = "Get All Active Services Types", queryId = "app.service.get.all")
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
}
