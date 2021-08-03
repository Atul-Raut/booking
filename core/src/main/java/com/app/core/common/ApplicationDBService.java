package com.app.core.common;

import java.util.List;
import java.util.Map;

import com.app.core.dto.RequestInfo;

public abstract class ApplicationDBService implements ApplicationDBServiceIF {

	@Override
	public List<Map<String, Object>> getData(RequestInfo input) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getDataObject(RequestInfo input) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> executeUpdate(RequestInfo input) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void loadDBConfiguration(RequestInfo requestInfo) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void reloadSql(RequestInfo requestInfo) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
