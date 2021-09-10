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
@RequestMapping("feedback")
public class FeedbackController extends UserControllerBase {

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;
		{
			add("/feedback/*");
		}
	};


	@Autowired
	ApplicationDBServiceIF service;

	@Autowired
	private org.springframework.context.ApplicationContext context;


	private static Logger logger = LoggerFactory.getLogger(FeedbackController.class);

	public FeedbackController() {
	}


	
	@PostMapping("/getquestion")	
	@ServiceInfo(serviceCode = "WS-FED-01", serviceName = "Get feedback Question", queryId = "app.feedback.question.get", logActivity =false)
	private ResponseDTO getQuestion(@RequestBody Map<String, Object> input, @RequestAttribute("requestInfo") RequestInfo requestInfo,
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
