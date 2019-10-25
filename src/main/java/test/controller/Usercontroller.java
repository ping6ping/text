package test.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	public String loginSuccess() {
		 User user = ShiroUtils.getSysUser();
		//获取第一层目录
		 HashMap<String, String> map = new HashMap<String, String>();
		 map.put("dept_id", user.getDept_id());
		 map.put("menu_type", "C");
		 
		 List<Menu> menus = menuService.getMenuList(map);
		
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
	
}
