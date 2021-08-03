package com.app.core.validator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.logging.log4j.util.Strings;

import com.app.core.exceptions.ValidationError;

public class ServiceTypeValidator implements ValidatorIF {

	@Override
	public List<ValidationError> validate(Map<String, Object> input, ValidatorInfo validatorInfo) throws Exception {
		
		List<ValidationError> errors = new ArrayList<ValidationError>();
		
		List<Map<String, Object>> validatorFileds = validatorInfo.getValue();
		
		for (Map<String, Object> map : validatorFileds) {
			String serviceType = Objects.toString(map.get("serviceType"));
			String fieldName = Objects.toString(map.get("fieldName"));
			String serviceTypeValue = Objects.toString(input.get(fieldName));
			if(null == serviceTypeValue || Strings.isEmpty(serviceTypeValue) || !serviceTypeValue.equals(serviceType)) {
				return null;
			}
			
			@SuppressWarnings("unchecked")
			List<String> fieldsToValidate = (List<String>) map.get("fieldsToValidate");
			for (String filed : fieldsToValidate) {
				String value = Objects.toString(input.get(filed), "").trim();
				if(value.isEmpty()) {
					String errorCd  = Objects.toString(map.get("errorCd"));
					String errorMsg = Objects.toString(map.get("errorMsg"), "Mandatory Validation failed for " + filed);
					errors.add(new ValidationError(errorCd, errorMsg, null));
				}
				
			}
		}
		
		
		return errors;
	}

}
