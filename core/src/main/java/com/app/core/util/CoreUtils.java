package com.app.core.util;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

public class CoreUtils {

	private static final ObjectMapper mapper = new ObjectMapper();
	private static final Gson gson = new Gson();
	private static final Random random = new Random();

	public static int getRandomNumber(int upperbound) {
		return random.nextInt(upperbound);
	}

	/**
	 * get UUITD
	 * @return uuid
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString();
	}

	/**
	 *Get Json String from object
	 * @param object
	 * @return
	 * @throws JsonProcessingException
	 */
	public static String getJsonStringFromObject(Object object) {
		return gson.toJson(object);
	}

	/**
	 * Get mapp from json string
	 * @param string
	 * @return map
	 * @throws JsonProcessingException 
	 * @throws JsonMappingException 
	 */
	public static Map<String, Object> getMapFromJson(String json) throws JsonMappingException, JsonProcessingException {

		return mapper.readValue(json, new TypeReference<Map<String,Object>>(){});
	}

	/**
	 * Get list from json string
	 * @param json
	 * @return list
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 */
	public static List<Map<String, Object>> getListFromJson(String json) throws JsonMappingException, JsonProcessingException {
		return mapper.readValue(json, new TypeReference<List<Map<String,Object>>>(){});
	}
	/**
	 * Get class by name
	 * @param className
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 */
	@SuppressWarnings("deprecation")
	public static Object getClassByName(String className) throws Exception {
		return Class.forName(className).newInstance();
	}
}
