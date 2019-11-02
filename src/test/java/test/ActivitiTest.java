package test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import test.service.ActivityService;
//
@SpringBootTest
@RunWith(value = SpringJUnit4ClassRunner.class)
public class ActivitiTest {
	 @Autowired
	 private ActivityService activityService;
	 
	 @Test
		public void leaveProcess() {
			activityService.startActivity();
		}
}
