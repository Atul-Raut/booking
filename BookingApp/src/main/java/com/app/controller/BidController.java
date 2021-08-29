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
@RequestMapping("bid")
public class BidController extends UserControllerBase {

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;
		{
			add("/bid/*");
		}
	};


	@Autowired
	ApplicationDBServiceIF service;

	@Autowired
	private org.springframework.context.ApplicationContext context;


	private static Logger logger = LoggerFactory.getLogger(BidController.class);

	public BidController() {
	}


	
	@PostMapping("/create")	
	@ServiceInfo(serviceCode = "WS-BID-01", serviceName = "Create Post bid", queryId = "app.bid.post.insert", logActivity =true)
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
}
