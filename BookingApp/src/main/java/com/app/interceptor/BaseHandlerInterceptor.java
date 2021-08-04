package com.app.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.app.core.annotation.ServiceInfo;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.util.CoreUtils;

public class BaseHandlerInterceptor implements HandlerInterceptor {

	private static Logger logger = LoggerFactory.getLogger(BaseHandlerInterceptor.class);
	
	public BaseHandlerInterceptor() {
		
	}
	
	public RequestInfo updateRequestData(HttpServletRequest request, HttpServletResponse response, Object handler) {
		String serviceCode = "";
		RequestInfo requestInfo = new RequestInfo();
		if(handler instanceof HandlerMethod) {
	        HandlerMethod method = (HandlerMethod)handler;
	        ServiceInfo serviceInfo = method.getMethodAnnotation(ServiceInfo.class);
	        if(null != serviceInfo) {
	        	serviceCode = serviceInfo.serviceCode();
	        	request.setAttribute(CommonConstants.KEY_SERVICE_ID, serviceCode);
	        	requestInfo.setServiceCode(serviceCode);
	        	requestInfo.setServiceName(serviceInfo.serviceName());
	        	requestInfo.setQueryId(serviceInfo.queryId());
	        	requestInfo.setLogActivity(serviceInfo.logActivity());
	        }       
	    }
		logger.info("Processing started for service [" + serviceCode + "]");
		String requestId = getRequestID(serviceCode);
		long requestTime = System.currentTimeMillis();

		requestInfo.setRequestTime(requestTime);
		requestInfo.setRequestId(requestId);
		
		request.setAttribute(CommonConstants.KEY_REQUEST_TIME, requestTime);
		request.setAttribute(CommonConstants.KEY_REQUEST_ID, requestId);
		request.setAttribute(CommonConstants.KEY_REQUEST_INFO, requestInfo);
		
		return requestInfo;
	}
	
	
	/**
	 * Get Request ID
	 * @param serviceCode
	 * @return requestID
	 */
	public String getRequestID(String serviceCode) {
		return serviceCode + "-" + CoreUtils.getRandomNumber(10000)+ "-" + System.currentTimeMillis();
	}
}
