package com.app.exceptions;

public class DataNotUpdated extends NonRecoverableError {

	private static final long serialVersionUID = 1L;

	public DataNotUpdated(String errorCode, String errorDescription, Exception e) {
		super(errorCode, errorDescription, e);
	}

}
