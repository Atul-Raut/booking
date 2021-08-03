package com.app.core.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Component;
import org.w3c.dom.CDATASection;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.app.core.exceptions.ConfigurationException;


@Component
public class ApplicationContext extends Cache{
	
	/**
	 * init
	 * @throws ConfigurationException
	 */
	public static void init() throws ConfigurationException {
		
		String configFolderPath = System.getProperty("app-config-path");
		
		try(InputStreamReader appPropertiesIs = 
				new InputStreamReader(
						new FileInputStream(configFolderPath + File.separator + "application.properties"))){
			
			properties = new Properties();
			properties.load(appPropertiesIs);
			
			if(properties == null) {
				throw new Exception("Invalid configuration found.");
			}
			
			String queriesPath = properties.getProperty("app.queries.path");
			
			if(queriesPath == null || !new File(queriesPath).exists()) {
				throw new Exception("Invalid configuration found. 'app.queries.path' not found to load queries.");
			}
			
			loadQueries(queriesPath);
			
		}catch(Exception e) {
			throw new ConfigurationException("CNF001", "Error occurred while init application.", e);
		}
	}
	
	/**
	 * load Queries
	 * @param queriesPath
	 * @throws Exception 
	 */
	public static void loadQueries(String queriesPath) throws Exception {
		try {
			File[] files = new File(queriesPath).listFiles();
			for (File file : files) {
				if(file.getName().toLowerCase().endsWith(".hbm.xml")) {
					loadQueriesFromFile(file);
				}
			}
		}catch(Exception e) {
			throw e;
		}
		
	}
	
	/**
	 * Load queries from the file
	 * @param file
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws IOException
	 * @throws ConfigurationException
	 */
	private static void loadQueriesFromFile(File file) throws ParserConfigurationException, SAXException, IOException, ConfigurationException {
		DocumentBuilderFactory dbfactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder =dbfactory.newDocumentBuilder();

		dBuilder.setEntityResolver(
			new EntityResolver() {
				@Override
				public InputSource resolveEntity(String publicId, String systemId) throws SAXException, IOException {
					return new InputSource(new StringReader(""));
				}
			});
		
		Document doc = dBuilder.parse(file);
		doc.getDocumentElement().normalize();
		
		NodeList queryNodeList = doc.getElementsByTagName("sql-query");
		if(null != queryNodeList) {
			extractQueries(queryNodeList);
		}
		
	}
	
	/**
	 * Extract Queries
	 * @param queryNodeList
	 * @throws ConfigurationException
	 */
	private static void extractQueries(NodeList queryNodeList) throws ConfigurationException {

		for (int i = 0; i < queryNodeList.getLength(); i++) {
			Node node = queryNodeList.item(i);
			if(node instanceof Element) {
				Element queryNode = (Element)node;
				NodeList queryStringNodes = queryNode.getChildNodes();
				if(null != queryStringNodes) {
					for (int j = 0; j < queryStringNodes.getLength(); j++) {
						Node queryStringNode = queryStringNodes.item(j);
						if(queryStringNode instanceof CDATASection) {
							CDATASection queryStringText = (CDATASection)queryStringNode;
							String queryId = queryNode.getAttribute("name");
							String query = queryStringText.getData();
							addQuery(queryId, query);
							break;
						}
					}
				}
			}
		}
	}
	
	/**
	 * add queriy
	 * @param queryId
	 * @param query
	 * @throws ConfigurationException 
	 */
	private static void addQuery(String queryId, String query) throws ConfigurationException {
		if(getQueries().containsKey(queryId)) {
			throw new ConfigurationException(CommonConstants.ERROR_CONFIG, "Duplicate query id found. [" + query + "]", null);
		}
		getQueries().put(queryId, query);
	}

	/**
	 * get property
	 * @param key
	 * @return value
	 */
	public static String getProperty(String key) {
		return properties.getProperty(key);
	}
}
