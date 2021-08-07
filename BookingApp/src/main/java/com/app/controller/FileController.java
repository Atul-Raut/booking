package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.core.annotation.ServiceInfo;
import com.app.core.common.ApplicationDBServiceIF;
import com.app.core.dto.RequestInfo;
import com.app.core.service.FileUploadService;
import com.app.dto.ResponseDTO;

@RestController
@RequestMapping("booking/file")
public class FileController extends ControllerBase {

	public static final List<String> PATH_SERVICE_PATHS = new ArrayList<String>(){
		private static final long serialVersionUID = 1L;

		{
            add("/booking/file/*");
        }
    };

    
	@Autowired
	ApplicationDBServiceIF service;
	
	@Autowired
	private org.springframework.context.ApplicationContext context;

	public FileController() {
	}


	@PostMapping("/fileupload")
	@ServiceInfo(serviceCode = "WS-FL-01", serviceName = "File Upload")
	private ResponseDTO fileUpload(@RequestAttribute("requestId") String requestId
			, @RequestAttribute("requestInfo") RequestInfo requestInfo) throws Exception {
		ResponseDTO result = null;
		try {
			result = validate(requestInfo);
			if(null != result) {
				return result;
			}
			
			//TODO file upload
			context.getBean("FileUploadService", FileUploadService.class).execute(requestInfo);
			
			result = createSuccessResponse(requestInfo,null);
		}catch(Exception e) {
			result = createErrorResponse(requestInfo, null, e);
		}
		return result;
	}
	
}
