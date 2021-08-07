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
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.app.core.dto.RequestInfo;
import com.app.core.service.FileUploadService;
import com.app.core.utils.LogUtils;

/**
 * @author rautatul
 *
 */
@ConfigurationProperties(prefix = "aws.s3",ignoreUnknownFields = true, ignoreInvalidFields = true) 
public class S3FileUploadService extends FileUploadService {
	
	private static Logger logger =  LoggerFactory.getLogger(S3FileUploadService.class);

	private String bucketName;
	private String region;
	private String accessKey;
	private String secretKey;
	
	public String getBucketName() {
		return bucketName;
	}

	public void setBucketName(String bucketName) {
		this.bucketName = bucketName;
	}
	
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
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
	 * Get S3 client
	 * @return Amazon S3
	 */
	@SuppressWarnings("unused")
	private AmazonS3 getAmazonS3Client() {
		return AmazonS3ClientBuilder
	            .standard()
	            .withRegion(getRegion())
	            .withCredentials(new AWSStaticCredentialsProvider(getAWSCredentials()))
	            .build();
	}
    
	

	@Override
	public Object execute(RequestInfo requestInfo) throws Exception {
		LogUtils.logDebug(logger, requestInfo.getRequestId(), "File upload started");
		
		//TODOD
		//AmazonS3 s3 = getAmazonS3Client();
		//s3.putObject(null)
		
		return super.execute(requestInfo);
	}

}
