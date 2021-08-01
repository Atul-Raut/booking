package com.app.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.Parameter;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.hibernate.transform.Transformers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.app.dto.RequestInfo;
import com.app.exceptions.DataNotFoundException;
import com.app.exceptions.DataNotUpdated;
import com.app.exceptions.InvalidDataException;
import com.app.utils.AppUtils;
import com.app.utils.LogUtils;
import com.app.validator.ValidatorInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Component
public class ApplicationService implements ApplicationServiceIF{

	@PersistenceContext
	private EntityManager entityManager;
	
	private static Logger logger = LoggerFactory.getLogger(ApplicationService.class);
	
	@Override
	public List<Map<String, Object>> getData(RequestInfo input) {
		long start = System.currentTimeMillis();
		Query query = getQuery(input);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> result = query.getResultList();
		long end = System.currentTimeMillis();
		LogUtils.logInfo(logger, input.getRequestId(), 
				"Result returned by query [" + input.getQueryId() + "] size [" + result.size() + "] in [" + (end - start) + " ms]");
		return result;
	}

	@Override
	public Map<String, Object> getDataObject(RequestInfo input) throws Exception {
		long start = System.currentTimeMillis();
		Query query = getQuery(input);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> result = query.getResultList();
		long end = System.currentTimeMillis();
		LogUtils.logInfo(logger, input.getRequestId(), 
				"Result returned by query [" + input.getQueryId() + "] size [" + result.size() + "] in [" + (end - start) + " ms]");
		if(null != result && !result.isEmpty() && result.size() == 1) {
			return result.get(0);
		}else if(null != result && !result.isEmpty() && result.size() > 1) {
			throw new InvalidDataException(CommonConstants.ERROR_DATA_ERROR, "Expected 1 found " + result.size(), null);
		} else {
			throw new DataNotFoundException(CommonConstants.ERROR_DATA_NOT_FOUND, CommonConstants.DATA_NOT_FOUND, null);
		}
	}

	@Override
	@Transactional
	public Map<String, Object> executeUpdate(RequestInfo input) throws Exception {
		long start = System.currentTimeMillis();
		Query query = getQuery(input);
		Map<String, Object> result = new HashMap<String, Object>();
		long end = System.currentTimeMillis();
		LogUtils.logInfo(logger, input.getRequestId(), 
				"Time taken by [" + input.getQueryId() + "] is [" + (end - start) + " ms]");
		try {
			int rows = query.executeUpdate();
			if(rows < 1) {
				throw new DataNotUpdated(CommonConstants.ERROR_DATA_INS_UPD_FAILED, "Data not inserted or updated.", null);
			}
		}
		catch(Exception e) {
			throw e;
		}

		return result;
	}

	
	@SuppressWarnings("deprecation")
	private Query getQuery(RequestInfo input){
		String queryID = AppUtils.getQueryId(input);
		String queryString = AppUtils.getQuery(input);
		List<String> queryParameters = ApplicationContext.getQueryParameters(queryID);
		
		Query query = entityManager.createNativeQuery(queryString);
		
		if(null == queryParameters) {
			queryParameters = new ArrayList<String>();
			Set<Parameter<?>> parameters = query.getParameters();
			for (Parameter<?> parameter : parameters) {
				String name = parameter.getName();
				queryParameters.add(name);
			}
			ApplicationContext.setQueryParameters(queryID, queryParameters);
		}
		
		
		for (String parameter : queryParameters) {
			query.setParameter(parameter, input.get(parameter));
		}
		
		query.unwrap(org.hibernate.query.Query.class)
		.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		return query;
	}
	
	/**
	 * load DB configuration
	 * @throws JsonProcessingException 
	 * @throws JsonMappingException 
	 */
	public void loadDBConfiguration(RequestInfo input) throws JsonMappingException, JsonProcessingException {
		
		input.put(CommonConstants.KEY_QUERY_ID, "common.get.configuration");
		
		List<Map<String, Object>> configs = getData(input);
	
		ApplicationContext.getValidators().clear();
		ApplicationContext.getCommonConfig().clear();
		
		for (Map<String, Object> map : configs) {
			String serviceId = Objects.toString(map.get("CTL_CD"));
			String type = Objects.toString(map.get("CTL_TYP"));
			
			if("CONNON_CONFIG".equals(type)) {
					Map<String, Object> value = AppUtils.getMapFromJson(Objects.toString(map.get("CTL_VALUE")));
					ApplicationContext.getCommonConfig().put(serviceId, value);
			} else if(type.endsWith("_VAL")) {
				List<Map<String, Object>> value = AppUtils.getListFromJson(Objects.toString(map.get("CTL_VALUE")));
				if(!ApplicationContext.getValidators().containsKey(serviceId)) {
					ApplicationContext.getValidators().put(serviceId, new ArrayList<ValidatorInfo>());
				}
				ApplicationContext.getValidators().get(serviceId).add(new ValidatorInfo(type, value));
			}
		}
	}

	/**
	 * reload Sql
	 * @param input
	 * @throws Exception
	 */
	public void reloadSql(RequestInfo input) throws Exception {
		String queriesPath = ApplicationContext.getProperty("app.queries.path");
		ApplicationContext.getQueries().clear();
		ApplicationContext.getQueryParameters().clear();
		ApplicationContext.loadQueries(queriesPath);
	}
}
