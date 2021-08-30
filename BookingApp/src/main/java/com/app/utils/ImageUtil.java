package com.app.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
import org.springframework.web.multipart.MultipartFile;


public class ImageUtil {

	public static String saveImageAtLocal(String uri, String fileAbsPath, String fileName) throws IOException {
		String[] parts = uri.split(";base64,");
    	String extension = parts[0].split("data:image/")[1];
		byte[] bytearray = Base64.decodeBase64(parts[1]);
 
		BufferedImage imag=ImageIO.read(new ByteArrayInputStream(bytearray));
		ImageIO.write(imag, extension, new File(fileAbsPath + fileName + "." +extension));
		
		return fileName + "." + extension;
	}

	public static String saveImageAtLocal(MultipartFile image, String imageBasePath, String uuid) throws IllegalStateException, IOException {
		File newFile = new File(imageBasePath + uuid + "_" + image.getOriginalFilename());
		image.transferTo(newFile);
		
		String extension = image.getOriginalFilename().toString().split("[.]")[1];
		
		BufferedImage img = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
		img.createGraphics().drawImage(ImageIO.read(newFile).getScaledInstance(100, 100, Image.SCALE_SMOOTH),0,0,null);
		ImageIO.write(img, extension, new File(imageBasePath + "thumb-"+ uuid + "_" + image.getOriginalFilename()));
		
		return uuid + "_" + image.getOriginalFilename();
	}
}
