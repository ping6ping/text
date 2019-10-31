package test.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import test.domain.Menu;
import test.domain.ShiroUtils;
import test.domain.User;
import test.service.MenuService;
import test.service.UserService;

@Controller
public class Usercontroller {
	
	@Autowired
	private UserService  userService;
	
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private RedisTemplate<Object, Object>  redisTemplate; //泛型里面只能为<String,String>或<Object,Object>
	@GetMapping("/login")
	public String toLogin(String pp){
		
		return "login";
	}
	
	@PostMapping("/login")
	public String  login(String userName,String password,Model model,HttpServletRequest request){
		
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(userName,password);
		
		try {
			subject.login(token);
			return "redirect:/loginSuccess";
		} catch (UnknownAccountException  e) {
			model.addAttribute("msg","用户名不存在");
			return "Login";
		}catch (IncorrectCredentialsException  e) {
			// TODO: handle exception
			model.addAttribute("msg","密码错误");
			return "login";
		}
	}
	
	@RequestMapping("/loginSuccess")
	public String loginSuccess(Model model) {
		
		 User user = ShiroUtils.getSysUser();
		 HashMap<String, String> map = new HashMap<String, String>();
		 map.put("dept_id", user.getDept_id());
		 map.put("menu_type", "C");
		//获取第一层目录
		 List<Menu> menus = menuService.getMenuList(map);
		 //获取所有目录
		 List<Menu> allMenus = menuService.getAllChildMenu(menus);
		 model.addAttribute("menus", allMenus);
	     model.addAttribute("user", user);
		 return "main";
		 
	}
	
	
	
	@RequestMapping("/shouye")
	public String testShouye(String param1,String param2)
	{
		return "";
	}
	
	@RequestMapping("/noAccess")
	public String noAccess()
	{
		return "error";
	}
	
	@RequestMapping("/redis")
	@ResponseBody
	public List<User> getAllUsers() {  //牺牲了性能
		//字符串的序列化器
		RedisSerializer redisSerializer = new StringRedisSerializer();
		redisTemplate.setStringSerializer(redisSerializer);
		
		//高并发下,缓存穿透
		
		List<User> users = (List<User>)redisTemplate.opsForValue().get("allUsers");
		if(users == null)
		{
			synchronized(this)
			{
				users = (List<User>)redisTemplate.opsForValue().get("allUsers");
				if(users == null)
				{
					System.out.println("查询数据库");
					users = new ArrayList<User>();
					redisTemplate.opsForValue().getAndSet("allUsers",users );
				}
				else {
					System.out.println("查询缓存");
				}
			}
		}
		else {
			
			System.out.println("查询缓存");
		}
		return users;
	}
	
	@RequestMapping("/testRedis")
	public void testRedis() {
		ExecutorService executorService = Executors.newFixedThreadPool(25);
		
		for(int i=0;i<1000;i++)
		{
			executorService.execute(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					getAllUsers();
				}
			});
		}
	}
	
}
