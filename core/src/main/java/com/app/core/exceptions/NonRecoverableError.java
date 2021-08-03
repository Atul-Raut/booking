package com.app.core.exceptions;

public class NonRecoverableError extends Exception {

	private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorDescription;
	private Exception exception;
	
	public NonRecoverableError(String errorCode, String errorDescription, Exception e) {
		super(e);
		this.errorCode = errorCode;
		this.errorDescription = errorDescription;
		this.exception = e;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}

	public Exception getException() {
		return exception;
	}

	public void setException(Exception exception) {
		this.exception = exception;
	}
}
