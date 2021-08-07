/**
 * 
 */
package com.app.aws.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.PublishRequest;
import com.app.core.dto.RequestInfo;
import com.app.core.service.EmailService;
import com.app.core.utils.LogUtils;

/**
 * @author rautatul
 *
 */
@SuppressWarnings("unused")
@ConfigurationProperties(prefix = "aws.sns",ignoreUnknownFields = true, ignoreInvalidFields = true) 
public class AWSEmailService extends EmailService {

	private static Logger logger =  LoggerFactory.getLogger(AWSEmailService.class);
	private String region;
	private String topicArn;
	private String accessKey;
	private String secretKey;
	
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}
	
	public String getTopicArn() {
		return topicArn;
	}

	public void setTopicArn(String topicArn) {
		this.topicArn = topicArn;
	}
	public String getAccessKey() {
		return accessKey;
	}

	public void setAccessKey(String accessKey) {
		this.accessKey = accessKey;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}
	
	/**
	 * Get AWS Cridentials
	 * @return AWSCredentials
	 */
	private AWSCredentials getAWSCredentials() {
		return new BasicAWSCredentials(getAccessKey(), getSecretKey());
	}
	
	/**
	 * get sns client
	 * @return 
	 * @return sns client
	 */
	@SuppressWarnings("unused")
	private AmazonSNS snsClient() {
        return AmazonSNSClientBuilder
        		.standard()
        		.withRegion(getRegion())
        		.withCredentials(new AWSStaticCredentialsProvider(getAWSCredentials()))
        		.build();
    }
	

	public Object publish(RequestInfo requestInfo) throws Exception{
		LogUtils.logDebug(logger, requestInfo.getRequestId(), "Email sending started");
		//TODO
		//AmazonSNS sns = snsClient();
		//String message = "";
		// final PublishRequest publishRequest = new PublishRequest(getTopicArn(), message);
		 //sns.publish(publishRequest);
	        
		return null;
	}
}
