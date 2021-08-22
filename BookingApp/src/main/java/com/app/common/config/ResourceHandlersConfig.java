package com.app.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ConfigurationProperties(prefix = "app",ignoreUnknownFields = true, ignoreInvalidFields = true) 
public class ResourceHandlersConfig implements WebMvcConfigurer {
	
	private String resourcepath;
	
	public String getResourcePath() {
		return resourcepath;
	}

	public void setResourcePath(String resourcepath) {
		this.resourcepath = resourcepath;
	}
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
		 System.out.println(getResourcePath());
		 registry
	     .addResourceHandler("/image/**")
	     .addResourceLocations(getResourcePath());
	       
	    }
}
