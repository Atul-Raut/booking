package com.app.core.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.app.core.common.CommonConstants;
import com.app.core.validator.ValidatorInfo;

public class RequestInfo extends HashMap<String, Object> {

	private static final long serialVersionUID = 1L;
	public String getServiceCode() {
		return Objects.toString(get(CommonConstants.KEY_SERVICE_ID), null);
	}
	public void setServiceCode(String serviceCode) {
		put(CommonConstants.KEY_SERVICE_ID, serviceCode);
	}
	public String getRequestId() {
		return Objects.toString(get(CommonConstants.KEY_REQUEST_ID), null);
	}
	public void setRequestId(String requestId) {
		put(CommonConstants.KEY_REQUEST_ID, requestId);
	}
	public long getRequestTime() {
		return (Long)get(CommonConstants.KEY_REQUEST_TIME);
	}
	public void setRequestTime(long requestTime) {
		put(CommonConstants.KEY_REQUEST_TIME, requestTime);
	}
	public String getServiceName() {
		return Objects.toString(get(CommonConstants.KEY_SERVICE_NM), null);
	}
	public void setServiceName(String serviceName) {
		put(CommonConstants.KEY_SERVICE_NM, serviceName);
	}
	public String getQueryId() {
		return Objects.toString(get(CommonConstants.KEY_QUERY_ID), null);
	}
	public void setQueryId(String queryId) {
		put(CommonConstants.KEY_QUERY_ID, queryId);
	}
	@SuppressWarnings("unchecked")
	public Map<String, Object> getCommonConfig() {
		return (Map<String, Object>)this.get("COMMON_CONF");
		
	}
	@SuppressWarnings("unchecked")
	public List<ValidatorInfo> getValidators() {
		return (List<ValidatorInfo>)this.get("VAL");
		
	}
	public void setLogActivity(boolean logActivity) {
		this.put("logActivity", logActivity);
	}
	public boolean getLogActivity() {
		return Boolean.parseBoolean(Objects.toString(get("logActivity")));
	}
	/**
	 * Update input info
	 */
	public void updatePreValidator() {
		if(!this.containsKey("userId")) {
			this.put("userId", null);
		}
		if(!this.containsKey("otherInfo")) {
			this.put("otherInfo", null);
		}
		
	}
	/**
	 * Update input info
	 */
	public void updatePostValidator() {
		if(!this.containsKey("acType")) {
			this.put("acType", -1);
		}
		if(!this.containsKey("macAddress")) {
			this.put("macAddress", null);
		}
	}
}
