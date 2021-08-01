package com.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.app.common.ApplicationContext;
import com.app.common.ApplicationService;
import com.app.common.CommonConstants;
import com.app.dto.RequestInfo;
import com.app.exceptions.ConfigurationException;

@SpringBootApplication
public class BookingApplication {

	private static Logger logger = null;

	public static void main(String[] args) {

		System.setProperty("app-config-path", "/Users/rautatul/Documents/Atul/Study/Projects/config");
		
		try {
			setConfigFolderAndEnableLogging();

			logger = LoggerFactory.getLogger(BookingApplication.class);
			logger.info("Starting Application...");
			
			ConfigurableApplicationContext context = SpringApplication.run(BookingApplication.class, args);
			
			ApplicationContext.init();
			context.getBean(ApplicationService.class).loadDBConfiguration(new RequestInfo());
		} catch (Exception e) {
			e.printStackTrace();
			System.exit(0);
		}

		logger.info("Application Started.");
	}

	/**
	 * 
	 * @throws ConfigurationException
	 */
	private static void setConfigFolderAndEnableLogging() throws ConfigurationException {
		String configFolderPath = System.getProperty("app-config-path");
		if(null == configFolderPath || configFolderPath.isEmpty()) {
			throw new ConfigurationException(CommonConstants.ERROR_CONFIG, "'app-config-path' not set in systemp properties.", null);
		}
		System.setProperty("spring.config.location", "file://" + configFolderPath + "/application.properties");
		System.setProperty("logging.config", "file://" + configFolderPath + "/logback-spring.xml");
	}

}
