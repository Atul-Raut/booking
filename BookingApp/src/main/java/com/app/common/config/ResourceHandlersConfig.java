package com.app.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class ResourceHandlersConfig implements WebMvcConfigurer {
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
		 registry
	     .addResourceHandler("/image/**")
	     .addResourceLocations("file:/Users/rautatul/Documents/Atul/Study/Projects/booking-dev-int/images/");
	       
	    }
}
