package com.app.core.validator;

import java.util.List;
import java.util.Map;

/**
 * @author rautatul
 *
 */
public class ValidatorInfo {

	private String type;
	private List<Map<String, Object>> value;
	
	
	
	public ValidatorInfo(String type, List<Map<String, Object>> value) {
		super();
		this.type = type;
		this.value = value;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<Map<String, Object>> getValue() {
		return value;
	}
	public void setValue(List<Map<String, Object>> value) {
		this.value = value;
	}
	
	
}
