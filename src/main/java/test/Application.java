package test;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("test.mapper")
public class Application {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
			SpringApplication.run(Application.class,args);
	}
	
	public String name() {
    //可不可以和你在一起
		return "dd";
	}

}
