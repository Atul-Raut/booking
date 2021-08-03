package com.app.core.exceptions;

public class InvalidDataException extends NonRecoverableError {

	private static final long serialVersionUID = 1L;
	
	public InvalidDataException(String errorCode, String errorDescription, Exception e) {
		super(errorCode, errorDescription, e);
	}

}
