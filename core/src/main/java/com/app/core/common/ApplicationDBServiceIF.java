package com.app.core.common;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.app.core.dto.RequestInfo;

@Component
public interface ApplicationDBServiceIF {

	public List<Map<String, Object>> getData(RequestInfo input) throws Exception;
	public Map<String, Object> getDataObject(RequestInfo input) throws Exception;
	public Map<String, Object> executeUpdate(RequestInfo input) throws Exception;
	public Map<String, Object> executeUpdateBulk(List<RequestInfo> input) throws Exception;
	public void loadDBConfiguration(RequestInfo requestInfo) throws Exception;
	public void reloadSql(RequestInfo requestInfo) throws Exception;
}
