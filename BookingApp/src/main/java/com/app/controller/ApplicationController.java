package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.annotation.ServiceInfo;
import com.app.common.ApplicationService;
import com.app.dto.RequestInfo;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("application")
public class ApplicationController extends ControllerBase {

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
            add("/application/*");
        }
    };

    
	@Autowired
	ApplicationService service;

	public ApplicationController() {
	}


	@GetMapping("/refreshcache")
	@ServiceInfo(serviceCode = "WS-AP-01", serviceName = "Reload Cache")
	private ResponseDTO refreshCache(@RequestAttribute("requestId") String requestId
			, @RequestAttribute("requestInfo") RequestInfo requestInfo) throws Exception {
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			service.loadDBConfiguration(requestInfo);
			result = createSuccessResponse(requestInfo,null);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
	@GetMapping("/refreshsql")
	@ServiceInfo(serviceCode = "WS-AP-02", serviceName = "Reload SQL")
	private ResponseDTO refreshSql(@RequestAttribute("requestId") String requestId
			, @RequestAttribute("requestInfo") RequestInfo requestInfo) throws Exception {
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			service.reloadSql(requestInfo);
			result = createSuccessResponse(requestInfo,null);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
}
