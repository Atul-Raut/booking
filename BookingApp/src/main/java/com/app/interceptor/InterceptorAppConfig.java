package com.app.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.app.controller.ApplicationController;
import com.app.controller.FileController;
import com.app.controller.PostController;
import com.app.controller.ServiceController;
import com.app.controller.UserController;
import com.app.controller.VehicleController;

@Component
public class InterceptorAppConfig implements WebMvcConfigurer {

	@Autowired
	ServiceInterceptor serviceInterceptor;
	
	@Autowired
	AppServiceInterceptor appServiceInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//Application Services
		registry.addInterceptor(appServiceInterceptor).addPathPatterns(ApplicationController.PATH_SERVICE_PATHS);
		
		//User services
		registry.addInterceptor(serviceInterceptor).addPathPatterns(UserController.PATH_SERVICE_PATHS);
		
		//Service
		registry.addInterceptor(serviceInterceptor).addPathPatterns(ServiceController.PATH_SERVICE_PATHS);
		
		//Vehicle services
		registry.addInterceptor(serviceInterceptor).addPathPatterns(VehicleController.PATH_SERVICE_PATHS);
		
		//Post Services
		registry.addInterceptor(serviceInterceptor).addPathPatterns(PostController.PATH_SERVICE_PATHS);
		
		//File Controller
		registry.addInterceptor(serviceInterceptor).addPathPatterns(FileController.PATH_SERVICE_PATHS);
	}
}
