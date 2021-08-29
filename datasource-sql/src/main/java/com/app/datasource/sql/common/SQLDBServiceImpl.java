package com.app.datasource.sql.common;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.Parameter;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TemporalType;
import javax.transaction.Transactional;

import org.hibernate.transform.Transformers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.app.core.common.ApplicationContext;
import com.app.core.common.ApplicationDBService;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.exceptions.DataNotFoundException;
import com.app.core.exceptions.DataNotUpdated;
import com.app.core.exceptions.InvalidDataException;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.core.validator.ValidatorInfo;
import com.app.datasource.sql.util.SqlUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Component
public class SQLDBServiceImpl extends ApplicationDBService{

	@PersistenceContext
	private EntityManager entityManager;
	
	private static Logger logger = LoggerFactory.getLogger(SQLDBServiceImpl.class);
	
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
	@Override
	@Transactional
	public Map<String, Object> executeUpdateBulk(List<RequestInfo> input) throws Exception {
		
		return null;
	}
	
	@SuppressWarnings("deprecation")
	private Query getQuery(RequestInfo input){
		String queryID = SqlUtils.getQueryId(input);
		String queryString = SqlUtils.getQuery(input);
		List<String> queryParameters = ApplicationContext.getQueryParameters(queryID);
		
		
		if(input.containsKey("{SQL_PART}") && queryString.contains("{SQL_PART}")) {
			queryString = queryString.replace("{SQL_PART}", Objects.toString(input.get("{SQL_PART}"),""));
			queryParameters = null;
		}
		
		
		System.out.println(queryString);
		
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
			Object value = input.get(parameter);
			System.out.println( parameter + " : " + value);
			if(value instanceof Date) {
				query.setParameter(parameter, (Date)value, TemporalType.TIMESTAMP);
			}else {
				query.setParameter(parameter, value);
			}
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
	public void loadDBConfiguration(RequestInfo input) throws Exception {
		
		input.put(CommonConstants.KEY_QUERY_ID, "common.get.configuration");
		
		List<Map<String, Object>> configs = getData(input);
	
		ApplicationContext.getValidators().clear();
		ApplicationContext.getCommonConfig().clear();
		
		for (Map<String, Object> map : configs) {
			String serviceId = Objects.toString(map.get("CTL_CD"));
			String type = Objects.toString(map.get("CTL_TYP"));
			
			if("CONNON_CONFIG".equals(type)) {
					Map<String, Object> value = CoreUtils.getMapFromJson(Objects.toString(map.get("CTL_VALUE")));
					ApplicationContext.getCommonConfig().put(serviceId, value);
			} else if(type.endsWith("_VAL")) {
				List<Map<String, Object>> value = CoreUtils.getListFromJson(Objects.toString(map.get("CTL_VALUE")));
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
