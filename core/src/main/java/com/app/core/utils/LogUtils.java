package com.app.core.utils;

import java.util.Objects;
import org.slf4j.Logger;

public class LogUtils {

	private static final String MSG_FORMAT = "[%s] %s";
	private static final String ERROR_FORMAT = "[%s - %s] %s";
	
	/**
	 * log info
	 * @param logger
	 * @param requestId
	 * @param message
	 */
 	public static void logInfo(Logger logger, String requestId, String message) {
		logger.info(String.format(MSG_FORMAT, Objects.toString(requestId, ""), message));
	}
	
 	/**
 	 * log error
 	 * @param logger
 	 * @param requestId
 	 * @param errorCode
 	 * @param message
 	 * @param ex
 	 */
	public static void logError(Logger logger, String requestId, String errorCode, String message, Throwable ex) {
		if(ex != null) {
			logger.error(String.format(ERROR_FORMAT, Objects.toString(requestId, ""), Objects.toString(errorCode, ""), message), ex);
		} else {
			logger.error(String.format(ERROR_FORMAT, Objects.toString(requestId, ""), Objects.toString(errorCode, ""), message));
		}
	}

	/**
	 * log debug
	 * @param logger
	 * @param requestId
	 * @param jsonStringFromObject
	 */
	public static void logDebug(Logger logger, String requestId, String message) {
		logger.debug(String.format(MSG_FORMAT, Objects.toString(requestId, ""), message));
		
	}
}
