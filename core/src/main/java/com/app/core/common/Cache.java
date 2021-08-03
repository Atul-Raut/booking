package com.app.core.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.app.core.validator.ValidatorInfo;

public class Cache {

	private static final Map<String, String> queries = new HashMap<String, String>();
	private static final Map<String, List<String>> queryParameters = new HashMap<String, List<String>>();
	private static final Map<String,List<ValidatorInfo>> validators = new HashMap<String, List<ValidatorInfo>>();
	private static final Map<String, Map<String, Object>> commonConfig = new HashMap<String, Map<String, Object>>();
	//Properties
	public static Properties properties;

	public static Map<String, String> getQueries() {
		return queries;
	}

	public static Map<String, List<String>> getQueryparameters() {
		return queryParameters;
	}


	public static Map<String, Map<String, Object>> getCommonconfig() {
		return commonConfig;
	}

	/**
	 * Get query
	 * @param queryID
	 * @return query
	 */
	public static String getQueryByQueryID(String queryID) {
		return queries.get(queryID);
	}

	
	
	/**
	 * Get query parameters
	 * @param queryId
	 * @return query parameters
	 */
	public static List<String> getQueryParameters(String queryId) {
		return queryParameters.get(queryId);
	}
	
	public static Map<String, List<String>> getQueryParameters() {
		return queryParameters;
	}
	
	/**
	 * set query parameters
	 * @param queryID
	 * @param queryParameters2
	 */
	public static void setQueryParameters(String queryId, List<String> queryParameters2) {
		queryParameters.put(queryId, queryParameters2);
		
	}

	/**
	 * Get Validators
	 * @return Validators
	 */
	public static Map<String, List<ValidatorInfo>> getValidators() {
		return validators;
	}
	
	/**
	 * Get Common Configuration
	 * @return common config
	 */
	public static Map<String, Map<String, Object>> getCommonConfig() {
		return commonConfig;
	}
	
	/**
	 * get property
	 * @param key
	 * @return value
	 */
	public static String getProperty(String key) {
		return properties.getProperty(key);
	}
}
