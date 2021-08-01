package com.app.validator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.app.exceptions.ValidationError;

public class MandatoryValidator implements ValidatorIF {

	@Override
	public List<ValidationError> validate(Map<String, Object> input, ValidatorInfo validatorInfo) throws Exception {
		List<ValidationError> errors = new ArrayList<ValidationError>();
		
		List<Map<String, Object>> validatorFileds = validatorInfo.getValue();
		
		for (Map<String, Object> map : validatorFileds) {
			String fieldName = Objects.toString(map.get("fieldName"));
			String value = Objects.toString(input.get(fieldName), "").trim();
			if(value.isEmpty()) {
				String errorCd  = Objects.toString(map.get("errorCd"));
				String errorMsg = Objects.toString(map.get("errorMsg"), "Mandatory Validation failed for " + fieldName);
				errors.add(new ValidationError(errorCd, errorMsg, null));
			}
			
		}
		
		return errors;
	}

}
