package com.app.core.annotation;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Retention(RUNTIME)
@Target(METHOD)
public @interface ServiceInfo {

	public String serviceName() default "";
	public String serviceCode() default "";
	public String queryId() default "";
	public boolean logActivity() default false;
}
