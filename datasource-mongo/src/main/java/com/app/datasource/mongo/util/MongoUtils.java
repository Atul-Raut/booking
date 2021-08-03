package com.app.datasource.mongo.util;

import java.util.Map;
import java.util.Objects;

import com.app.core.common.ApplicationContext;
import com.app.core.common.CommonConstants; 


public class MongoUtils {
	
	/**
	 * Get query
	 * @param input
	 * @return query
	 */
	public static String getQueryId(Map<String, Object> input) {
		return Objects.toString(input.get(CommonConstants.KEY_QUERY_ID), null);
	}

	/**
	 * Get Query
	 * @param input
	 * @return
	 */
	public static String getQuery(Map<String, Object> input) {
		String queryID = Objects.toString(input.get(CommonConstants.KEY_QUERY_ID), null);
		if(null == queryID) {
			return null;
		}

		return ApplicationContext.getQueryByQueryID(queryID);
	}
}
