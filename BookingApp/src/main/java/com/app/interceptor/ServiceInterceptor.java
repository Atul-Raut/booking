package com.app.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.app.BookingApplication;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;

@Component
public class ServiceInterceptor extends BaseHandlerInterceptor {

	private static Logger logger = LoggerFactory.getLogger(BookingApplication.class);
	
	@Override
	public boolean preHandle(
			HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		@SuppressWarnings("unused")
		RequestInfo requestInfo = updateRequestData(request, response, handler);

		return true;
	}

	@Override
	public void postHandle(
			HttpServletRequest request, HttpServletResponse response, Object handler, 
			ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
			Object handler, Exception exception) throws Exception {
		logger.info("Request completed. Processing time : [" + (System.currentTimeMillis() - (Long)request.getAttribute(CommonConstants.KEY_REQUEST_TIME)) + "] ms");
	}
	
	
}
