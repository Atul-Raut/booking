package com.app.core.exceptions;

public class ConfigurationException extends NonRecoverableError {

	private static final long serialVersionUID = 1L;
	public ConfigurationException(String errorCode, String errorDescription, Exception e) {
		super(errorCode, errorDescription, e);

	}

}
