package com.app.datasource.mongo.common;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.app.core.common.ApplicationDBService;
import com.app.core.common.CommonConstants;
import com.app.core.dto.RequestInfo;
import com.app.core.exceptions.DataNotFoundException;
import com.app.core.exceptions.DataNotUpdated;
import com.app.core.exceptions.InvalidDataException;
import com.app.core.util.CoreUtils;
import com.app.core.utils.LogUtils;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;

import ch.qos.logback.core.sift.AbstractAppenderFactoryUsingJoran;

@Component
public class MongoDBServiceImpl extends ApplicationDBService{


	private static Logger logger = LoggerFactory.getLogger(MongoDBServiceImpl.class);

	private final MongoTemplate mongoTemplate;

	@Autowired
	public MongoDBServiceImpl(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	@Override
	public List<Map<String, Object>> getData(RequestInfo input) {
		long start = System.currentTimeMillis();
		//TODO create query and execute query
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		long end = System.currentTimeMillis();
		LogUtils.logInfo(logger, input.getRequestId(), 
				"Result returned by query [" + input.getQueryId() + "] size [" + result.size() + "] in [" + (end - start) + " ms]");
		return result;
	}

	@Override
	public Map<String, Object> getDataObject(RequestInfo input) throws Exception {
		long start = System.currentTimeMillis();
		//TODO create query and execute query
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
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
		Map<String, Object> result = new HashMap<String, Object>();
		long end = System.currentTimeMillis();
		LogUtils.logInfo(logger, input.getRequestId(), 
				"Time taken by [" + input.getQueryId() + "] is [" + (end - start) + " ms]");
		try {
			//TODO create query and execute query
			save(input);
			int rows = 0;
			if(rows < 1) {
				throw new DataNotUpdated(CommonConstants.ERROR_DATA_INS_UPD_FAILED, "Data not inserted or updated.", null);
			}
		}
		catch(Exception e) {
			throw e;
		}

		return result;
	}

	private void save(RequestInfo input) {
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.putAll((HashMap<String, Object>)input.get("saveData"));
		mongoTemplate.save(data, "M_CTL_CONFIG");

	}

	@Override
	public void loadDBConfiguration(RequestInfo requestInfo) throws Exception {

		requestInfo.put(MongoConstants.MONGO_COLLECTION_NAME, "M_CTL_CONFIG");

		//Query query = new BasicQuery("{\"ON_LOAD\" : 0,\"DEL_FLG\" : 0}");

//		List<Map<String, Object>> filters = new ArrayList<Map<String,Object>>();
//		Map<String, Object> cond = new HashMap<String, Object>();
//		cond.put("operator", "EQ");
//		cond.put("fieldName", "ON_LOAD");
//		cond.put("value", 0);
//		filters.add(cond);
//
//		Document query = new Document();
//		filters.stream().forEach(p -> {
//			String operator = Objects.toString(p.get("operator"),"");
//			System.out.println(operator);
//			String fieldName = Objects.toString(p.get("fieldName"),"");
//			System.out.println(fieldName);
//			Object value = p.get("value");
//			System.out.println(value);
//			switch (operator) {
//			case "EQ":
//				System.out.println("EQ");
//				query.append(fieldName, new Document().append("$eq", value));
//				break;
//			case "NE":
//				query.append(fieldName, new Document().append("$ne", value));
//				break;
//			case "GT":
//				query.append(fieldName, new Document().append("$gt", value));
//				break;
//			case "GTE":
//				query.append(fieldName, new Document().append("$gte", value));
//				break;
//			case "LT":
//				query.append(fieldName, new Document().append("$lt", value));
//				break;
//			case "LTE":
//				query.append(fieldName, new Document().append("$lte", value));
//				break;
//			case "IN":
//				query.append(fieldName, new Document().append("$in", value));
//				break;
//			case "NIN":
//				query.append(fieldName, new Document().append("$nin", value));
//				break;
//			default:
//				break;
//			}
//
//		});
//		
		String queryString = "{\"ON_LOAD\":{\"$eq\":1},\"DEL_FLG\":{\"$eq\":0}}";
		Map<String, Object> d = CoreUtils.getMapFromJson(queryString);
		Document query = new Document(d);
		System.out.println(CoreUtils.getJsonStringFromObject(query));

		MongoCollection<Document> collection = mongoTemplate.getDb().getCollection("M_CTL_CONFIG");
		FindIterable<Document> iterable = collection.find(query);
		List<Document> result = new ArrayList<Document>();
		for (Document document : iterable) {
			result.add(document);
		}

		//List<Document> result = mongoTemplate.find(query, Document.class);

		System.out.println(result.size());
	}

	@Override
	public void reloadSql(RequestInfo requestInfo) throws Exception {
		// TODO Auto-generated method stub
	}



	private Query getQuery()
	{
		Query query = new Query();
		List<Criteria> criteria = new ArrayList<>();

		if(!criteria.isEmpty()) {
			query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
		}

		return query;
	}
}
