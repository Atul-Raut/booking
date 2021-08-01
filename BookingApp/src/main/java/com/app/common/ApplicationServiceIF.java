package com.app.common;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.app.dto.RequestInfo;

@Component
public interface ApplicationServiceIF {

	public List<Map<String, Object>> getData(RequestInfo input) throws Exception;
	public Map<String, Object> getDataObject(RequestInfo input) throws Exception;
	public Map<String, Object> executeUpdate(RequestInfo input) throws Exception;
}
