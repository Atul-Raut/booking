package com.app.core.exceptions;

public class DataAlreadyExistError extends NonRecoverableError {

	private static final long serialVersionUID = 1L;

	public DataAlreadyExistError(String errorCode, String errorDescription, Exception e) {
		super(errorCode, errorDescription, e);
	}

}
