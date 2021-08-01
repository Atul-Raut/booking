package com.app.exceptions;

public class DataNotFoundException extends NonRecoverableError {

	private static final long serialVersionUID = 1L;

	public DataNotFoundException(String errorCode, String errorDescription, Exception e) {
		super(errorCode, errorDescription, e);
	}

}
