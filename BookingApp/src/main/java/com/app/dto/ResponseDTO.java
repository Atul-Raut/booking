package com.app.dto;

import java.util.HashMap;
import java.util.Objects;

import com.app.core.common.CommonConstants;

public class ResponseDTO extends HashMap<String, Object>{

	private static final long serialVersionUID = 1L;
	
	public ResponseDTO() {
	}
	public ResponseDTO(String retCode, String message) {
		this.put(CommonConstants.KEY_RET_CODE, retCode);
		this.put(CommonConstants.KEY_RESP_MSG, message);
	}
	public ResponseDTO(String retCode, String message, Object result) {
		this.put(CommonConstants.KEY_RET_CODE, retCode);
		this.put(CommonConstants.KEY_RESP_MSG, message);
		this.put(CommonConstants.KEY_RESP_RESULT, result);
	}
	
	public String getRetCode() {
		return Objects.toString(this.get(CommonConstants.KEY_RET_CODE));
	}
	public void setRetCode(String retCode) {
		this.put(CommonConstants.KEY_RET_CODE, retCode);
	}
	public String getMessage() {
		return Objects.toString(this.get(CommonConstants.KEY_RESP_MSG));
	}
	public void setMessage(String message) {
		this.put(CommonConstants.KEY_RESP_MSG, message);
	}
	public Object getResult() {
		return Objects.toString(this.get(CommonConstants.KEY_RESP_RESULT));
	}
	public void setResult(Object result) {
		this.put(CommonConstants.KEY_RESP_RESULT, result);
	}
	
	
}
