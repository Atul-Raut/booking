package com.app.controller;

import java.util.Random;

import com.app.core.dto.RequestInfo;

public class UserControllerBase extends ControllerBase {

	
	public String sendOtp(RequestInfo requestInfo) {
		// TODO Auto-generated method stub
		return getRandomNumberString();
	}
	
	public String getRandomNumberString() {
	    // It will generate 6 digit random Number.
	    // from 0 to 999999
	    Random rnd = new Random();
	    int number = rnd.nextInt(999999);

	    // this will convert any number sequence into 6 character.
	    return String.format("%06d", number);
	}
	
}
