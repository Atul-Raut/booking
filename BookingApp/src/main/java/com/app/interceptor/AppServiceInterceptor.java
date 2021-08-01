package com.app.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;

import com.app.BookingApplication;
import com.app.annotation.ServiceInfo;
import com.app.common.CommonConstants;
import com.app.dto.RequestInfo;
import com.app.utils.AppUtils;

@Component
public class AppServiceInterceptor extends BaseHandlerInterceptor {

	private static Logger logger = LoggerFactory.getLogger(BookingApplication.class);
	
	@Override
	public boolean preHandle(
			HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
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
		logger.info("Application Request Processing started for service [" + serviceCode + "]");
		
		
		requestInfo.put(CommonConstants.KEY_REQUEST_TIME, System.currentTimeMillis());
		requestInfo.put(CommonConstants.KEY_REQUEST_ID, getRequestID(serviceCode));
		
		request.setAttribute(CommonConstants.KEY_REQUEST_TIME, System.currentTimeMillis());
		request.setAttribute(CommonConstants.KEY_REQUEST_ID, getRequestID(serviceCode));
		request.setAttribute(CommonConstants.KEY_REQUEST_INFO, requestInfo);
		
		return true;
	}
	@Override
	public void postHandle(
			HttpServletRequest request, HttpServletResponse response, Object handler, 
			ModelAndView modelAndView) throws Exception {
		System.out.println("Post Handle");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
			Object handler, Exception exception) throws Exception {
		//outPut.put(CommonConstants.KEY_ERR_CODE, CommonConstants.ERROR_APP_001);
	//	outPut.put(CommonConstants.KEY_ERR_MSG, "Error while refresh Cache.");
		
		logger.info("Application Request completed. Processing time : [" + (System.currentTimeMillis() - (Long)request.getAttribute(CommonConstants.KEY_REQUEST_TIME)) + "] ms");
	}
	
	/**
	 * Get Request ID
	 * @param serviceCode
	 * @return requestID
	 */
	private String getRequestID(String serviceCode) {
		return serviceCode + "-" + AppUtils.getRandomNumber(10000)+ "-" + System.currentTimeMillis();
	}
}
