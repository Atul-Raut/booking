package com.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.core.common.ApplicationContext;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.exceptions.ValidationError;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.app.core.validator.ValidatorIF;
import com.app.core.validator.ValidatorInfo;
import com.app.dto.ResponseDTO;
import com.app.utils.AppUtils;

public class ControllerBase {

	
	private RequestInfo requestInfo;
	
	@Autowired
	ApplicationDBServiceIF service;
	
	
	public ControllerBase() {
	}
	
	public RequestInfo getRequestInfo() {
		return requestInfo;
	}

	public void setRequestInfo(RequestInfo requestInfo) {
		this.requestInfo = requestInfo;
	}

	
	/**
	 * Create Success Response
	 * @param result
	 * @return response map
	 */
	public ResponseDTO createSuccessResponse(RequestInfo requestInfo, Object result){
		return AppUtils.createSuccessResponse(requestInfo, result, service);
	}
	
	/**
	 * Create Error Response
	 * @param result
	 * @return response map
	 */
	public ResponseDTO createErrorResponse(RequestInfo requestInfo, Map<String, Object> result, Exception e){
		return AppUtils.createErrorResponse(requestInfo, result, e, service);
	}
	
	/*
	 * Validate
	 */
	public ResponseDTO validate(RequestInfo requestInfo) throws Exception {
		System.out.println(CoreUtils.getJsonStringFromObject(requestInfo));
		
		requestInfo.updatePreValidator();
		Map<String, Object> dbConfig = getCommonConfigAndValidators(requestInfo.getServiceCode());
		if(!dbConfig.containsKey("CONNON_CONFIG")) {
			ResponseDTO result = AppUtils.createErrorResponse(requestInfo, null
					, new ValidationError(CommonConstants.ERROR_CONFIG, "DB configuration not found.", null), service);
			return result;
		}
		
		requestInfo.putAll(dbConfig);
		
		List<Map<String, String>> errors = validate(requestInfo, requestInfo);
		if(null != errors && errors.size() > 0) {
			ResponseDTO result = AppUtils.createErrorResponse(requestInfo, null
					, new ValidationError(CommonConstants.ERROR_VAL_FAILED, CoreUtils.getJsonStringFromObject(errors), null), service);
			
			return result;
		}
		requestInfo.updatePostValidator();
		return null;
	}
	
	/**
	 * Validate
	 * @param input
	 * @param requestInfo
	 * @return validation result
	 * @throws Exception
	 */
	public List<Map<String, String>> validate(Map<String, Object> input, RequestInfo requestInfo) throws Exception {
		
		List<ValidatorInfo> validatores = requestInfo.getValidators();

		if(null == validatores || validatores.isEmpty()) {
			return null;
		}
		List<Map<String, String>> errors = new ArrayList<Map<String,String>>();
		for (ValidatorInfo validatorInfo : validatores) {
			try {
				ValidatorIF validator = getValidatorObject(validatorInfo);
				List<ValidationError> valErrors = validator.validate(input, validatorInfo);
				if(null == valErrors) {
					continue;
				}
				for (ValidationError e : valErrors) {
					Map<String, String> error = new HashMap<String, String>();
					error.put("errorCode", e.getErrorCode());
					error.put("errorMessage", e.getErrorDescription());
					errors.add(error);
				}
			}catch(ValidationError e) {
				Map<String, String> error = new HashMap<String, String>();
				error.put("errorCode", e.getErrorCode());
				error.put("errorMessage", e.getErrorDescription());
				errors.add(error);
			}
		}
		
		
		return errors;
	}

	/**
	 * Get validator object
	 * @param validatorInfo
	 * @return validator
	 * @throws Exception 
	 */
	private ValidatorIF getValidatorObject(ValidatorInfo validatorInfo) throws Exception {
		String type = validatorInfo.getType();
		
		String className = ApplicationContext.getProperty(type);
		return (ValidatorIF)CoreUtils.getClassByName(className);
	}

	/**
	 * get Common Config And Validators
	 * @param serviceCode
	 * @return CommonConfigAndValidators
	 * @throws Exception
	 */
	public Map<String, Object> getCommonConfigAndValidators(String serviceCode) throws Exception{
		Map<String, Object> configuration = null;
		Map<String, Object> config = ApplicationContext.getCommonConfig().get(serviceCode);
		if(null == config) {
			configuration = loadCommonConfigAndValidators(serviceCode);
		}else {
			configuration = new HashMap<String, Object>();
			configuration.put("CONNON_CONFIG", config);
			List<ValidatorInfo> validators = ApplicationContext.getValidators().get(serviceCode);
			if(null != validators) {
				configuration.put("VAL", validators);
			}
		}
		
		return configuration;
	}
	
	
	/**
	 * load common config and Validator info
	 * @param serviceCode
	 * @return info
	 * @throws Exception 
	 */
	public Map<String, Object> loadCommonConfigAndValidators(String serviceCode) throws Exception {
		RequestInfo input = new RequestInfo();
		input.put(CommonConstants.KEY_QUERY_ID, "common.get.configurationbyserviceid");
		input.put(CommonConstants.KEY_SERVICE_ID, serviceCode);
		
		List<Map<String, Object>> configs = service.getData(input);
		Map<String, Object> info = new HashMap<String, Object>();
		List<ValidatorInfo> validators = new ArrayList<ValidatorInfo>();

		for (Map<String, Object> map : configs) {
			String type = Objects.toString(map.get("CTL_TYP"));
			
			if("CONNON_CONFIG".equals(type)) {
					Map<String, Object> value = CoreUtils.getMapFromJson(Objects.toString(map.get("CTL_VALUE")));
					info.put(type, value);
			} else if(type.endsWith("_VAL")) {
				List<Map<String, Object>> value = CoreUtils.getListFromJson(Objects.toString(map.get("CTL_VALUE")));
				validators.add(new ValidatorInfo(type, value));
			}
		}
		info.put("VAL", validators);
		return info;
	}
}
