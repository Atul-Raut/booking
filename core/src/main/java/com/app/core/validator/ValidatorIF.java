package com.app.core.validator;

import java.util.List;
import java.util.Map;

import com.app.core.exceptions.ValidationError;

public interface ValidatorIF {

	public List<ValidationError> validate(Map<String, Object> input, ValidatorInfo validatorInfo) throws Exception;
}
